<template>
    <div class="sidebar">
        <!-- <div class="head-sidebar">
            <h4>Menu</h4>
            <div class="feather"><feather type="menu"/></div>
        </div> -->
        <ul>
            <li v-for="(i, index) in menu" :key="index">
                <div v-if="i.link === '/'">
                    <router-link :to="i.link" active-class="active" exact><feather style="margin-right: 10px" :type="i.icon"/>{{ i.name }}</router-link>
                </div>
                <div v-else>
                    <router-link :to="i.link" active-class="active"><feather style="margin-right: 10px" :type="i.icon"/>{{ i.name }}</router-link>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data(){
        return{
            menu: [
                { link: '/', name: 'Dòng họ', icon: 'clipboard' },
                { link: '/genealogy', name: 'Phả đồ', icon: 'map' },
                { link: '/member', name: 'Thành viên', icon: 'users' },
                { link: '/statistical', name: 'Thống kê', icon: 'calendar' },
                { link: '/bank', name: 'Quỹ họ', icon: 'dollar-sign' },
                { link: '/event', name: 'Sự kiện', icon: 'award' },
                { link: '/feedback', name: 'Phản hồi', icon: 'command' }
            ]
        }
    }
}
</script>

<style scoped>
.sidebar{
    /* background-color: #D7D7D7; */
    background-color: #f8f8f8;
}
/* .head-sidebar{
    background-color: #FFE4B5;
    padding: 15px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.head-sidebar .feather:hover{
    cursor: pointer;
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