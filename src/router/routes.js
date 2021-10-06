import Vue from 'vue'
import VueRouter from 'vue-router'
//import PortalVue from "portal-vue";

import Login from './../components/AppLogin'
import Contacts from './../components/AppContacts'
import ContactsModalCreate from './../components/AppContactsModalCreate'
import ContactsModalShow from './../components/AppContactsModalShow'
import ContactsModalEdit from './../components/AppContactsModalEdit'
import ContactsModalDelete from './../components/AppContactsModalDelete'

Vue.use(VueRouter);
//Vue.use(PortalVue);

export default new VueRouter({
    linkExactActiveClass: 'link-active',
    routes: [{
        path: '/',
        component: Login
    },
    {
        path: '/contacts',
        component: Contacts,
        children: [
            {
                path: 'create',
                component: ContactsModalCreate
            },
            {
                path: ':id',
                component: ContactsModalShow
            },
            {
                path: 'edit/:id',
                component: ContactsModalEdit
            },
            {
                path: 'delete/:id',
                component: ContactsModalDelete
            }
        ]
    }],
    mode: 'history'
});