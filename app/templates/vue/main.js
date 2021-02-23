import Vue from "vue";
import App from "./App.vue";
    <%_

        if (includeRouter) {     -%>
        import router from "./router";
        <%_ }
        if (includeVuex) {  -%>
        import store from "./store"
        <%_ }
if (includeVuex) {  -%>
require('jquery');
import "jquery";
    <%_ }
    -%>

Vue.config.productionTip = false;

new Vue({
    <%_ if (includeRouter) { -%>
router,
<%_ } if (includeVuex) { -%>
store,
<%_ } -%>
render: h => h(App)
}).$mount("#app");