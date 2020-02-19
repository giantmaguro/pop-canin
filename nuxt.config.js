const webpack = require('webpack')
const config = require('./wconfig.json')

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: { lang: 'th' },
    title: 'Cat & Dog First Academy',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Cat & Dog First ทุกอย่างเริ่มต้นจากแมวและสุนัข' },
      { hid: 'og:url', property:'og:url', content: config.baseURL },
      { hid: 'og:type', property:'og:type', content:'article' },
      { hid: 'og:title', property:'og:title', content:'Cat & Dog First Academy' },
      { hid: 'og:description', property:'og:description', content:'Cat & Dog First ทุกอย่างเริ่มต้นจากแมวและสุนัข' },
      { hid: 'og:image', property:'og:image', content: config.baseURL + 'images/facebook/default-share.jpg' },
      { hid: 'fb:app_id', property:'fb:app_id', content: config.facebook.APP_ID },
      { hid: 'fb:pages', property:'fb:pages', content: config.facebook.PAGE_ID },
      { hid: 'fb:article_style', property:'fb:article_style', content: "default" },
      { name: 'theme-color', property:'theme-color', content: "#e92026" }

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/images/rc-vet-favicon.png' },
      { rel: 'manifest',  href: '/manifest.json' },
      {
        rel: 'preload',
        href: '/fonts/fonts/DB-HeaventRoundedv320.woff2',
        as: 'font',
        type: 'font/woff2'
      },
      { rel: 'stylesheet',  href: '/vendor/bootstrap/bootstrap-reboot.min.css' },
      { rel: 'stylesheet',  href: '/vendor/bootstrap/bootstrap-grid.min.css' },
      { rel: 'stylesheet',  href: '/vendor/bootstrap/bootstrap.min.css' }
    ],
    script: []
  },
  /*
  ** CSS
  **/
  css: [
    // 'bootstrap/dist/css/bootstrap-reboot.min.css',
    // 'bootstrap/dist/css/bootstrap-grid.min.css',
    // 'bootstrap/dist/css/bootstrap.min.css'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#e92026' },
  modules: [
    // ['@nuxtjs/google-tag-manager', { id: 'GTM-NMBVRH3', pageTracking: true }],
    // ['@nuxtjs/google-tag-manager', {
    //   id: 'GTM-NCWZQ3',
    //   layer: 'dataLayer',
    //   pageTracking: true,
    //   dev: true, // set to false to disable in dev mode
    // }],
    //'bootstrap-vue/nuxt'

    ['~static/vendor/google-tag-manager', { id: 'GTM-NMBVRH3', pageTracking: true }],
    ['~static/vendor/google-tag-manager', {
      id: 'GTM-NCWZQ3',
      layer: 'dataLayer',
      pageTracking: true,
      dev: true, // set to false to disable in dev mode
    }],
  ],
  plugins: [
    { src: '~plugins/axios.js', ssr: true },
    { src: '~plugins/vuejs-paginate', ssr: false },
    { src: '~plugins/vue-quill-editor', ssr: false },
    { src: '~plugins/vuedraggable', ssr: false }

  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    splitChunks: {
      layouts: true
    },
    extend (config, { isDev }) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        '_': 'lodash',
        'moment': 'moment'
      })
    ],

  },
  resolve: {
    alias: {
      '@fortawesome/fontawesome-free-solid$': '@fortawesome/fontawesome-free-solid/shakable.es.js',
      '@fortawesome/fontawesome-free-brands$': '@fortawesome/fontawesome-free-brands/shakable.es.js',
      '@fortawesome/fontawesome-free-regular$': '@fortawesome/fontawesome-free-regular/shakable.es.js'
    }
  }
}
