import React from 'react';
import Notification from './Notification';
import '../../style.css';

describe('<Notification />', () => {
    it('Successfully mounts', () => {
        cy.mount(
            <Notification
                title="This is a title"
                type="success"
                disableHide={true}
            />,
        );
    });

    it('Uses title', () => {
        cy.mount(
            <Notification
                title="This is a title"
                type="success"
                disableHide={true}
            />,
        );

        cy.contains('This is a title');
    });

    it('Can include message', () => {
        cy.mount(
            <Notification
                title="This is a title"
                type="success"
                disableHide={true}
                message="This is a message"
            />,
        );

        cy.contains('This is a title');
        cy.contains('This is a message');
    });

    it('X closes the notification', () => {
        const onClickSpy = cy.spy().as('onClickSpy');
        cy.mount(
            <Notification
                title="This is a title"
                type="success"
                disableHide={true}
                onRemove={onClickSpy}
            />,
        );

        cy.get('button')
            .click()
            .then(() => {
                cy.get('@onClickSpy').should('have.been.called', 1);
                cy.get('[data-cy="notification"]').should('not.exist');
            });
    });

    it('Automatically disappears', () => {
        cy.mount(<Notification title="This is a title" type="success" />);

        cy.get('[data-cy="notification"]').should('not.exist');
    });
});
