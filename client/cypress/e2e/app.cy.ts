describe('App', () => {
    before(() => {
        cy.visit('http://localhost:3000');
    });

    it('Renders', () => {
        cy.get('button.bg-green-600').first().click();

        // cy.get('input.nodrag').type('hello world', {
        //     scrollBehavior: false,
        // });
        //
        // cy.get('select').select('Brazil South', {
        //     scrollBehavior: false,
        // });
        //
        // cy.get('select').select('Korea Central', {
        //     scrollBehavior: false,
        // });
        //
        // cy.get('select').scrollIntoView();

        cy.get('input.nodrag').type('hello world');
        cy.get('input.nodrag').scrollIntoView();

        // cy.get('button.bg-green-600').eq(1).click();
        //
        // cy.get('input.nodrag').eq(1).type('Hello World', {
        //     scrollBehavior: false,
        // });
    });
});
