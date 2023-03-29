<template>
    <div class="d-flex justify-content-between align-item-center p-1"
        style="background-color: #E8E8E8"
    >
        <img alt="Ảnh logo" src="@/assets/image/logo_title.jpg"/>
        <div>
            <b-dropdown variant="link" size="sm" right no-caret>
                <template #button-content>
                    <b-avatar variant="info" :src="user.avatar"></b-avatar>
                </template>
                <b-dropdown-item @click="profile(user.id_user)">
                    <span class="d-flex align-items-center py-1">
                        <feather class="mr-2" type="user"/> Cá nhân
                    </span>
                </b-dropdown-item>
                <b-dropdown-item @click="logout">
                    <span class="d-flex align-items-center py-1">
                        <feather class="mr-2" type="log-out"/> Đăng suất
                    </span>
                </b-dropdown-item>
            </b-dropdown>
        </div>
    </div>
</template>

<script>
import router from '@/router';
import { feather } from 'feather-icons';

export default {
    computed: {
        user(){
            return this.$store.getters.getUser;
        }
    },
    methods: {
        async logout(){
            await localStorage.clear();
            router.go('/');
        },
        profile(id){
            this.$router.push('/profile');
        }
    }
}
</script>

<style scoped>
img{
    width: 50px;
    height: 50px;
    margin-left: 12px;
}
</style>