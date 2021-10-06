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

    export default {

        async beforeRouteLeave (to, from, next) {

            let headers = { 
                "Authorization": process.env.VUE_APP_HGTOKEN,
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"
            };

            axios.post(process.env.VUE_APP_HGAPI, [], { headers })
                .then((res) => {
                    console.log(res.data)
                    next();
                })
                .catch((error) => {
                    console.log(error);
                });

             
        }

    }
</script>

<style>
    
</style>