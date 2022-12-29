import DefaultTheme from 'vitepress/theme'
import "/scss/theme.scss";

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    // extend default theme custom behaviour.
    DefaultTheme.enhanceApp(ctx)

    // register your custom global components
    // ctx.app.component('MyGlobalComponent' /* ... */)
  }
}