const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)


exports.sendMassage = functions.firestore.document('{item}/{post_token}/Answer/{answerId}')
    .onCreate((snapshot, context) => {
     
   

      const item = context.params.item
      const post_token = context.params.post_token
      var docRef = admin.database().ref(`${item}/${post_token}`).once('value')

  
  
      console.log("============docREF======================",docRef)
      
    
     
    });



  