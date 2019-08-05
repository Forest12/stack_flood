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
		console.log(user)
		if (user != null) {
			email = user.email
			store.commit('setUser', user)
			store.commit('setAdmin', user)


			console.log("12312312313123123213312312")

			console.log(this.$cookie.get('alarm'))
			console.log(this.$cookie.get())
			cookie1=this.$cookie.get('alarm')
			if(cookie1!=null){
			
			Notification.requestPermission(function (result) { // 알림을 허용 할 지 알람을 띄운다.

				//요청을 거절하면,
				if (result === 'denied') {
					state.setalarm(0);
					this.$cookie.set('alarm', 'alarm', 0);  
				}
				//요청을 허용하면,
				else {
					state.setalarm(1);
					this.$cookie.set('alarm', 'alarm', 1); 
					//데스크탑 알림 권한 요청 버튼을 비활성화
					requestPermissionButton.attr('disabled', 'disabled');
					//데스크탑 메시지 입력폼을 활성화
					notificationMessage.removeAttr('disabled');
					//데스크탑 메시지 요청 버튼을 활성화
					notificationButton.removeAttr('disabled');
					return;
				}
			});
		}



			// console.log("login check")
			// console.log(store.state.user)
			// 	console.log("you are login!!!!")
			// 	cookies = this.$cookies.get("alarm");
			// 	console.log("get cookie ok!!!!")
			// 	if(cookies==null){
			// 		Notification.requestPermission(function (result) {

			// 		//요청을 거절하면,
			// 		if (result === 'denied') {
			// 			state.setalarm(0);
			// 			info = new Cookie("alarm", "0");    // 쿠키를 생성한다. 이름:alarm, 값 : 0
			// 			info.setMaxAge(365*24*60*60);                                 // 쿠키의 유효기간을 365일로 설정한다.
			// 			info.setPath("/");                                                    // 쿠키의 유효한 디렉토리를 "/" 로 설정한다.
			// 			response.addCooke(info);   
			// 		}
			// 		//요청을 허용하면,
			// 		else {
			// 			state.setalarm(1);
			// 			info = new Cookie("alarm", "1");    // 쿠키를 생성한다. 이름:alarm, 값 : 1
			// 			info.setMaxAge(365*24*60*60);                                 // 쿠키의 유효기간을 365일로 설정한다.
			// 			info.setPath("/");                                                    // 쿠키의 유효한 디렉토리를 "/" 로 설정한다.
			// 			response.addCooke(info);  
			// 			//데스크탑 알림 권한 요청 버튼을 비활성화
			// 			requestPermissionButton.attr('disabled', 'disabled');
			// 			//데스크탑 메시지 입력폼을 활성화
			// 			notificationMessage.removeAttr('disabled');
			// 			//데스크탑 메시지 요청 버튼을 활성화
			// 			notificationButton.removeAttr('disabled');
			// 			return;
			// 		}
			// 	});
			// 	}else{
			// 	if(cookies.getValue==1){
			// 		state.setalarm(1)
			// 	}else{
			// 		state.setalarm(0)
			// 	}
			// 	}
		


			

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
					data.created_at = new Date(data.created_at.toDate())
					return data
				})
			})
			.catch(function(error) {
				console.log("Error getting documents: ", error)
			})
	},

	postPost(item ,title, content,img) {
		created_time = firestore.Timestamp.now().toDate()+" "
		created_time = created_time.substring(0,24)
		
		return firestore.collection(item).add({
			email,
			img,
			title,
			content,
			created_at: firestore.FieldValue.serverTimestamp(),
		})
	},
	
	editPost(item, post_token, editTitle, editImgURL ,editContent){
		let postDoc = firestore.collection(item).doc(post_token)
		postDoc.update(
			{	
				title: editTitle,
				img:editImgURL,
				content: editContent,

			}
		)

	},
	removePost(item, post_token){
		let postDoc = firestore.collection(item).doc(post_token)
		postDoc.delete();
		

	},

	postAnswer(item, post_token,content){
		created_time = firestore.Timestamp.now().toDate()+" "
		created_time = created_time.substring(0,24)
		return firestore.collection(item).doc(post_token).collection("Answer").add(
			{
				email,
				content,
				created_at: firestore.FieldValue.serverTimestamp(),

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
		user.updateProfile({
			displayName: user_authority,})
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
				.orderBy('user_authority')
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
