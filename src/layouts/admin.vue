<template>
    <div class="layout">
        <div class="fixed-top">
            <Header/>
        </div>
        <div class="content">
            <div class="sidebar-menu" :style="{ width: width }">
                <div :class="head_sidebar">
                    <h4 v-if="this.bol===true" class="mb-0">Menu</h4>
                    <div class="d-flex flex-column justify-content-center"><feather type="menu"/></div>
                    <div class="feather" :style="{ left: width}" @click="setWidth"><feather :type="type_icon"/></div>
                </div>
                <!-- <Sidebar/> -->
                <div class="sidebar text-nowrap">
                    <ul v-if="this.bol===true">
                        <li v-for="(i, index) in menu" :key="index">
                            <div v-if="i.link === '/'">
                                <router-link :to="i.link" active-class="active" exact><feather style="margin-right: 10px" :type="i.icon"/>{{ i.name }}</router-link>
                            </div>
                            <div v-else>
                                <router-link :to="i.link" active-class="active"><feather style="margin-right: 10px" :type="i.icon"/>{{ i.name }}</router-link>
                            </div>
                        </li>
                    </ul>
                    <ul v-else>
                        <li v-for="(i, index) in menu" :key="index">
                            <div v-if="i.link === '/'">
                                <router-link :to="i.link" active-class="active" exact><feather :type="i.icon"/></router-link>
                            </div>
                            <div v-else>
                                <router-link :to="i.link" active-class="active"><feather :type="i.icon"/></router-link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="main" :style="{ 'margin-left': width  }">
                <router-view/>
                <!-- <Footer/> -->
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../components/layout/Header.vue'
import Footer from '../components/layout/Footer.vue'
//import Sidebar from '../components/layout/Sidebar.vue'

export default {
    components: {
        Header, Footer,
    },
    data(){
        return {
            bol: true,
            width: '220px',
            menu: [
                { link: '/', name: 'Dòng họ', icon: 'clipboard' },
                { link: '/genealogy', name: 'Phả đồ', icon: 'map' },
                { link: '/member', name: 'Thành viên', icon: 'users' },
                // { link: '/statistical', name: 'Thống kê', icon: 'calendar' },
                { link: '/bank', name: 'Quỹ họ', icon: 'dollar-sign' },
                { link: '/event', name: 'Sự kiện', icon: 'award' },
                { link: '/feedback', name: 'Phản hồi', icon: 'command' }
            ],
            head_sidebar: 'head-sidebar-1',
            type_icon: 'chevrons-left'
        }
    },
    methods: {
        setWidth(){
            this.bol = !this.bol;
            if(this.bol === true){
                this.width = '220px';
                this.head_sidebar = 'head-sidebar-1';
                this.type_icon = 'chevrons-left';
            }else{
                this.width = '80px';
                this.head_sidebar = 'head-sidebar-2';
                this.type_icon = 'chevrons-right';
            }
        }
    }
}
</script>

<style scoped>
.content{
    margin-top: 55px;
}
.layout{
    height: 100vh;
}
.sidebar-menu{
    position: fixed;
    z-index: 1;
    height: 100%;
    /* overflow-x: hidden; */
    /* width: 220px; */
    box-shadow: 0px 0px 2px 1px #999999;
    transition: 0.5s;
}
.main{
    /* margin-left: 220px; */
    padding: 0 10px;
    transition: 0.5s;
}
.head-sidebar-1{
    background-color: #f8f8f8;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
}
.head-sidebar-2{
    background-color: #f8f8f8;
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
}
.feather{
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-radius: 50%;
    background-color: #4876FF;
    color: white;
    padding: 3px;
    z-index: 1;
    position: absolute;
    top: 55px;
    margin-left: -15px;
    transition: 0.5s;
}
.feather:hover{
    cursor: pointer;
    background-color: blueviolet;
}
/* .sidebar{
    background-color: #D7D7D7; */
    /* background-color: #f8f8f8;
} */
ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}

li{
    width: 100%;
}

li a{
    display: flex;
    text-align: center;
    text-decoration: none;
    color: black;
    padding: 20px 15px;
    margin: 5px 0;
}

li a:hover {
    background-color: #4876FF;
    color: white;
    border-radius: 10px;
}

li .active{
    background-color: #4876FF;
    color: white;
    border-radius: 10px;
}
</style>