<template>
	<ion-app :class="{'ios' : showAppleSignIn }" v-if="route.meta.layout == 'LayoutDashboard'">
		<LayoutDashboard></LayoutDashboard>
	</ion-app>
	<ion-app :class="{'ios' : showAppleSignIn }" v-if="route.meta.layout =='Layout'">
		<Layout></Layout>
	</ion-app>
	<ion-app :class="{'ios' : showAppleSignIn }" v-else>
		<transition name="slide-fade">
			<router-view></router-view>
		</transition>
	</ion-app>
</template>

<script>
import { IonApp } from '@ionic/vue';
import { defineComponent } from 'vue';
import LayoutDashboard from './components/base/LayoutDashboard';
import Layout from './components/base/Layout';
import fcm_token from '@/plugins/fcm/fcm-token' ; 
import { Plugins } from '@capacitor/core'
import { PushNotifications } from '@capacitor/push-notifications';
import '@capacitor/device';
import toast from '@/toast'
import { GoogleAuth } from  '@codetrix-studio/capacitor-google-auth';
import { mapGetters } from 'vuex'

export default defineComponent({
name: 'App',
components: {
IonApp,
LayoutDashboard,
Layout
},
data(){
return {
route : this.$route,
showAppleSignIn : true,
redirections : 0
//fcm: new FCM()
}
},

mounted(){

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

toggleDarkTheme(prefersDark.matches);

// Listen for changes to the prefers-color-scheme media query
prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));

console.log(prefersDark)
// Add or remove the "dark" class based on if the media query matches

this.initPushNotification()
this.show_ios()

Promise.all([

GoogleAuth.init()

]).then(() =>{
Plugins.GoogleAuth.init()
console.log("aqui")

}).catch(err => console.log(err));

},
computed : {
...mapGetters([
'getUser'
]),
},
methods : {

async show_ios(){
let device = await Plugins.Device.getInfo();
this.showAppleSignIn = device.platform === 'ios';
},
async initPushNotification(){

// Register with Apple / Google to receive push via APNS/FCM

PushNotifications.requestPermissions().then(result => {
      if (result.receive === 'granted') {
        // Register with Apple / Google to receive push via APNS/FCM
        PushNotifications.register();
      } else {
        // Show some error
      }
    });

// On success, we should be able to receive notifications
PushNotifications.addListener('registration', 
(token) => {
console.log(token.value)
fcm_token.setToken(token.value)


}
);

// Some issue with our setup and push will not work
PushNotifications.addListener('registrationError', 
(error) => {
//alert('Error on registration: ' + JSON.stringify(error));
console.log(error)
}
);

// Show us the notification payload if the app is open on our device
PushNotifications.addListener('pushNotificationReceived', 
(notification) => {
/*if (notification['path']) {
this.$router.push(notification.path)
}*/

if(notification.data['message']){
toast.openToast(notification.data['message'],"success",10000);
}

}
);

// Method called when tapping on a notification
PushNotifications.addListener('pushNotificationActionPerformed', 
(notification) => {
if (notification.data.data['path']) {
this.$router.push(notification.data.data['path'])
}
}
);
}
}
});

function toggleDarkTheme(shouldAdd) {
  document.body.classList.toggle('dark', shouldAdd);
}

//591791636275-45hoofl1j9jcdbkfmv2cc88a51i2ahtl.apps.googleusercontent.com mi token
//oficial de upgrap 404466753320-8ob9c44f8na5ajcr317p25qv92juvv6e.apps.googleusercontent.com
</script>

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap" rel="stylesheet">
<style type="text/css">
	.ios{
		margin-top: 2.5%;
	}
</style>