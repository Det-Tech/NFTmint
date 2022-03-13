import Vue from 'vue'
import Vuex from 'vuex'
import { BigNumber } from 'bignumber.js'
import axios from 'axios'

import abiPUMPKITTENS from '@/abi/rebelcartel.json'

BigNumber.config({ EXPONENTIAL_AT: 100 })

const ADDR_OWNER = ''
const ADDR_TOKEN_PUMPKITTENS = '0x940923a920812d537Aac2e0C15b2d73bF99b0524'
// const MAXIMUM_MINT_TOKEN = 4;
// const MAXIMUM_MINT_TOKEN_COUNT_FOR_ACCOUNT = 1;

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    account: null,
    messageContent: null,
    messageType: null,
    searchResult:false,
    counter: 1,
    type: 2,
    price: 0.08,
    totalPrice:0.08,
    contracts: {
        tokenPumpKittens: null,
    },
    pumpkittens: {
        totalSupply: Number,
        price: BigNumber,
        tokenIds: [],
        tokenPrices:[],
        tokenURIs:[],
        imageURIs:[],
        tokenNames:[],
        tokenAttributes:[]
    },
    isOwner() {
        if(this.account==null)
            return false
        return this.account.address==ADDR_OWNER
    }
  },
  mutations: {
    init(state) {
        state.contracts.tokenPumpKittens = new window.web3.eth.Contract(abiPUMPKITTENS, ADDR_TOKEN_PUMPKITTENS);
    },
    set_account(state,account) {
        state.account = account
    },
    show_info(state,message) {
        state.messageContent = message
        state.messageType = 'info'
    },
    show_success(state,message) {
        state.messageContent = message
        state.messageType = 'success'
    },
    show_error(state,message) {
        state.messageContent = message
        state.messageType = 'error'
    },
    show_warning(state,message) {
        state.messageContent = message
        state.messageType = 'warning'
    },
    read_pumpkittens(state) {
        // state.contracts.tokenPumpKittens.methods.totalSupply().call().then((ret)=>{
        //     state.pumpkittens.totalSupply = BigNumber(ret);
        //     }).catch((error)=>{
        //     console.error("tokenBQB.totalSupply",error)
        // });
        console.log(state);
        // state.contracts.tokenPumpKittens.methods.isReservePeriod().call().then((ret)=>{
          // if (ret)
          // {
          //   if (state.account != null)
          //   {
          //     state.contracts.tokenPumpKittens.methods.getReservedTokenPrice(state.account.address).call().then((ret)=>{
          //       state.pumpkittens.price = BigNumber(ret);
          //     }).catch((error)=>{
          //       console.error("tokenBQB.totalSupply",error)
          //     });
          //   }
          //   else
          //     state.pumpkittens.price = BigNumber(0);
          // }
          // else
          // {
          //   state.contracts.tokenPumpKittens.methods.getPrice().call().then((ret)=>{
          //     state.pumpkittens.price = BigNumber(ret);
          //   }).catch((error)=>{
          //     console.error("tokenBQB.totalSupply",error)
          //   });
          // }
        // }).catch((error)=>{
        //   console.error("tokenBQB.totalSupply",error)
        // });
      },
  },
  method: {
    fetchData(url){
        axios.get(url).then(response => {
           console.log(response);
        })
    },
  },
  actions: {
    connect({commit}) {
      window.ethereum.request({ 
          method: 'eth_requestAccounts' 
      }).then((accounts) => {
          if(accounts.length==0) {
              console.log("No connected");
          } else {
            window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x4' }],
            }).then(() => {
              console.log("wallet_switchEthereumChain")
              const account = {
                address: accounts[0],
                //balance: BigNumber(balance,"ether")
              }
              commit('show_success','Connected')
              commit('set_account',account)
              commit('read_pumpkittens')
            }).catch(error => {
              console.log("error:wallet_switchEthereumChain",error)
              if (error.code==4902 || error.code==-32603) {
                window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [{ 
                    chainId: '0x4', 
                    chainName: 'LinkebyNetwork',
                    rpcUrls: ['https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
                    blockExplorerUrls: ['https://rinkeby.etherscan.io'],
                    nativeCurrency: {
                      name: 'ETH',
                      symbol: 'ETH',
                      decimals: 18
                    }
                  }],
                }).then(() => {
                  const account = {
                    address: accounts[0],
                  }
                  commit('set_account',account)
                  commit('read_pumpkittens')
                }).catch(() => {
                  console.log("error:wallet_switchEthereumChain")
                });
              }
            });
          }
      }).catch((err) => {
        if (err.code === 4001) {
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });  
    },/*
    connect({commit}) {
      window.ethereum.request({ 
          method: 'eth_requestAccounts' 
      }).then((accounts) => {
          if(accounts.length==0) {
              console.log("No connected");
          } else {
            window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0xfa' }],
            }).then(() => {
              console.log("wallet_switchEthereumChain")
              const account = {
                address: accounts[0],
                //balance: BigNumber(balance,"ether")
              }
              commit('show_success','Connected')
              commit('set_account',account)
              commit('read_pumpkittens')
            }).catch(error => {
              console.log("error:wallet_switchEthereumChain",error)
              if (error.code==4902 || error.code==-32603) {
                window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [{ 
                    chainId: '0xfa', 
                    chainName: 'FantomNetwork',
                    rpcUrls: ['https://rpc.ftm.tools/'],
                    blockExplorerUrls: ['https://ftmscan.com'],
                    nativeCurrency: {
                      name: 'Fantom',
                      symbol: 'FTM',
                      decimals: 18
                    }
                  }],
                }).then(() => {
                  const account = {
                    address: accounts[0],
                  }
                  commit('set_account',account)
                  commit('read_pumpkittens')
                }).catch(() => {
                  console.log("error:wallet_switchEthereumChain")
                });
              }
            });
          }
      }).catch((err) => {
        if (err.code === 4001) {
          console.log('Please connect to MetaMask.');
        } else {
          console.error(err);
        }
      });  
    },*/
    async getTokenIdsOfOwner({state, commit},params) {
        if (state.account==null)
        {
            commit('show_warning', 'Please connect Wallet!');
            return false;         
        }

        if (!window.web3.utils.isAddress(params.account))
        {
            commit('show_warning', 'Address Error!');
            return false;
        }

        await state.contracts.tokenPumpKittens.methods.getTokenIdsOfOwner(params.account).call({
            from: state.account.address
        }).then((ret)=>{
            state.pumpkittens.tokenIds = ret[0];
            state.pumpkittens.tokenPrices = ret[1];
            state.pumpkittens.tokenURIs = ret[2];

            return true;
        })

        return true;
    },
    async constructTokenInfo({state,commit}) {
        let nlength = state.pumpkittens.tokenURIs.length;

        if (nlength == 0)
        {
            state.searchResult = false;
            commit('show_warning', 'No Result!');

            return;
        }

        let imageURLs = [];
        let tokenNames = [];
        let tokenAttributes = [];

        for(let i = 0;i<nlength;i++) {
            await axios.get(state.pumpkittens.tokenURIs[i], {
                }).then(x => {
                    imageURLs.push(x.data.image);
                    tokenNames.push(x.data.name);
                    tokenAttributes.push(x.data.attributes);
                })
        }

        state.pumpkittens.imageURIs = imageURLs;
        state.pumpkittens.tokenNames = tokenNames;
        state.pumpkittens.tokenAttributes = tokenAttributes;
        
        state.searchResult = true;
    },
    disconnect({state}) {
        state.account = null
    },
    increaseCount({state}) {
      state.counter = state.counter + 1;
      state.totalPrice = (state.counter * state.price).toFixed(3);
    },
    decreaseCount({state}) {
      if(state.counter > 1){
        state.counter = state.counter - 1;
        state.totalPrice = (state.counter * state.price).toFixed(3);
      }
    },
    type1({state}) {
      state.type = 0;
      state.price = 0.8;
      state.totalPrice = (state.counter * state.price).toFixed(3);      
    },
    type2({state}) {
      state.type = 1;
      state.price = 0.18;
      state.totalPrice = (state.counter * state.price).toFixed(3);
    },
    type3({state}) {
      state.type = 2;
      state.price = 0.08;
      state.totalPrice = (state.counter * state.price).toFixed(3);
    },    
    mint({state,commit}) {
        if (state.account==null)
        {
          commit('show_warning', 'Please connect Wallet!');
          return;         
        }
        console.log(state.totalPrice);
        console.log(BigNumber(state.totalPrice*1000000000000000000).integerValue().toString())

        state.contracts.tokenPumpKittens.methods.mint(state.counter, state.type).send({
          from: state.account.address,
          value:BigNumber(state.totalPrice*1000000000000000000).integerValue().toString(),
          gas:"210000"
        }).then(()=>{
          commit('show_success', 'Success!');
        })
        
        // if (state.pumpkittens.totalSupply == MAXIMUM_MINT_TOKEN)
        // {
        //   commit('show_warning', 'No More Tokens!');
        //   return;
        // }

        // if (state.pumpkittens.price == 0)
        // {
        //   commit('show_warning', 'You can not mint now!');
        //   return;
        // }

        // state.contracts.tokenPumpKittens.methods.getTokenCount().call({
        //   from: state.account.address
        // }).then((ret)=>{
        //   if (ret == MAXIMUM_MINT_TOKEN_COUNT_FOR_ACCOUNT)
        //   {
        //     commit('show_warning', 'Too Many Tokens At Your Wallet!');
        //     return;
        //   }

        //   state.contracts.tokenPumpKittens.methods.buyPumpkittens().send({
        //     from: state.account.address,
        //     value:BigNumber(state.pumpkittens.price).integerValue().toString()
        //   }).then(()=>{
        //     commit('show_success', 'Success!');
        //     commit('read_pumpkittens');
        //   })

        // }).catch((error)=>{
        //   console.error("getTokenCount()",error)
        // });
    },
    async transferToken({state,commit}, params) {
        if (!window.web3.utils.isAddress(params.to))
        {
            commit('show_warning', 'Address Error!');
            return false;
        }

        if (params.from == params.to)
        {
            commit('show_warning', 'Recipient Address can not be the same as the Spender Address!');
            return false;
        }

        state.contracts.tokenPumpKittens.methods.ownerOf(params.tokenID).call().then((ret)=>{
          if (String(ret).toLowerCase() != String(state.account.address).toLowerCase())
          {
            commit('show_warning', 'You are not the owner of this token!');
            return false;           
          }
          else
          {
            state.contracts.tokenPumpKittens.methods.safeTransferFrom(params.from, params.to, params.tokenID)
            .send({
                from: state.account.address
              }).then(()=>{
                commit('show_success', 'Success!');
            })
          }
        }).catch((error)=>{
          console.error("Pumpkitten.ownerOf",error)
        });
    },
  }
})
