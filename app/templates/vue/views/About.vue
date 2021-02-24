<template>
  <div class="about" style="text-align: center">
    <h1>{{name}}</h1>
    <button @click="changeLanguage()">切换语言</button>
  </div>
</template>
<script>
  import Lang from 'lang.js'
  var lang = new Lang({
    messages: {
      'en.greetings': {
        'hi':'Hello',
        'Home': '主页',
        'Lang': '语言',
        'Book': '履职档案',
        'Plumb': '连线库',
      },
    }
  });
  export default {
    name: "About",
    data(){
      return{
        name:'你好',
      }
    },
    methods:{
      changeLanguage(){
        lang.setFallback('en');
        this.name = lang.get('greetings.hi');
        this.$parent.Msg.Home = lang.get('greetings.Home');
        this.$parent.Msg.Lang = lang.get('greetings.Lang');
        this.$parent.Msg.Book = lang.get('greetings.Book');
        this.$parent.Msg.Plumb = lang.get('greetings.Plumb');
      }
    },
    mounted() {
    }
  };

</script>
