<template>
    <div>
        <breadcrumb :breadcrumb_title="breadcrumb_title"/>
        <div>
            <div class="d-flex flex-wrap align-items-center">
                <div class="border p-1 bg-body rounded-pill mb-1"><!--form--> 
                    <div class="d-flex justify-content-end align-items-center">
                        <span class="d-flex justify-content-end ml-2">
                            <feather type="search" size="18"/>
                        </span>
                        <input type="text" v-model="search" placeholder="Tìm kiếm thành viên..."/>
                        <b-button class="ml-1" variant="primary" size="sm" pill @click="Search">Tìm kiếm</b-button>
                    </div>
                </div>
            </div>
            <b-row class="my-3">
                <b-col cols="12" md="4">
                    <h5 class="mb-2">Danh sách thành viên</h5>
                    <b-row class="m-0 list-item border rounded-lg bg-body py-3">
                        <b-col cols="12" v-for="(i, index) in list_member" :key="index" class="mb-2" @click="showInfo(i)">
                            <item :item="i"/>
                        </b-col>
                        <span v-if="list_member.length == 0" class="text-center w-100">Không tìm thấy dự liệu</span>
                    </b-row>
                </b-col>
                <b-col cols="12" md="8">
                    <h5 class="mb-2">Xác định mối quan hệ</h5>
                    <div class="list-item border rounded-lg bg-body p-3">
                        <b-row>
                            <b-col cols="12" lg="6">
                                <FormulateInput
                                    v-model="name_1"
                                    label="Thành viên 1"
                                    placeholder="Thành viên 1"
                                    type="text"
                                />
                                <div>
                                    <b-row v-show="list_user1.length != 0" class="m-0 p-0 list-item-relationship bg-body">
                                        <b-col cols="12" class="p-0">
                                            <div class="w-100 mb-2" v-for="(i, index) in list_user1" :key="index" @click="selectUser1(i)">
                                                <item :item="i"/>
                                            </div>
                                        </b-col>
                                    </b-row>
                                </div>
                            </b-col>
                            <b-col cols="12" lg="6">
                                <FormulateInput
                                    v-model="name_2"
                                    label="Thành viên 2"
                                    placeholder="Thành viên 2"
                                    type="text"
                                />
                                <div>
                                    <b-row v-show="list_user2.length != 0" class="m-0 p-0 list-item-relationship bg-body">
                                        <b-col cols="12" class="p-0">
                                            <div class="w-100 mb-2" v-for="(i, index) in list_user2" :key="index" @click="selectUser2(i)">
                                                <item :item="i"/>
                                            </div>
                                        </b-col>
                                    </b-row>
                                </div>
                            </b-col>
                        </b-row>
                        <div class="text-center py-2">
                            <b-button variant="primary" size="sm" pill @click="Check">Xác định</b-button>
                            <h5 class="mt-2">Mối quan hệ:</h5>
                            <h6 class="text-success">{{ relationship }}</h6>
                        </div>
                        <b-row>
                            <b-col cols="12" lg="6" class="my-2" v-for="(i, index) in member" :key="index">
                                <div v-for="(j, index) in info" :key="index">
                                    <span v-if="j.field == 'sex'">
                                        <span class="font-weight-bold">{{ j.label }}: </span>
                                        <span class="font-italic ml-1">{{ i[j.field] === 1 ? 'Nam' : 'Nữ' }}</span>
                                    </span>
                                    <span v-else-if="j.field == 'classify'">
                                        <span class="font-weight-bold">{{ j.label }}: </span>
                                        <span class="font-italic ml-1">{{ i[j.field] === 0 ? 'Huyết thống' : 'Con dâu' }}</span>
                                    </span>
                                    <span v-else-if="j.field == 'genus'">
                                        <span class="font-weight-bold">{{ j.label }}: </span>
                                        <span class="font-italic ml-1">{{ i[j.field] === 1 ? 'Tổ tiên' : 'Đời thứ ' + i[j.field] }}</span>
                                    </span>
                                    <span v-else>
                                        <span class="font-weight-bold">{{ j.label }}: </span>
                                        <span class="font-italic ml-1">{{ i[j.field] }}</span>
                                    </span>
                                </div>                  
                            </b-col>
                        </b-row>
                    </div>
                </b-col>
            </b-row>
        </div>
        <b-modal id="show-info" title="Thông tin cá nhân" size="lg" no-close-on-backdrop scrollable>
            <b-row>
                <b-col cols="12" lg="4" class="mb-2 text-center">
                    <b-avatar :src="item.avatar" rounded="lg" size="250px"/>
                    <!-- <img src="@/assets/image/logo_lee.png" width="100%" height="200px" class="mt-3"/> -->
                </b-col>
                <b-col cols="12" md="8" class="">
                    <div v-for="(i, index) in info" :key="index">
                        <span v-if="i.field == 'sex'">
                            <span class="font-weight-bold">{{ i.label }}: </span>
                            <span class="font-italic ml-1">{{ item[i.field] === 1 ? 'Nam' : 'Nữ' }}</span>
                        </span>
                        <span v-else-if="i.field == 'classify'">
                            <span class="font-weight-bold">{{ i.label }}: </span>
                            <span class="font-italic ml-1">{{ item[i.field] === 0 ? 'Huyết thống' : 'Con dâu' }}</span>
                        </span>
                        <span v-else-if="i.field == 'genus'">
                            <span class="font-weight-bold">{{ i.label }}: </span>
                            <span class="font-italic ml-1">{{ item[i.field] === 1 ? 'Tổ tiên' : 'Đời thứ ' + item[i.field] }}</span>
                        </span>
                        <span v-else>
                            <span class="font-weight-bold">{{ i.label }}: </span>
                            <span class="font-italic ml-1">{{ item[i.field] }}</span>
                        </span>
                    </div>
                </b-col>
            </b-row>
            <template #modal-footer="{ cancel }">
                <b-button variant="danger" size="sm" pill @click="cancel()">Thoát</b-button>
            </template>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import breadcrumb from '@/components/layout/Breadcrumb.vue'
import item from '@/components/item/item.vue'

export default {
    components: {
        breadcrumb, item
    },
    data(){
        return{
            breadcrumb_title: 'Danh sách thành viên',
            search: '',
            data: [],
            list_member: [],
            item: {},
            name_1: '', name_2: '', member: [], relationship: '', list_user: [], list_user1: [], list_user2: [], id_user1: '', id_user2: '',
            info: [
                { label: 'Họ và tên', field: 'name' },
                { label: 'Giới tính', field: 'sex' },
                { label: 'Ngày sinh dương lịch', field: 'birthday' },
                { label: 'Ngày sinh âm lịch', field: 'lunar_birthday' },
                { label: 'Quốc tịch', field: 'country' },
                { label: 'Gốc', field: 'classify' },
                { label: 'Đời', field: 'genus' },
                { label: 'Tôn giáo', field: 'religion' },
                { label: 'Học vấn', field: 'literacy' },
                { label: 'Điện thoại', field: 'phone' },
                { label: 'Nghề nghiệp', field: 'job' },
                { label: 'Nơi làm việc', field: 'work_address' },
                { label: 'Bố', field: 'father_name' },
                { label: 'Mẹ', field: 'mother_name' },
                { label: 'Vợ/chồng', field: 'spouse_name' },
                { label: 'Nguyên quán', field: 'resident' },
                { label: 'Nơi ở hiện tại', field: 'domicile' },
                { label: 'Ngày mất dương lịch', field: 'deadday' },
                { label: 'Ngày mất âm lịch', field: 'lunar_deadday' },
                { label: 'Chú thích', field: 'description' }
            ]
        }
    },
    watch: {
        search(){
            if(this.search === ''){
                this.list_member = this.data;
            }
        },
        name_1(){
            this.member = [];
            this.relationship = '';
            if(this.name_1 !== ''){
                this.list_user1 = this.list_user.filter((i) => i.name.toLowerCase().includes(this.name_1.toLowerCase()));
            }else{
                this.list_user1 = [];
                this.id_user1 = '';
            }
            if(this.name_1 && this.id_user1){
                this.list_user1 = this.list_user.filter((i) => i.id_user == this.id_user1);
            }
        },
        name_2(){
            this.member = [];
            this.relationship = '';
            if(this.name_2 !== ''){
                this.list_user2 = this.list_user.filter((i) => i.name.toLowerCase().includes(this.name_2.toLowerCase()));
            }else{
                this.list_user2 = [];
                this.id_user2 = '';
            }
            if(this.name_2 && this.id_user2){
                this.list_user2 = this.list_user.filter((i) => i.id_user == this.id_user2);
            }
        }
    },
    mounted(){
        this.loadData();
    },
    methods: {
        Search(){
            if(this.search !== ''){
                this.search = this.search.trim();
                this.list_member = this.data.filter((i) => i.name.toLowerCase().includes(this.search.toLowerCase()));
            }else{
                this.list_member = this.data;
            }
        },
        showInfo(item){
            this.item = item;
            this.$bvModal.show('show-info');
        },
        selectUser1(item){
            this.name_1 = item.name;
            this.id_user1 = item.id_user;
        },
        selectUser2(item){
            this.name_2 = item.name;
            this.id_user2 = item.id_user;
        },
        async Check(){
            const data = await axios.post("http://localhost:3000/api/relationship", {id_user1: this.id_user1, id_user2: this.id_user2});
            this.member = data.data.user;
            if(this.member && this.member.length != 0){
                for(let i of this.member){
                    if(i.birthday){ i.birthday = moment(i.birthday).format('DD-MM-yyy') }
                    if(i.lunar_birthday){ i.lunar_birthday = moment(i.lunar_birthday).format('DD-MM-yyy') }
                    if(i.deadday){ i.deadday = moment(i.deadday).format('DD-MM-yyy') }
                    if(i.lunar_deadday){ i.lunar_deadday = moment(i.lunar_deadday).format('DD-MM-yyy') }
                }
            }
            this.relationship = data.data.relationship;
            this.$bvToast.toast(`${data.data.message}`, {
                title: `${data.data.title}`,
                variant: `${data.data.variant}`,
                solid: true
            });
        },
        async loadData(){
            try{
                await axios.get("http://localhost:3000/api/user").then((res)=>{
                    this.data = res.data.result;
                    this.list_user = res.data.result.map(item => ({
                        ...item,
                        id: item.id_user,
                        text: `Đời ${item.genus} : ${item.name}`
                    }));
                    this.list_user.sort((a, b) => {
                        return a.genus - b.genus;
                    });
                    for(let i of this.data){
                        if(i.birthday){ i.birthday = moment(i.birthday).format('DD-MM-yyy') }
                        if(i.lunar_birthday){ i.lunar_birthday = moment(i.lunar_birthday).format('DD-MM-yyy') }
                        if(i.deadday){ i.deadday = moment(i.deadday).format('DD-MM-yyy') }
                        if(i.lunar_deadday){ i.lunar_deadday = moment(i.lunar_deadday).format('DD-MM-yyy') }
                    }
                    this.list_member = this.data;
                })
            }catch(error){
                console.log(error);
            }
        },
    }
}
</script>

<style scoped>
input:focus{
    outline: none;
}
input{
    border: none;
    margin: 0 3px;
    font-size: 14px;
}
.list-item{
    height: 500px;
    overflow-y: auto;
}
.list-item-relationship{
    max-height: 400px;
    overflow-y: auto;
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
</style>