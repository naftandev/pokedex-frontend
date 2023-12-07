import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents(/* on, config */) {}
  },
  reporter: 'mochawesome',
  reporterOptions: {
    charts: true,
    json: true,
    reportDir: 'reports/cypress',
    reportFilename: 'e2e',
    overwrite: false
  }
})
