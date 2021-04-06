<template>
  <div>
    <div class=" bg-primary h-screen w-full flex align-middle items-center">
      <div class="space-y-4 p-8 sm:p-16 2xl:p-32">
        <p class="font-light text-xl sm:text-2xl">
          {{ header.introduction }}
        </p>
        <h1
          class="text-2xl sm:text-4xl lg:text-6xl font-medium"
          style="line-height: 1.2"
        >
          {{ header.headline }}
        </h1>
        <div>
          &darr;
        </div>
      </div>
    </div>
    <main class="page-index px-8 sm:px-16 2xl:p-32">
      <section class="space-y-16 sm:space-y-0 mb-24 sm:mb-0">
        <article
          v-for="(project, index) in projects"
          v-bind:key="project.slug"
          class="flex lg:h-screen space-y-4 sm:space-y-0"
          :class="
            index % 2 === 0
              ? 'flex-col sm:flex-row'
              : 'flex-col sm:flex-row-reverse'
          "
        >
          <nuxt-link
            class="w-full lg:w-1/2 flex sm:justify-center sm:align-middle sm:items-center"
            :to="`/projects/${project.slug}`"
          >
            <figure>
              <datocms-image :data="project.cover.responsiveImage" />
            </figure>
          </nuxt-link>
          <div
            class="w-full lg:w-1/2 flex justify-center align-middle items-center"
          >
            <div class="object-center sm:w-3/5 space-y-2 flex-col">
              <nuxt-link :to="`/projects/${project.slug}`">
                <small>{{ project.role.company.name }}</small>
                <h2 class="text-xl sm:text-3xl font-semibold">
                  {{ project.name }}
                </h2>
              </nuxt-link>
              <div v-html="project.blurb" />
            </div>
          </div>
        </article>
      </section>
    </main>
    <app-footer :footer="footer"></app-footer>
  </div>
</template>

<script>
import { request, gql, imageFields, seoMetaTagsFields } from '~/lib/datocms'
import { toHead } from 'vue-datocms'
import AppFooter from '~/components/shared/AppFooter'

//import parseISO from 'date-fns/parseISO'

export default {
  components: { AppFooter },
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
            introduction
            headline
            currentRole
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

          projects: allProjects(
            orderBy: year_DESC
            filter: { active: { eq: "true" } }
          ) {
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
        ${imageFields}
        ${seoMetaTagsFields}
      `
    })

    return { ready: !!data, ...data }
  },
  head() {
    if (!this.ready) {
      return
    }

    return toHead(this.header.seo, this.site.favicon)
  }
}
</script>
<style scoped></style>
