const base = require('./webpack.config.base.js');
const {merge} = require('webpack-merge');
const webpack = require('webpack');
const config = require("config");
const HOST = process.env.HOST;
const PORT = process.env.PORT && Number(process.env.PORT);

console.log(config,'config');
module.exports = merge(base, {
    mode: 'development',
    devServer: {
        clientLogLevel: "info",
        // historyApiFallback: {
        //   rewrites: [
        //     { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
        //   ],
        // },
        historyApiFallback: true,
        hot: true,
        // contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST || config.dev.host,
        // port: '0.0.0.0',
        port: PORT || config.dev.port,
        //open: config.dev.autoOpenBrowser,
        // overlay: config.dev.errorOverlay
        //     ? { warnings: false, errors: true }
        //     : false,
        //publicPath: config.dev.assetsPublicPath,
        //proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        // watchOptions: {
        //     poll: config.dev.poll,
        // },
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers":
                "X-Requested-With, content-type, Authorization",
        },
    },
    // devServer: {
    //     port: 8089,
    //     host: '127.0.0.1',
    //     publicPath: '/',
    //     open: true,
    //     hot: true,
    //     overlay: {erros: true}
    // },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
})