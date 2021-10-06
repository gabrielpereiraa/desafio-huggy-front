<template>
    <app-modal class="modal-alert">
        <div class="text-center">
            <div class="svg-box" v-if="modalAlert.type == 'success'">
                <svg class="circular green-stroke">
                    <circle class="path" cx="75" cy="75" r="50" fill="none" stroke-width="5" stroke-miterlimit="10"/>
                </svg>
                <svg class="checkmark green-stroke">
                    <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-489.57,-205.679)">
                        <path class="checkmark__check" fill="none" d="M616.306,283.025L634.087,300.805L673.361,261.53"/>
                    </g>
                </svg>
            </div>

            <div class="svg-box" v-if="modalAlert.type == 'error'">
                <svg class="circular red-stroke">
                    <circle class="path" cx="75" cy="75" r="50" fill="none" stroke-width="5" stroke-miterlimit="10"/>
                </svg>
                <svg class="cross red-stroke">
                    <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-502.652,-204.518)">
                        <path class="first-line" d="M634.087,300.805L673.361,261.53" fill="none"/>
                    </g>
                    <g transform="matrix(-1.28587e-16,-0.79961,0.79961,-1.28587e-16,-204.752,543.031)">
                        <path class="second-line" d="M634.087,300.805L673.361,261.53"/>
                    </g>
                </svg>
            </div>

            <div class="svg-box" v-if="modalAlert.type == 'info'">
                <svg class="circular yellow-stroke">
                    <circle class="path" cx="75" cy="75" r="50" fill="none" stroke-width="5" stroke-miterlimit="10"/>
                </svg>
                <svg class="alert-sign yellow-stroke">
                    <g transform="matrix(1,0,0,1,-615.516,-257.346)">
                        <g transform="matrix(0.56541,-0.56541,0.56541,0.56541,93.7153,495.69)">
                            <path class="line" d="M634.087,300.805L673.361,261.53" fill="none"/>
                        </g>
                        <g transform="matrix(2.27612,-2.46519e-32,0,2.27612,-792.339,-404.147)">
                            <circle class="dot" cx="621.52" cy="316.126" r="1.318" />
                        </g>
                    </g>
                </svg>
            </div>
            <div class="mb-2">
                <h1 class="shaft-700"> {{ modalAlert.title }} </h1>
                <p>{{ modalAlert.msg }}</p>
            </div>
            <button class="btn btn-primary mb-4" v-show="modalAlert.btnLink == ''" v-on:click="hide">Fechar</button>
            <router-link :to="modalAlert.btnLink" class="btn btn-primary mb-4" v-show="modalAlert.btnLink != ''"  v-on:click.native="initHide()" tag="button">Fechar</router-link>
        </div>
    </app-modal>
</template>

<script>
    import AppModal from './AppModal.vue';

    import { mapGetters, mapMutations } from 'vuex';

    export default {
        computed: {
            ...mapGetters({
                modalAlert: 'getModalAlert'
            })
        },
        methods: {
            ...mapMutations({
                hide: 'hideModalAlert' 
            }),
            initHide(){ 
                let slf = this;
                if(this.modalAlert.btnLink != ''){
                    setTimeout(function(){
                        slf.hide()
                    }, 250);
                }else{
                    this.hide();
                }
                
            }
        },
        components: { AppModal },
        name: "AppModalAlert",
    };
</script>