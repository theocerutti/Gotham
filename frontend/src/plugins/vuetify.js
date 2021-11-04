import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      light: {
        primary: colors.grey.lighten1,
        secondary: colors.grey.lighten4,
        accent: colors.shades.black, 
        error: colors.red.accent3,
        success: colors.grey.lighten5,
        info: colors.grey.darken4,
        blueVersion: colors.blue 
      },
      dark: {
        primary: colors.shades.black,
        secondary: colors.grey.darken4,
        accent: colors.grey.lighten3,
        success: colors.grey.darken3,
        info: colors.grey.lighten4,
        blueVersion: colors.lightBlue
      },
    },
  },
})
