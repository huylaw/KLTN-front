<template>
    <div>
        <breadcumb :breadcrumb_title="breadcrumb_title"/>
        <div class="mx-3">
            <b-tabs content-class="mt-3" active-nav-item-class="text-danger font-weight-bold">
                <b-tab title="Đăng bài" active>
                    <div class="mx-3">
                        <b-button variant="primary" size="sm" @click="New">Đăng sự kiện</b-button>
                        <b-row>
                            <b-col cols="12">
                                <div class="list-event border rounded mt-3 p-3 shadow-lg bg-body">
                                    <span v-for="(event, index) in data_event" :key="index">
                                        <div class="border rounded mb-3 p-3">
                                            <div class="d-flex align-items-center justify-content-between pb-2">
                                                <span class="d-flex align-items-end">
                                                    <img :src="user.avatar" width="40px" height="40px" class="rounded-circle"/>
                                                    <div class="ml-2">
                                                        <div style="font-weight: bold; font-size: 15px; margin-bottom: -5px;">{{ user.name }}</div>
                                                        <span style="font-size: 12px">
                                                            {{ event.date }}
                                                            <span class="ml-1" v-if="event.edit === 1">(Đã chỉnh sửa)</span>
                                                        </span>
                                                    </div>
                                                </span>
                                                <span>
                                                    <b-dropdown size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
                                                        <template #button-content>
                                                            <div class="d-flex justify-content-center"><feather type="more-horizontal"/></div>
                                                        </template>
                                                        <b-dropdown-item @click="Edit(event)">
                                                            <span class="d-flex align-items-center">
                                                                <feather class="mr-2" type="edit" size="16px"/>Chỉnh sửa
                                                            </span>
                                                        </b-dropdown-item>
                                                        <b-dropdown-item @click="Delete(event)">
                                                            <span class="d-flex align-items-center">
                                                                <feather class="mr-2" type="trash" size="16px"/>Xóa sự kiện
                                                            </span>
                                                        </b-dropdown-item>
                                                    </b-dropdown>
                                                </span>
                                            </div>
                                            <div class="mt-2 pb-2 border-bottom"><pre>{{ event.content }}</pre></div>
                                            <div class="comment d-flex justify-content-center align-items-center mt-3">
                                                <feather size="19px" type="message-square"/>
                                                <span class="ml-1">Bình luận</span>
                                            </div>
                                        </div>
                                    </span>
                                </div>        
                            </b-col>
                        </b-row>
                    </div>
                </b-tab>
                <b-tab title="Duyệt bài"></b-tab>
            </b-tabs>
        </div>
        <b-modal id="modal-event" scrollable :title="getTitle()" hide-footer>
            <FormulateForm @submit="Submit">
                <!--modal content-->
                <b-row>
                    <b-col cols="12">
                        <FormulateInput 
                            v-model="currientItems['content']"
                            label="Nội dung sự kiện"
                            placeholder="Nhập nội dung..."
                            type="textarea"
                            rows="9"
                            validation="required"
                        />
                    </b-col>
                </b-row>
                <div class="modal-footer mt-3 pt-3 pb-0">
                    <b-button variant="danger" size="sm" class="ml-1" @click="$bvModal.hide('modal-event')">Thoát</b-button>
                    <b-button variant="primary" size="sm" type="submit">{{ getTextAction }}</b-button>
                </div>
            </FormulateForm>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import breadcumb from '@/components/layout/Breadcrumb.vue'
//import eventItem from '@/components/item/event-item.vue'

export default {
    components: {
        breadcumb,
    },
    computed: {
        getTextAction(){
            if(this.editMode === true){
                return 'Cập nhật';
            }
            return 'Thêm mới'
        },
        user(){
            return this.$store.getters.getUser;
        }
    },
    mounted(){
        this.loadData();
    },
    methods: {
        getTitle(){
            if(this.editMode === true){
                return 'Cập nhật thông tin sự kiện';
            }
            return 'Thêm mới thông tin sự kiện';
        },
        New(){
            this.editMode = false;
            this.currientItems = {};
            this.$bvModal.show('modal-event');
        },
        Edit(item){
            this.editMode = true;
            this.currientItems = item;
            this.$bvModal.show('modal-event');
        },
        async Delete(item){
            var res = await this.$bvModal.msgBoxConfirm(
                "Vui lòng xác nhận xóa sự kiện :(",
                {
                    title: 'Xác nhận',
                    okTitle: 'Đồng ý',
                    cancelTitle: 'Hủy',
                    cancelVariant: 'danger',
                    buttonSize: 'sm',
                }
            );
            if(res){
                this.currientItems = item;
                await axios.delete(`http://localhost:3000/api/event/${this.currientItems.id_event}`).then(()=>{
                    this.loadData();
                    this.$bvToast.toast('Xóa sự kiện thành công', {
                        title: 'OK',
                        variant: 'success',
                        solid: true
                    });
                }).catch(()=>{
                    this.$bvToast.toast('Xóa sự kiện thất bại',{
                        title: 'Lỗi',
                        variant: 'danger',
                        solid: true
                    });
                })
            }
        },
        async Submit(){
            var today = new Date(),
                year = today.getFullYear(),
                month = '' + (today.getMonth()+1),
                day = '' + today.getDate();
                
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
    
            if(!this.editMode){
                var date = [year, month, day].join('-');
                this.currientItems.date = date;
                this.currientItems.edit = 0;
                await axios.post('http://localhost:3000/api/event', this.currientItems).then(()=>{
                    this.loadData();
                    this.$bvToast.toast('Thêm sự kiện thành công', {
                        title: 'OK',
                        variant: 'success',
                        solid: true
                    });
                    this.$bvModal.hide('modal-event');
                }).catch(()=>{
                    this.$bvToast.toast('Thêm sự kiện thất bại',{
                        title: 'Lỗi',
                        variant: 'danger',
                        solid: true
                    });
                })
            }else{
                this.currientItems.date = this.currientItems.date.split("-").reverse().join("-");
                this.currientItems.edit = 1;
                await axios.put(`http://localhost:3000/api/event/${this.currientItems.id_event}`, this.currientItems).then(()=>{
                    this.loadData();
                    this.$bvToast.toast('Cập nhật sự kiện thành công', {
                        title: 'OK',
                        variant: 'success',
                        solid: true
                    });
                    this.$bvModal.hide('modal-event');
                }).catch(()=>{
                    this.$bvToast.toast('Cập nhật sự kiện thất bại',{
                        title: 'Lỗi',
                        variant: 'danger',
                        solid: true
                    });
                })
            }
        },
        async loadData(){
            const data = await axios.get('http://localhost:3000/api/event');
            this.data_event = data.data.result;
            for(let i of this.data_event){
                if(i.date){ i.date = moment(i.date).format('DD-MM-yyy') }
            }
        }
    },
    data(){
        return {
            breadcrumb_title: 'Sự kiện',
            editMode: false,
            currientItems: {},
            data_event: [],
        }
    },
}
</script>

<style scoped>
.list-event{
    height: 70vh;
    overflow-x: auto;
    /* width: 50%; */
}
::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: blue; 
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: blueviolet; 
}

.list-event img {
    object-fit: cover;
}
.comment{
    border: 1px solid #cccc;
    border-radius: 5px;
    padding: 5px 0;
    font-weight: bold;
    font-size: 14px;
}
.comment:hover {
    cursor: pointer;
    background-color: #cccc;
}
pre{
    font-family: sans-serif;
    white-space: pre-wrap;
    tab-size: 6;
}
</style>