import React from 'react';
import PillButton from './PillBtn';

describe('<PillButton />', () => {
    it('renders', () => {
        cy.mount(
            <PillButton onClick={() => {}} className="">
                {' '}
            </PillButton>,
        );

        cy.get('button').should('exist');
    });

    it('Text is rendered', () => {
        cy.mount(
            <PillButton onClick={() => {}} className="bg-blue-300">
                Hello World
            </PillButton>,
        );

        cy.get('button').should('have.text', 'Hello World');
    });

    it('On click calls onClick function', () => {
        const onClickSpy = cy.spy().as('onClickSpy');
        cy.mount(
            <PillButton onClick={onClickSpy} className="bg-blue-300">
                Hello World
            </PillButton>,
        );

        cy.get('button')
            .click()
            .then(() => {
                cy.get('@onClickSpy').should('have.been.called', 1);
            });
    });
});
