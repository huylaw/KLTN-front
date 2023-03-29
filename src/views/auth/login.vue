<template>
    <div class="login">
        <div class="border-bottom">
            <h3 class="">Đăng nhập</h3>
        </div>
        <form @submit.prevent="login">
            <div class="mt-2">
                <label>Tên đăng nhập<span class="text-danger">(*)</span></label>
                <div class="input">
                    <i class="material-icons">person</i>
                    <input v-model="username" type="text" placeholder="Tên đăng nhập" required/>
                </div>
            </div>
            <div class="mt-2">
                <label>Mật khẩu<span class="text-danger">(*)</span></label>
                <div class="input">
                    <i class="material-icons">key</i>
                    <input v-model="password" :type="type" placeholder="Mật khẩu" required/>
                    <div class="eye bg-white h-100 d-flex justify-content-center flex-column">
                        <i class="material-icons" @click="showPass">{{ eye }}</i>
                    </div>
                </div>
            </div>
            <div class="mt-4 w-100">
                <button type="submit">Đăng nhập</button>
            </div>
            <div class="mt-3 d-flex justify-content-between">
                <router-link to="/change-pass">Quên mật khẩu</router-link>
                <router-link to="/register">Đăng ký</router-link>
            </div>
        </form>
        <b-overlay :show="show" no-wrap></b-overlay>
    </div>
</template>

<script>
import router from '@/router'

export default {
    data(){
        return{
            bool: true,
            type: 'password',
            eye: 'visibility',
            username: '',
            password: '',
            show: false,
        }
    },
    methods: {
        showPass(){
            this.bool = !this.bool;
            if(this.bool == false){
                this.type = 'text';
                this.eye = 'visibility_off';
            }else{
                this.type = 'password';
                this.eye = 'visibility';
            }
        },
        async login(){
            this.show = true;
            await this.$store.dispatch('login', {username: this.username, password: this.password}).then(() => {
                this.$bvToast.toast('Success', {
                    title: 'Đăng nhập thành công',
                    variant: 'success',
                    solid: true
                })
                //console.log(this.$store.getters.getUser.role);
                setTimeout(()=>{
                    if(this.$store.getters.getUser.role == 0){
                        router.push({name:'home'})
                    }else{
                        router.push({name:'home-member'})
                    }
                }, 400);
                //console.log(this.$store.getters.getUser);
                //console.log(typeof this.$store.getters.getUser);
            }).catch(() => {
                this.$bvToast.toast('Kiểm tra lại thông tin đăng nhập',{
                    title: 'Đăng nhập thất bại',
                    variant: 'danger',
                    solid: true
                });
            })
            this.show = false;
        }
    }
}
</script>

<style scoped>
.login{
    border: 1px solid yellow;
    border-radius: 20px;
    background-color: white;
    width: 380px;
    padding: 20px 30px;
}
input{
    width: 100%;
    height: 100%;
    border: none;
    padding-left: 10px;
    /* border-left: 2px solid yellow; */
}
*:focus{
    outline: none;
}
.input{
    height: 40px;
    display: flex;
    align-items: center;
    border: 2px solid brown;
    border-radius: 5px;
    background-color: #ccc;
}
.input i{
    padding: 0 5px;
}
.eye i{
    cursor: pointer;
}
button{
    width: 100%;
    border: 2px solid brown;
    color: brown;
    padding: 10px 0;
    background-color: transparent;
    border-radius: 10px;
}
button:hover{
    background-color: brown;
    color: white;
}
</style>