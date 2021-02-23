import VueI18n from 'vue-i18n'

class Lang extends VueI18n{
  /**
   * 语言选项列表
   *@param {object} _optionsLocale[0] 
   *@param {string} _optionsLocale[0].locale 语言key
   *@param {string} _optionsLocale[0].value 语言名称
   */
  _optionsLocale=[];

  /**
   * @param {string} opt.fallbackLocale 默认语言
   * @param {Array} opt.optionsLocale 语言选项列表
   */
  constructor(opt){
    super();
    if(opt && opt.fallbackLocale){
      super.fallbackLocale=opt.fallbackLocale;
      super.locale=opt.fallbackLocale
    }
    if(opt && opt.optionsLocale) this._optionsLocale=opt.optionsLocale;
  }
  
  /**
   * 批量设置语言包
   * @param {Array} allLang 批量设置语言包
   * @param {string} allLang[0].locale 设置语言包的key
   * @param {object} allLang[0].message 对应key的语言包
   */
  allSetLocaleMessage(allLang){
    allLang.forEach((item) => {
      let { locale, message}=item;
      super.setLocaleMessage(locale,message)
    });
  }

  /**
   * 导入单个语言包
   * @param {string} locale 设置语言包的key
   * @param {object} message 对应key的语言包
   */
  setLocaleMessage (locale,message ){
    super.setLocaleMessage(locale,message)
  }

    /**
   * 合并单个语言包
   * @param {string} locale 设置语言包的key
   * @param {object} message 对应key的语言包
   */
  mergeLocaleMessage(locale,message){
    super.mergeLocaleMessage(locale,message)
  }

  /**
   * 根据选定的语言，返回对应key的值
   * @param {Path} key 必填，数据key
   * @param {Locale} locale 可选，语言包key
   * @param {Array | Object} values 可选 
   */
  // 直接继承父组件
  // t(key,locale,values){
  //   return super.t(key,locale,values)
  // }

  //获取缓存或者浏览器语言
  getLocaleDefault(){
    let chooseLanguage = localStorage.getItem('language');
    if (chooseLanguage) return chooseLanguage;
    let locales;
    if(this._optionsLocale.length>0){
      locales=this._optionsLocale.map((item)=>{
        return item.locale
      });
    }else{
      // 简体中文（zh-CN）,英语（en）,德语（de）,葡萄牙语（pt）,西班牙语（es）,丹麦语（da）,法语（fr）,挪威语（nb-NO）,繁体中文（zh-TW）,意大利语（it）,韩语（ko）,日语（ja）,荷兰语（nl）,越南语（vi）,俄语（ru-RU）,土耳其语（tr-TR）,巴西葡萄牙语（pt-br）,波斯语（fa）,泰语（th）,印尼语（id）,保加利亚语（bg）,波兰语（pl）,芬兰语（fi）,瑞典语（sv-SE）,希腊语（el）,斯洛伐克语（sk）,加泰罗尼亚语（ca）,捷克语（cs-CZ）,乌克兰语（ua）,土库曼语（tk）,泰米尔语（ta）,拉脱维亚语（lv）,南非荷兰语（af-ZA）,爱沙尼亚语（ee）,斯洛文尼亚语（sl）,阿拉伯语（ar）,希伯来语（he）,立陶宛语（lt）,蒙古语（mn）,哈萨克斯坦语（kz）,匈牙利语（hu）,罗马尼亚语（ro）,库尔德语（ku）,维吾尔语（ug-CN）,高棉语（km）,塞尔维亚语（sr）,巴斯克语（eu）,吉尔吉斯语（kg）,亚美尼亚语 (hy),克罗地亚 (hr),世界语 (eo)
      locales=['zh-CN','en','de','pt','es','da','fr','nb-NO','zh-TW','it','ko','ja','nl','vi','ru-RU','tr-TR','pt-br','fa','th','id','bg','pl','fi','sv-SE','el','sk','ca','cs-CZ','ua','tk','ta','lv','af-ZA','ee','sl','ar','he','lt','mn','kz','hu','ro','ku','ug-CN','km','sr','eu','kg','hy','hr','eo']
    }
    let language = navigator.language || navigator.browserLanguage;
    for (let locale of locales) {
      if (locale.indexOf(language) > -1 || language.indexOf(locale) > -1 ) {
        return locale;
      }
    }
    return;
  }

  /**
   * 设置语言
   * @param {string} locale :要要设置语言的key
   */
  setLocale(locale){
    localStorage.setItem('language',locale);
    super.locale = locale;
  }
  
  /**
   * 获取当前语言
   */
  getLocale(){
    return super.locale;
  }
  /**
   * 获取语言选项列表
   */
  getOptionsLocale(){
    return this._optionsLocale;
  }

}

export default Lang;