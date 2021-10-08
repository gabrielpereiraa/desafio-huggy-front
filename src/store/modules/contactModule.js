import axios from 'axios';

export default {
    state: {
        formData: {
            name: null,
            email: null,
            cell: null,
            phone: null,
            address: null,
            district: null,
            city: null,
            state: null
        },
        formErrors: [],
        contacts: [],
        filterContacts: []
    },
    getters: {
        getContacts(state){
            return state.contacts;
        },
        getFilterContacts(state){
            return state.filterContacts;
        },
        getErrors(state){
            return state.formErrors;
        },
        getFormData(state){
            return state.formData;
        },
        getContact: state => id =>{
            let contact = state.contacts.find(item => {
                return (item.id == id)
            });
            return contact;
        }
    },
    actions: {

        async getContacts({ commit, rootState, dispatch }) {
            axios.get(`${process.env.VUE_APP_API_HOST}/contacts`, { headers: {
                'Content-Type': 'application/json',
                'Authorization': `${rootState.jwt.type} ${rootState.jwt.value}`
            }})
            .then((response) => {
                commit('setFilterContacts', response.data)
                commit('setContacts', response.data)
            })
            .catch(() => {
                dispatch('showError', { msg: 'Erro ao listar os contatos. Tente novamente.', link: '/'});
            })
        },

        changeFormData(context, field){
            context.commit(`setFormData`, field);
        },

        setEditFormData({getters, state}, id){
            let contact = getters.getContact(id);
            state.formData = {
                id: contact.id,
                name: contact.name,
                email: contact.email,
                cell: contact.cell,
                phone: contact.phone,
                address: contact.address,
                city: contact.city,
                district: contact.district,
                state: contact.state,
                profileImg: contact.profileImg,
                initials: contact.initials
            }
            return state.formData;
        },

        async checkContact({state, dispatch}){

            if(!state.formData.name) {
                state.formErrors.push('name');
            }else if(state.formData.name.length < 5){
                state.formErrors.push('name');
            }

            if(!state.formData.email) {
                state.formErrors.push('email');
            }else{
                await dispatch('validEmail')
                    .then(result =>  { 
                        if(!result){
                            state.formErrors.push('email');
                        }      
                    })
                    .catch(() => {
                        state.formErrors.push('email');
                    });  
            }

            if(!state.formData.phone){
                state.formErrors.push('phone');
            }else{
                var phone = state.formData.phone.replace(/[^\d]+/g,'');
                if(phone.length <= 0){
                    state.formErrors.push('phone');
                }else if(phone.length != 10){
                    state.formErrors.push('phone');
                }
            }

            if(!state.formData.cell){
                state.formErrors.push('cell');
            }else{
                var cell = state.formData.cell.replace(/[^\d]+/g,'');
                if(cell.length <= 0){
                    state.formErrors.push('phcellone');
                }else if(cell.length < 10){
                    state.formErrors.push('cell');
                }
            }

            if(state.formErrors.length > 0){
                return false;
            }else{
                dispatch('commitContact');
            }
        },

        async commitContact({dispatch, commit, state, rootState}){

            let id = state.formData.id;
            let response;
            let mttions = '';

            if(id){
                mttions = 'updateContact';
                response = await axios.put(`${process.env.VUE_APP_API_HOST}/contacts/${id} `,
                    state.formData, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${rootState.jwt.type} ${rootState.jwt.value}`
                        }
                    }
                )
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    if(error.response.data.message){
                        return error.response.data.message;
                    }else{
                        return error.message;
                    }
                });
            }else{
                mttions = 'saveContact';
                response = await axios.post(`${process.env.VUE_APP_API_HOST}/contacts `,
                    state.formData, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `${rootState.jwt.type} ${rootState.jwt.value}`
                        }
                    }
                )
                .then((response) => {
                    return response.data;
                })
                .catch((error) => {
                    if(error.response.data.message){
                        return error.response.data.message;
                    }else{
                        return error.message;
                    }
                });
            }

            if(response.contactId){
                commit(mttions, {
                    id          : response.contactId,
                    name        : state.formData.name,
                    email       : state.formData.email,
                    cell        : state.formData.cell,
                    phone       : state.formData.phone,
                    address     : state.formData.address,
                    district    : state.formData.district,
                    city        : state.formData.city,
                    state       : state.formData.state,
                    profileImg  : ''
                });

                if(mttions == 'saveContact'){
                    commit(`clearFormData`);
                }
                dispatch('showSuccess', { msg: response.message});
            }else{
                dispatch('showError', { msg: response });
            }
        },

        async removeContact({dispatch, commit, rootState}, id){
            const response = await axios.delete(`${process.env.VUE_APP_API_HOST}/contacts/${id} `,             {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${rootState.jwt.type} ${rootState.jwt.value}`
                    }
                }
            )
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                if(error.response.data.message){
                    return error.response.data.message;
                }else{
                    return error.message;
                }
            });

            if(response.contactId){
                commit(`deleteContact`, id);
                dispatch('showSuccess', { msg: response.message, link: '/contacts'});
            }else{
                dispatch('showError', { msg: response, link: '/contacts' });
            }
        },  

        validEmail({state}){
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(state.formData.email);
        }
    },
    mutations: {
        setContacts(state, newValue){
            state.contacts = newValue;
        },

        setFilterContacts(state, newValue){
            state.filterContacts = newValue;
        },

        clearFormData(state){
            state.formData = {
                id: null,
                name: null,
                email: null,
                cell: null,
                phone: null,
                address: null,
                district: null,
                city: null,
                state: null
            };
        },

        setFormData(state, newValue){
            const index = state.formErrors.indexOf(newValue.name);
            if(index >= 0 && newValue.value != ''){
                state.formErrors.splice(index, 1);
            }

            state.formData[newValue.name] = newValue.value;
        },

        saveContact(state, newContact){
            state.contacts.push(newContact);
        },

        updateContact(state, updatedContact){
            var index = state.contacts.findIndex(function(item){
                return item.id == state.formData.id;
            });
            
            state.contacts[index].id = updatedContact.id;
            state.contacts[index].name = updatedContact.name;
            state.contacts[index].email = updatedContact.email;
            state.contacts[index].cell = updatedContact.cell;
            state.contacts[index].phone = updatedContact.phone;
            state.contacts[index].address = updatedContact.address;
            state.contacts[index].district = updatedContact.district;
            state.contacts[index].city = updatedContact.city;
            state.contacts[index].state = updatedContact.state;
            state.contacts[index].initials = updatedContact.initials;
        },

        deleteContact(state, idContact){
            var index = state.contacts.findIndex(function(item){
                return item.id == idContact;
            });

            if (index !== -1) state.contacts.splice(index, 1);
        }
    }
}