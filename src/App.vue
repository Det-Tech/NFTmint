<template>
    <v-app>
        <v-app-bar fixed app elevation="2" class="header" style="height:70px">
            <v-container>
                <v-row align="center">
                    <div class="d-flex align-center">
                        <a href="https://rebelCartel.com" class="link">
                        <v-img :src="require('@/assets/favicon.png')" height="40px" contain width="40px"></v-img>
                        </a>
                        <span class="text-h6 font-weight-bold pl-2">RebelCartel</span>
                    </div>
                    <v-spacer></v-spacer>
                    <v-btn text small><a href="https://rebelCartel.com" class="link">Home</a></v-btn>
                    <v-btn text small><a href="https://twitter.com/rebelCartel" class="link">Help</a></v-btn>
                </v-row>
            </v-container>
        </v-app-bar>
        <v-main>
            <router-view/>
        </v-main>
        <v-footer style="z-index: 1" color="header" elevation="2">
            <v-container class="py-3 pm-5">
              <v-row align="left" justify="center">
                <v-btn icon class="ma-1 " style="padding:30px">
                    <a href="" class="link"><v-icon class="social-icon">mdi-facebook</v-icon></a>
                </v-btn>
                &nbsp;
                <v-btn icon class="ma-1 social-icon"  style="padding:30px">
                    <a href="" class="link"><v-icon class="social-icon">mdi-github</v-icon></a>
                </v-btn>
                <v-btn icon class="ma-1 social-icon"  style="padding:30px">
                    <a href="https://discord.gg/uwAJYzka" class="link"><v-icon class="social-icon">mdi-discord</v-icon></a>
                </v-btn>
              </v-row>
              <v-row></v-row>
              
            </v-container>
        </v-footer>
    </v-app>
</template>

<script>

    export default {
        name: 'App',

        data: () => ({
            //
        }),
    };
</script>

<style scoped>
.link {
    color: rgb(70, 36, 70);
    margin: 5px 0;
    text-decoration: none;
}

.header {
    background-image: linear-gradient( 109.6deg, rgb(13 134 138) 11.2%, rgb(55 161 178) 91.1% );
}
</style>
