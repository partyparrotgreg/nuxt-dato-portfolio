<template>
  <div class="pt-8 sm:pt-16">
    <div v-for="slice in about.slices" :key="slice.id">
      <section-intro
        v-if="slice.sliceType.name === 'intro'"
        :slice="slice"
      ></section-intro>
      <section-experience
        v-if="slice.sliceType.name === 'experience'"
        :slice="slice"
        :experiences="experiences"
      >
      </section-experience>
      <section-process
        v-if="slice.sliceType.name === 'process'"
        :slice="slice"
        :techniques="techniques"
      >
      </section-process>
      <section-hobby v-if="slice.sliceType.name === 'hobby'" :slice="slice">
      </section-hobby>
    </div>
    <app-footer :footer="footer"></app-footer>
  </div>
</template>

<script>
import { request, gql, imageFields, seoMetaTagsFields } from '~/lib/datocms'
import { toHead } from 'vue-datocms'
import AppFooter from '~/components/shared/AppFooter'
import SectionIntro from '~/components/sections/SectionIntro'
import SectionExperience from '~/components/sections/SectionExperience'
import SectionProcess from '~/components/sections/SectionProcess'
import SectionHobby from '~/components/sections/SectionHobby'
export default {
  components: {
    AppFooter,
    SectionIntro,
    SectionExperience,
    SectionProcess,
    SectionHobby
  },
  async asyncData({ params }) {
    const data = await request({
      query: gql`
        query AboutQuery {
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
          techniques: allTechniques(orderBy: order_ASC) {
            id
            tools {
              id
              name
            }
            name
            order
            description
          }
          experiences: allExperiences(orderBy: from_DESC) {
            city
            id
            company {
              id
              name
              url
            }
            current
            from
            to
            role
            projects {
              id
              name
              slug
            }
            description
          }
          about {
            seo: _seoMetaTags {
              ...seoMetaTagsFields
            }
            slices {
              ... on IntroRecord {
                id
                title
                callout
                description
                sliceType {
                  name
                }
                image {
                  alt
                  title
                  url
                  responsiveImage(
                    imgixParams: { fit: crop, ar: "4:3", w: 1000 }
                  ) {
                    ...imageFields
                  }
                }
              }
              ... on HobbyRecord {
                id
                title
                callout
                description
                images {
                  alt
                  id
                  responsiveImage(
                    imgixParams: { fit: crop, ar: "4:3", w: 1000 }
                  ) {
                    ...imageFields
                  }
                }
                sliceType {
                  name
                }
              }
              ... on WorkRecord {
                id
                title
                description
                callout
                sliceType {
                  id
                  name
                }
              }
              ... on DesignRecord {
                id
                title
                description
                callout
                sliceType {
                  id
                  name
                }
              }
            }
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

    return toHead(this.about.seo, this.site.favicon)
  }
}
</script>

<style></style>
