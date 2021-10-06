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
            state: null,
            initials: null
        },
        //formErrors: ['name','email','phone','cell','address'],
        formErrors: [],
        contacts: [
            {
                id: 1,
                name: 'Gabriel da Silva Pereira Junior' ,
                email: 'gabriel@hotmail.com',
                cell: '(14)99784-6430',
                phone: '(14)3344-2021',
                address: 'Rua teste, 59',
                district: 'Bairro teste',
                city: 'Cidade teste',
                state: 'SP',
                profileImg: 'huggy.png',
                initials: 'GS'
            },
        ],
    },
    getters: {
        getContacts(state){
            return state.contacts;
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
        changeFormData(context, field){
            context.commit(`setFormData`, field);
            context.commit(`setInitials`);
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

        async commitContact({dispatch, commit, state}){

            let id = state.formData.id;
            let responseMsg = "";
            let mttion;

            if(id){
                console.log('requisição para editar');
                responseMsg = "Contado alterado com sucesso.";
                mttion = 'updateContact';
            }else{
                console.log('requisição para salvar');
                id = 10;
                responseMsg = "Novo contato adicionado com sucesso.";
                mttion = 'saveContact';
            }

            commit(mttion, {
                id          : id,
                name        : state.formData.name,
                email       : state.formData.email,
                cell        : state.formData.cell,
                phone       : state.formData.phone,
                address     : state.formData.address,
                district    : state.formData.district,
                city        : state.formData.city,
                state       : state.formData.state,
                profileImg  : '',
                initials    : state.formData.initials
            });

            if(mttion == 'saveContact'){
                commit(`clearFormData`);
            }

            dispatch('showSuccess', { msg: responseMsg});
        },

        async removeContact({dispatch, commit}, id){
            console.log('requisição para excluir');
            
            commit(`deleteContact`, id);

            dispatch('showSuccess', { msg: 'Contato deletado com sucesso.', link: '/contacts'});
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
                state: null,
                initials: null
            };
        },

        setFormData(state, newValue){
            const index = state.formErrors.indexOf(newValue.name);
            if(index >= 0 && newValue.value != ''){
                state.formErrors.splice(index, 1);
            }

            state.formData[newValue.name] = newValue.value;
        },

        setInitials(state){
            var name = state.formData.name;
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
            state.formData.initials = initials.toUpperCase();
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
    },
}