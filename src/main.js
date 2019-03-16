// require('../node_modules/bootstrap-sass/assets/stylesheets/_bootstrap.scss')
// window.$ = window.jQuery = require('jquery')
// window._ = require('lodash')
// window.Popper = require('popper.js').default
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

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
// db.ref('Users').get().then((querySnapshot) => {
//   console.log(querySnapshot)
//   // querySnapshot.forEach((doc) => {
//   //   next(vm => {
//   //     vm.employee_id = doc.data().employee_id
//   //     vm.name = doc.data().name
//   //     vm.dept = doc.data().dept
//   //     vm.position = doc.data().position
//   //   })
//   // })
// })
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

