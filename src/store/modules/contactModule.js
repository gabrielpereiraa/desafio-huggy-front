export default {
    state: {
        formData: {
            name: null,
            email: null,
            cell: null,
            phone: null,
            address: null,
            district: null,
            state: null,
            initials: null
        },
        //formErrors: ['name','email','phone','cell','address'],
        formErrors: [],
        contacts: [
            {
                id: 1,
                name: 'Gabriel da Silva' ,
                email: 'gabriel@hotmail.com',
                cell: '(14)99784-6430',
                phone: '(14)3344-2021',
                address: 'Rua teste, 59',
                district: 'Bairro teste',
                state: 'SP',
                profileImg: 'huggy.png',
                initials: 'GS'
            },
            {
                id: 2,
                name: 'Jorginho pereira',
                email: 'jorge@hotmail.com',
                cell: '(14)98720-6440',
                phone: '(14)3114-2021',
                address: 'Rua teste, 52',
                district: 'Bairro teste',
                state: 'BA',
                profileImg: '',
                initials: 'JP'
            }
        ]
    },
    getters: {
        getContacts(){
            return [];
        },
        getErrors(state){
            return state.formErrors;
        },
        getFormData(state){
            return state.formData;
        }
    },
    actions: {
        changeFormData(context, field){
            context.commit(`setFormData`, field);
            context.commit(`setInitials`);
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

        async commitContact({rootState, commit, state}){
            console.log('requisição para salvar');

            commit(`saveContact`, {
                id          : 3,
                name        : state.formData.name,
                email       : state.formData.email,
                cell        : state.formData.cell,
                phone       : state.formData.phone,
                address     : state.formData.address,
                district    : state.formData.district,
                state       : state.formData.state,
                profileImg  : '',
                initials    : state.formData.initials
            });

            commit(`clearFormData`);

            rootState.modalAlert.show = 1;
            rootState.modalAlert.msg = "Novo contato adicionado";
            rootState.modalAlert.type = "success";
            rootState.modalAlert.title = "Sucesso!" 
        },

        validEmail({state}){
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(state.formData.email);
        }
    },
    mutations: {
        clearFormData(state){
            state.formData = [];
        },

        setFormData(state, newValue){
            const index = state.formErrors.indexOf(newValue.name);
            if(index >= 0 && newValue.value != ''){
                state.formErrors.splice(index, 1);
            }

            state.formData[newValue.field] = newValue.value;
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
        }
    },
}