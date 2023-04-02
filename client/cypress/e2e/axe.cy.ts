/// <reference types="cypress" />
/// <reference types="cypress-axe" />

describe('Axe', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.wait(1000); // Ensure react flow instance loads before
        cy.injectAxe();
    });

    // Define at the top of the spec file or just import it
    function terminalLog(violations) {
        cy.task(
            'log',
            `${violations.length} accessibility violation${
                violations.length === 1 ? '' : 's'
            } ${violations.length === 1 ? 'was' : 'were'} detected`,
        );
        // pluck specific keys to keep the table readable
        const violationData = violations.map(
            ({ id, impact, description, nodes }) => ({
                id,
                impact,
                description,
                nodes: nodes.length,
            }),
        );

        cy.task('table', violationData);
    }

    // Then in your test...
    it('Initial load', () => {
        cy.checkA11y(null, null, terminalLog);
    });

    it('Initial resource', () => {
        cy.get('[data-cy="add-azurerm_resource_group"]').click();

        cy.checkA11y(null, null, terminalLog);
    });
});
