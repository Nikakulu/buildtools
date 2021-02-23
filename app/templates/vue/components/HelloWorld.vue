<template>
  <div class="hello" style="text-align: center">
    <h1>{{ msg }}</h1>


    <h3> Installed </h3>
    <ul class="list-group list-group-horizontal-lg">  
      <%_ if (includeRouter) { -%>
      <li class="list-group-item"> Router </li>
      <%_ } -%>
      <%_ if (includeVuex) { -%>
      <li class="list-group-item"> Vuex </li>
      <%_ } -%>
      <%_ if (includeAxios) { -%>
      <li class="list-group-item"> Axios </li>
      <%_ } -%>
    </ul>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
