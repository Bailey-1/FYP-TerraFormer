/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'terraform-purple': '#844fba',
                'azure-blue': '#0078d4',
                'aws-orange': '#ec7211',
                'aws-yellow': '#ec912d',
                'gcp-red': '#e34133',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
    // important: true,
};
