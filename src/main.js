import Vue from 'vue'
import App from './App'

import Router from 'vue-router'
import firebase from 'firebase'
import Vuex from 'vuex'
import { routes } from './router/index';
import StoreData from './store';
import {initialize} from './helpers/auth-middleware';

Vue.use(Router);
Vue.use(Vuex)
Vue.config.productionTip = false

const store = new Vuex.Store(StoreData);
const router = new Router({
	routes,
	mode:'history'
});
var config = {
	//put your firebase credentials
};
var firebaseApp = firebase.initializeApp(config);
var db = firebaseApp.database();
/* eslint-disable no-new */
// var starCountRef = db.ref('Users');
// starCountRef.on('value', function(snapshot) {
//  console.log(snapshot.val())
// });

let app;
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    initialize(store,router);
    /* eslint-disable no-new */
    app = new Vue({
      el: '#app',
      router,
      store,
      firebase,
      components: { App },
      template: '<App/>'
    })
  }
});

