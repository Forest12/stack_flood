import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import Vue from 'vue'
import {store} from '../store.js'



var firebaseConfig = {
    apiKey: "AIzaSyAOaxPMUrFVZmtPhk945-pku0Vr1_9TkGs",
    authDomain: "webmobile-5.firebaseapp.com",
    databaseURL: "https://webmobile-5.firebaseio.com",
    projectId: "webmobile-5",
    storageBucket: "",
    messagingSenderId: "934123234328",
    appId: "1:934123234328:web:0932bbb6042d5da3"
  };

  firebase.initializeApp(firebaseConfig);
  var email;
  var user = firebase.auth().currentUser;
  var created_time=""
  
  
firebase.auth().onAuthStateChanged(user => {
	if (user != null) {
		email = user.email;
		store.commit('setUser', user)
	  } else {
		email = "undefine";
		store.commit('setUser', user)
	  }
	  log=email+" "+firebase.firestore.FieldValue.serverTimestamp()+" 현재 페이지 위치";
	  console.log(log);
	// if (user)	{
	// 	user.getIdTokenResult().then(idTokenResult => {
	// 		console.log(idTokenResult.claims.admin);
	// 		console.log(idTokenResult, '입니다.');
	// 	})
	// }

})
	



const firestore = firebase.firestore()

//SM 0715


Vue.prototype.$firebase = firebase

//SM 0715


export default {

	getPosts(item) {
		let postsCollection
		if(item == "AI"){
			postsCollection = firestore.collection("AI")
		}else if(item == "Bigdata"){
			postsCollection = firestore.collection("Bigdata")
		}else if(item == "Blockchain"){
			postsCollection = firestore.collection("Blockchain")
		}else if(item == "Webmobile"){
			postsCollection = firestore.collection("Webmobile")
		}else if(item == "member"){
			postsCollection = firestore.collection("member")
		} 
		return postsCollection
				.orderBy('created_at', 'desc')
				.get()
				.then((docSnapshots) => {
					console.log("do post")
					return docSnapshots.docs.map((doc) => {
						let data = doc.data()
						data.created_at = new Date(data.created_at.toDate())
						return data
					})
				})
	},
	postPost(item ,title, content,img) {
		created_time = firebase.firestore.Timestamp.now().toDate()+" "
		created_time = created_time.substring(0,24)
		return firestore.collection(item).doc(title+" "+created_time).set({
			email,
			img,
			title,
			content,
			created_at: created_time
		})
	},
	getPortfolios() {
		const postsCollection = firestore.collection("Portfolios")
		return postsCollection
				.orderBy('created_at', 'desc')
				.get()
				.then((docSnapshots) => {
					return docSnapshots.docs.map((doc) => {
						let data = doc.data()
						data.created_at = new Date(data.created_at.toDate())
						return data
					})
				})
	},
	postPortfolio(title, content, img) {
		created_time = firebase.firestore.Timestamp.now().toDate()+" "
		created_time = created_time.substring(0,24)
		return firestore.collection("Portfolios").doc(title+" "+created_time).set({
			title,
			content,
			img,
			created_at: created_time
		})
	},
	logging(item) {
		created_time = firebase.firestore.Timestamp.now().toDate()+" "
		created_time = created_time.substring(0,24)
		console.log('logging start')
		return firestore.collection('LOG').doc(email+" "+created_time).set({
			email,
			item,
			time: created_time 
		})
	},

	loginWithGoogle() {
		let provider = new firebase.auth.GoogleAuthProvider()
		return firebase.auth().signInWithPopup(provider).then(function(result) {
			let accessToken = result.credential.accessToken
			let user = result.user
			return result
		}).catch(function(error) {
			console.error('[Google Login Error]', error)
		})
	},

	signup_database(email,user_authority,level) {//가입시 데이터베이스에 데이터 저장. login.vue에 함수 호출 있음
		console.log('new member in')
		return firestore.collection("member").doc(email).set({
			email,
			user_authority,
			level,
			created_at: firebase.firestore.FieldValue.serverTimestamp()
		})
	},

	update_database_member(email,user_authority) { //데이터베이스 업데이트 부분, 미완. 수정 필요
		console.log('new member in')
		return firestore.collection("member").update({
			email,
			user_authority,
			created_at: firebase.firestore.FieldValue.serverTimestamp()
		})
	},

	get_user_info(email) {
		const user_info = firestore.collection("member").where("email","==",email);
		return user_info
				.orderBy('user_authority', 'level')
				.get()
				.then((docSnapshots) => {
					return docSnapshots.docs.map((doc) => {
						let data = doc.data()
						data.created_at = new Date(data.created_at.toDate())
						return data
					})
				})
	},

	get_user_allPost(email) {
		const user_info = firestore.collection("post").where("email","==",email);
		return user_info
				.orderBy('user_authority', 'level')
				.get()
				.then((docSnapshots) => {
					return docSnapshots.docs.map((doc) => {
						let data = doc.data()
						data.created_at = new Date(data.created_at.toDate())
						return data
					})
				})
	}
}
     