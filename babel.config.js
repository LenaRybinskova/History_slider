module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    browsers: ['> 1%', 'last 2 versions']
                },
                useBuiltIns: 'entry',
                corejs: 3
            }
        ],
        [
            '@babel/preset-react',
            {
                runtime: 'automatic'
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        [
            'babel-plugin-styled-components',
            {
                displayName: true,
                fileName: false,
                ssr: false,
                pure: true
            }
        ]
    ]
};