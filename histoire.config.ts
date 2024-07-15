import { defineConfig } from 'histoire'
import { HstVue } from '@histoire/plugin-vue'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from './tailwind.config.js'

const fullConfig = resolveConfig(tailwindConfig)

export default defineConfig({
  setupFile: './histoire.setup.ts',
  plugins: [HstVue()],
  theme: {
    title: 'Melon UI',
    defaultColorScheme: 'light',
    hideColorSchemeSwitch: true,
    favicon: 'pimelon-ui-square.png',
    logo: {
      square: './pimelon-ui-square.png',
      light: './pimelon-ui.png',
      dark: './pimelon-ui.png',
    },
    colors: {
      gray: fullConfig.theme.colors.gray,
      primary: fullConfig.theme.colors.gray,
    },
  },
  tree: {
    order(a, b) {
      let maintainOrder = [
        'Introduction',
        'Getting Started',
        'Resource',
        'List Resource',
        'Document Resource',
        'Utilities',
        'Directives',
      ]
      let aIndex = maintainOrder.indexOf(a)
      let bIndex = maintainOrder.indexOf(b)
      if (aIndex > -1 && bIndex > -1) {
        return aIndex - bIndex
      } else if (aIndex > -1) {
        return -1
      } else if (bIndex > -1) {
        return 1
      } else {
        return a.localeCompare(b)
      }
    },
    groups: [
      {
        id: 'top',
        title: '',
        include: (file) => {
          return (
            file.path.includes('docs/') &&
            !file.path.includes('docs/resources/') &&
            !file.path.includes('docs/other/')
          )
        },
      },
      {
        id: 'resources',
        title: 'Data Fetching',
        include: (file) => {
          return file.path.includes('docs/resources/')
        },
      },
      {
        id: 'components',
        title: 'Components',
        include: (file) => {
          return !file.path.includes('docs/')
        },
      },
      {
        id: 'other',
        title: 'Other',
        include: (file) => true,
      },
    ],
  },
})
