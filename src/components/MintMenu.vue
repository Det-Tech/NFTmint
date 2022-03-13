<template>
  <div class="">
    <div class="text-center text-h5 font-weight-bold"> </div>
      <v-row style="width: 100%; justify-content: center; margin: 0;">       
        <v-col cols="5" lg="5" md="5" sm="5" class="pa-1 v-image-border">
          <v-img :src="require('@/assets/Mask_1_Clean.png')"  v-show="this.$store.state.type==0"></v-img>
          <v-img :src="require('@/assets/Mask_1_Clean_2.png')"   v-show="this.$store.state.type==1"></v-img>
          <v-img :src="require('@/assets/Mask_1_Clean_3.png')"  v-show="this.$store.state.type==2"></v-img>
          <div style="background: white;bottom: -40px; position: relative"> 
            <div class="text-center my-5 " style="margin-top: 100px !important; margin-right:50px;margin-left:50px; margin-bottom: 50px !important;">
              <v-row align="center" justify="center">             
                <v-select
                :items="items"
                label="Type3"
                solo
                @change="changeType"
                style="width:30px;margin:5px;padding-top: 27px"
                ></v-select> 
                <v-btn @click="decreaseCount" color="black" outlined elevation="4">-</v-btn>
                  <div class="hilight"> {{ this.$store.state.counter }} count &nbsp;</div>
                <v-btn @click="increaseCount" color="black" outlined elevation="4">+</v-btn>
                <div class="hilight">Price : {{ this.$store.state.counter}} * {{this.$store.state.price}} = {{this.$store.state.totalPrice}} BNB &nbsp; </div>
                <v-btn @click="mint" color="black" outlined elevation="4">MINT !</v-btn>
              </v-row>
              </div>
          </div>
        </v-col>
          
      </v-row>
    
  </div>
</template>

<script>

import BigNumber from 'bignumber.js'
export default {
  name: "Mint",
  data() {
    return {
      title: "details",
      items:['Type1','Type2', 'Type3'],
      profiles: [
      ],
    };
  },
  computed: {
      nftPrice() {
        if(this.$store.state.account) {
          return BigNumber(this.$store.state.pumpkittens.price).shiftedBy(-18);
        }
        
        return BigNumber(0);
      },
      totalSupply() {
        if(this.$store.state.account) {
          return Number(this.$store.state.pumpkittens.totalSupply);
        }
        
        return Number(0);
      },
  },
  mounted() {
      // this.$store.commit('read_pumpkittens');
  },
  methods: {
      changeType(selectType) {                
        console.log(selectType)
        if(selectType=="Type1"){
          this.$store.dispatch('type1')
        }else if(selectType=="Type2")
        {
          this.$store.dispatch('type2')
        }else if(selectType=="Type3")
        {
          this.$store.dispatch('type3')
        }
      },
      mint() {                
          this.$store.dispatch('mint')              
      },
      increaseCount() {                
          this.$store.dispatch('increaseCount')              
      },
      decreaseCount() {                
          this.$store.dispatch('decreaseCount')              
      },
      type1() {                
          this.$store.dispatch('type1')              
      },
      type2() {                
          this.$store.dispatch('type2')              
      },
      type3() {                
          this.$store.dispatch('type3')              
      },
  }
};
</script>

<style>
    .hilight {
        color:#000000;
        margin-left: 10px;
        margin-top: 5px;
        font-family: sans-serif;
        font-size: 14px;
        font-weight: bold;
    }

    .my-7 {
        opacity: .8;
    }
</style>