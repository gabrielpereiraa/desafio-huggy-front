<template>
    <app-modal class="modal-create">
        <div class="modal-header">
            <h2>Editar contato</h2>
            <router-view to="/contacts" class="close" tag="button">
                <span aria-hidden="true">&times;</span>
            </router-view>
        </div>
        <div class="modal-body">
            <form>
                <div class="row">
                    <div class="form-group col-12 col-md-8 col-lg-8">
                        <label for="contact-name" class="caption">Nome</label>
                        <input type="text" name="name" v-model="formData.name" v-on:keypress="changeFormData({'name' : $event.target.name, 'value' : $event.target.value})" class="form-control" v-bind:class="errors.includes('name') ? 'is-invalid' : ''" id="contact-name" placeholder="Nome completo" maxlength="200">
                        <small id="contact-name-error" class="form-text caption invalid-feedback">Campo obrigatório.</small>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-12 col-md-8 col-lg-8">
                        <label for="contact-email" class="caption">Email</label>
                        <input type="email" name="email" v-model="formData.email" v-on:keypress="changeFormData({'name' : $event.target.name, 'value' : $event.target.value})" class="form-control" v-bind:class="errors.includes('email') ? 'is-invalid' : ''" id="contact-email" placeholder="Email" maxlength="200">
                        <small id="contact-email-error" class="form-text caption invalid-feedback">Campo obrigatório.</small>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-12 col-md-6 col-lg-6">
                        <label for="contact-phone" class="caption">Telefone</label>
                        <input type="text" name="phone" v-model="formData.phone" v-on:keypress="changeFormData({'name' : $event.target.name, 'value' : $event.target.value})" class="form-control" v-mask="['(##) ####-####']" v-bind:class="errors.includes('phone') ? 'is-invalid' : ''" id="contact-phone" placeholder="Telefone"/>
                        <small id="contact-phone-error" class="form-text caption invalid-feedback">Campo obrigatório.</small>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-12 col-md-6 col-lg-6">
                        <label for="contact-cell" class="caption">Celular</label>
                        <input type="text" name="cell" v-model="formData.cell" v-on:keypress="changeFormData({'name' : $event.target.name, 'value' : $event.target.value})" class="form-control" v-mask="['(##) ####-####', '(##) #####-####']" v-bind:class="errors.includes('cell') ? 'is-invalid' : ''" id="contact-cell" placeholder="Celular"/>
                        <small id="contact-cell-error" class="form-text caption invalid-feedback">Campo obrigatório.</small>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-12 col-md-10 col-lg-10">
                        <label for="contact-address" class="caption">Endereço</label>
                        <input type="text" name="address" v-model="formData.address" v-on:keypress="changeFormData({'name' : $event.target.name, 'value' : $event.target.value})" class="form-control" v-bind:class="errors.includes('address') ? 'is-invalid' : ''" id="contact-address" placeholder="Endereço" maxlength="200">
                        <small id="contact-address-error" class="form-text caption invalid-feedback">Campo obrigatório.</small>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-12 col-md-6 col-lg-6">
                        <label for="contact-city" class="caption">Cidade</label>
                        <input type="text" name="city" v-model="formData.city" v-on:keypress="changeFormData({'name' : $event.target.name, 'value' : $event.target.value})" class="form-control" v-bind:class="errors.includes('city') ? 'is-invalid' : ''" id="contact-city" placeholder="Cidade"/>
                    </div>
                </div>

                <div class="row">
                    <div class="form-group col-12 col-md-5">
                        <label for="contact-district" class="caption">Bairro</label>
                        <input type="text" name="district" v-model="formData.district" v-on:keypress="changeFormData({'name' : $event.target.name, 'value' : $event.target.value})" class="form-control" value="999999" data-mask="00/00/0000" id="contact-district" placeholder="Bairro" maxlength="150">
                    </div>
                    <div class="form-group col-12 col-md-4">
                        <label for="contact-state" class="caption">Estado</label>
                        <select class="form-control" v-model="formData.state" v-on:change="changeFormData({'name' : $event.target.name, 'value' : $event.target.value})" name="state" id="contact-state">
                            <option value='null'>Selecione</option>
                            <option value="AC">Acre</option>
                            <option value="AL">Alagoas</option>
                            <option value="AP">Amapá</option>
                            <option value="AM">Amazonas</option>
                            <option value="BA">Bahia</option>
                            <option value="CE">Ceará</option>
                            <option value="DF">Distrito Federal</option>
                            <option value="ES">Espírito Santo</option>
                            <option value="GO">Goiás</option>
                            <option value="MA">Maranhão</option>
                            <option value="MT">Mato Grosso</option>
                            <option value="MS">Mato Grosso do Sul</option>
                            <option value="MG">Minas Gerais</option>
                            <option value="PA">Pará</option>
                            <option value="PB">Paraíba</option>
                            <option value="PR">Paraná</option>
                            <option value="PE">Pernambuco</option>
                            <option value="PI">Piauí</option>
                            <option value="RJ">Rio de Janeiro</option>
                            <option value="RN">Rio Grande do Norte</option>
                            <option value="RS">Rio Grande do Sul</option>
                            <option value="RO">Rondônia</option>
                            <option value="RR">Roraima</option>
                            <option value="SC">Santa Catarina</option>
                            <option value="SP">São Paulo</option>
                            <option value="SE">Sergipe</option>
                            <option value="TO">Tocantins</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
        <div class="modal-footer">
            <router-link to="/contacts" class="btn btn-secondary" tag="button">Cancelar</router-link>
            <button type="button" id="contacts-modal-save" class="btn btn-primary" v-on:click="checkContact" v-bind:disabled="errors.length > 0">Salvar</button>
        </div>
    </app-modal>
</template>

<script>
    var $ = require( 'jquery' );

    import AppModal from './AppModal.vue';
    import { mapGetters, mapActions, mapMutations } from 'vuex'

    export default {
        data(){
            return {
                formData : {}
            }
        },
        computed: {
            ...mapGetters({
                errors : 'getErrors',
                getFormData : 'getFormData'
            })
        },
        methods: {
            ...mapActions({
                checkContact : 'checkContact',
                changeFormData : 'changeFormData',
                setEditFormData : 'setEditFormData'
            }),
            ...mapMutations({
                clearFormData: 'clearFormData'
            }),
        },
        created(){
            if(!$(`[data-id=${this.$route.params.id}]`).hasClass('table-active')){
                $(`[data-id=${this.$route.params.id}]`).addClass('table-active-2');
            }
    
            let form = this.setEditFormData(this.$route.params.id);
            form.then(r => {
                this.formData = r;
            });
        },
        beforeRouteLeave (to, from, next) {
            $('.table-active-2').removeClass('table-active-2');
            this.clearFormData();
            next();
        },
        components: { AppModal },
        name: "AppContactsModalContentEdit",
    };
</script>