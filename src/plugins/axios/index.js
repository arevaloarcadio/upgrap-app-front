
import router from '@/router'
import jwtToken from '@/plugins/jwt/jwt-token.js'
import axios from 'axios'
import toast from '@/toast'

//axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.baseURL = 'https://mobile.upgrap.com/';
//axios.defaults.baseURL = 'https://upgrap-app-back-yt2ey.ondigitalocean.app/';

axios.interceptors.request.use(config => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  if (jwtToken.getToken()) {
    config.headers['x-access-token'] = jwtToken.getToken();
  }
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  if(response.data.status == "Token has Expired" || 
              response.data.status == "Token not provided"  || 
              response.data.status == "Token is Invalid" || 
              response.data.status == "Authorization Token not found"){
    jwtToken.removeToken();
    router.push({path: '/login'});
  }
  return response;
}, error => {

  if(error['response'] == undefined){
      toast.openToast("Error de conexión, intente nuevamente","error",2000)
      return Promise.reject(error);
  }
  if(error['response']['status'] == 404){
    //toast.openToast(error['response']['data']['data'],"error",2000)
  }
  if(error['response']['status'] == 422){
    toast.openToast(error['response']['data']['data'],"error",2000)
  }else if(error['response']['status'] == 500){
    toast.openToast("Error interno","error",2000)
  }else if(error['response']['status'] == 401){
    toast.openToast("Autenticación fallida","error",2000)
  }else{
    toast.openToast("Error de conexión, intente nuevamente","error",2000)
  }
  
  return Promise.reject(error);
});