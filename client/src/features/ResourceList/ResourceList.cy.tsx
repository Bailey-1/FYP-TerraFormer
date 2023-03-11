import React from 'react';
import ResourceList from './ResourceList';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import '../../style.css';
import spok from 'cy-spok';

describe('<ResourceList />', () => {
    it('Mounts and Renders', () => {
        cy.viewport(600, 1000);
        cy.mount(
            <Provider store={store}>
                <ResourceList filter="all" />
            </Provider>,
        );
    });
});

describe('Redux <ResourceList />', () => {
    it('Mounts and Renders', () => {
        cy.viewport(600, 1000);
        cy.mount(
            <Provider store={store}>
                <ResourceList filter="all" />
            </Provider>,
        );

        cy.window()
            .its('store')
            .invoke('getState')
            .should(
                spok({
                    flow: {
                        nodes: [
                            {
                                type: 'resourceNode',
                            },
                        ],
                    },
                }),
            );
    });
});
