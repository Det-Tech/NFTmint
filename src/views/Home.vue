<template>
  <v-container class="py-12">
    <notification v-if="hasMessage"/>
    <v-row>
      <v-col lg="12" cols="12">
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
   
  },
  mounted() {
  },
  methods: {
     
  }
};
</script>
