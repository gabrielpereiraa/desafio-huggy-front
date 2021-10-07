<template>
    <section>
        <div class="container" id="login-section">
            <div class="text-center">
                <h1 class="shaft-700 mb-4">Login</h1>
                <router-link to="/contacts" class="btn btn-primary" tag="button">Fazer Login com a Huggy</router-link>
            </div>
        </div>
    </section>
</template>

<script>

    import axios from 'axios';
    import { mapActions } from 'vuex';

    export default {
        methods: {
            ...mapActions(['showError'])
        },

        async beforeRouteLeave (to, from, next){
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': process.env.VUE_APP_API_AUTHORIZATION
            }

            await axios.post(`${process.env.VUE_APP_API_HOST}/auth `, [], {
                headers: headers
            })
            .then((response) => {
                this.$store.state.isLogged = true;
                this.$store.state.jwt.value = response.data.value;
                this.$store.state.jwt.type = response.data.type;
                this.$store.state.jwt.expiresIn = response.data.expiresIn;
                next();
            })
            .catch((error) => {
                if(error.response){
                    this.showError({msg: error.response.data.message});
                }else{
                    this.showError({msg: error.message});
                }
            })
        }
    }
</script>

<style>
    
</style>