<template>
  <ion-content>

    <div align="center" class="eclipse">
      <br>
      <img src="/assets/logo-white.png" style="margin-top: 38px;">
    </div>

     <p style="font-family: Montserrat;font-style: normal;font-weight: normal;font-size: 16px;line-height: 20px;text-align: center;">
      <center>
       Regístrate o ingresa para  <br> comenzar
     </center>
     <br>
     <br>
      <button type="button" class="btn-primary" @click="() => router.push('/select_type_register')" style="width: 170px">Registro</button>
     <br>
     <br>
      <button type="button" class="btn-line"  @click="() => router.push('/login')"  style="width: 170px">Iniciar Sesión</button>
      <br>
     <br>
       <center> <p><b>o</b></p></center>
     <ion-grid v-show="!showAppleSignIn" >
      <ion-row>

        <ion-col>
          <img src="/assets/icon-facebook.png" @click="loginFacebook" style="margin-left: 62%;" >

        </ion-col>
         <ion-col v-show="showAppleSignIn">
          <img src="/assets/icon-apple.png" @click="loginApple" style="height:47px;width:38px;margin-top:-8px;">
        </ion-col>
        <ion-col>
          <img src="/assets/icon-google.png" @click="loginGoogle" style="margin-right: 62%;margin-top: 4px;">
        </ion-col>
      </ion-row>
    </ion-grid>
  

    <br>
      <a class="text-control" style="font-weight: 600;font-size: 16px;line-height: 20px;" @click="$router.push({path: '/principal' , query : {invite : true }})"> Continuar como invitado</a> <br>
      <br>
    </p>
 </ion-content>
</template>

<script>
import { defineComponent } from 'vue';
import toast from '@/toast'
import jwtToken from "@/plugins/jwt/jwt-token";
import {mapActions} from "vuex";
import user from "@/plugins/jwt/user";
import axios from 'axios';
import { useRouter } from 'vue-router';
import { Plugins } from '@capacitor/core'
//import { SignInWithApple } from '@capacitor-community/apple-sign-in';
import { FacebookLogin } from '@capacitor-community/facebook-login';

import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { Device }  from '@capacitor/device';
//import { GooglePlus } from '@ionic-native/google-plus/ngx';


//591791636275-45hoofl1j9jcdbkfmv2cc88a51i2ahtl.apps.googleusercontent.com Tu ID de cliente

//CKfLfyeO3d137Or-4dtBa9nN tu secreto de cliente



export default defineComponent({
  name: "Login",
  data() {
    return {
       style : {
        img :{
          'margin-top'  : null
        }
       },
      email: '',
      password: '',
      fb_user : '',
      token : null,
      showAppleSignIn : true,
      googleUser : null
    };
  },
  setup() {
      const router = useRouter();
      return { router };
  },
  mounted(){
    console.log(Plugins)
   
    GoogleAuth.init();
    
    this.show_ios()

    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '891037061645114',
        cookie: true, // enable cookies to allow the server to access the session
        xfbml: true, // parse social plugins on this page
        version: 'v11.0' // use graph api current version
      });
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
   

  },
  methods: {
    ...mapActions([
      'setAuthUser',
    ]),
    redirect(page){
      this.$router.push({path: page});
    },
    async show_ios(){
      let device = await Device.getInfo();
      this.showAppleSignIn = device.platform === 'ios';
    },
    async loginFacebook(){

      const FACEBOOK_PERMISSIONS = ['email'];
      const result = await FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });

      if (result.accessToken) {
        this.token = result.accessToken;
      }else{
        toast.openToast("Error al autenticar con facebook","error",2000);
        return
      }

      //alert(JSON.stringify(result))
      var loading = await toast.showLoading()

      await loading.present();

      const url = `https://graph.facebook.com/${this.token.userId}?fields=id,name,picture.width(720),email&access_token=${this.token.token}`;

      axios
      .get(url)
      .then(res => {
        this.fb_user = res.data


         axios
          .post("/signin/mobile/facebook",{email : this.fb_user.email , name :this.fb_user.name })
          .then(async res => {
            loading.dismiss()
            user.setUser(res.data.user)
            jwtToken.setToken(res.data.token);
            this.setAuthUser(res.data.user)
            await FacebookLogin.logout()
            this.$router.push({path: '/principal' , query : {set_fcm : true }});
          })
          .catch(err => {
            loading.dismiss()
            console.log(err.response)
            /*if(err.response.data?.message){
              toast.openToast(err.response.data.message,"error",2000);
            }else{
              toast.openToast("Ha ocurrido un error","error",2000);
            }*/
         })
      })
      .catch(err => {
        console.log(err)
        loading.dismiss()
        //toast.openToast("Ha ocurrido un error","error",2000);
      })
   },
   async loginGoogle() {

  
    const googleUser = await GoogleAuth.signIn();
   
    console.log('my user: ', googleUser);

    if(!googleUser?.email){
      toast.openToast("Error al autenticar con google","error",2000);
      return
    }

    var loading = await toast.showLoading()

    await loading.present();

    let data = {
      email : googleUser.email,
       name : googleUser.name,
    }

    axios
      .post("/signin/mobile/google",data)
      .then(async res =>  {
        loading.dismiss()
        user.setUser(res.data.user)
        jwtToken.setToken(res.data.token);
        this.setAuthUser(res.data.user)
        this.$router.push({path: '/principal' , query : {set_fcm : true }});
      })
      .catch(err => {
        loading.dismiss()
        console.log(err.response)
        /*if(err.response.data?.message){
          toast.openToast(err.response.data.message,"error",2000);
        }else{
          toast.openToast("Ha ocurrido un error","error",2000);
        }*/
      });
    },
    loginGoogleFirebase(){

   
      //const auth = getAuth()

       const provider = new window.firebase.auth.GoogleAuthProvider();
     window.firebase.auth().signInWithPopup(provider)
        .then((result) => {
          alert('Error on registration: ' + JSON.stringify(result));
          console.log(result)
          // This gives you a Google Access Token. You can use it to access the Google API.
          //const credential = window.firebase.GoogleAuthProvider.credentialFromResult(result);
          //const token = credential.accessToken;
          // The signed-in user info.
          //const user = result.user;
          //console.log(credential,token,user)
          // ...
        }).catch((error) => {
          alert('Error on registration: ' + JSON.stringify(error));
          console.log(error)
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = window.firebase.auth().GoogleAuthProvider.credentialFromError(error);
          console.log(errorCode,errorMessage,email,credential)
        });

        window.firebase.auth().onAuthStateChanged( userInfo => {
          console.log(userInfo)
        })
    },
    async loginApple() {

   /*let options = {
      clientId: 'com.app.upgrap',
      redirectURI: 'https://upgrap.firebaseapp.com/__/auth/handler',
      scopes: 'email name',
      state: '12345',
      nonce: 'nonce',
    };

    SignInWithApple.authorize(options)
    .then(async(result) => {
      var loading = await toast.showLoading()

      await loading.present();
      
      let data = {
        email : result.response.email,
        name : result.response.givenName+' '+result.response.familyName,
      }
      
      axios
      .post("/signin/mobile/apple",data)
      .then(async res =>  {

        loading.dismiss()
        user.setUser(res.data.user)
        jwtToken.setToken(res.data.token);
        this.setAuthUser(res.data.user)
        this.$router.push({path: '/principal' , query : {set_fcm : true }});
      })
      .catch(err => {
        loading.dismiss()
        console.log(err.response)
      });
    })
    .catch(error => {
      //loading.dismiss()
      console.log(error)
    });
    
    /*let result = await Plugins.SignInWithApple.authorize()

    if(!result?.email){
      toast.openToast("Error al obtener datos de Apple, intente nuevamente","error",2000);
      return
    }

    var loading = await toast.showLoading()

    await loading.present();

    let data = {
      email : result.response.email,
      name : result.response.givenName+' '+result.response.familyName,
    }

    axios
      .post("/signin/mobile/apple",data)
      .then(async res =>  {
//      alert('apple' + JSON.stringify(res));
        loading.dismiss()
        user.setUser(res.data.user)
        jwtToken.setToken(res.data.token);
        this.setAuthUser(res.data.user)
        this.$router.push({path: '/principal' , query : {set_fcm : true }});
      })
      .catch(err => {
        loading.dismiss()
        console.log(err.response)
      });*/
    }
  }
});
</script>


<style type="text/css">
.preload{
  position: absolute;
width: 100%;
height: 100%;

}

.preload img {
  vertical-align:middle;
}


</style>
