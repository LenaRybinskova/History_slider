// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
//
// module.exports = {
//     entry: './src/index.tsx',
//     mode: 'development',
//     module: {
//         rules: [
//             {
//                 test: /\.tsx?$/,
//                 use: {
//                     loader: 'ts-loader',
//                     options: {
//                         transpileOnly: true, // Важная опция для избежания ошибок
//                     }
//                 },
//                 exclude: /node_modules/,
//             },
//             {
//                 test: /\.css$/i,
//                 use: ['style-loader', 'css-loader'],
//             },
//         ],
//     },
//     resolve: {
//         extensions: ['.tsx', '.ts', '.js'],
//     },
//     output: {
//         filename: 'bundle.js',
//         path: path.resolve(__dirname, 'dist'),
//         publicPath: '/',
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, 'public', 'index.html'),
//         }),
//     ],
//     devServer: {
//         static: {
//             directory: path.join(__dirname, 'dist'),
//         },
//         port: 3000,
//         hot: true,
//         open: true,
//     },
// };

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|ico|png|jpg|jpeg|gif|svg)$/i,
                type: 'asset/resource',
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 3000,
        hot: true,
        open: true,
        historyApiFallback: true,
    },
    devtool: 'eval-source-map',
};
