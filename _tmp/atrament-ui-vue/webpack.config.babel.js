import path from 'path';
import webpack from 'webpack'; // eslint-disable-line import/no-extraneous-dependencies
import HtmlWebpackPlugin from 'html-webpack-plugin'; // eslint-disable-line import/no-extraneous-dependencies
import ExtractTextPlugin from 'extract-text-webpack-plugin'; // eslint-disable-line import/no-extraneous-dependencies

export default (env = {production: false}) => {
    const webpackPlugins = (() => {
        const wpPlugins = [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                inject: 'body'
            }),
            new ExtractTextPlugin('styles.css'),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                filename: 'vendor.js',
                minChunks: (module) =>
                    module.resource &&
                        module.resource.indexOf('.js') !== -1 &&
                        module.resource.indexOf(path.join(__dirname, 'node_modules')) !== -1
            })
        ];
        if (env.production) {
            wpPlugins.push(new webpack.optimize.UglifyJsPlugin({
                mangle: {
                    except: ['Container']
                }
            }));
            wpPlugins.push(new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            }));
        }
        return wpPlugins;
    })();

    return {
        devtool: 'sourcemap',
        entry: {
            app: ['./src/index.js']
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            publicPath: '/',
            filename: 'bundle.js'
        },
        module: {
            loaders: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.css/,
                    loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/,
                    loader: 'file-loader'
                },
                {
                    test: /\.html$/,
                    loader: 'raw-loader'
                }
            ]
        },
        plugins: webpackPlugins,
        devServer: {
            contentBase: './src/assets',
            stats: 'minimal'
        }
    };
};
