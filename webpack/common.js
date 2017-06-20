const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    loaders: {
        babel: {
            test: /\.jsx?$/,
            include: /src(\/|\\)js/,
            exclude: /node_modules/,
            loader: 'babel-loader', // the babel loader tells webpack to compile JS/JSX files using Babel
            query: {
                 // after initial load, subsequent builds draw from a cache (in dev only) to reduce build time
                cacheDirectory: path.resolve(__dirname, '../cache/'),
                compact: true
            }
        },
        style: {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: ['./src/_scss']
                        }
                    }
                ]
            })
        },
        files: {
            include: /src(\/|\\)(fonts|graphics|img)/,
            loader: 'file-loader',
            query: {
                name: '[path][name].[ext]'
            }
        }
    },
    commonConfig: {
        context: path.resolve(__dirname, '../src'),
        entry: {
            vendor: ['react', 'react-dom', 'redux', 'lodash', 'jquery', 'moment', 'axios', 'svg4everybody', 'babel-polyfill', 'commonmark', 'mapbox-gl/dist/mapbox-gl'],
            app: './entry.js'
        },
        output: {
            path: path.resolve(__dirname, '../public'),
            publicPath: '',
            filename: 'js/[name].[chunkhash].js',
            chunkFilename: 'js/bundle.[chunkhash].js'
        },
        resolve: {
            extensions: ['.js', '.jsx'],
            modules: [
                path.resolve(__dirname, '../src/js'),
                path.resolve(__dirname, '../node_modules')
            ]
        },
        module: {
            noParse: /node_modules\/mapbox-gl\/dist\/mapbox-gl.js/
        },
        plugins: [
            new CleanWebpackPlugin(['public', 'cache'], {
                root: path.resolve(__dirname, '../')
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: (module) => {
                    if (module.resource && (/^.*\.(css|scss)$/).test(module.resource)) {
                        return false;
                    }
                    return module.context && module.context.indexOf('node_modules') !== -1;
                }
            }),
            new ExtractTextPlugin({
                filename: 'css/style.[hash].css',
                allChunks: true
            }),
            new HtmlWebpackPlugin({ // copy the index.html file out of /src into /public and update with the current JS files
                inject: false,
                template: path.resolve(__dirname, '../src/index.html'),
                filename: 'index.html'
            })
        ]
    }
};
