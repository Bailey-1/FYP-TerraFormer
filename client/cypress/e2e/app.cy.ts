// Cypress.Commands.add(
//     'dragTo',
//     { prevSubject: 'element' },
//     (subject, targetEl) => {
//         cy.wrap(subject).trigger('dragstart');
//         cy.get(targetEl).trigger('drop');
//     },
// );

import '@4tw/cypress-drag-drop';

describe('App', () => {
    before(() => {
        cy.visit('http://localhost:3000');
    });

    it('Renders', () => {
        // cy.get('button.bg-green-600').first().click();

        // cy.get('input.nodrag').type('hello world', { scrollBehavior: false });

        // cy.get('div.bg-azure-blue > h1').move({
        //     deltaX: 100,
        //     deltaY: 100,
        //     scrollBehavior: false,
        // });

        cy.get('aside h3').first().move({
            deltaX: -1000,
            deltaY: 0,
            scrollBehavior: false,
            force: true,
        });
    });
});
