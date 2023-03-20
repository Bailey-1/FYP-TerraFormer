import '@4tw/cypress-drag-drop';
import * as spok from 'cy-spok';

describe('App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
        cy.wait(100); // Ensure react flow instance loads before
    });

    it('Add resource - Button', () => {
        cy.get('[data-cy="add-azurerm_resource_group"]').click();

        cy.window()
            .its('store')
            .invoke('getState')
            .should(
                spok({
                    flow: {
                        nodes: [
                            {
                                type: 'resourceNode',
                                data: {
                                    resourceState: {
                                        type: 'azurerm_resource_group',
                                    },
                                },
                            },
                        ],
                    },
                }),
            );
    });

    it('Add resource - Drag and Drop', () => {
        const dataTransfer = new DataTransfer();

        cy.get('[data-cy="draggable-azurerm_resource_group"]').trigger(
            'dragstart',
            { dataTransfer, force: true },
        );

        cy.get('.react-flow')
            .trigger('dragenter', { force: true })
            .trigger('dragover', { force: true, dataTransfer })
            .trigger('drop', { force: true, dataTransfer })
            .wait(50)
            .trigger('dragend', { force: true });

        cy.window()
            .its('store')
            .invoke('getState')
            .should(
                spok({
                    flow: {
                        nodes: [
                            {
                                type: 'resourceNode',
                                data: {
                                    resourceState: {
                                        type: 'azurerm_resource_group',
                                    },
                                },
                            },
                        ],
                    },
                }),
            );
    });

    it('Add block - Button', () => {
        cy.get(
            '[data-cy="addBlock-azurerm_container_registry-georeplications"]',
        ).click();

        cy.window()
            .its('store')
            .invoke('getState')
            .should(
                spok({
                    flow: {
                        nodes: [
                            {
                                type: 'blockNode',
                                data: {
                                    resourceState: {
                                        type: 'georeplications',
                                    },
                                },
                            },
                        ],
                    },
                }),
            );
    });

    it('Add block - Drag and Drop', () => {
        const dataTransfer = new DataTransfer();

        cy.get(
            '[data-cy="draggable-azurerm_container_registry-georeplications"]',
        ).trigger('dragstart', { dataTransfer, force: true });

        cy.get('.react-flow')
            .trigger('dragenter', { force: true })
            .trigger('dragover', { force: true, dataTransfer })
            .trigger('drop', { force: true, dataTransfer })
            .wait(50)
            .trigger('dragend', { force: true });

        cy.window()
            .its('store')
            .invoke('getState')
            .should(
                spok({
                    flow: {
                        nodes: [
                            {
                                type: 'blockNode',
                                data: {
                                    resourceState: {
                                        type: 'georeplications',
                                    },
                                },
                            },
                        ],
                    },
                }),
            );
    });

    it('Input accepts text', () => {
        cy.get('[data-cy="add-azurerm_resource_group"]').click();

        cy.get('input.nodrag').type('hello world', { scrollBehavior: false });
    });

    it('Close deletes the node', () => {
        cy.get('[data-cy="add-azurerm_resource_group"]').click();

        cy.get('svg.text-red-700').click({ scrollBehavior: false });
    });

    it('Add all resources - Button', () => {
        cy.get('[data-cy-type="primaryResourceAddButton"]').each((x) => {
            cy.wrap(x).click();

            cy.window()
                .its('store')
                .invoke('getState')
                .its('flow.nodes')
                .should('have.length', 1);

            cy.get('svg.text-red-700').click({ scrollBehavior: false });

            cy.window()
                .its('store')
                .invoke('getState')
                .its('flow.nodes')
                .should('have.length', 0);
        });
    });

    it('Add all blocks - Button', () => {
        cy.get('[data-cy-type="blockAddButton"]').each((x, i) => {
            cy.wrap(x).click();

            if (i === 0) {
                cy.get('.react-flow__pane').trigger('wheel', 'topLeft', {
                    deltaY: 200,
                });

                cy.wait(50);
            }

            cy.window()
                .its('store')
                .invoke('getState')
                .its('flow.nodes')
                .should('have.length', 1);

            cy.get('svg.text-red-700').click({ scrollBehavior: false });

            cy.window()
                .its('store')
                .invoke('getState')
                .its('flow.nodes')
                .should('have.length', 0);
        });
    });

    it('Drag the pane', () => {
        const styleBeforeDrag = Cypress.$('.react-flow__viewport').css(
            'transform',
        );

        cy.window().then((win) => {
            cy.get('.react-flow__pane')
                .trigger('mousedown', 'topLeft', { button: 0, view: win })
                .trigger('mousemove', 'bottomLeft', { force: true })
                .wait(50)
                .trigger('mouseup', { force: true, view: win })
                .then(() => {
                    const styleAfterDrag = Cypress.$(
                        '.react-flow__viewport',
                    ).css('transform');
                    expect(styleBeforeDrag).to.not.equal(styleAfterDrag);
                });
        });
    });

    it('Connecting block to a resource works', () => {
        cy.get('[data-cy="add-azurerm_container_registry"]').click();

        cy.get('.react-flow__pane').trigger('wheel', 'topLeft', {
            deltaY: 200,
        });

        cy.get('button')
            .contains('Additional Keys')
            .click({ scrollBehavior: false, force: true });

        cy.get('button')
            .contains('Tags')
            .click({ scrollBehavior: false, force: true });

        cy.wait(50);

        // const styleBeforeDrag = Cypress.$('.react-flow__node:first').css(
        //     'transform',
        // );
        // cy.get('.react-flow__renderer')
        //     .drag('.react-flow__node:first', {
        //         x: 500,
        //         y: 25,
        //     })
        //     .then(($el: any) => {
        //         const styleAfterDrag = Cypress.$('.react-flow__node:first').css(
        //             'transform',
        //         );
        //         expect(styleBeforeDrag).to.not.equal(styleAfterDrag);
        //     });

        const dataTransfer = new DataTransfer();

        cy.get('[data-cy="draggable-azurerm_container_registry-tags"]').trigger(
            'dragstart',
            { dataTransfer, force: true },
        );

        cy.get('.react-flow')
            .trigger('dragenter', { force: true })
            .trigger('dragover', { force: true, dataTransfer })
            .trigger('drop', { force: true, dataTransfer })
            .wait(50)
            .trigger('dragend', { force: true });

        cy.get('[data-cy="source-handle-tags"]').trigger('mousedown', {
            force: true,
            button: 0,
        });

        cy.get('[data-cy="target-handle-tags"]')
            .trigger('mousemove', { force: true, button: 0 })
            .wait(200)
            .trigger('mouseup', { force: true, button: 0 });

        cy.get('.react-flow__edge').should('have.length', 1);

        cy.window()
            .its('store')
            .invoke('getState')
            .should(
                spok({
                    flow: {
                        edges: [
                            {
                                sourceHandle: 'tags',
                            },
                        ],
                    },
                }),
            );
    });
});
