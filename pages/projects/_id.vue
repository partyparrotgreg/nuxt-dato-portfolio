<template>
  <div class="project-details">
    <figure class="image">
      <datocms-image :data="project.cover.responsiveImage" />
    </figure>
    <div class="prose mx-auto py-16">
      <h1 class="title">
        {{ project.name }}
      </h1>
      <div v-html="project.blurb"></div>
    </div>

    <div role="slices">
      <div v-if="project.slices">
        <div v-for="slice in project.slices" :key="slice.id">
          <slice-paragraph
            :slice="slice"
            v-if="slice.sliceType.name === 'paragraph'"
          ></slice-paragraph>
          <slice-screenshot
            :slice="slice"
            v-if="slice.sliceType.name === 'screenshot'"
          ></slice-screenshot>
        </div>
      </div>
      <div v-else>No slices found!</div>
    </div>
  </div>
</template>

<script>
import { request, gql, imageFields, seoMetaTagsFields } from '~/lib/datocms'
import { toHead } from 'vue-datocms'
import format from 'date-fns/format'
import SliceParagraph from '../../components/slices/SliceParagraph.vue'
import SliceScreenshot from '../../components/slices/SliceScreenshot.vue'
// import parseISO from 'date-fns/parseISO'

export default {
  components: { SliceParagraph, SliceScreenshot },
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
            cover {
              responsiveImage(imgixParams: { fit: crop, ar: "16:9", w: 1440 }) {
                ...imageFields
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
                  responsiveImage(
                    imgixParams: { fit: crop, ar: "16:9", w: 1440 }
                  ) {
                    ...imageFields
                  }
                }
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
