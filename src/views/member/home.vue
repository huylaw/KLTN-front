<template>
    <div>
        <breadcrumb :breadcrumb_title="breadcrumb_title"/>
        <div>
            <div class="tab-information">
                        <div class="mb-5">
                            <h4 class="mb-5 text-center">Lịch sử dòng họ</h4>
                            <div class="information">
                                <pre>{{ data.information }}</pre>
                            </div>
                        </div>
                        <div>
                            <h4 class="mb-5 text-center">Nội quy dòng họ</h4>
                            <div class="clan-rules">
                                <pre>{{ data.clan_rules }}</pre>
                            </div>
                        </div>
                    </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import breadcrumb from '@/components/layout/Breadcrumb.vue'
export default {
    components: {
        breadcrumb,
    },
    data(){
        return{
            breadcrumb_title: 'Trang chủ',
            data: {},
        }
    },
    mounted(){
        this.loadData();
    },
    methods: {
        async loadData(){
            try{
                const data = await axios.get('http://localhost:3000/api/clan_information');
                this.data = data.data.result[0];
                //console.log(this.data)
            }catch(error){
                console.log(error);
            }
        }
    }
}
</script>

<style scoped>
pre{
    font-family: sans-serif;
    width: 75%;
    font-size: 16px;
    white-space: pre-wrap;
    tab-size: 6;
}
.information, .clan-rules{
    min-height: 200px;
    display: flex;
    justify-content: center;
}
.tab-information{
    /* background-image: url('@/assets/image/paper.jpg');
    background-size: cover; */
    background-color: #F5F5DC;
    padding: 20px;
}
</style>