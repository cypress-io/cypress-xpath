/// <reference types="cypress" />

/**
 * Adds XPath support to Cypress using a custom command.
 *
 * @see https://devhints.io/xpath
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_using_XPath_in_JavaScript
 * @example
 ```js
 it('finds list items', () => {
    cy.xpath('//ul[@class="todo-list"]//li')
      .should('have.length', 3)
  })
 ```
 */
const xpath = (selector) => {
  /* global XPathResult */
  const isNumber = (xpathResult) => xpathResult.resultType === XPathResult.NUMBER_TYPE
  const numberResult = (xpathResult) => xpathResult.numberValue

  const isString = (xpathResult) => xpathResult.resultType === XPathResult.STRING_TYPE
  const stringResult = (xpathResult) => xpathResult.stringValue

  const isBoolean = (xpathResult) => xpathResult.resultType === XPathResult.BOOLEAN_TYPE
  const booleanResult = (xpathResult) => xpathResult.booleanValue

  Cypress.log({
    name: 'xpath',
    message: selector,
    consoleProps () {
      return {
        'XPath': selector,
      }
    },
  })

  let nodes = []
  const document = cy.state('window').document
  let iterator = document.evaluate(selector, document)

  if (isNumber(iterator)) {
    return numberResult(iterator)
  }

  if (isString(iterator)) {
    return stringResult(iterator)
  }

  if (isBoolean(iterator)) {
    return booleanResult(iterator)
  }

  try {
    let node = iterator.iterateNext()

    while (node) {
      nodes.push(node)
      node = iterator.iterateNext()
    }
  } catch (e) {
    console.error('Document tree modified during iteration', e)

    return null
  }

  // TODO set found elements on the command log?

  return Cypress.$(nodes)
}

Cypress.Commands.add('xpath', xpath)
