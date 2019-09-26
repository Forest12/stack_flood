import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import Vue from 'vue'
import { store } from '../store.js'
var firebaseConfig = {
    apiKey: "AIzaSyAoads3zhGQPzwvR8GUbThM-QBuhCiQ4eQ",
    authDomain: "webmobile-sub2-64e94.firebaseapp.com",
    databaseURL: "https://webmobile-sub2-64e94.firebaseio.com",
    projectId: "webmobile-sub2-64e94",
    storageBucket: "webmobile-sub2-64e94.appspot.com",
    messagingSenderId: "101203511109",
    appId: "1:101203511109:web:d97956e58e2fa496"
  };

// var firebaseConfig = {
//     apiKey: "AIzaSyAOaxPMUrFVZmtPhk945-pku0Vr1_9TkGs",
//     authDomain: "webmobile-5.firebaseapp.com",
//     databaseURL: "https://webmobile-5.firebaseio.com",
//     projectId: "webmobile-5",
//     storageBucket: "webmobile-5.appspot.com",
//     messagingSenderId: "934123234328",
//     appId: "1:934123234328:web:fda8318efc0bd997"
//   };
// var firebaseConfig = {
//     apiKey: "AIzaSyAoads3zhGQPzwvR8GUbThM-QBuhCiQ4eQ",
//     authDomain: "webmobile-sub2-64e94.firebaseapp.com",
//     databaseURL: "https://webmobile-sub2-64e94.firebaseio.com",
//     projectId: "webmobile-sub2-64e94",
//     storageBucket: "webmobile-sub2-64e94.appspot.com",
//     messagingSenderId: "101203511109",
//     appId: "1:101203511109:web:d97956e58e2fa496"
//   };

// var firebaseConfig = {
// 	apiKey: "AIzaSyD1m81RrkwZ1V-ezgYwhLP88DhProUoPqk",
// 	authDomain: "webmobile-test-5d2a4.firebaseapp.com",
// 	databaseURL: "https://webmobile-test-5d2a4.firebaseio.com",
// 	projectId: "webmobile-test-5d2a4",
// 	storageBucket: "webmobile-test-5d2a4.appspot.com",
// 	messagingSenderId: "521659857765",
// 	appId: "1:521659857765:web:5ee55d1098c002c8"
// };

firebase.initializeApp(firebaseConfig);
var email;
var created_time = ""
var user;

firebase.auth().onAuthStateChanged(() => {
	user = firebase.auth().currentUser;
	if (user != null) {
		//console.log("hi!!!!!!!!!!!!!")
		email = user.email
		store.commit('setUser', user)
		store.commit('setAdmin', user)
		store.commit('setEmail', email)
	} else {
		email = "undefine"
		store.commit('setUser', user)
		store.commit('setEmail', email)
	}
})

const firestore = firebase.firestore()
Vue.prototype.$firebase = firebase
export default {
	getPost(post_token, item) {
		var docRef = firestore.collection(item).doc(post_token)
		return docRef.get().then( (doc) => {
			if (doc.exists) {
				let data = doc.data()
				data.postdate = new Date(data.created_at.toDate()) + ""
				data.postdate = data.postdate.substring(3, 24)
				data.created_at = new Date(data.created_at.toDate())
				let tarr = new Array();
				// var cop = this
				this.getPostTag().then(
					res => {
						for (let i = 0; i < res.length; i++) {
							if (res[i].post_token.includes(doc.id)) {
								tarr.push(res[i].id)
							}
						}
					})
					data.tags = tarr
					return data
					// data.tags = tarr;

			} else {
				// doc.data() will be undefined in this case
				console.log("No such document!");
			}
		}).catch(function (error) {
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
					if (!data.view) {
						data.view = 0;
					}
					data.level = "0"
					data.userImg = "https://i.imgur.com/PJpHPNO.jpg"
					data.giturl = "I'm visiter"
					data.vote = 0
					if (data.email == null) {
						data.email = 'visiter'
					}
					else {
						this.get_user_info(data.email)
							.then(res => {
								if (res[0] != null && res[0].level != null) {
									data.level = res[0].level
									data.userImg = res[0].img
									data.giturl = res[0].giturl
								} else {
									data.level = "0"
									data.userImg = "https://i.imgur.com/PJpHPNO.jpg"
									data.giturl = "no have giturl"
								}
							})
					}
					data.id = doc.id
					let arr = new Array();
					this.getPostTag().then(
						res => {
							for (let i = 0; i < res.length; i++) {
								// console.log("======================")
								// console.log(doc.id)
								// console.log(res[i].id, "123123123312")
								// console.log(res[i].post_token.split('#'))
								// console.log(res[i].post_token.includes(doc.id),'sibal')
								if (res[i].post_token.includes(doc.id)) {
									arr.push(res[i].id)
								}
							}
						})
					data.tags = arr
					this.getVote(data.id).then(res => {
						data.vote = res
					})
					data.postdate = new Date(data.created_at.toDate()) + ""
					data.postdate = data.postdate.substring(0, 24)
					data.created_at = new Date(data.created_at.toDate())
					return data
				})
			})
	},
	getMyPosts(item) {
		let postsCollection = firestore.collection(item).where("email", "==", user.email)
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
			.catch(function (error) {
				console.log("Error getting documents: ", error)
			})
	},
	getMainPosts(item) {
		let postsCollection = firestore.collection(item)
		return postsCollection
			.orderBy('view', 'desc')
			.get()
			.then((docSnapshots) => {
				return docSnapshots.docs.map((doc) => {
					let data = doc.data()
					if (!data.view) {
						data.view = 0;
					}
					data.level = 0
					data.userImg = "https://i.imgur.com/PJpHPNO.jpg"
					data.giturl = "I'm visiter"
					data.item = item
					data.vote = 0
					if (data.email == null) {
						data.email = 'visiter'
					}
					else {
						this.get_user_info(data.email)
							.then(res => {
								if (res[0] != null && res[0].level != null) {
									data.level = res[0].level
									data.userImg = res[0].img
									data.giturl = res[0].giturl
								} else {
									data.level = "0"
									data.userImg = "https://i.imgur.com/PJpHPNO.jpg"
									data.giturl = "no have giturl"
								}
							})
					}
					data.id = doc.id
					this.getVote(data.id)
						.then(res => {
							data.vote = res
						})
					data.postdate = new Date(data.created_at.toDate()) + ""
					data.postdate = data.postdate.substring(0, 24)
					data.created_at = new Date(data.created_at.toDate())
					return data
				})
			})
	},
	postPost(item, title, content) {
		const view = 0;
		const uid = user.uid
		return firestore.collection(item).add({
			uid,
			email,
			title,
			content,
			created_at: firebase.firestore.FieldValue.serverTimestamp(),
		})
	},
	addview(item, post_token, editview) {
		if (!editview) {
			let postDoc = firestore.collection(item).doc(post_token)
			postDoc.update(
				{
					view: 1,
				})
		} else {
			editview = editview + 1
			let postDoc = firestore.collection(item).doc(post_token)
			postDoc.update(
				{
					view: editview,
				}
			)
		}
	},
	editPost(item, post_token, editTitle, editContent) {
		let postDoc = firestore.collection(item).doc(post_token)
		postDoc.update(
			{
				title: editTitle,
				content: editContent,
			}
		)
	},
	removePost(item, post_token) {
		firestore.collection(item).doc(post_token).delete();
	},
	postAnswer(item, post_token, content) {
		created_time = firebase.firestore.Timestamp.now().toDate() + " "
		created_time = created_time.substring(0, 24)
		return firestore.collection(item).doc(post_token).collection("Answer").add(
			{
				email,
				content,
				created_at: firebase.firestore.FieldValue.serverTimestamp(),
			}
		)
	},
	getAnswers(item, post_token) {
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
	editAnswer(item, post_token, answer_token, editContent) {
		let postDoc = firestore.collection(item).doc(post_token).collection("Answer").doc(answer_token)
		postDoc.update(
			{
				content: editContent,
			}
		)
	},
	removeAnswer(item, post_token, answer_token) {
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
		created_time = firebase.firestore.Timestamp.now().toDate() + " "
		created_time = created_time.substring(0, 24)
		return firestore.collection("Portfolios").add({
			title,
			content,
			img,
			created_at: firebase.firestore.FieldValue.serverTimestamp()
		})
	},
	logging(item) {
		// created_time = firebase.firestore.Timestamp.now().toDate() + " "
		// created_time = created_time.substring(0, 24)
		// return firestore.collection('LOG').doc(email + " " + created_time).set({
		//  email,
		//  item,
		//  time: firebase.firestore.FieldValue.serverTimestamp() 
		// })
	},
	loginWithGoogle() {
		let provider = new firebase.auth.GoogleAuthProvider()
		return firebase.auth().signInWithPopup(provider).then(function (result) {
			let accessToken = result.credential.accessToken
			let user = result.user
			return result
		}).catch(function (error) {
			console.error('[Google Login Error]', error)
		})
	},
	signup_database(email, user_authority, level, img, giturl) {//가입시 데이터베이스에 데이터 저장. login.vue에 함수 호출 있음
		return firestore.collection("member").doc(email).set({
			email,
			user_authority,
			level,
			img,
			giturl,
			created_at: firebase.firestore.FieldValue.serverTimestamp()
		})
	},
	update_database_member(email, user_authority, level, img, giturl, created_at) { //데이터베이스 업데이트 부분, 미완. 수정 필요
		user.updateProfile({
			displayName: user_authority,
		})
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
		const user_info = firestore.collection("member").where("email", "==", email);
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
		const user_info = firestore.collection("member").where("email", "==", email);
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
	async vote(post_token, email, check) {
		var updocRef = firestore.collection("VOTE_UP").where("post_token", "==", post_token).where("user", "==", email)
		var downdocRef = firestore.collection("VOTE_DOWN").where("post_token", "==", post_token).where("user", "==", email)
		if (check) {
			//좋아요를 눌렀을때
			let docSnapshotsDown = await downdocRef.get()
			if (!docSnapshotsDown.empty) {
				//이전에 싫어요를 눌렀으면
				let id = docSnapshotsDown.docs[0].id
				firestore.collection("VOTE_DOWN").doc(id).delete()
				//flase가 return 되면 num_vote가 줄어든다.
				//console.log("이전에 싫어요를 눌렀어")
				return true
			} else {
				let docSnapshotsUP = await updocRef.get()
				if (docSnapshotsUP.empty) {
					//이전에 좋아요를 한번도 누른적이 없으면

					firestore.collection("VOTE_UP").add({
						post_token,
						"user": email,
					})
					//console.log("이전에 싫어요를 누른적 없어")

					return true
				} else {
					//이전에 좋아요를 눌렀으면
					return false
				}
			}
		} else {
			//싫어요를 눌렀을때
			let docSnapshotsUP = await updocRef.get()
			if (!docSnapshotsUP.empty) {
				//이전에 좋아요를 눌렀으면
				let id = docSnapshotsUP.docs[0].id
				firestore.collection("VOTE_UP").doc(id).delete()
				//flase가 return 되면 num_vote가 줄어든다.
				//console.log("이전에 좋아요 누름")

				return true
			} else {
				let docSnapshotsDOWN = await downdocRef.get()
				if (docSnapshotsDOWN.empty) {
					//이전에 싫어요를 한번도 누른적이 없으면
					firestore.collection("VOTE_DOWN").add({
						post_token,
						"user": email,
					})
					//console.log("이전에 좋아요 누른적 없어")

					return true
				} else {
					//이전에 싫어요를 눌렀으면ddd
					return false
				}
			}
		}
	},
	async getVote(post_token) {
		var updocRef = firestore.collection("VOTE_UP").where("post_token", "==", post_token)
		var downdocRef = firestore.collection("VOTE_DOWN").where("post_token", "==", post_token)
		let count = 0
		await updocRef.get().then(docSnapshots => {
			count += docSnapshots.docs.length
			downdocRef.get().then(docSnapshots => {
				count -= docSnapshots.docs.length
			})
		})
		return count
	},
	// async getTeg(post_token){
	//  var tegdocRef = firestore.collection("TAG").where("post_token","==",post_token)
	// },
	// 태그추가
	addTag(tag, id) { // tags = ['aaa','bbb','ccc]
		return firestore.collection('Tags').doc(tag).set({
			post_token: id,
		})
	},
	addTitle(title, id_all) {
		return firestore.collection('Tags').doc(title).set({
			post_token: id_all,
		})
	},
	async getTag(item) {
		const res = await firestore.collection('Tags').doc(item)
		const doc = await res.get()
		let data = doc.data()
		if (doc.exists) {
			return data.post_token
		} else {
			return ''
		}
	},
	async getPostTag() {
		let postsCollection = await firestore.collection('Tags')
		return postsCollection
			.get()
			.then((docSnapshots) => {
				return docSnapshots.docs.map((doc) => {
					let data = doc.data()
					data.id = doc.id
					return data
				})
			})
	},
	getAlarms(user_email) {
		var docRef = firestore.collection("member").doc(user_email).collection("Notice")
		return docRef.get().then((docSnapshots) => {
			return docSnapshots.docs.map((doc) => {
				let data = doc.data()
				data.id = doc.id
				return data
			})
		})
	},
	getNumOfAlarms(user_email) {
		var docRef = firestore.collection("member").doc(user_email).collection("Notice").where("read", "==", false)
		return docRef.get().then((docSnapshots) => {
			return docSnapshots.size
		})
	},
	chRead(doc_id, user_email) {
		//console.log("doc_id:", doc_id, "user_email:", user_email)
		let alarmDoc = firestore.collection("member").doc(user_email).collection("Notice").doc(doc_id)
		alarmDoc.update(
			{
				read: true,
			})
	},

	getPostTC(item){
		let pc = firestore.collection(item)
		return pc
				.orderBy('created_at', 'desc')
				.get()
				.then((docSnapshots) => {
					return docSnapshots.docs.map((doc) => {
					let data = doc.data() 
					data.id = doc.id
					return data
					})
				})
	},
	postNotice(user_email, content){
        firestore.collection("member").doc(user_email).collection("Notice").add(
            {
            "content": `< 공지사항 > ${content}`,
            "link":``,
            "read":false,
            }
        )
	}
}