<template>
  <div style="height: 100%;">
    <!-- singIn -->
    <!-- <h5>{{$store.state.user ? $store.state.user.email + '님 반갑습니다.' : '1,2,3의 홈페이지 입니다.'}}</h5> -->
    <v-dialog v-if="$store.state.user === null" v-model="dialog_singin" width="500">
      <template v-slot:activator="{ on }">
        <v-btn flat color="red lighten-2" dark v-on="on">
          <span class="white--text">sign in</span>
          
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Sign In</v-card-title>

        <v-card-text>
          <v-flex xs12 sm6 md3>
            <v-text-field label="email" type="email" v-model="singin_email"></v-text-field>
          </v-flex>

          <v-flex xs12 sm6 md3>
            <v-text-field v-model="singin_password" label="password" type="password"></v-text-field>
          </v-flex>
          <v-btn color="info" v-on:click="singIn" @click="dialog_singin = false">Sign In</v-btn>
          <v-btn color="info" v-on:click="singIn_Facebook" @click="dialog_singin = false">Facebook</v-btn>
          <v-btn color="info" v-on:click="singIn_Google" @click="dialog_singin = false">Google</v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialog_singin = false">close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- singUp -->

    <v-dialog v-if="$store.state.user === null" v-model="dialog_singup" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="red lighten-2" dark flat v-on="on">
          <span class="white--text">sign up</span>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Sign Up</v-card-title>

        <v-card-text>
          <v-flex xs12 sm6 md3>
            <v-text-field label="email" type="email" v-model="singup_email"></v-text-field>
          </v-flex>

          <v-flex xs12 sm6 md3>
            <v-text-field v-model="singup_password" label="password" type="password"></v-text-field>
          </v-flex>
          <v-btn color="info" v-on:click="signUp" @click="dialog_singup = false">Sign Up</v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" flat @click="dialog_singup = false">close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- modal -->
  

    <v-btn  v-if="$store.state.user !== null"
      color="#070f35"
      depressed
      @click="getAlarmlist"
      @click.stop="dialog = true"
      dark
      ><v-icon dark left>fas fa-bell</v-icon> <v-avatar
          size="25"
          right
          class="red darken-2">
          {{$store.state.alarm}}
        </v-avatar>
    </v-btn>

    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">Check your Alarms</v-card-title>
        <v-list two-line>
      <template v-for="item in alarms">
        <v-list-item
          :key="item.content"
          @click="item.link"
        >
          <v-list-item-content>
            <v-list-item-title v-html="item.content"></v-list-item-title>
            <v-list-item-subtitle v-html="item.content"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>

    
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn router to="/Mypage" 
    v-if="$store.state.user !== null" 
    color="#070f35"
    depressed
    dark
    >
      <span class="white--text">my page</span>
    </v-btn>
    <v-btn v-on:click="signOut"
    v-if="$store.state.user !== null" 
    color="#070f35"
    depressed
    dark
    >
      <span class="white--text">log out</span>
    </v-btn>
  </div>
</template>


<script>
import firebase from "firebase";
import FirebaseService from "@/services/FirebaseService";

var firebaseDatabase = firebase.database();

export default {
  name: "login",
  data() {
    return {
      singup_email: "",
      singup_password: "",
      singin_email: "",
      singin_password: "",
      dialog_singin: false,
      dialog_singup: false,
      dialog: false,
      title: "",
      content: "",
      alarms:[]
    };
  },
  mounted(){
    this.getAlarm()
  },
  methods: {
    login() {
      alert("Sign Up");
    },
    go_Mypage() {
      this.$router.push(Mypage);
    },
    signUp() {
      FirebaseService.signup_database(this.singup_email, "visitor", "0","https://i.imgur.com/PJpHPNO.jpg","--");

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.singup_email, this.singup_password)
        .then(user => {
          user = firebase.auth().currentUser;
          console.log(user.email);
          if (user) {
            console.log("왜안들아가져?");
            user
              .updateProfile({
                displayName: "visitor",
                photoURL: "https://i.imgur.com/PJpHPNO.jpg"
              })
              .then(() => alert("회원가입 성공!"));
          }
        });
    },

    singIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.singin_email, this.singin_password)
        .then(() => {
          alert("로그인 되었습니다.");
        })

        .catch(err => alert("누구세요?"));
    },
    singIn_Google() {
      var provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          // var token = result.credential.accessToken;
          // var user = result.user;
          alert("구글 로그인 성공");
        })
        .catch(err => alert("구글 로그인 실패"));
    },

    singIn_Facebook() {
      var provider = new firebase.auth.FacebookAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          var token = result.credential.accessToken;

          var user = result.user;
          alert("페이스북 로긴 성공");
        })
        .catch(err => console.log(err.message));
    },
    async signOut() {
      const r = await this.$firebase.auth().signOut();
      this.$store.commit("setLogOut");
      this.$router.push("/")

      alert("로그아웃 성공");
    },

    getAlarmlist(){
      if(this.$store.state.user.email == 'undefine'){
        return
      }
      else{
          FirebaseService.getAlarms(this.$store.state.user.email).then(res =>{
                this.alarms = res
                console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++",res)

                }
          )
      }
    }
  }
};
</script>

