<template>
    <section>
        <transition enter-active-class="animate__animated animate__fadeIn animate__fast" leave-active-class="animate__animated animate__fadeOut animate__fast">
            <router-view />
        </transition>
        <div class="container mt-2" id="contacts-section">
            <div id="contacts-painel" class="w-100">
            <h1 class="shaft-700"><b>Contatos</b></h1>
                <div class="card">
                    <div class="row px-3 mt-3 mb-3">
                        <div class="col-6 col-md-4 col-lg-3">
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text"><i class="fas fa-search"></i></span>
                                </div>
                                <input type="text" class="form-control" placeholder="Buscar contato">
                            </div>
                        </div>
                        <div class="col-6 col-md-4 offset-md-4 col-lg-4 offset-lg-5 text-right">
                            <router-link to="/contacts/create" class="btn btn-primary" tag="button">
                                <i class="fas fa-plus"></i>
                                <span class="ml-2">Adicionar contato</span>
                            </router-link>
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0">
                        <div class="table-responsive">
                        <table class="table" id='contacts-table'>
                            <thead class="px-4">
                                <tr>
                                    <th>Nome</th>
                                    <th>Email</th>
                                    <th>Telefone</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="contact in contacts" :key="contact.id" v-on:click="activeRow($event.target)">
                                    <td scope="row">
                                        <div class="d-flex">
                                            <div v-if="contact.profileImg"><img :src="require(`@/assets/img/${contact.profileImg}`)" class="table-profile-img"></div>
                                            <div v-else class="table-profile-circle">{{ contact.initials }}</div>
                                            <div class="table-profile-name">&nbsp; {{ contact.name }}</div>
                                        </div>
                                    </td>
                                    <td>{{ contact.email }}</td>
                                    <td>{{ contact.phone }}</td>
                                    <td>
                                        <i class="fas fa-pencil-alt table-btn"></i>
                                        &nbsp;
                                        <i class="fas fa-trash table-btn"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        <div class="table-no-result text-center" v-show="contacts.length <= 0">
                            <div class="mb-2 mt-4">
                                <img :src="require(`@/assets/icons/book.png`)" class="table-no-result-icon">
                            </div>
                            <div class="mb-4">
                                <h4>Ainda não há contatos</h4>
                            </div>
                            <div class="mb-2">
                                <router-link to="/contacts/create" class="btn btn-primary" tag="button">
                                    <i class="fas fa-plus"></i>
                                    <span class="ml-2">Adicionar contato</span>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
var $        = require( 'jquery' );
$.dataTable  = require( 'datatables.net' );

import { mapGetters } from 'vuex'; 

export default {

    computed: {
        ...mapGetters({
            contacts: 'getContacts'
        }),
    },
    methods: {
        activeRow(e){
            if($(e).parents('tr').hasClass('table-active')){
                $(e).parents('tr').removeClass('table-active');
                return true;
            }

            $('.table-active').removeClass('table-active');
            $(e).parents('tr').addClass('table-active');
        }
    },
    mounted: function(){
        $('#contacts-table').dataTable({
            searching: false,
            paging: true,
            info: false,
            columnDefs: [{ orderable: false, targets: [1,2,3]}],
            pageLength: 1
        });
    }
}
</script>

<style>
    
</style>