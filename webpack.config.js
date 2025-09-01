const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    const isDevelopment = !isProduction;


    const repo = 'History_slider';
    const publicPath = isProduction ? `/${repo}/` : '/';

    return {
        entry: './src/index.tsx',
        mode: isProduction ? 'production' : 'development',
        module: {
            rules: [
                {
                    test: /\.(ts|tsx|js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                                '@babel/preset-typescript'
                            ],
                        },
                    }
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf|ico|png|jpg|jpeg|gif|svg)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'assets/[hash][ext][query]'
                    }
                }
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', '.jsx'],
            plugins: [
                new TsconfigPathsPlugin()
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
            filename: isProduction ? 'static/js/[name].[contenthash:8].js' : 'static/js/[name].js',
            path: path.resolve(__dirname, 'dist'),
            publicPath: publicPath,
            clean: true,
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'public', 'index.html'),
                minify: isProduction ? {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    keepClosingSlash: true,
                    minifyJS: true,
                    minifyCSS: true,
                    minifyURLs: true,
                } : false,
            }),
            new DefinePlugin({
                'process.env.PUBLIC_URL': JSON.stringify(publicPath),
                'process.env.NODE_ENV': JSON.stringify(isProduction ? 'production' : 'development'),
            }),
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, 'public'),
            },
            port: 3000,
            hot: true,
            open: true,
            historyApiFallback: {
                index: publicPath,
            },
        },
        devtool: isProduction ? 'source-map' : 'eval-source-map',
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all',
                    },
                },
            },
        },
    };
};