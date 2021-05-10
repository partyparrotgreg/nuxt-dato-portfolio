<template>
  <div class="article">
    <article>
      <header class="p-8 sm:p-16">
        <div
          class="max-w-prose p-0 sm:p-16 mt-8 mx-auto prose"
          style="z-index: 999;"
        >
          <small>{{ formatDate(article.published) }}</small>
          <h1
            class="capitalize text-3xl sm:text-6xl font-bold leading-tight -mx-1"
          >
            {{ article.title }}
          </h1>

          <div
            v-html="article.blurb"
            class="font-light text-md sm:text-xl"
          ></div>
        </div>
        <figure class="relative -mx-8 sm:mx-0">
          <datocms-image
            :data="article.cover.responsiveImage"
            draggable="false"
          />
          <figcaption
            v-if="article.cover.responsiveImage.title"
            class="absolute bottom-0 left-0 text-xs bg-black bg-opacity-80 text-white py-1 px-2"
            style="z-index: 200;"
          >
            {{ article.cover.responsiveImage.title }}
          </figcaption>
        </figure>
      </header>
      <div role="slices" class="bg-white">
        <div v-if="article.slices">
          <div v-for="slice in article.slices" :key="slice.id">
            <slice-paragraph
              class="slice-paragraph mb-16"
              :slice="slice"
              v-if="slice.sliceType.name === 'paragraph'"
            ></slice-paragraph>
            <slice-screenshot
              class="slice-screenshot"
              :slice="slice"
              v-if="slice.sliceType.name === 'screenshot'"
            ></slice-screenshot>
            <div
              v-if="slice.sliceType.name === 'project'"
              class="max-w-prose mx-auto space-y-12 mb-16"
            >
              <item-project-small
                v-for="project in slice.project"
                :project="project"
                :key="project.slug"
                class="px-8 sm:px-12"
              >
              </item-project-small>
            </div>
          </div>
        </div>
        <div v-else class="max-w-prose p-8 sm:p-16 mx-auto prose">
          <p>Oh, snap, there is no content here!</p>
        </div>
        <div class="max-w-prose p-8 sm:p-16 mx-auto">
          <span class="text-gray-600 text-xs"
            >Updated: {{ formatDate(article.updated) }}</span
          >
        </div>
      </div>
    </article>
    <section class="p-8 sm:p-16 2xl:p-32 bg-gray-50" v-if="related.length >= 2">
      <small class="text-primary uppercase">stories you may like</small>
      <div class="grid gap-12 py-10" :class="relatedColumns">
        <div
          v-for="item in related"
          :key="item.id"
          class="space-y-4"
          :class="{ 'opacity-50': item.slug === article.slug }"
        >
          <template v-if="item.slug != article.slug">
            <figure class="aspect-w-16 aspect-h-9 overflow-hidden relative">
              <nuxt-link
                :to="`/blog/${item.slug}`"
                class="hover:scale-105 transform"
              >
                <datocms-image
                  class="bottom-0 w-full h-auto inset-0 absolute"
                  :data="item.cover.responsiveImage"
                  draggable="false"
              /></nuxt-link>
            </figure>
            <div class="description">
              <nuxt-link :to="`/blog/${item.slug}`" class="space-y-0">
                <small class="opacity-70">{{
                  formatDate(item.published)
                }}</small>
                <h3 class="text-lg font-semibold">{{ item.title }}</h3>
              </nuxt-link>
            </div>
          </template>
        </div>
      </div>
    </section>
    <app-footer :footer="footer"></app-footer>
  </div>
</template>

<script>
import { request, gql, imageFields, seoMetaTagsFields } from '~/lib/datocms'
import { toHead } from 'vue-datocms'
import format from 'date-fns/format'
import SliceParagraph from '~/components/slices/SliceParagraph.vue'
import SliceScreenshot from '~/components/slices/SliceScreenshot.vue'
import ItemProjectSmall from '~/components/lists/ItemProjectSmall'
import AppFooter from '~/components/shared/AppFooter'
import parseISO from 'date-fns/parseISO'

export default {
  transition: 'home',
  components: { SliceParagraph, SliceScreenshot, AppFooter, ItemProjectSmall },
  computed: {
    relatedColumns() {
      if (this.related.length === 2) {
        return 'grid-cols-2'
      } else if (this.related.length === 3 || this.related.length % 2 != 0) {
        return 'grid-cols-3'
      } else {
        return
      }
    }
  },
  async asyncData({ params }) {
    const data = await request({
      query: gql`
        query ArticleQuery($slug: String!) {
          site: _site {
            favicon: faviconMetaTags {
              ...seoMetaTagsFields
            }
          }
          footer: footer {
            callout
            title
            socialMedia {
              id
              name
              url
            }
          }
          related: allArticles(
            filter: { slug: { neq: $slug }, _status: { eq: published } }
          ) {
            published: _firstPublishedAt
            id
            title
            slug

            cover {
              responsiveImage {
                ...imageFields
              }
            }
          }
          article: article(filter: { slug: { eq: $slug } }) {
            seo: _seoMetaTags {
              ...seoMetaTagsFields
            }
            published: _firstPublishedAt
            updated: _updatedAt
            id
            slug
            title
            blurb
            cover {
              responsiveImage {
                ...imageFields
              }
            }
            slices: sections {
              ... on ParagraphRecord {
                id
                sliceType {
                  name
                  id
                }
                content
              }
              ... on ScreenRecord {
                id
                description
                sliceType {
                  id
                  name
                }
                image {
                  responsiveImage {
                    ...imageFields
                  }
                }
              }
              ... on RelatedRecord {
                id
                sliceType {
                  name
                  id
                }
                project {
                  name
                  slug
                  year
                  active
                  blurb
                  cover {
                    responsiveImage {
                      ...imageFields
                    }
                  }
                  role {
                    company {
                      name
                    }
                  }
                }
              }
            }
          }
        }

        ${imageFields}
        ${seoMetaTagsFields}
      `,
      variables: {
        slug: params.id
      }
    })

    return { ready: !!data, ...data }
  },
  methods: {
    formatDate(date) {
      return format(parseISO(date), 'PPP')
    },
    renderBlock: ({ record, h }) => {
      if (record.__typename === 'ImageBlockRecord') {
        return h('div', { class: 'mb-5' }, [
          h('datocms-image', { props: { data: record.image.responsiveImage } })
        ])
      }

      return h('div', {}, [
        h('p', {}, "Don't know how to render a block!"),
        h('pre', {}, JSON.stringify(record, null, 2))
      ])
    }
  },
  head() {
    if (!this.ready) {
      return
    }

    return toHead(this.article.seo, this.site.favicon)
  }
}
</script>

<style scoped>
.article {
  -webkit-touch-callout: text; /* iOS Safari */
  -webkit-user-select: text; /* Safari */
  -khtml-user-select: text; /* Konqueror HTML */
  -moz-user-select: text; /* Old versions of Firefox */
  -ms-user-select: text; /* Internet Explorer/Edge */
  user-select: text; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>
