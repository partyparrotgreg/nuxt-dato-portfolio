<template>
  <div class="project-details">
    <figure class="image">
      <datocms-image :data="project.cover.responsiveImage" />
    </figure>
    <div class="max-w-prose p-8 sm:p-16 mt-8 mx-auto prose xl:prose-xl">
      <p>{{ project.role.company.name }}</p>
      <h1 class="text-3xl sm:text-6xl font-bold mb-4 leading-tight">
        {{ project.name }}
      </h1>
      <div v-html="project.blurb" class="font-light text-xl sm:text-2xl"></div>
    </div>
    <div role="slices">
      <div v-if="project.slices">
        <div v-for="slice in project.slices" :key="slice.id">
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
        </div>
      </div>
      <div v-else>No slices found!</div>
    </div>
    <section class="p-8 sm:p-16">
      <div class="prose 2xl:prose-xl mx-auto">
        <h2>
          My role as {{ project.role.role }} at {{ project.role.company.name }}
        </h2>
        <div v-html="project.role.description"></div>

        <div class="text-primary">
          I also worked on:
        </div>
        <div>
          <ul>
            <li v-for="link in project.role.projects" :key="link.id">
              <nuxt-link :to="`/projects/${link.slug}`">{{
                link.name
              }}</nuxt-link>
            </li>
          </ul>
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
import AppFooter from '~/components/shared/AppFooter'
// import parseISO from 'date-fns/parseISO'

export default {
  components: { SliceParagraph, SliceScreenshot, AppFooter },
  async asyncData({ params }) {
    const data = await request({
      query: gql`
        query ProjectQuery($slug: String!) {
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

          project(filter: { slug: { eq: $slug } }) {
            seo: _seoMetaTags {
              ...seoMetaTagsFields
            }
            id
            name
            slug
            blurb
            cover {
              responsiveImage(imgixParams: { fit: crop, ar: "16:9", w: 1440 }) {
                ...imageFields
              }
            }
            role {
              from
              role
              description
              to
              id
              city
              company {
                name
                id
                url
              }
              projects {
                id
                name
                slug
              }
            }
            slices: slices {
              ... on ParagraphRecord {
                id
                content
                sliceType {
                  name
                }
              }
              ... on ScreenRecord {
                id
                image {
                  responsiveImage(imgixParams: { w: 1280 }) {
                    ...imageFields
                  }
                  title
                }
                description
                sliceType {
                  name
                }
              }
              ... on EmbedRecord {
                id
                embed
                sliceType {
                  name
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

    return toHead(this.project.seo, this.site.favicon)
  }
}
</script>
