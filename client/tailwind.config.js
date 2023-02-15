/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                'terraform-purple': '#844fba',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
    // important: true,
};
