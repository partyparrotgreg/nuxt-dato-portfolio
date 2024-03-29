<template>
  <div class="page-articles sm:pt-8">
    <div class="p-8 sm:p-16 space-y-16">
      <article
        class="relative"
        v-for="(article, index) in computedArticles"
        :key="article.id"
        :id="'article-' + article.slug + '-' + index"
      >
        <div v-if="index === 0" class="relative space-y-4 sm:space-y-0">
          <nuxt-link
            class="w-full flex sm:justify-center sm:align-middle sm:items-center"
            :to="`/blog/${article.slug}`"
          >
            <figure class="rounded-2xl overflow-hidden">
              <datocms-image :data="article.cover.responsiveImage" />
            </figure>
          </nuxt-link>
          <div
            class="sm:absolute top-0 sm:p-4 xl:p-12 bg-white space-y-1 max-w-2xl"
          >
            <nuxt-link :to="`/blog/${article.slug}`">
              <small class="opacity-70">{{
                formatDate(article._firstPublishedAt)
              }}</small>
              <h2
                class="text-2xl sm:text-5xl font-semibold mb-2 -ml-1 mt-1 leading-tight capitalize"
              >
                {{ article.title }}
              </h2>
            </nuxt-link>
            <div v-html="article.blurb" class="prose pb-4"></div>
          </div>
        </div>
        <div
          v-else
          class="flex max-w-3xl mx-auto flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0"
        >
          <nuxt-link
            class="w-full flex sm:justify-center sm:align-middle sm:items-center"
            :to="`/blog/${article.slug}`"
          >
            <figure
              class="rounded-2xl overflow-hidden hover:scale-105 transform transition-all ease-out duration-500 hover:shadow-xl"
            >
              <datocms-image :data="article.cover.responsiveImage" />
            </figure>
          </nuxt-link>
          <div role="description" class="space-y-1 flex-grow">
            <nuxt-link :to="`/blog/${article.slug}`">
              <small class="opacity-70">{{
                formatDate(article._firstPublishedAt)
              }}</small>
              <h2 class="text-xl sm:text-3xl font-semibold -ml-1">
                {{ article.title }}
              </h2>
            </nuxt-link>
            <div v-html="article.blurb" class="prose pb-4"></div>
          </div>
        </div>
      </article>
    </div>
    <app-footer :footer="footer"></app-footer>
  </div>
</template>

<script>
import { request, gql, imageFields, seoMetaTagsFields } from '~/lib/datocms'
import { toHead } from 'vue-datocms'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import AppFooter from '~/components/shared/AppFooter'
import { orderBy } from 'lodash'

export default {
  transition: 'home',
  components: { AppFooter },
  computed: {
    computedArticles() {
      return orderBy(this.articles, 'featured')
    }
  },
  async asyncData({ params }) {
    const data = await request({
      query: gql`
        {
          site: _site {
            favicon: faviconMetaTags {
              ...seoMetaTagsFields
            }
          }
          header: header {
            seo: _seoMetaTags {
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

          articles: allArticles(
            filter: { _status: { eq: published } }
            orderBy: _firstPublishedAt_DESC
          ) {
            cover {
              responsiveImage {
                ...imageFields
              }
            }
            _publishedAt
            _firstPublishedAt
            _updatedAt
            _status
            featured
            slug
            blurb
            title
            id
          }
        }
        ${imageFields}
        ${seoMetaTagsFields}
      `
    })

    return { ready: !!data, ...data }
  },
  methods: {
    formatDate(date) {
      return format(parseISO(date), 'PPP')
    }
  },
  head() {
    if (!this.ready) {
      return
    }

    return toHead(this.header.seo, this.site.favicon)
  }
}
</script>

<style></style>
