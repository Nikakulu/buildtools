module.exports = {
    filesToCopy: [
        // {
        //     input: '.editorconfig',
        //     output: '.editorconfig'
        // },
        // {
        //     input: '.jshintrc',
        //     output: '.jshintrc'
        // },
        {
            input: 'vue/assets/imgs/logo.png',
            output: 'src/assets/imgs/logo.png'
        },
        {
            input: 'vue/assets/imgs/favicon.ico',
            output: 'public/favicon.ico'
        },
        // {
        //     input: '.eslintrc.js',
        //     output: '.eslintrc.js'
        // },
        // {
        //     input: 'jest.config.js',
        //     output: 'jest.config.js'
        // },
        // {
        //     input: 'vue/webpack.config.js',
        //     output: 'webpack.config.js'
        // }
    ],
    filesToRender: [
        {
            input: 'vue/README.md',
            output: 'README.md'
        },
        {
            input: 'vue/_package.json',
            output: 'package.json'
        },
        {
            input: 'vue/main.js',
            output: 'src/index.js'
        },
        {
            input: 'vue/index.html',
            output: 'index.html'
        },
        {
            input: 'vue/app.vue',
            output: 'src/app.vue'
        },
        {
            input: 'vue/components/HelloWorld.vue',
            output: 'src/components/HelloWorld.vue'
        }
    ]
};