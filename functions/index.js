const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)


exports.sendMassage = functions.firestore.document('{item}/{post_token}/Answer/{answerId}')
    .onCreate((snapshot, context) => {
    
      const item = context.params.item
      const post_token = context.params.post_token

      const store = admin.firestore()
      store.collection(`${item}`).doc(`${post_token}`).get().then(doc => {
          if (doc.exists) {
              var email  = doc.data().email
              admin.firestore().collection("member").doc(email).collection("Notice").add(
                {
                  "content": `귀하의 Post에 새로운 댓글이 등록되었습니다.`,
                  "link":`/${item}/detail/${post_token}`,
                  "read":false,
                }
              )
          }
          else {
            console.log("data없음")
          }
      }).catch(reason => {
          console.log(reason)
      })
    });