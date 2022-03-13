<template>
  <v-container class="py-12">
    <notification v-if="hasMessage"/>
    <v-row>
      <v-col lg="12" cols="12">
        <v-card color="transparent" class="mb-3" >
          <v-card-text style="margin-bottom:50px">
          
            <div class="text-h6">
              <b>'RebelCartel'</b>  NFTs is 
              living on the <b>Binance Smart blockchain.</b>
            </div>
            <ol class="list-box">
              <li class="my-1">
                Connect your Wallet
                <v-btn @click="connectWallet" v-if="isMetaMaskInstalled && !isMetaMaskConnected" color="black" outlined elevation="2" class="ml-2" small>Connect</v-btn>
                <v-btn @click="lockMetamask" v-if="isMetaMaskInstalled && isMetaMaskConnected" color="black" outlined elevation="2" class="ml-2" small>Connected</v-btn>
              </li>
              <li class="my-1">Select Token type(Image)</li>
              <li class="my-1">Select NFT minting count</li>
              <li class="my-1">Mint Your RebelCartel</li>
            </ol>
          </v-card-text>
        </v-card>
        <v-card color="transparent">
          <v-card-text>
            <Mint v-show="currentTab === 'mint'"/>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Mint from "@/components/MintMenu.vue";
import Notification from '@/components/notification.vue';

export default {
  name: "Attributes",
  components: { Mint, Notification},
  data() {
    return {
      currentTab: "mint",
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
      }
  },
  mounted() {
  },
  methods: {
      connectWallet() {                
          this.$store.dispatch("connect")              
      },
      lockMetamask() {
          this.$store.dispatch("disconnect")
      }
  }
};
</script>
