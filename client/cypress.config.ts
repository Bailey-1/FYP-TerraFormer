import { defineConfig } from 'cypress';

export default defineConfig({
    component: {
        devServer: {
            framework: 'create-react-app',
            bundler: 'webpack',
        },
    },

    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
            on('task', {
                log(message) {
                    console.log(message);

                    return null;
                },
                table(message) {
                    console.table(message);

                    return null;
                },
            });
        },
        video: false,
        viewportWidth: 1920,
        viewportHeight: 1080,
        // scrollBehavior: false,
        excludeSpecPattern: ['cypress/e2e/**/*.cy.js'],
    },
});
