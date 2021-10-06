<template>
    <app-modal class="modal-show">
        <div class="modal-header">
                <div class="col-6 col-sm-8 col-md-8 col-lg-8">
                    <div class="d-flex ml-2">
                        <div v-if="contact.profileImg"><img :src="require(`@/assets/img/${contact.profileImg}`)" class="table-profile-img"></div>
                        <div v-else class="table-profile-circle">{{ contact.initials }}</div>
                        <h2 class="mb-0 ml-3 ellipsis">{{ contact.name }}</h2>
                    </div>
                </div>
                <div class="col-6 col-sm-4 col-md-4 col-lg-4 modal-header-icons">
                    <div class="text-left">
                        <router-link v-bind:to="`/contacts`" class="modal-header-icon fas fa-times pointer" tag="i"/>
                        <router-link v-bind:to="`/contacts/edit/${contact.id}`" class="modal-header-icon fas fa-pencil-alt pointer" tag="i"/>
                        <router-link v-bind:to="`/contacts/delete/${contact.id}`" class="modal-header-icon fas fa-trash pointer" tag="i"/>
                    </div>
                </div>
        </div>
        <div class="modal-body body2">
            <div class="row mb-4 mt-3"  v-show="contact.name">
                <div class="col-4 col-md-3 col-lg-3 text-right caption shaft-100">
                    Nome
                </div>
                <div class="col-8 col-md-9 col-lg-6 text-left">
                    {{ contact.name }}
                </div>
            </div>
            <div class="row mb-4 mt-3"  v-show="contact.email">
                <div class="col-4 col-md-3 col-lg-3 text-right caption shaft-100">
                    Email
                </div>
                <div class="col-8 col-md-9 col-lg-6 text-left">
                    {{ contact.email }}
                </div>
            </div>
            <div class="row mb-4 mt-3"  v-show="contact.phone">
                <div class="col-4 col-md-3 col-lg-3 text-right caption shaft-100">
                    Telefone
                </div>
                <div class="col-8 col-md-9 col-lg-6 text-left">
                    {{ contact.phone }}
                </div>
            </div>
            <div class="row mb-4 mt-3"  v-show="contact.cell">
                <div class="col-4 col-md-3 col-lg-3 text-right caption shaft-100">
                    Celular
                </div>
                <div class="col-8 col-md-9 col-lg-6 text-left">
                    {{ contact.cell }}
                </div>
            </div>
            <div class="row mb-4"  v-show="contact.address"> 
                <div class="col-4 col-md-3 col-lg-3 text-right caption shaft-100">
                    Endereço
                </div>
                <div class="col-8 col-md-9 col-lg-6 text-left">
                    {{ contact.address }}
                </div>
            </div>
            <div class="row mb-4"  v-show="contact.district">
                <div class="col-4 col-md-3 col-lg-3 text-right caption shaft-100">
                    Bairro
                </div>
                <div class="col-8 col-md-9 col-lg-6 text-left">
                    {{ contact.district }}
                </div>
            </div>
            <div class="row mb-4" v-show="contact.city">
                <div class="col-4 col-md-3 col-lg-3 text-right caption shaft-100">
                    Cidade
                </div>
                <div class="col-8 col-md-9 col-lg-6 text-left">
                    {{ contact.city }}
                </div>
            </div>
            <div class="row mb-4"  v-show="contact.state">
                <div class="col-4 col-md-3 col-lg-3 text-right caption shaft-100">
                    Estado
                </div>
                <div class="col-8 col-md-9 col-lg-6 text-left">
                    {{ contact.state }}
                </div>
            </div>
        </div>
    </app-modal>
</template>

<script>
    import AppModal from './AppModal.vue';
    import { mapGetters } from 'vuex';

    export default {
        data(){
            return {
                contact: {}
            }
        },
        created(){
            this.contact = this.getContact(this.$route.params.id);
        },
        computed: {
            ...mapGetters({
                getContact: 'getContact'
            })
        },
        name: "AppContactsModalContentShow",
        components: { AppModal }
    };
</script>