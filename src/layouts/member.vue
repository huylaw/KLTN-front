<template>
    <div>
        <div class="sticky-top">
            <Header/>
            <div class="sidebar-menu">
                <ul class="text-nowrap">
                    <li v-for="(i, index) in menu" :key="index">
                        <div>
                            <router-link :to="i.link">{{ i.name }}</router-link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="content p-4">
            <router-view />
        </div>
        <Footer/>
    </div>
</template>

<script>
import Header from '../components/layout/Header.vue'
import Footer from '../components/layout/Footer.vue'
import Sidebar from '../components/layout/Sidebar.vue'

export default {
    components: {
        Header, Footer, Sidebar
    },
    data(){
        return{
            menu: [
                { link: '/member-home', name: 'TRANG CHỦ' },
                { link: '/genealogy', name: 'PHẢ ĐỒ' },
                { link: '/list-member', name: 'THÀNH VIÊN' },
                { link: '/statistical', name: 'THỐNG KÊ'},
                { link: '/member-events', name: 'SỰ KIỆN' },
                { link: '/member-feedback', name: 'PHẢN HỒI' }
            ]
        }
    }
}
</script>

<style scoped>
.sidebar-menu{
    display: flex;
    justify-content: center;
    background-color: #F5F5F5;
    /* border-bottom: 1px solid #4876FF; */
    /* border-left: none;
    border-right: none; */
    padding-bottom: 10px;
}
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    font-size: 15px;
}

li{
    margin: 10px 15px 0;
}

li a{
    text-decoration: none;
    color: #9C9C9C;
    font-weight: 500;
}

li a:hover {
    color: #4876FF;
}

li .router-link-exact-active{
    color: #4876FF;
}
</style>