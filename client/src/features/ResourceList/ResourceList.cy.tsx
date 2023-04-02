import React from 'react';
import ResourceList from './ResourceList';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import '../../style.css';

describe('<ResourceList />', () => {
    beforeEach(() => {
        cy.viewport(600, 1000);
        cy.mount(
            <Provider store={store}>
                <ResourceList filter="all" />
            </Provider>,
        );
        cy.wait(100);
    });

    it('Mounts and Renders', () => {
        cy.get('[data-cy]').should('have.length.above', 0);
    });
});
