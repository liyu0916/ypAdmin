<template>
  <d2-container>
    <el-row :gutter="20" class="d2-mt">
      <el-col :span="12">
        <el-card>
          <div class="swiper1 swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">Slide 1</div>
              <div class="swiper-slide">Slide 2</div>
              <div class="swiper-slide">Slide 3</div>
              <div class="swiper-slide">Slide 4</div>
              <div class="swiper-slide">Slide 5</div>
              <div class="swiper-slide">Slide 6</div>
              <div class="swiper-slide">Slide 7</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div class="swiper-container swiper2">
          <div class="swiper-wrapper">
            <div class="swiper-slide">Slide 1</div>
            <div class="swiper-slide">Slide 2</div>
            <div class="swiper-slide">Slide 3</div>
            <div class="swiper-slide">Slide 4</div>
            <div class="swiper-slide">Slide 5</div>
            <div class="swiper-slide">Slide 6</div>
            <div class="swiper-slide">Slide 7</div>
          </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="d2-mt" slot="footer">
      <d2-link-btn title="依赖" link="https://www.swiper.com.cn/demo/index.html"></d2-link-btn>
    </el-row>
  </d2-container>
</template>
<script>
  import Swiper from 'swiper';
  import 'swiper/css/swiper.css'
  export default {
    components: {

    },
    data(){
      return{

      }
    },
    methods: {
      createSwiper1:function () {
        var vm = this;
        var mySwiper = new Swiper('.swiper1', {
          slidesPerView: 3,
          spaceBetween: 0,
          centeredSlides: true,
          loop: true,
          observer:true,
          observerParents:true,
          autoplay: {
            delay: 1000,
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          on:{
            click: function(event){
              var obj = event.target;
              while(obj.className.indexOf("swiper-slide") == -1){
                obj=obj.parentNode;
              }
              vm.sksl.forEach(function(item){
                if (item.id ==obj.dataset.xlid) {
                  vm.sktype = item;
                  return;
                }
              });
            }
          }
        });
        if(mySwiper == undefined || mySwiper.el == undefined ){return;}
        mySwiper.el.onmouseover = function(){
          mySwiper.autoplay.stop();
        }
        mySwiper.el.onmouseleave = function(){
          mySwiper.autoplay.start();
        }
      },
      createSwiper2:function () {
        var swiper = new Swiper('.swiper2', {
          direction: 'vertical',
          slidesPerView: 3,
          spaceBetween: 10,
          // mousewheel: true,
          loop:true,
          autoplay: {
            delay: 1000,
            disableOnInteraction:false
          },
        })
      }

    },
    mounted() {
      var timer =  setTimeout(()=>{
        this.createSwiper1();
        this.createSwiper2()
      },500)
    },
    computed: {

    },
    created(){

    },
    beforeDestroy(){
      clearTimeout(this.timer)
    }
  }
</script>

<style scoped>
  .swiper1 .swiper-slide{
    height: 400px;
    text-align: center;
    font-size: 18px;
    background: rgba(0,0,0,.1);
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    transition: 300ms;
    transform: scale(0.6);
    border: 1px solid rgba(149,244,255,0.3);
  }
  .swiper1  .swiper-slide-active,.swiper-slide-duplicate-active{
    transform: scale(1.2);
  }
  .swiper1 .swiper-slide img{
    display: inline-block;
    margin-top: 6px;
  }
  .sk_name{
    font-size: 10px;
  }
  .sk_num{
    font-size: 16px;
    color:#ffba00;
  }

  .swiper2{
    height: 400px;
  }
  .swiper2 .swiper-slide {
    height: 40px;
    text-align: center;
    font-size: 18px;
    background: rgba(0,0,0,0.1);
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
</style>
