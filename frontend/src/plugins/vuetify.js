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
        blackWhite: colors.shades.black,
        accent: colors.teal.lighten1, 
        greyVariant: colors.grey.lighten5,
        grey: colors.grey.darken4,
        blue: colors.blue 
      },
      dark: {
        primary: colors.shades.black,
        secondary: colors.grey.darken4,
        blackWhite: colors.grey.lighten3,
        greyVariant: colors.grey.darken3,
        grey: colors.grey.lighten4,
        blue: colors.lightBlue
      },
    },
  },
})