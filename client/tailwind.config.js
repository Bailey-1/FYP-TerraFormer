/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                // 'terraform-purple': '#844fba',
                'terraform-purple': {
                    default: 'hsl(270, 44%, 52%)',
                    400: 'hsl(270 44% 52% / 40%)',
                    500: 'hsl(270 44% 52%)',
                    600: 'hsl(270 44% 52% / 110%)',
                },
                'azure-blue': 'hsl(206 100% 42% / 90%)',
                'aws-yellow': 'hsl(31 83% 55% / 90%)',
                'gcp-red': 'hsl(5 76% 55% / 90%)',
                // 'aws-orange': 'hsl(27 87% 50% / 100%)',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
    // important: true,
};
