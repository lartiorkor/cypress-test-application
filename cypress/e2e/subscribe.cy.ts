import { getDomainLocale } from "next/dist/shared/lib/router/router"

describe('Newsletter Subscribe Form', () => {
    beforeEach(() => {
     cy.visit("http://localhost:3000")
    })

    it('allows users to subscribe to the email list', () => {
        cy.getByData('email-input').type('me@mail.com')
        cy.getByData('submit-button').click()
        cy.getByData('success-message').should('exist').contains('me@mail.com')
    })

    it('does NOT allow an invalid email address', () => {
        cy.getByData('email-input').type('memail')
        cy.getByData('submit-button').click()
        cy.getByData('success-message').should('not.exist')
    })

    it('checks already existing email address', () => {
        cy.getByData('email-input').type('john@example.com')
        cy.getByData('submit-button').click()
        cy.getByData('server-error-message').should('exist').contains('already exists. Please use a different email address.')
    })
})