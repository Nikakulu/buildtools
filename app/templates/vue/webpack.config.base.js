const path = require('path')
const {VueLoaderPlugin} = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json','.ts'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': path.join(__dirname, '..', 'src')
        }
    },
    // mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader',
            }, {
                test: /\.(png|jpeg|gif|jpg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,  //这里的单位是b
                            esModule: false,
                            name: 'images/[name][hash].[ext]' //打包后输出路径

                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use: 'file-loader',
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
                // exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: require.resolve('jquery'),
                loader: 'expose-loader',
                options: {
                    exposes: ['$', 'jQuery'],
                },
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',//相对于根目录
            filename: 'index.html',//相对于output的路径
            inject: true,
            minify: {
                removeComments: true//删除注释
            }
        }),
        new webpack.DefinePlugin({
            "process.env.BASE_URL": JSON.stringify(process.env.BASE_URL)
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../dist/dll/vendor.manifest.json')
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('../dist/dll/polyfill.manifest.json')
        }),

    ]


};