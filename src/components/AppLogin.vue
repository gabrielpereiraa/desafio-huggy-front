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

    export default {

        async beforeRouteLeave (to, from, next) {
            next();
        }

    }
</script>

<style>
    
</style>