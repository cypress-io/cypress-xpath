/// <reference types="cypress" />

describe('cypress-xpath', () => {
  it('adds xpath command', () => {
    expect(cy).property('xpath').to.be.a('function')
  })

  it('finds h1', () => {
    cy.visit('cypress/integration/index.html')
    cy.xpath('//h1').should('have.length', 1)
  })

  it('gets h1 text', () => {
    cy.visit('cypress/integration/index.html')
    cy.xpath('//h1/text()').its('0.textContent').should('equal', 'cypress-xpath')
  })
})
