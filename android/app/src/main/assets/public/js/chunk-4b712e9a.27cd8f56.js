(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4b712e9a"],{1148:function(t,e,n){"use strict";var c=n("a691"),i=n("1d80");t.exports=function(t){var e=String(i(this)),n="",l=c(t);if(l<0||l==1/0)throw RangeError("Wrong number of repetitions");for(;l>0;(l>>>=1)&&(e+=e))1&l&&(n+=e);return n}},"38cf":function(t,e,n){var c=n("23e7"),i=n("1148");c({target:"String",proto:!0},{repeat:i})},8437:function(t,e,n){"use strict";n.r(e);n("38cf");var c=n("7a23"),i=Object(c["i"])("p",{style:{color:"#000"}}," Detalle del producto ",-1),l={align:"center",class:"badge"},o=Object(c["h"])("10"),r=Object(c["i"])("span",{class:"text-control",style:{"margin-left":"2%","font-weight":"600"}}," Nombre de Producto ",-1),a=Object(c["i"])("img",{src:"/assets/Tag-Green.png"},null,-1),u=Object(c["i"])("p",{style:{float:"left","margin-left":"2%","font-weight":"150 !important"}}," Dirección, Pais ",-1),b=Object(c["i"])("br",null,null,-1),s=Object(c["i"])("br",null,null,-1),j=Object(c["i"])("br",null,null,-1),O=Object(c["i"])("span",{class:"text-control",style:{"margin-left":"2%","font-weight":"400"}}," Descripción del producto ",-1),f=Object(c["i"])("br",null,null,-1),d=Object(c["i"])("p",{class:"p-no-center",style:{float:"left","margin-left":"2%"}}," Bicicleta especial para adultos mayores con poco uso bicicleta especial para adultos mayores con poco uso ",-1),p={align:"center",class:"buttons-details"},g=Object(c["i"])("p",{class:"p-no-center",style:{float:"left","margin-left":"2%"}}," Te puede interesar... ",-1),m=Object(c["i"])("br",null,null,-1),y=Object(c["i"])("br",null,null,-1),h=Object(c["i"])("br",null,null,-1),w={align:"center",class:"badge-2"},_=Object(c["h"])("10"),F=Object(c["i"])("p",{class:"p-no-center"},"Ubicación",-1);function v(t,e,n,v,I,k){var x=Object(c["y"])("ion-icon"),C=Object(c["y"])("ion-col"),D=Object(c["y"])("ion-row"),z=Object(c["y"])("ion-img"),S=Object(c["y"])("ion-card"),M=Object(c["y"])("ion-card-subtitle"),B=Object(c["y"])("ion-card-header"),L=Object(c["y"])("ion-card-content"),P=Object(c["y"])("ion-list"),T=Object(c["y"])("ion-infinite-scroll-content"),J=Object(c["y"])("ion-infinite-scroll"),N=Object(c["y"])("ion-content"),$=Object(c["y"])("ion-page");return Object(c["r"])(),Object(c["f"])($,null,{default:Object(c["F"])((function(){return[Object(c["i"])(D,null,{default:Object(c["F"])((function(){return[Object(c["i"])(C,null,{default:Object(c["F"])((function(){return[Object(c["i"])("button",{onClick:e[1]||(e[1]=function(e){return t.$router.go(-1)})},[Object(c["i"])(x,{icon:t.arrowBack,style:{"margin-left":"5%",top:"52%",position:"absolute"}},null,8,["icon"])]),i]})),_:1})]})),_:1}),Object(c["i"])(N,{class:"ion-padding"},{default:Object(c["F"])((function(){return[Object(c["i"])(P,null,{default:Object(c["F"])((function(){return[Object(c["i"])(S,null,{default:Object(c["F"])((function(){return[Object(c["i"])("div",l,[Object(c["i"])(x,{icon:t.repeat},null,8,["icon"]),o]),Object(c["i"])(z,{src:"https://ionicframework.com/docs/demos/api/card/madison.jpg"})]})),_:1}),Object(c["i"])(D,null,{default:Object(c["F"])((function(){return[Object(c["i"])(C,null,{default:Object(c["F"])((function(){return[r]})),_:1}),a]})),_:1}),u,b,s,j,O,f,d,Object(c["i"])("div",p,[Object(c["i"])(D,null,{default:Object(c["F"])((function(){return[Object(c["i"])(C,{size:"6","size-sm":""},{default:Object(c["F"])((function(){return[Object(c["i"])("button",{type:"button",class:"btn-line",style:{width:"140px"},onClick:e[2]||(e[2]=function(){return t.openModal.apply(t,arguments)})},"Mas Información")]})),_:1}),Object(c["i"])(C,{size:"6","size-sm":""},{default:Object(c["F"])((function(){return[Object(c["i"])("button",{type:"button",class:"btn-primary",style:{width:"140px"},onClick:e[3]||(e[3]=function(e){return t.redirect({name:"select_product.requests",params:{productId:1}})})},"Me Interesa")]})),_:1})]})),_:1}),g,m,y,h,Object(c["i"])(D,null,{default:Object(c["F"])((function(){return[(Object(c["r"])(),Object(c["f"])(c["a"],null,Object(c["x"])(6,(function(e){return Object(c["i"])(C,{key:e,size:"6","size-sm":""},{default:Object(c["F"])((function(){return[Object(c["i"])(S,null,{default:Object(c["F"])((function(){return[Object(c["i"])("div",w,[Object(c["i"])(x,{icon:t.repeat},null,8,["icon"]),_]),Object(c["i"])(z,{src:"https://ionicframework.com/docs/demos/api/card/madison.jpg"}),Object(c["i"])(B,null,{default:Object(c["F"])((function(){return[Object(c["i"])(M,{style:{color:"#000"}},{default:Object(c["F"])((function(){return[Object(c["i"])(D,null,{default:Object(c["F"])((function(){return[Object(c["h"])(" Nombre "+Object(c["A"])(e),1)]})),_:2},1024)]})),_:2},1024)]})),_:2},1024),Object(c["i"])(L,null,{default:Object(c["F"])((function(){return[F]})),_:1})]})),_:2},1024)]})),_:2},1024)})),64))]})),_:1})])]})),_:1}),Object(c["i"])(J,{onIonInfinite:e[4]||(e[4]=function(e){return t.loadData(e)}),threshold:"100px",id:"infinite-scroll",disabled:t.isDisabled},{default:Object(c["F"])((function(){return[Object(c["i"])(T,{"loading-spinner":"bubbles","loading-text":"Loading more data..."})]})),_:1},8,["disabled"])]})),_:1})]})),_:1})}var I=n("ff79"),k=n("cef7"),x=n("8a30"),C=Object(c["j"])({components:{IonContent:x["c"],IonInfiniteScroll:x["g"],IonInfiniteScrollContent:x["h"],IonList:x["l"],IonPage:x["m"]},setup(){const t=Object(c["w"])(!1),e=()=>{t.value=!t.value},n=Object(c["w"])([]),i=()=>{const t=n.value.length+20,e=t-20;for(let c=e;c<t;c++)n.value.push(c)},l=t=>{setTimeout(()=>{i(),console.log("Loaded data"),t.target.complete(),1e3==n.value.length&&(t.target.disabled=!0)},500)};return i(),{isDisabled:t,toggleInfiniteScroll:e,loadData:l,items:n,repeat:I["w"],arrowBack:I["b"]}},methods:{redirect(t){this.$router.push(t)},async openModal(){const t=await x["w"].create({component:k["a"],keyboardClose:!0,cssClass:"my-custom-class"});return t.present()}}});C.render=v;e["default"]=C}}]);
//# sourceMappingURL=chunk-4b712e9a.27cd8f56.js.map