const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    excludeSpecPattern: '*.html',
    supportFile: 'cypress/support/index.js',
  },
  component: {
    excludeSpecPattern: '*.html',
    supportFile: 'cypress/support/index.js',
  },
});
