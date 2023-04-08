import '@4tw/cypress-drag-drop';

describe('Nodes', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.wait(1000); // Ensure react flow instance loads before
    });

    it('Input accepts text', () => {
        cy.get('[data-cy="add-azurerm_resource_group"]').click();

        cy.get('input.nodrag').type('hello world');

        cy.wait(100);

        cy.get('input.nodrag').clear();
        cy.get('input.nodrag').type('hello world');
        cy.get('input.nodrag').clear();
        cy.get('input.nodrag').type('hello world');
        cy.get('input.nodrag').clear();
        cy.get('input.nodrag').type('hello world');
        cy.get('input.nodrag').clear();
        cy.get('input.nodrag').type('hello world');
    });
});
