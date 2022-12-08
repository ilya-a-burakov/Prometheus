export default {
  outDir: './dist',
  title: 'Prometheus Framework',
  description: 'Doucmentation for Prometheus Framework by OZ DAO',
  
  themeConfig: {
    // Nav bar config
    logo: './assets/logo.svg',
    siteTitle: 'Prometheus Framework',   
    // Links
    nav: [
      { text: 'Introduction',         link: '/docs/' },
      { text: 'Styles',               link: '/docs/styles/' },
      { text: 'Components',           link: '/docs/components/' },
      { text: 'Methods',              link: '/docs/methods' },
    ],

    // Sidebar
    sidebar: {
      // This sidebar gets displayed when user is
      // under `guide` directory.
      '/docs': [
        {
          text: 'Introduction',
          collapsible: true,
          items: [
            { text: 'Getting Started',         link: '/docs/' }
          ]
        },
        {
          text: 'Styles',
          collapsible: true,
          items: [
            { text: 'Basic',        link: '/docs/styles/basic' },
            { text: 'Layout',       link: '/docs/styles/layout' },
            { text: 'Typography',   link: '/docs/styles/typography' },
            { text: 'Responsive',   link: '/docs/styles/responsive' }
          ]
        },
        {
          text: 'Components',
          collapsible: true,
          items: [
            { text: 'Text',         link: '/docs/components/text' },
            { text: 'Link',         link: '/docs/components/link' },
            { text: 'Button',       link: '/docs/components/button' },
            { text: 'Input',        link: '/docs/components/input' },
            { text: 'Carousel',     link: '/docs/components/carousel' }
          ]
        },
        {
          text: 'Methods',
          collapsible: true,
          items: [
            { text: 'Store',        link: '/docs/methods/store' },
            { text: 'Router',       link: '/docs/methods/router' },
            { text: 'Axios',        link: '/docs/methods/axios' }
          ]
        }
      ],
    },

    footer: {
      message: 'Released under the <a href="https://github.com/vuejs/vitepress/blob/main/LICENSE">MIT License</a>.',
      copyright: 'Copyright © 2016-present <a href="https://oz.digital">OZ DAO</a>'
    }

  },
  
}