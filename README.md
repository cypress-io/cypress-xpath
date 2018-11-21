# cypress-xpath [![renovate-app badge][renovate-badge]][renovate-app]

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

## License

This project is licensed under the terms of the [MIT license](/LICENSE.md).

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
