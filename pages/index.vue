<template>
  <div>
    <main class="page-index px-8 sm:px-16">
      <div class="max-w-4xl mt-32 mb-8">
        <p class="font-light text-2xl text-primary">
          {{ header.introduction }}
        </p>
        <div
          v-html="header.headline"
          class="text-6xl font-medium leading-tight"
        ></div>
      </div>
      <section>
        <article
          v-for="(project, index) in projects"
          v-bind:key="project.slug"
          class="flex h-screen"
          :class="index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'"
        >
          <nuxt-link
            class="w-1/2 flex justify-center align-middle items-center"
            :to="`/projects/${project.slug}`"
          >
            <figure>
              <datocms-image :data="project.cover.responsiveImage" />
            </figure>
          </nuxt-link>
          <div class="w-1/2 flex justify-center align-middle items-center">
            <div class="object-center w-3/5 space-y-2  flex-col">
              <nuxt-link :to="`/projects/${project.slug}`">
                <small>{{ project.role.company.name }}</small>
                <h2 class="text-3xl font-semibold">
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

    return toHead(this.site.favicon)
  }
}
</script>
<style scoped></style>
