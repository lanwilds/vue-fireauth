import firebase from 'firebase'
export function initialize(store,router){
// Auth Middleware
router.beforeEach((to, from, next) => {
    // Check for requiresAuth guard
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // Check if NO logged user
      if (!firebase.auth().currentUser) {
          store.dispatch('getSignOut');
        // Go to login
        next({
          path: '/login',
          // query: {
          //   redirect: to.fullPath
          // }
        });
      } else {
        store.dispatch('getUser',firebase.auth().currentUser);
        // Proceed to route
        next();
      }
    } else if (to.matched.some(record => record.meta.requiresGuest)) {
      // Check if NO logged user
      if (firebase.auth().currentUser) {
        store.dispatch('getUser',firebase.auth().currentUser);
        next({
          path: '/',
          // query: {
          //   redirect: to.fullPath
          // }
        });
      } else {
        // Proceed to route
        store.dispatch('getSignOut');
        next();
      }
    } else {
      // Proceed to route
      next();
    }
  });
}