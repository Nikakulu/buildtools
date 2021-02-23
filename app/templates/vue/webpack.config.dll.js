// const path = require("path");
// const webpack = require("webpack");
// const {
//     BundleAnalyzerPlugin
// } = require('webpack-bundle-analyzer')
//
// const vendor = [
//     "react",
//     "react-dom",
//     "react-router-dom",
//     "mobx",
//     "mobx-react",
//     'axios',
//     'fastclick',
// ];
//
// const dllPath = path.join(__dirname, 'dll');
//
// module.exports = {
//     entry: {
//         dll: vendor
//     },
//     output: {
//         path: dllPath,
//         filename: "[name].js",
//         library: "_dll_[name]"
//     },
//     plugins: [
//         new webpack.DllPlugin({
//             name: "_dll_[name]",
//             path: path.join(__dirname, 'dll','manifest.json'),
//         }),
//         new BundleAnalyzerPlugin({
//             analyzerMode: 'static'
//         }),
//     ]
// }
//


const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

// dll文件存放的目录
const dllPath = '../dist/dll'
// const dllPath = path.join(__dirname, './dll');

module.exports = {
    entry: {
        // 需要提取的库文件
        vendor: ['vue'],
        polyfill: ['element-ui']
    },
    output: {
        path: path.join(__dirname, dllPath),
        filename: '[name].dll.js',
        // vendor.dll.js中暴露出的全局变量名
        // 保持与 webpack.DllPlugin 中名称一致
        library: '[name]_[hash]'
    },
    plugins: [
        // 接入 DllPlugin
        new webpack.DllPlugin({
            // 动态链接库的全局变量名称，需要和 output.library 中保持一致
            // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
            name: '[name]_dll_[hash]',
            // 描述动态链接库的 manifest.json 文件输出时的文件名称
            path: path.join(__dirname, '../dist/dll', '[name].manifest.json')
        }),
    ]
    // plugins: [
    //     // 清除之前的dll文件
    //     new CleanWebpackPlugin(['*.*'], {
    //         root: path.join(__dirname, dllPath)
    //     }),
    //     // 设置环境变量
    //     // manifest.json 描述动态链接库包含了哪些内容
    //     new webpack.DllPlugin({
    //         path: path.join(__dirname, dllPath, '[name]-manifest.json'),
    //         // 保持与 output.library 中名称一致
    //         name: '[name]_[hash]',
    //         context: process.cwd()
    //     })
    // ]
}