var Generator = require('yeoman-generator');
var mkdirp = require('mkdirp');
var config = require('./templates/vue/config');
var shell = require('shelljs');
var fs   = require('fs')
var path = require('path')

module.exports = class extends Generator {
    _createDirectors() {
        const destRoot = path.normalize(this.destinationRoot());
        const template = path.normalize(this.sourceRoot());
        var rootPath = path.normalize('/vue/');
        // this.log("templateType", destRoot); // user answer `cool` used
        // this.log("Plugins", template); // user answer `cool` used
        mkdirp(path.normalize(destRoot + '/src'));
        mkdirp(path.normalize(destRoot + '/script'));
        mkdirp(path.normalize(destRoot + '/src/assets'));
        mkdirp(path.normalize(destRoot + '/src/assets/images'));
        mkdirp(path.normalize(destRoot + '/src/assets/images/plumb'));
        mkdirp(path.normalize(destRoot + '/src/assets/images/book'));
        mkdirp(path.normalize(destRoot + '/src/common/lib'));
        mkdirp(path.normalize(destRoot + '/src/common/js'));
        mkdirp(path.normalize(destRoot + '/src/components'));
        mkdirp(path.normalize(destRoot + '/src/components/book'));
        mkdirp(path.normalize(destRoot + '/src/const'));
        mkdirp(path.normalize(destRoot + '/config'));
        mkdirp(path.normalize(destRoot + '/src/common/js'));
        mkdirp(path.normalize(destRoot + '/src/assets/style'));
        this.fs.copy(path.normalize(template + rootPath + 'webpack.config.base.js'), path.normalize(destRoot + '/config/webpack.config.base.js'));
        this.fs.copy(path.normalize(template + rootPath + 'webpack.config.dev.js'), path.normalize(destRoot + '/config/webpack.config.dev.js'));
        this.fs.copy(path.normalize(template + rootPath + 'webpack.config.dll.js'), path.normalize(destRoot + '/config/webpack.config.dll.js'));
        this.fs.copy(path.normalize(template + rootPath + 'webpack.config.pro.js'), path.normalize(destRoot + '/config/webpack.config.pro.js'));
        this.fs.copy(path.normalize(template + rootPath + 'development.json'), path.normalize(destRoot + '/config/development.json'));
        this.fs.copy(path.normalize(template + rootPath + 'production.json'), path.normalize(destRoot + '/config/production.json'));
        this.fs.copy(path.normalize(template + rootPath + 'autoCreat/createComponent.js'), path.normalize(destRoot + '/script/createComponent.js'));
        this.fs.copy(path.normalize(template + rootPath + 'autoCreat/createPage.js'), path.normalize(destRoot + '/script/createPage.js'));
    }

    _installNpm() {
        this.npmInstall();
    }

    _createPrjectFileSystem() {
        var templateContext = {
            appname: this.appname,                          // App Name
            includeSass: this.includeSass,                  // Sass
            includeRouter: this.includeRouter,            // Router
            includeVuex: this.includeVuex,                // Vuex
            includeAxios: this.includeAxios,               // Axios
            includeEcharts: this.includeEcharts,           // Echarts
            includeElementUI: this.includeElementUI,       // ElementUI
            includeLang: this.includeLang,                  // Lang切换语言
            includeJsPlumb: this.includeJsPlumb,            // JSPlumb连线库
            includeBook: this.includeBook,                   // 履职档案
            includeTypeScript: this.includeTypeScript,                   // 履职档案
            includeJquery: this.includeJquery,                   // 履职档案
        };
        const copy = (input, output) => {
            this.fs.copy(this.templatePath(input), this.destinationPath(output));
        };

        const copyTpl = (input, output, data) => {
            this.fs.copyTpl(
                this.templatePath(input),
                this.destinationPath(output),
                data
            );
        };

        // Call Copy Files
        config.filesToCopy.forEach(file => {
            copy(file.input, file.output);
        });

        config.filesToRender.forEach(file => {
            copyTpl(file.input, file.output, templateContext);
        });
    }

    _getPrompts() {
        var prompts = [
            {
                type: "input",
                name: "name",
                message: "输入您的项目名称:",
                default: this.appname // Default to current folder name
            },
            {
                type: "checkbox",
                name: "library",
                message: "Which additional features would you like to include?",
                choices: [
                    {
                        name: 'Router',
                        value: 'includeRouter',
                        checked: false
                    },
                    {
                        name: "Axios",
                        value: "includeAxios",
                        checked: false
                    },
                    {
                        name: 'Vuex',
                        value: 'includeVuex',
                        checked: false
                    },
                    {
                        name: 'TypeScript',
                        value: 'includeTypeScript',
                        checked: false
                    },
                    {
                        name: 'CSS预处理器(Sass,Less)',
                        value: 'includeSass',
                        checked: false
                    },

                ],
            },
            {
                type: 'checkbox',
                name: 'features',
                message: 'Which additional library would you like to include?',
                choices: [{
                    name: 'Lodash',
                    value: 'includeLodash',
                    checked: false
                },
                    {
                        name: 'Jquery',
                        value: 'includeJquery',
                        checked: false
                    },
                    {
                        name: 'Echarts',
                        value: 'includeEcharts',
                        checked: false
                    }
                ]
            },
            {
                type: 'checkbox',
                name: 'common',
                message: 'Which additional common would you like to include?',
                choices: [{
                    name: 'Lang.js(切换语言)',
                    value: 'includeLang',
                    checked: false
                },
                    {
                        name: 'JsPlumb(连线库)',
                        value: 'includeJsPlumb',
                        checked: false
                    },
                    {
                        name: 'Book(履职档案)',
                        value: 'includeBook',
                        checked: false
                    }
                ]
            },
        ]
        return prompts;
    }

    _saveAnswers(answers, callback) {
        this.appname = answers.name; // Name
        //this.appdescription = answers.description; // Description
        //this.appversion = answers.version; // Version

        // Include Libraries
        const Libraries = answers.library;
        const hasLibraries = lib => Libraries && Libraries.includes(lib);
        this.includeVuex = hasLibraries('includeVuex');
        this.includeRouter = hasLibraries('includeRouter');
        this.includeAxios = hasLibraries('includeAxios');
        this.includeTypeScript = hasLibraries('includeTypeScript');
        this.includeSass = hasLibraries('includeSass');

        // Include Features
        const features = answers.features;
        const hasFeature = feat => features && features.includes(feat);
        this.includeLodash = hasFeature('includeLodash');
        this.includeJquery = hasFeature('includeJquery');
        this.includeEcharts = hasFeature('includeEcharts');

        // Include common
        const common = answers.common;
        const hasCommon = comm => common && common.includes(comm);
        this.includeLang = hasCommon('includeLang');
        this.includeJsPlumb = hasCommon('includeJsPlumb');
        this.includeBook = hasCommon('includeBook');


        callback();
    }

    initializing() {
        // Message
        // var message = chalk.yellow('你好，欢迎使用BuildTools项目构建工具!');
        // this.log(yosay(message, {
        //     maxLength: 17
        // }));
    }

    async prompting() {
        let node = shell.exec('node -v');
        let yarn = shell.exec('yarn -v');
        let nodeArray = node.stdout.split('.')[0];
        let yarnArray = yarn.stdout.split('.')[0];
        let nodeVersion = nodeArray.replace(/[^0-9]/ig, "");
        let yarnversion = yarnArray.replace(/[^0-9]/ig, "");
        this.log('当前node环境为' + node);
        if (nodeVersion < 10) {
            this.log('当前node环境过低，请更新node版本为14+过后，重新运行项目');
            shell.exit(1);
        } else {
            const answers = await this.prompt(this._getPrompts());
            let done = this.async();
            this._saveAnswers(answers, done);
            this.destinationRoot(answers.name);
        }
    }

    configuring() {
        this.config.save();
    }

    writing() {
        this._installNpm();
        this._createDirectors();
        this._createPrjectFileSystem();
    }

    installLibraries() {
        var destRoot = path.normalize(this.destinationRoot());
        var template = path.normalize(this.sourceRoot());
        var rootPath = '/vue/';
        // Install Vuex
        if (this.includeVuex) {
            this.npmInstall(['vuex'], {'save-prod': true});
            mkdirp(destRoot + path.normalize('/src/store'));
            if (this.includeTypeScript) {
                this.fs.copy(template + rootPath + path.normalize('/store/index.ts'), destRoot + path.normalize('/src/store/index.ts'));
            } else {
                this.fs.copy(template + rootPath + path.normalize('/store/index.js'), destRoot + path.normalize('/src/store/index.js'));
            }
            this.log('vuex installed')
        }

        // Install Vue Router
        if (this.includeRouter) {
            this.npmInstall(['vue-router'], {'save-prod': true});
            mkdirp(destRoot + '/src/router');
            if (this.includeTypeScript) {
                this.fs.copy(template + rootPath + path.normalize('/router/index.ts'), destRoot + path.normalize('/src/router/index.ts'));
            } else {
                this.fs.copy(template + rootPath + path.normalize('/router/index.js'), destRoot + path.normalize('/src/router/index.js'));
            }
            this.log('vue-router installed')
        }
        if (this.includeRouter && this.includeVuex || this.includeRouter && !this.includeVuex) {
            mkdirp(destRoot + '/src/views');
            this.fs.copy(template + rootPath + path.normalize('/views/Home.vue'), destRoot + path.normalize('/src/views/Home.vue'));
        }

        // Install Axios
        if (this.includeAxios) {
            this.npmInstall(['axios'], {'save-prod': true});
            this.log('axios installed')
        }

        // Install Typescript
        if (this.includeTypeScript) {
            var templateContext = {
                includeRouter: this.includeRouter,
                includeVuex: this.includeVuex,
            };
            this.npmInstall(['vue-class-component', 'vue-property-decorator'], {'save-prod': true});
            this.npmInstall(['typescript', '@vue/cli-plugin-typescript', 'ts-loader'], {'save-dev': true});
            this.fs.copy(template + rootPath + path.normalize('/tsconfig.json'), destRoot + path.normalize('/tsconfig.json'));
            this.fs.copy(template + rootPath + path.normalize('/shims-tsx.d.ts'), destRoot + path.normalize('/src/shims-tsx.d.ts'));
            this.fs.copy(template + rootPath + path.normalize('/shims-vue.d.ts'), destRoot + path.normalize('/src/shims-vue.d.ts'));
            this.fs.copyTpl(template + rootPath + path.normalize('/main.ts'), destRoot + path.normalize('/src/index.ts'), templateContext);
            this.log('Typescript installed')
        }

        if (this.includeSass) {
            this.npmInstall(['sass-loader@10.1.1'], {'save-prod': true});
            this.npmInstall(['node-sass@4.12.0'], {'save-prod': true});
            this.npmInstall(['css-loader@3.4.2'], {'save-prod': true});
            this.npmInstall(['style-loader@2.0.0'], {'save-prod': true});
            this.npmInstall(['less-loader@6.1.2'], {'save-prod': true});
            this.log('loader installed')
        }


    }

    installPackages() {
        if (this.includeLodash) {
            this.npmInstall(['lodash'], {'save-dev': true});
            this.log('lodash installed')
        }

        // Install JQuery
        if (this.includeJquery) {
            this.npmInstall(['jquery'], {'save-dev': true});
            this.log('jquery installed')
        }

        if (this.includeEcharts) {
            this.npmInstall(['echarts'], {'save-dev': true});
            this.log('echarts installed')
        }
    }

    installCommon() {
        const destRoot = path.normalize(this.destinationRoot());
        const template = path.normalize(this.sourceRoot());
        var rootPath = path.normalize('/vue/');

        if (this.includeLang) {
            this.fs.copy(template + rootPath + path.normalize('Lang.js'), destRoot + path.normalize('/src/common/js/Lang.js'));
            this.npmInstall(['lang.js@1.1.14'], {'save-dev': true});
            this.fs.copy(template + rootPath + path.normalize('/views/About.vue'), destRoot + path.normalize('/src/views/About.vue'));
            this.log('Lang.js installed')
        }

        if (this.includeJsPlumb) {
            if (!this.includeJquery) {
                this.npmInstall(['jquery'], {'save-dev': true});
            }
            this.fs.copy(template + rootPath + path.normalize('.babelrc'), destRoot + path.normalize('/.babelrc'));
            this.fs.copy(template + rootPath + path.normalize('jsplumb.js'), destRoot + path.normalize('/src/common/js/jsplumb.js'));
            this.fs.copy(template + rootPath + path.normalize('common/css/index_bi.css'), destRoot + path.normalize('/src/assets/style/index_bi.css'));
            this.fs.copy(template + rootPath + path.normalize('common/const/const.js'), destRoot + path.normalize('/src/const/const.js'));
            this.fs.copy(template + rootPath + path.normalize('assets/imgs/plumb/connect.png'), destRoot + path.normalize('/src/assets/images/plumb/connect.png'));
            this.fs.copy(template + rootPath + path.normalize('assets/imgs/plumb/newcon.png'), destRoot + path.normalize('/src/assets/images/plumb/Icon.png'));
            this.fs.copy(template + rootPath + path.normalize('assets/imgs/plumb/lconnect.png'), destRoot + path.normalize('/src/assets/images/plumb/lconnect.png'));
            this.fs.copy(template + rootPath + path.normalize('assets/imgs/plumb/logo.png'), destRoot + path.normalize('/src/assets/images/plumb/logo.png'));
            this.fs.copy(template + rootPath + path.normalize('assets/imgs/plumb/root.png'), destRoot + path.normalize('/src/assets/images/plumb/root.png'));
            this.fs.copy(template + rootPath + path.normalize('assets/imgs/plumb/unconnect.png'), destRoot + path.normalize('/src/assets/images/plumb/unconnect.png'));
            this.fs.copy(template + rootPath + path.normalize('views/plumb.vue'), destRoot + path.normalize('/src/views/plumb.vue'));
            this.npmInstall(['jsplumb@2.15.3'], {'save-dev': true});
            this.npmInstall(['eventemitter3@4.0.7'], {'save-dev': true});
            this.log('jsplumb.js installed')
        }

        if (this.includeBook) {
            mkdirp(destRoot + path.normalize('/src/common/js/turnjs4'));
            mkdirp(destRoot + path.normalize('/src/common/js/turnjs4/extras'));
            mkdirp(destRoot + path.normalize('/src/common/js/turnjs4/lib'));
            this.fs.copy(template + rootPath + path.normalize('util.js'), destRoot + path.normalize('/src/common/js/util.js'));
            this.fs.copy(template + rootPath + path.normalize('views/book.vue'), destRoot + path.normalize('/src/views/book.vue'));
            this.fs.copy(template + rootPath + path.normalize('components/book/book-page.vue'), destRoot + path.normalize('/src/components/book/book-page.vue'));
            this.fs.copy(template + rootPath + path.normalize('components/book/bookinfo.json'), destRoot + path.normalize('/src/components/book/bookinfo.json'));
            this.fs.copy(template + rootPath + path.normalize('components/book/chapter-msg.vue'), destRoot + path.normalize('/src/components/book/chapter-msg.vue'));
            this.fs.copy(template + rootPath + path.normalize('components/book/delegateDutiesArchives.vue'), destRoot + path.normalize('/src/components/book/delegateDutiesArchives.vue'));
            this.fs.copy(template + rootPath + path.normalize('components/book/userinfo.json'), destRoot + path.normalize('/src/components/book/userinfo.json'));
            this.fs.copy(template + rootPath + path.normalize('assets/imgs/book/archives-back-icon.png'), destRoot + path.normalize('/src/assets/images/book/archives-back-icon.png'));
            this.fs.copy(template + rootPath + path.normalize('assets/imgs/book/avatar.png'), destRoot + path.normalize('/src/assets/images/book/avatar.png'));
            this.fs.copy(template + rootPath + path.normalize('assets/imgs/book/badge_icon.png'), destRoot + path.normalize('/src/assets/images/book/badge_icon.png'));
            this.fs.copy(template + rootPath + path.normalize('assets/imgs/book/gradient-page-left.jpg'), destRoot + path.normalize('/src/assets/images/book/gradient-page-left.jpg'));
            this.fs.copy(template + rootPath + path.normalize('assets/imgs/book/gradient-page-right.jpg'), destRoot + path.normalize('/src/assets/images/book/gradient-page-right.jpg'));
            this.fs.copy(template + rootPath + path.normalize('assets/imgs/book/icon-catalog-line.png'), destRoot + path.normalize('/src/assets/images/book/icon-catalog-line.png'));
            this.fs.copy(template + rootPath + path.normalize('assets/imgs/book/icon-delegate-duties-add.png'), destRoot + path.normalize('/src/assets/images/book/icon-delegate-duties-add.png'));
            this.fs.copy(template + rootPath + path.normalize('assets/imgs/book/icon-delegate-duties-catalog.png'), destRoot + path.normalize('/src/assets/images/book/icon-delegate-duties-catalog.png'));
            this.fs.copy(template + rootPath + path.normalize('assets/imgs/book/icon-delegate-duties-home.png'), destRoot + path.normalize('/src/assets/images/book/icon-delegate-duties-home.png'));
            this.fs.copy(template + rootPath + path.normalize('assets/imgs/book/icon-delegate-duties-left.png'), destRoot + path.normalize('/src/assets/images/book/icon-delegate-duties-left.png'));
            this.fs.copy(template + rootPath + path.normalize('assets/imgs/book/icon-delegate-duties-reduce.png'), destRoot + path.normalize('/src/assets/images/book/icon-delegate-duties-reduce.png'));
            this.fs.copy(template + rootPath + path.normalize('assets/imgs/book/icon-delegate-duties-resize.png'), destRoot + path.normalize('/src/assets/images/book/icon-delegate-duties-resize.png'));
            this.fs.copy(template + rootPath + path.normalize('assets/imgs/book/icon-delegate-duties-right.png'), destRoot + path.normalize('/src/assets/images/book/icon-delegate-duties-right.png'));
            this.fs.copy(template + rootPath + path.normalize('assets/imgs/book/loader.gif'), destRoot + path.normalize('/src/assets/images/book/loader.gif'));
            this.fs.copy(template + rootPath + path.normalize('assets/imgs/book/pages-depth.png'), destRoot + path.normalize('/src/assets/images/book/pages-depth.png'));
            this.fs.copy(template + rootPath + path.normalize('turnjs4/lib/hash.js'), destRoot + path.normalize('/src/common/js/turnjs4/lib/hash.js'));
            this.fs.copy(template + rootPath + path.normalize('turnjs4/lib/scissor.min.js'), destRoot + path.normalize('/src/common/js/turnjs4/lib/scissor.min.js'));
            this.fs.copy(template + rootPath + path.normalize('turnjs4/lib/turn.html4.min.js'), destRoot + path.normalize('/src/common/js/turnjs4/lib/turn.html4.min.js'));
            this.fs.copy(template + rootPath + path.normalize('turnjs4/lib/turn.min.js'), destRoot + path.normalize('/src/common/js/turnjs4/lib/turn.js'));
            this.fs.copy(template + rootPath + path.normalize('turnjs4/lib/zoom.min.js'), destRoot + path.normalize('/src/common/js/turnjs4/lib/zoom.min.js'));
            this.fs.copy(template + rootPath + path.normalize('turnjs4/extras/jgestures.min.js'), destRoot + path.normalize('/src/common/js/turnjs4/extras/jgestures.min.js'));
            this.fs.copy(template + rootPath + path.normalize('turnjs4/extras/jquery.min.1.7.js'), destRoot + path.normalize('/src/common/js/turnjs4/extras/jquery.min.1.7.js'));
            this.fs.copy(template + rootPath + path.normalize('turnjs4/extras/jquery.mousewheel.min.js'), destRoot + path.normalize('/src/common/js/turnjs4/extras/jquery.mousewheel.min.js'));
            this.fs.copy(template + rootPath + path.normalize('turnjs4/extras/jquery-ui-1.8.20.custom.min.js'), destRoot + path.normalize('/src/common/js/turnjs4/extras/jquery-ui-1.8.20.custom.min.js'));
            this.fs.copy(template + rootPath + path.normalize('turnjs4/extras/modernizr.2.5.3.min.js'), destRoot + path.normalize('/src/common/js/turnjs4/extras/modernizr.2.5.3.min.js'));

            console.log('book.js installed')
        }
    }
};
