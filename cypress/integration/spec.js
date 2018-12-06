/// <reference types="cypress" />

describe('cypress-xpath', () => {
  it('adds xpath command', () => {
    expect(cy).property('xpath').to.be.a('function')
  })

  context('elements', () => {
    beforeEach(() => {
      cy.visit('cypress/integration/index.html')
    })

    it('finds h1', () => {
      cy.xpath('//h1').should('have.length', 1)
    })

    it('returns jQuery wrapped elements', () => {
      cy.xpath('//h1').then((el$) => {
        expect(el$).to.have.property('jquery')
      })
    })

    it('gets h1 text', () => {
      cy.xpath('//h1/text()').its('0.textContent').should('equal', 'cypress-xpath')
    })

    describe('primitives', () => {
      it('counts h1 elements', () => {
        cy.xpath('count(//h1)').should('equal', 1)
      })

      it('returns h1 text content', () => {
        cy.xpath('string(//h1)').should('equal', 'cypress-xpath')
      })

      it('returns boolean', () => {
        cy.xpath('boolean(//h1)').should('be.true')
        cy.xpath('boolean(//h2)').should('be.false')
      })
    })
  })
})
