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
                                <input type="text" class="form-control" placeholder="Buscar contato" v-on:keyup="searchTable($event.target.value)">
                            </div>
                        </div>
                        <div class="col-6 col-md-4 offset-md-4 col-lg-3 offset-lg-6 text-right">
                            <router-link to="/contacts/create" class="btn btn-primary" tag="button">
                                <i class="fas fa-plus"></i>
                                <span class="ml-2">Adicionar contato</span>
                            </router-link>
                        </div>
                    </div>
                    <div class="card-body px-0 pt-0">
                        <div class="table-responsive">
                            <table class="table table-lg" id='contacts-table'>
                                <thead class="px-4">
                                    <tr>
                                        <th v-on:click="orderTable()" class="pointer">
                                            Nome 
                                            <i v-show="order == 'asc' || order == ''"  class="fas fa-long-arrow-alt-down shaft-700"></i>
                                            <i v-show="order == 'desc'" class="fas fa-long-arrow-alt-up shaft-700"></i>
                                        </th>
                                        <th>Email</th>
                                        <th>Telefone</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id='contacts-tbody'>
                                    <router-link v-bind:to="`/contacts/${contact.id}`" class="pointer" active-class="table-active" tag="tr" v-for="(contact, idx) in filterContacts" :key="idx" v-bind:data-id="contact.id">
                                        <td>
                                            <div class="d-flex">
                                                <div v-if="contact.profileImg"><img :src="`${contact.profileImg}`" class="table-profile-img"></div>
                                                <div v-else class="table-profile-circle">{{ getInitials(contact.name) }}</div>
                                                <div class="table-profile-name">&nbsp; {{ contact.name }}</div>
                                            </div>
                                        </td>
                                        <td>{{ contact.email }}</td>
                                        <td>{{ contact.phone }}</td>
                                        <td>
                                            <router-link v-bind:to="`/contacts/edit/${contact.id}`" class="fas fa-pencil-alt table-btn pointer pointer" tag="i" v-on:click="show($event.target)"/>
                                            &nbsp;
                                            <router-link v-bind:to="`/contacts/delete/${contact.id}`" class="fas fa-trash table-btn pointer" tag="i" v-on:click="show($event.target)"/>  
                                        </td>
                                    </router-link>
                                </tbody>
                            </table>
                        </div>
                        <transition enter-active-class="animate__animated animate__fadeIn" >
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
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    var $ = require( 'jquery' );

    import { mapGetters, mapMutations } from 'vuex'; 

    export default {
        
        data(){
            return {
                order: '',
            }
        },
        computed: {
                ...mapGetters({
                    contacts: 'getContacts',
                    filterContacts: 'getFilterContacts'
                })
        },
        methods: {
            ...mapMutations({
                clearFormData: 'clearFormData',
                setFilterContacts: 'setFilterContacts'
            }),
            show(e){
                if($(e).parents('tr').hasClass('table-active')){
                    $(e).parents('tr').removeClass('table-active');
                    return true;
                }

                $('.table-active').removeClass('table-active');
                $(e).parents('tr').addClass('table-active');
            },
            searchTable(value){
                var newArray = this.contacts.filter(function (el) {
                    return el.name.toLowerCase().includes(value.toLowerCase());
                    });
                this.setFilterContacts(newArray);
            },
            orderTable(){
                this.filterContacts.sort(function(a, b) {
                    var textA = a.name.toUpperCase();
                    var textB = b.name.toUpperCase();
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                });

                if(this.order == 'desc'){
                    this.filterContacts.sort().reverse();
                    this.order = 'asc';
                }else{
                    this.order = 'desc';
                }
            },
            getInitials(name){
                var initials = "";
                if(!name){
                    initials = "AA";
                }else{
                    if(name.includes(" ")){
                        var names = name.split(' ');
                        initials = names[0].substring(0, 1);
                            
                        if (names.length > 1) {
                            initials += names[names.length - 1].substring(0, 1);
                        }else if(names.length == 1){
                            initials += names[0].slice(-1);
                        }
                    }else{
                        initials = name.substring(0, 1) + name.slice(-1);
                    }
                }
                return initials.toUpperCase();
            }
        },
        async created(){
            await this.$store.dispatch("getContacts")
        }
    }
</script>

<style>
    
</style>