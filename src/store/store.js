import Vue from 'vue'
import Vuex from 'vuex'

import contactModule from './modules/contactModule'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        modalAlert: {
            title: 'Atenção',
            msg: 'Ocorreu um erro',
            type: 'success',
            show: false
        }
    },
    getters: {
        getModalAlert(state){
            return state.modalAlert;
        }
    },
    mutations: {
        hideModalAlert(state){
            state.modalAlert.show = false;
        }
    },
    modules: {
        contactModule
    }
});
