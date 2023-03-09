describe('App', () => {
    before(() => {
        cy.visit('http://localhost:3000');
    });

    it('Renders', () => {
        cy.get('button.bg-green-600').first().click();

        cy.wait(2000);

        cy.get('input.nodrag').type('Hello World', { scrollBehavior: false });
        // cy.get('input.nodrag').type('hello world');
    });
});
