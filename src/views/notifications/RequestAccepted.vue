<template>
  <ion-page>
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
            <p style="margin-top: 45px;">
          <span class="text-control"  style="font-weight: 600;font-size: 22px;font-weight: 500;font-size: 20px;line-height: 24px;align-items: center;text-align: center;letter-spacing: 0.75px;color: #32BAB0;">
                {{customer?.name}}
              </span>
          </p>
          <p style="font-weight: 500;font-size: 16px;line-height: 20px;align-items: center;text-align: center;letter-spacing: 0.75px;color: #5B716F;">
          Ha aceptado tu oferta
          </p>
         
      </ion-col>
    </ion-row>
    <ion-content class="ion-padding">
    
        <p>
         <svg width="178" height="178" viewBox="0 0 178 178" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="89" cy="89" r="89" fill="#32BAB0"/>
          <path d="M122.375 66.75L76.4844 116.813L55.625 94.0568" stroke="#FFF9F1" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <br>
          <br>
            <span style="font-weight: 500;font-size: 16px;line-height: 20px;align-items: center;text-align: center;letter-spacing: 0.75px;color: #5B716F;">
           Ahora puedes  usar <br>el chat
           </span>
          <br>
          <br>
          <button type="button" class="btn-primary" @click="redirect({name : 'request.chat' , params : { productId : product_customer.id } , query : { customer_name : customer.name,product_name : product_customer.name,customer_id :customer.id,request_id : request_id,exchange :'enviado' }})" style="width: 137px;margin-top: 30px;">
              Abrir chat
          </button>
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
import axios from 'axios'
import BasePublic from '@/plugins/store/utils'

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
  data(){
    return{
      BasePublic,
      request_id : null,
      request : null,
      product_customer : null,
      product_user : null, 
      customer : null
    }
  },
  created(){
    this.request_id = this.$route.params.requestId
    this.getRequest()
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
    },
    getRequest(){
      axios
      .get("/requests/"+this.$route.params.requestId)
      .then(res => {
        this.request = res.data
      })
      .catch(err => {
        console.log(err)
      }).finally(() => {
        this.getProductCustomer()
      });
    },
    getProductCustomer(){
      axios
         .get("/products/"+this.request.product_customer_id)
        .then(res => {
          this.product_customer = res.data
         })
        .catch(err => {
          console.log(err)
        }).finally(() => {
          this.getCustomer()
        })
    },
    getCustomer(){
      axios
         .get("/customers/"+this.product_customer.id_user)
        .then(res => {
          this.customer = res.data
         })
        .catch(err => {
          console.log(err)
        })
    },
  }
});

</script>
<style type="text/css">

</style>