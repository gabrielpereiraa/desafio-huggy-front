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

//guard clause
const router = new VueRouter({
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

router.beforeResolve((to, from, next) => {
    let data = router.app.$store.state;

    let isLoggedIn = data.isLogged;
    let jwt = data.jwt.value;
    let expiresIn = data.jwt.expiresIn;

    if(to.path == '/'){
        next();
    }else{
        if(isLoggedIn){
            var dateExpiresIn = new Date(expiresIn * 1000);
            var dateNow = new Date();

            if(jwt == "" || expiresIn == ""){
                next("/");
            }else if(dateNow > dateExpiresIn){
                next("/");
            }else{
                next();
            }
        }else{
            next("/");
        }
    }
});

export default router;