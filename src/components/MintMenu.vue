<template>
  <div class="">
    <div class="text-center text-h5 font-weight-bold"> </div>
      <v-row style="width: 100%; justify-content: center; margin: 0;">       
        <v-col  lg="5" md="5" sm="5" class="pa-1 v-image-bg">
          <div class="v-image-border" style="bottom: -80px; position: relative;">
          <v-img :src="require('@/assets/Mask_1_Clean.png')"  v-show="this.$store.state.type==0"></v-img>
          <v-img :src="require('@/assets/Mask_1_Clean_2.png')"   v-show="this.$store.state.type==1"></v-img>
          <v-img :src="require('@/assets/Mask_1_Clean_3.png')"  v-show="this.$store.state.type==2"></v-img>
          </div>
          <div style="background: white;bottom: -40px; position: relative"> 
            <div class="text-center my-5 " style="margin-top: 100px !important; margin-right:50px;margin-left:50px; margin-bottom: 50px !important;">            
              <v-row  align="center" justify="center">   
                <v-col  lg="3" md="3" sm="12" >          
                <v-select
                 v-if="isMetaMaskInstalled && isMetaMaskConnected"  
                :items="items"
                label="Type3"
                solo
                @change="changeType"
                style="padding-top: 27px"
                ></v-select> 
                </v-col>
                <v-btn @click="connectWallet" v-if="isMetaMaskInstalled && !isMetaMaskConnected" color="black" style="width: 100%;background: #1a8e97;height: 60px;margin: 20px;" outlined elevation="4">Connect</v-btn>
                <v-col  lg="3" md="3" sm="12" >
                <v-btn @click="decreaseCount"  v-if="isMetaMaskInstalled && isMetaMaskConnected"   color="black" outlined elevation="4">-</v-btn>
                  <div  v-if="isMetaMaskInstalled && isMetaMaskConnected"   class="hilight"> {{ this.$store.state.counter }} count &nbsp;</div>
                <v-btn  v-if="isMetaMaskInstalled && isMetaMaskConnected"   @click="increaseCount" color="black" outlined elevation="4">+</v-btn>
                </v-col>
                <v-col  lg="3" md="3" sm="12" >
                <div  v-if="isMetaMaskInstalled && isMetaMaskConnected"   class="hilight">Price : {{ this.$store.state.counter}} * {{this.$store.state.price}} = {{this.$store.state.totalPrice}} ETH &nbsp; </div>
                </v-col>
                <v-col  lg="3" md="3" sm="12" >
                <v-btn  v-if="isMetaMaskInstalled && isMetaMaskConnected"   @click="mint" color="black" outlined elevation="4">MINT !</v-btn>
                </v-col>
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
      isMetaMaskInstalled() {
          const { ethereum } = window;
          return Boolean(ethereum && ethereum.isMetaMask)
      },
      isMetaMaskConnected() {
          return this.$store.state.account!=null;
      },
      hasMessage() {
          return this.$store.state.messageContent!=null
      },
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
      connectWallet() {                
          this.$store.dispatch("connect")              
      },
      lockMetamask() {
          this.$store.dispatch("disconnect")
      },
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