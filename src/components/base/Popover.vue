<template>
<ion-content class="ion-padding">
<ion-row style="cursor: pointer;" @click="redirect({name : 'profile'})">
Perfil
</ion-row>
<div class="hr"> </div>
<ion-row style="cursor: pointer;" @click="redirect({path : '/login'})">
Cerrar Sesión
</ion-row>
</ion-content>
</template>

<script>
import { IonContent,popoverController  } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
name: 'Popover',
components: { IonContent },
methods :{
	async  redirect(path) {
		const popover = await popoverController	
		const { role } = await popover.dismiss();
		console.log('onDidDismiss resolved with role', role);
	
		this.$router.push(path);
	}
}
});
</script>