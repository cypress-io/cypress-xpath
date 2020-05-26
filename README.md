# cypress-xpath [![CircleCI](https://circleci.com/gh/cypress-io/cypress-xpath.svg?style=svg&circle-token=c1c1eb7da56fcc8a49b96e7155161728987f9878)](https://circleci.com/gh/cypress-io/cypress-xpath) [![renovate-app badge][renovate-badge]][renovate-app]

> Adds XPath command to [Cypress.io](https://www.cypress.io) test runner

## Install with npm

```shell
npm install -D cypress-xpath
```
## Install with Yarn

```shell
yarn add cypress-xpath --dev
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

You can also chain `xpath` off of another command.

```js
it('finds list items', () => {
  cy.xpath('//ul[@class="todo-list"]')
    .xpath('./li')
    .should('have.length', 3)
})
```

As with other cy commands, it is scoped by `cy.within()`.

```js
it('finds list items', () => {
  cy.xpath('//ul[@class="todo-list"]').within(() => {
    cy.xpath('./li')
      .should('have.length', 3)
  });
})
```

**note:** you can test XPath expressions from DevTools console using `$x(...)` function, for example `$x('//div')` to find all divs.

See [cypress/integration/spec.js](cypress/integration/spec.js)

## Beware the XPath // trap

In XPath the expression // means something very specific, and it might not be what you think. Contrary to common belief, // means "anywhere in the document" not "anywhere in the current context". As an example:

```js
cy.xpath('//body')
  .xpath('//script')
```

You might expect this to find all script tags in the body, but actually, it finds all script tags in the entire document, not only those in the body! What you're looking for is the .// expression which means "any descendant of the current node":

```js
cy.xpath('//body')
  .xpath('.//script')
```

The same thing goes for within:

```js
cy.xpath('//body').within(() => {
  cy.xpath('.//script')
})
```

This explanation was shamelessly copied from [teamcapybara/capybara][capybara-xpath-trap].

## Roadmap

- [x] wrap returned DOM nodes in jQuery [#2](https://github.com/cypress-io/cypress-xpath/issues/2)
- [x] retry the assertion that follows [#3](https://github.com/cypress-io/cypress-xpath/issues/3)
- [x] add TypeScript definitions [#4](https://github.com/cypress-io/cypress-xpath/issues/4)
- [ ] search from the previous subject element [#5](https://github.com/cypress-io/cypress-xpath/issues/5)
- [x] log or not, depending on user option [#19](https://github.com/cypress-io/cypress-xpath/issues/19)

## License

This project is licensed under the terms of the [MIT license](/LICENSE.md).

[renovate-badge]: https://img.shields.io/badge/renovate-app-blue.svg
[renovate-app]: https://renovateapp.com/
[capybara-xpath-trap]: https://github.com/teamcapybara/capybara/tree/3.18.0#beware-the-xpath--trap
