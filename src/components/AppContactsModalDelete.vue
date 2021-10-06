<template>
    <app-modal class="modal-delete">
        <div class="modal-header pl-1 mb-3 pt-3">
            <div class="d-flex ml-2">
                <h2 class="mb-0 ml-3">Excluir este contato?</h2>
            </div>
        </div>
        <div class="modal-body body2 text-right">
            <router-link to="/contacts" class="btn btn-secondary" tag="button">Cancelar</router-link>
            <button v-on:click="remove()" class="btn btn-secondary crimson-400">Excluir</button>
        </div>
    </app-modal>
</template>

<script>
import { mapActions } from 'vuex';
    var $ = require( 'jquery' );

    import AppModal from './AppModal.vue';

    export default {
        data(){
            return {
                contact: {}
            }
        },
        created(){
            if(!$(`[data-id=${this.$route.params.id}]`).hasClass('table-active')){
                $(`[data-id=${this.$route.params.id}]`).addClass('table-active-2');
            }
        },
        methods: {
            ...mapActions({
                removeContact : 'removeContact'
            }),
            remove(){
                this.removeContact(this.$route.params.id);
            }
        },
        beforeRouteLeave (to, from, next) {
            $('.table-active-2').removeClass('table-active-2');
            next();
        },
        name: "AppContactsModalContentDelete",
        components: { AppModal }
    };
</script>