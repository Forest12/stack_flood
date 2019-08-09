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
	var created_time=""
	var user;
  
	firebase.auth().onAuthStateChanged(() => {
		user = firebase.auth().currentUser;
		if (user != null) {
			email = user.email
			store.commit('setUser', user)
			store.commit('setAdmin', user)

			if(store.state.alarm==-1){
				Notification.requestPermission(function (result) { // 알림을 허용 할 지 알람을 띄운다.
					//요청을 거절하면,
					if (result === 'denied') {
						store.commit('setalarm',0)
						console.log("alarm setting = ", store.state.alarm)
						return;
					}
					//요청을 허용하면,
					else {
						store.commit('setalarm',1)
						console.log("alarm setting = ", store.state.alarm)
						return;
					}
				});
			}


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
		let postsCollection = firestore.collection(item).where("email","==",user.email)

		return postsCollection
			.get()
			.then((docSnapshots) => {
				return docSnapshots.docs.map((doc) => {
					let data = doc.data()
					data.id = doc.id
					data.item = item
					data.created_at = new Date(data.created_at.toDate())
					return data
				})
			})
			.catch(function(error) {
				console.log("Error getting documents: ", error)
			})
	},

	postPost(item ,title, content) {
		created_time = firebase.firestore.Timestamp.now().toDate()+" "
		created_time = created_time.substring(0,24)
		
		return firestore.collection(item).add({
			email,
			title,
			content,
			created_at: firebase.firestore.FieldValue.serverTimestamp(),
		})
		
	},
	
	editPost(item, post_token, editTitle ,editContent){
		let postDoc = firestore.collection(item).doc(post_token)
		postDoc.update(
			{	
				title: editTitle,
				content: editContent,

			}
		)

	},
	removePost(item, post_token){
		firestore.collection(item).doc(post_token).delete();
	},



	postAnswer(item, post_token,content){
		console.log(item, post_token)
		return firestore.collection(item).doc(post_token).collection("Answer").add(
			{email,
			content,
			created_at: firebase.firestore.FieldValue.serverTimestamp()
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
	editAnswer(item, post_token ,answer_token,editContent){
		let postDoc = firestore.collection(item).doc(post_token).collection("Answer").doc(answer_token)
		postDoc.update(
			{	
				content: editContent,

			}
		)

	},
	removeAnswer(item, post_token,answer_token){
		firestore.collection(item).doc(post_token).collection("Answer").doc(answer_token).delete();
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

	signup_database(email,user_authority,level,img,giturl) {//가입시 데이터베이스에 데이터 저장. login.vue에 함수 호출 있음
		console.log('new member in')
		return firestore.collection("member").doc(email).set({
			email,
			user_authority,
			level,
			img,
			giturl,
			created_at: firebase.firestore.FieldValue.serverTimestamp()
		})
	},

	update_database_member(email,user_authority,level,img,giturl,created_at) { //데이터베이스 업데이트 부분, 미완. 수정 필요
		console.log('유저권한 수정하기')
		user.updateProfile({
			displayName: user_authority,})
		return firestore.collection("member").doc(email).set({
			user_authority,
			email,
			level,
			img,
			giturl,
			created_at
		})
		
	},

	get_user_info(email) {
		const user_info = firestore.collection("member").where("email","==",email);
		return user_info
				.get()
				.then((docSnapshots) => {
					return docSnapshots.docs.map((doc) => {
						let data = doc.data()
						data.created_at = new Date(data.created_at.toDate())
						return data
					})
				})
	},
	getUser() {
		const user_info = firestore.collection("member").where("email","==",email);
		return user_info
				.orderBy('user_authority')
				.get()
				.then((docSnapshots) => {
					return docSnapshots.docs.map((doc) => {
						let data = doc.data()
						data.created_at = new Date(data.created_at.toDate())
						return data
					})
				})
	},

	async vote(post_token, email, check){
		var updocRef = firestore.collection("VOTE_UP").where("post_token","==",post_token).where("user", "==", email)
		var downdocRef = firestore.collection("VOTE_DOWN").where("post_token","==",post_token).where("user", "==", email)

		if(check){
			//좋아요를 눌렀을때
			let docSnapshotsDown = await downdocRef.get()
				if(!docSnapshotsDown.empty){
					//이전에 싫어요를 눌렀으면
					let id = docSnapshotsDown.docs[0].id
					firestore.collection("VOTE_DOWN").doc(id).delete()
					//flase가 return 되면 num_vote가 줄어든다.
					return true
				}else{
					let docSnapshotsUP = await updocRef.get()
					if (docSnapshotsUP.empty){
						//이전에 좋아요를 한번도 누른적이 없으면
						firestore.collection("VOTE_UP").add({
						post_token,
						"user":email,
						})
						return true
					}else{
						//이전에 좋아요를 눌렀으면
						return false
					}
			
			}
		}else{
			//싫어요를 눌렀을때
			let docSnapshotsUP = await updocRef.get()
				if(!docSnapshotsUP.empty){
					//이전에 좋아요를 눌렀으면
					let id = docSnapshotsUP.docs[0].id
					firestore.collection("VOTE_UP").doc(id).delete()
					//flase가 return 되면 num_vote가 줄어든다.
					return true
				}else{
					let docSnapshotsDOWN = await downdocRef.get()
					if (docSnapshotsDOWN.empty){
						//이전에 싫어요를 한번도 누른적이 없으면
						firestore.collection("VOTE_DOWN").add({
						post_token,
						"user":email,
						})
						return true
					}else{
						//이전에 싫어요를 눌렀으면
						return false
					}
			}
			
		}
	},

	async getVote(post_token){
		console.log(post_token)
		var updocRef = firestore.collection("VOTE_UP").where("post_token","==",post_token)
		var downdocRef = firestore.collection("VOTE_DOWN").where("post_token","==",post_token)
		
		let count = 0

		await updocRef.get().then(docSnapshots=>{
			count += docSnapshots.docs.length
			downdocRef.get().then(docSnapshots=>{
				count -= docSnapshots.docs.length
			})
		})
		return count
	},
	async getTeg(post_token){
		var tegdocRef = firestore.collection("TEG").where("post_token","==",post_token)
	
	}
}
