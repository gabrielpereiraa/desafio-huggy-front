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
            show: false,
            btnLink : ''
        },
        jwt: {
            value: '',
            type: '',
            expiresIn: '',
        },
        isLogged: false
    },
    getters: {
        getModalAlert(state){
            return state.modalAlert;
        }
    },
    actions: {
        showSuccess({commit}, options){
            commit('commitAlert', {
                title : options.title ? options.title : 'Sucesso!',
                msg : options.msg,
                type : 'success',
                show : 1,
                btnLink : options.link ? options.link : ''
            })
        },
        showError({commit}, options){
            commit('commitAlert', {
                title : options.title ? options.title : 'Atenção!',
                msg : options.msg,
                type : 'error',
                show : 1,
                btnLink : options.link ? options.link : ''
            })
        },
    },
    mutations: {
        hideModalAlert(state){
            state.modalAlert.show = false;
        },
        commitAlert(state, alert){
            state.modalAlert = alert;
        }
    },
    modules: {
        contactModule
    }
});
