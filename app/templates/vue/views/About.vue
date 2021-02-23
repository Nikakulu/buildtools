<template>
  <div class="about" style="text-align: center">
    <h1>你好</h1>
    <h1>{{name}}</h1>
  </div>
</template>
<script>
  import Lang from 'lang.js'
  var lang = new Lang({
    messages: {
      'en.greetings': {
        'hi': 'Hi',
        'hello': 'Hello'
      },
      'it.greetings': {
        'hi': 'Salve'
      }
    }
  });

  export default {
    name: "About",
    data(){
      return{
        name:'',
      }
    },
    mounted() {
      lang.setFallback('en');
      lang.get('greetings.hello');
      this.name = lang.get('greetings.hello');
      console.log(lang.get('greetings.hello'),'lang.js')
    }
  };

</script>
