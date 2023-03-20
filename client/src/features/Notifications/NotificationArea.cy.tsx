import React from 'react';
import NotificationArea from './NotificationArea';
import { store } from '../../store/store';
import { Provider } from 'react-redux';
import { onCreateNotification } from '../NotificationSlice';
import '../../style.css';

describe('<NotificationArea />', () => {
    it('renders', () => {
        cy.mount(
            <Provider store={store}>
                <NotificationArea />
            </Provider>,
        );
    });

    it('renders multiple notifications', () => {
        store.dispatch(
            onCreateNotification({
                type: 'success',
                title: 'This is a success notification',
            }),
        );

        store.dispatch(
            onCreateNotification({
                type: 'warning',
                title: 'This is a warning notification',
            }),
        );

        store.dispatch(
            onCreateNotification({
                type: 'error',
                title: 'This is a error notification',
            }),
        );

        store.dispatch(
            onCreateNotification({
                type: 'info',
                title: 'This is a info notification',
            }),
        );

        cy.mount(
            <Provider store={store}>
                <NotificationArea />
            </Provider>,
        );

        cy.contains('This is a success notification');
        cy.contains('This is a warning notification');
        cy.contains('This is a error notification');
        cy.contains('This is a info notification');
    });

    // it('renders multiple notifications', () => {
    //     store.dispatch(
    //         onCreateNotification({
    //             type: 'success',
    //             title: 'This is a success notification',
    //         }),
    //     );
    //
    //     cy.mount(
    //         <Provider store={store}>
    //             <NotificationArea />
    //         </Provider>,
    //     );
    //
    //     cy.wrap(store)
    //         .invoke('getState')
    //         .its('notifications')
    //         .should('have.lengthOf', 1);
    //
    //     cy.wrap(store)
    //         .invoke('getState')
    //         .its('notifications')
    //         .should('have.lengthOf', 0);
    // });
});
