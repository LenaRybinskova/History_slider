/*
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
*/

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin'); // Добавьте эту строку

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
        plugins: [
            new TsconfigPathsPlugin() // Используйте плагин здесь
        ],
        alias: {
            styles: path.resolve(__dirname, 'src/app/styles'),
            components: path.resolve(__dirname, 'src/app/components'),
            common: path.resolve(__dirname, 'src/common'),
            features: path.resolve(__dirname, 'src/features'),
            utils: path.resolve(__dirname, 'src/utils'),
            hooks: path.resolve(__dirname, 'src/hooks'),
            types: path.resolve(__dirname, 'src/types'),
            api: path.resolve(__dirname, 'src/api'),
        },
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
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