<template>
  <div class="project-details">
    <figure class="image">
      <datocms-image :data="project.cover.responsiveImage" />
    </figure>

    <h1 class="title">
      <nuxt-link :to="`/projects/${project.slug}`">{{
        project.name
      }}</nuxt-link>
    </h1>
    <div v-html="project.blurb"></div>
    <!-- Slices -->
  </div>
</template>

<script>
import { request, gql, imageFields, seoMetaTagsFields } from '~/lib/datocms'
import { toHead } from 'vue-datocms'
import format from 'date-fns/format'
// import parseISO from 'date-fns/parseISO'

export default {
  async asyncData({ params }) {
    const data = await request({
      query: gql`
        query ProjectQuery($slug: String!) {
          site: _site {
            favicon: faviconMetaTags {
              ...seoMetaTagsFields
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
            # publicationDate: _firstPublishedAt
            # content {
            #   value
            #   blocks {
            #     __typename
            #     ... on ImageBlockRecord {
            #       id
            #       image {
            #         responsiveImage(
            #           imgixParams: { fm: jpg, fit: crop, w: 2000, h: 1000 }
            #         ) {
            #           ...imageFields
            #         }
            #       }
            #     }
            #   }
            # }
            cover {
              responsiveImage(imgixParams: { fit: crop, ar: "16:9", w: 860 }) {
                ...imageFields
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
