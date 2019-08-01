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
		}else {
			email = "undefine";
			store.commit('setUser', user)
		}})
	

const firestore = firebase.firestore()

Vue.prototype.$firebase = firebase


export default {

	getPost(post_token, item){
		var docRef = firestore.collection(item).doc(post_token)
	
		return docRef.get().then(function(doc) {
			if (doc.exists) {
				let data = doc.data()
				data.created_at = new Date(data.created_at.toDate())
				return data
			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
		}).catch(function(error) {
			console.log("Error getting document:", error);
		});
	},

	getPosts(item) {
		let postsCollection = firestore.collection(item)
	
		return postsCollection
				.orderBy('created_at', 'desc')
				.get()
				.then((docSnapshots) => {
					return docSnapshots.docs.map((doc) => {
						let data = doc.data()
						data.id = doc.id
						data.created_at = new Date(data.created_at.toDate())
						return data
					})
				})
	},

	getMyPosts(item) {
		let postsCollection = firestore.collection(item).where("email","==",email)

		return postsCollection
			.get()
			.then((docSnapshots) => {
				return docSnapshots.docs.map((doc) => {
					let data = doc.data()
					data.created_at = new Date(data.created_at.toDate())
					return data
				})
			})
			.catch(function(error) {
				console.log("Error getting documents: ", error)
			})
	},

	postPost(item ,title, content,img) {
		created_time = firebase.firestore.Timestamp.now().toDate()+" "
		created_time = created_time.substring(0,24)
		
		return firestore.collection(item).add({
			email,
			img,
			title,
			content,
			created_at: firebase.firestore.FieldValue.serverTimestamp(),
		})
	},

	postAnswer(item, post_token,content){
		created_time = firebase.firestore.Timestamp.now().toDate()+" "
		created_time = created_time.substring(0,24)
		return firestore.collection(item).doc(post_token).collection("Answer").add(
			{
				email,
				content,
				created_at: firebase.firestore.FieldValue.serverTimestamp(),

			}
		)
	},
	getAnswers(item, post_token){
		let AnswersCollection = firestore.collection(item).doc(post_token).collection("Answer")
		
		return AnswersCollection.get()
				.then((docSnapshots) => {
					return docSnapshots.docs.map((doc) => {
						let data = doc.data()
						data.id = doc.id
						data.created_at = new Date(data.created_at.toDate())
						return data
					})
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
						data.id = doc.id
						data.created_at = new Date(data.created_at.toDate())
						return data
					})
				})
	},
	postPortfolio(title, content, img) {
		created_time = firebase.firestore.Timestamp.now().toDate()+" "
		created_time = created_time.substring(0,24)
		return firestore.collection("Portfolios").add({
			title,
			content,
			img,
			created_at: firebase.firestore.FieldValue.serverTimestamp()
		})
	},
	logging(item) {
		created_time = firebase.firestore.Timestamp.now().toDate()+" "
		created_time = created_time.substring(0,24)
		console.log('logging start')
		return firestore.collection('LOG').doc(email+" "+created_time).set({
			email,
			item,
			time: firebase.firestore.FieldValue.serverTimestamp() 
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

	update_database_member(email,user_authority,level,created_at) { //데이터베이스 업데이트 부분, 미완. 수정 필요
		console.log('유저권한 수정하기')
		return firestore.collection("member").doc(email).set({
			user_authority,
			email,
			level,
			created_at
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
	}
}
