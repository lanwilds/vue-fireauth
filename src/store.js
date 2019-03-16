import Vuex from 'vuex'
import firebase from 'firebase'


export default{
		state:{
			currentUser:'',
			isLoggedIn:false,
			loading:false,
			authErr:null,
			alert:{
				msg:'',
				status:'primary'
			},
			users:[],
			quizzes:[]
		},
		getters:{
			isLoading(state){
				return state.loading;
			},
			isLoggedIn(state){
				return state.isLoggedIn;
			},
			currentUser(state){
				return state.currentUser;
			},
			authError(state){
				return state.authErr;
			},
			getMessage(state){
				return state.alert;
			},
		},
		mutations:{
			loginSuccess(state,payload){
				state.isLoggedIn = true;
				state.loading = false;
				state.currentUser = payload.user;
			},
			setUser(state,payload){
				state.isLoggedIn = true;
				state.currentUser = payload;
			},
			setToken(state,payload){
				state.currentUser.token = payload;
			},
			loginFailed(state){
				state.loading = false;
				state.authErr = true;

			},
			logout(state){
				state.isLoggedIn = false;
				state.currentUser = null;
				state.loading = false;
			},
			toggleLoading(state,bool){
				state.loading = bool;
			},
			setAlert(state,payload){
				state.alert.msg = payload.msg;
				state.alert.status = payload.status;
				setTimeout(()=>{
					state.alert.msg=''
					state.alert.status=''
				},5000)
			},
			setAuthError(state,payload){
				state.authErr = payload;
			},
		},               
		actions:{
			getUser(context,payload){
				context.commit('setUser',payload);
			},
			showAlert(context,payload){
				context.commit('setAlert',payload);
			},
			getSignOut(context){
				context.commit('toggleLoading',true);
				return new Promise((resolve, reject) => {
					firebase.auth().signOut()
					.then((res)=>{
						context.commit('toggleLoading',false);
						context.commit('logout');
						resolve('success')
					},(error)=>{
						context.commit('toggleLoading',false);
						reject(error)
					})
				});

			},
			login(context,payload){
				context.commit('toggleLoading',true);
				return new Promise((resolve, reject) => {
					firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
					.then((user)=>{
						context.commit('toggleLoading',false);
						context.commit('loginSuccess',user)
						resolve('success')
					},(error)=>{
						context.commit('toggleLoading',false);
						reject(error)
					})
				});
			},
			register(context,payload){
				return new Promise((resolve, reject) => {
					axios.post('/api/auth/register',payload).then((response)=>{
						console.log(response)
						context.commit('setAlert',{
							msg:response.data.user.name+" Registered Success, Proceed for login",
							status:"success"
						})
						resolve('success')
					},(error)=>{
						context.commit('setAlert',{
							msg:"Registration failed",
							status:"error"
						})
						reject('failed')
					});
				});
			},
			isUsernameUnique(context,payload){
				return new Promise((resolve, reject) => {
					axios.post('/api/master/participant/unique-username',payload,
					{
						headers:{
							"Authorization":"Bearer "+context.state.currentUser.token
						}
					}).then((response)=>{
						resolve('success')
					},(error)=>{
						context.commit('setAlert',{
							msg:"Username is already taken",
							status:"error"
						})
						reject('failed')
					});
				});
			},
			deleteUser(context,payload){
				return new Promise((resolve, reject) => {
					axios.post('/api/master/participant/delete/'+payload,{deleteUser:true},
					{
						headers:{
							"Authorization":"Bearer "+context.state.currentUser.token
						}
					}).then((response)=>{
						context.commit('setAlert',{
							msg:"Participant deleted success",
							status:"success"
						})
						resolve('success')
					},(error)=>{
						context.commit('setAlert',{
							msg:"Server Error! Could not Delete participant",
							status:"error"
						})
						reject('failed')
					});
				});
			}
		}

}
