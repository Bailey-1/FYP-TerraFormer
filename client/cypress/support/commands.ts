Cypress.Commands.add('drag', (selector, { x, y }) =>
    cy.window().then((window) => {
        const elementToDrag = cy.get(selector as string);
        return elementToDrag.then(($el) => {
            const { left, top, width, height } = $el[0].getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            const nextX: number = centerX + x;
            const nextY: number = centerY + y;

            return elementToDrag
                .trigger('mousedown', { view: window })
                .trigger('mousemove', nextX, nextY, { force: true })
                .wait(50)
                .trigger('mouseup', { view: window, force: true });
        });
    }),
);
