<template>
  <ion-page>
    <ion-content class="ion-padding">
    <ion-row>
       <ion-col>
        <button @click="$router.go(-1)">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-left: 3%;top: 20%;position: absolute;">
              <path d="M27 16H5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14 7L5 16L14 25" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <p style="color: #000" class="title">
            Enviar solicitud
          </p>
          <br>
          <p style="font-family: Montserrat;font-style: normal;font-weight: 500;font-size: 16px;line-height: 20px;color: #5B716F;">
          Hemos enviado tu oferta a
          </p>
           <p>
          <span class="text-control" style="font-weight: 500;font-size: 20px;">
            {{$route.query.customer_name}}
          </span>
          </p>
      </ion-col>
    </ion-row>

  
        <p style="font-family: Montserrat;font-style: normal;font-weight: 500;font-size: 16px;line-height: 20px;align-items: center;text-align: center;letter-spacing: 0.75px;color: #5B716F;">
          <img  src="/assets/bi_clock.png" style="margin-top: -5%;">
          <br>
          <br>

          Te avisaremos cuando la <br>
          acepte y habilitaremos  <br>
          el chat
          <br>
          <br>
          <button type="button" class="btn-primary" @click="redirect({path : '/principal'})" style="width: 200px;font-family: Montserrat;font-style: normal;font-weight: 500;font-size: 16px;line-height: 20px;color: #FFFFFF;">
              Regresar al home
          </button>
           <br>
          <br>
          <br> <br>
          <br>
          <br>
        </p>
     
    </ion-content>
  </ion-page>
</template>

<script >

import { repeat,arrowBack } from 'ionicons/icons';
import ModalDetail from '@/views/products/ModalDetail'
import { 

  IonContent, 

  modalController,
  IonPage
 } from '@ionic/vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  components: {
 
    IonContent, 
  
    IonPage
  },
  setup() {
    const isDisabled = ref(false);
    const toggleInfiniteScroll = () => {
      isDisabled.value = !isDisabled.value;
    }
    const items = ref([]);
    const pushData = () => {
      const max = items.value.length + 20;
      const min = max - 20;
      for (let i = min; i < max; i++) {
        items.value.push(i);
      }
    }

    const loadData = (ev) => {
      setTimeout(() => {
        pushData();
        console.log('Loaded data');
        ev.target.complete();

        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        if (items.value.length == 1000) {
          ev.target.disabled = true;
        }
      }, 500);
    }

    pushData();

    return {
      isDisabled,
      toggleInfiniteScroll,
      loadData,
      items,
      repeat,
      arrowBack
    }
  },
  methods:{
     redirect(path) {
      this.$router.push(path);
    },
    async openModal() {
      const modal = await modalController
        .create({
          component: ModalDetail,
          keyboardClose : true,
          cssClass: 'my-custom-class',
        })
      return modal.present();
    }
  }
});

</script>
<style type="text/css">

</style>