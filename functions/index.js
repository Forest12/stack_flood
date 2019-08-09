const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)


exports.sendMassage = functions.firestore.document('{item}/{post_token}/Answer/{answerId}')
    .onCreate((snapshot, context) => {
     
      console.log("_______________________",snapshot.data())
      console.log("snapshot", snapshot) 
      console.log("____item____",context.params.item)
      console.log("____post_token____",context.params.post_token)
      
    
     
    });



  