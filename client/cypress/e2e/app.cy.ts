describe('App', () => {
    it('Renders', () => {
        cy.visit('http://localhost:3000');

        cy.get('button.bg-green-600').first().click();

        cy.get('input.nodrag').type('Hello World');
    });
});
