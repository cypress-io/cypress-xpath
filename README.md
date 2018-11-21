# cypress-xpath [![CircleCI](https://circleci.com/gh/cypress-io/cypress-xpath.svg?style=svg&circle-token=c1c1eb7da56fcc8a49b96e7155161728987f9878)](https://circleci.com/gh/cypress-io/cypress-xpath) [![renovate-app badge][renovate-badge]][renovate-app]

> Adds XPath command to Cypress test runner

## Install

```shell
npm install -D cypress-xpath
```

Then include in your project's `cypress/support/index.js`

```js
require('cypress-xpath')
```

## Use

After installation your `cy` object will have `xpath` command.

```js
it('finds list items', () => {
  cy.xpath('//ul[@class="todo-list"]//li')
    .should('have.length', 3)
})
```

See [cypress/integration/spec.js](cypress/integration/spec.js)

## License

This project is licensed under the terms of the [MIT license](/LICENSE.md).

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
