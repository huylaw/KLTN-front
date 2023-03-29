<template>
    <div>
        <breadcrumb :breadcrumb_title="breadcrumb_title"/>
        <div class="mx-3">
            <b-tabs 
                content-class="mt-3"
                active-nav-item-class="text-danger font-weight-bold"
            >
                <b-tab title="Thông tin" active>
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
                </b-tab>
                <b-tab title="Chỉnh sửa thông tin">
                    <div class="d-flex justify-content-between">
                        <div class="col">
                            <FormulateInput
                                v-model="data.information"
                                label="Lịch sử dòng họ"
                                placeholder="Nội dung"
                                type="textarea"
                                validation="required"
                                rows="20"
                            />
                        </div>
                        <div class="col">
                            <FormulateInput
                                v-model="data.clan_rules"
                                label="Nội quy dòng họ"
                                placeholder="Nội dung"
                                type="textarea"
                                validation="required"
                                rows="20"
                            />
                        </div>
                    </div>
                    <div class="my-3 text-right">
                        <b-button class="mr-5" variant="primary" @click="Submit">Ghi nhận</b-button>
                    </div>
                </b-tab>
            </b-tabs>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import breadcrumb from '@/components/layout/Breadcrumb.vue'

export default {
    components: {
        breadcrumb
    },
    data(){
        return{
            breadcrumb_title: "Thông tin dòng họ",
            data: {},
        }
    },
    mounted(){
        this.loadData();
    },
    methods: {
        async Submit(){
            await axios.put('http://localhost:3000/api/clan_information', this.data).then(() => {
                this.$bvToast.toast('Success', {
                    title: 'Cập nhật thông tin thành công',
                    variant: 'success',
                    solid: true
                })
            }).catch(() => {
                this.$bvToast.toast('Lỗi',{
                    title: 'Cập nhật thông tin thất bại',
                    variant: 'danger',
                    solid: true
                });
            });

            this.loadData();
        },
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
    font-size: 18px;
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