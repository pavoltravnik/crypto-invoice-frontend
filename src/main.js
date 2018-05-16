// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import store from './store/store';
import router from './router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import axios from 'axios';

Vue.use(Vuetify);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  components: { App },
  template: '<App/>',
  created () {
    // load the store here
    axios.get('http://localhost:56442/api/invoices/init', {
      withCredentials: true
    }).then(({ data }) => {
      this.$store.dispatch('setUserIdAction', data.userId);
      this.$store.dispatch('setDisplayNameAction', data.displayName);
      data.invoiceList.forEach(element => {
        this.$store.dispatch('addInvoiceAction', element);
      });
      // load user settings here
      axios.get('http://localhost:56442/api/user-settings/' + this.$store.getters.userId, {
        withCredentials: true
      }).then((response) => {
        this.$store.dispatch('setUserSettingsAction', response.data);
      }).catch(function (error) {
        console.log(error);
      });
    });
  }
});
