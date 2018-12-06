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

  let nodes = []
  const document = cy.state('window').document
  let iterator = document.evaluate(selector, document)

  if (isNumber(iterator)) {
    const result = numberResult(iterator)
    Cypress.log({
      name: 'xpath',
      message: selector,
      $el: nodes,
      consoleProps () {
        return {
          'XPath': selector,
          type: 'number',
          result
        }
      },
    })
    return result
  }

  if (isString(iterator)) {
    const result = stringResult(iterator)
    Cypress.log({
      name: 'xpath',
      message: selector,
      $el: nodes,
      consoleProps () {
        return {
          'XPath': selector,
          type: 'string',
          result
        }
      },
    })
    return result
  }

  if (isBoolean(iterator)) {
    const result = booleanResult(iterator)
    Cypress.log({
      name: 'xpath',
      message: selector,
      $el: nodes,
      consoleProps () {
        return {
          'XPath': selector,
          type: 'boolean',
          result
        }
      },
    })
    return result
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
  Cypress.log({
    name: 'xpath',
    message: selector,
    $el: nodes,
    consoleProps () {
      return {
        'XPath': selector,
      }
    },
  })

  return Cypress.$(nodes)
}

Cypress.Commands.add('xpath', xpath)
