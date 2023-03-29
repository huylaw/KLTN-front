<template>
    <div>
        <breadcumb :breadcrumb_title="breadcrumb_title"/>
        <div>
            <b-row class="mx-0">
                <b-col cols="12" lg="3">
                    <div class="container-bank">
                        <div class="d-flex align-items-center text-white mb-2">
                            <img src="@/assets/image/logo_lee.png" width="60px" height="50px"/>
                            <h3 class="mx-2">Ngân sách</h3>
                        </div>
                        <div class="d-flex justify-content-end mb-4 text-white">
                            <div style="font-size: 30px">{{ formatPrice(money) }}</div>đ
                        </div>
                        <div class="d-flex justify-content-between px-4">
                            <b-button variant="light" v-b-tooltip.hover title="Thu tiền" @click="newCollect">
                                <div class="d-flex align-items-center">
                                    <feather size="18px" type="plus"/>
                                </div>
                            </b-button>
                            <b-button variant="light" v-b-tooltip.hover title="Chi tiền" @click="newSpend">
                                <div class="d-flex align-items-center">
                                    <feather size="18px" type="minus"/>
                                </div>
                            </b-button>
                        </div>
                    </div>
                </b-col>
                <b-col cols="12" lg="9">
                    <b-tabs content-class="mt-3" active-nav-item-class="text-danger font-weight-bold">
                        <div v-for="(i, index) in tabs" :key="index">
                            <b-tab :title="i.title">
                                <vue-good-table
                                    :columns="i.columns"
                                    :rows="i.rows"
                                    :line-numbers="true"
                                    :pagination-options="{enabled: true}"
                                >
                                    <template slot="table-row" slot-scope="props">
                                        <span v-if="props.column.field === 'action'">
                                            <span class="d-flex justify-content-around" style="margin: -4px;">
                                                <b-button variant="primary" size="sm" @click="Edit(props.row, i.type)">
                                                    <feather size="15px" type="edit"/>
                                                </b-button>
                                                <b-button size="sm" variant="danger" @click="Delete(props.row, i.type)">
                                                    <feather size="15px" type="trash"/>
                                                </b-button>
                                            </span>
                                        </span>
                                        <span v-else-if="props.column.field === 'money'">
                                            {{ formatPrice(props.formattedRow[props.column.field]) }} đ
                                        </span>
                                    </template>
                                </vue-good-table>
                            </b-tab>
                        </div>
                    </b-tabs>
                </b-col>
            </b-row>
        </div>
        <!--Modal thu quỹ-->
        <b-modal id="collect-money" :title="getTitleCollect()" size="lg" hide-footer>
            <FormulateForm @submit="submitCollect">
                <b-row>
                    <b-col cols="12" :lg="i.cols != null ? i.cols : 4" v-for="i in tabs[0].columns.filter((i) => i.field !== 'action' && i.field!=='id_user')" :key="i.field">
                        <div v-if="i.field == 'description'">
                            <FormulateInput
                                v-model="currientItems[i.field]"
                                :label="i.label"
                                :placeholder="i.label"
                                type="textarea"
                                rows="3"
                            />
                        </div>
                        <div v-else-if="i.type == 'date'" class="mb-2">
                            <FormulateInput
                                v-model="currientItems[i.field]"
                                :label="i.label"
                                :placeholder="i.label"
                                type="date"
                                :validation="i.validate"
                            />
                        </div>
                        <div v-else-if="i.field == 'name_user'" class="mb-2">
                            <FormulateInput
                                v-model="name_user"
                                :label="i.label"
                                :placeholder="i.label"
                                type="text"
                                :validation="i.validate"
                            />
                            <div class="w-100">
                                <b-row v-show="list_user.length != 0" class="m-0 p-0 list-item bg-body">
                                    <b-col cols="12" class="p-0">
                                        <div class="w-100 mb-2" v-for="(i, index) in list_user1" :key="index" @click="selectUser(i)">
                                            <item :item="i"/>
                                        </div>
                                    </b-col>
                                </b-row>
                            </div>
                        </div>
                        <div v-else class="mb-2">
                            <FormulateInput
                                v-model="currientItems[i.field]"
                                :label="i.label"
                                :placeholder="i.label"
                                type="text"
                                :validation="i.validate"
                            />
                        </div>
                    </b-col>
                </b-row>
                <!--footer modal-->
                <div class="modal-footer mt-3 pt-3 pb-0">
                    <b-button variant="danger" size="sm" pill class="ml-1" @click="$bvModal.hide('collect-money')">Thoát</b-button>
                    <b-button variant="primary" size="sm" pill type="submit">{{ getTextAction }}</b-button>
                </div>
            </FormulateForm>
        </b-modal>
        <!--Modal chi quỹ-->
        <b-modal id="spend-money" :title="getTitleSpend()" size="lg" hide-footer>
            <FormulateForm @submit="submitSpend">
                <b-row>
                    <b-col cols="12" :lg="i.cols != null ? i.cols : 4" v-for="i in tabs[1].columns.filter((i) => i.field !== 'action')" :key="i.field">
                        <div v-if="i.field == 'description'">
                            <FormulateInput
                                v-model="currientItems[i.field]"
                                :label="i.label"
                                :placeholder="i.label"
                                type="textarea"
                                rows="3"
                            />
                        </div>
                        <div v-else-if="i.type == 'date'" class="mb-2">
                            <FormulateInput
                                v-model="currientItems[i.field]"
                                :label="i.label"
                                :placeholder="i.label"
                                type="date"
                                :validation="i.validate"
                            />
                        </div>
                        <div v-else class="mb-2">
                            <FormulateInput
                                v-model="currientItems[i.field]"
                                :label="i.label"
                                :placeholder="i.label"
                                type="text"
                                :validation="i.validate"
                            />
                        </div>
                    </b-col>
                </b-row>
                <!--footer modal-->
                <div class="modal-footer mt-3 pt-3 pb-0">
                    <b-button variant="danger" size="sm" pill class="ml-1" @click="$bvModal.hide('spend-money')">Thoát</b-button>
                    <b-button variant="primary" size="sm" pill type="submit">{{ getTextAction }}</b-button>
                </div>
            </FormulateForm>
        </b-modal>
    </div>
</template>

<script>
import axios from 'axios';
import gsap from 'gsap';
import breadcumb from '@/components/layout/Breadcrumb.vue'
import item from '@/components/item/item.vue'

export default {
    components: {
        breadcumb, item
    },
    computed: {
        getTextAction(){
            if(this.editMode === true){
                return 'Cập nhật';
            }
            return 'Thêm mới'
        },
    },
    watch: {
        bank(n){
            gsap.to(this, { duration: 0.5, money: Number(n) || 0 });
        },
        name_user(){
            if(this.name_user !== ''){
                this.list_user1 = this.list_user.filter((i) => i.name.toLowerCase().includes(this.name_user.toLowerCase()));
            }else{
                this.list_user1 = [];
                this.currientItems.id_user = '';
            }
            if(this.name_user && this.currientItems.id_user){
                this.list_user1 = this.list_user.filter((i) => i.id_user == this.currientItems.id_user);
            }
        }
    },
    mounted(){
        this.loadData();
    },
    methods: {
        getTitleCollect(){
            if(this.editMode === true){
                return 'Cập nhật thông tin thu tiền';
            }
            return 'Thêm mới thông tin thu tiền';
        },
        getTitleSpend(){
            if(this.editMode === true){
                return 'Cập nhật thông tin chi tiền';
            }
            return 'Thêm mới thông tin chi tiền';
        },
        newCollect(){
            this.currientItems = {};
            this.name_user = '';
            this.editMode = false;
            this.$bvModal.show('collect-money');
        },
        newSpend(){
            this.currientItems = {};
            this.editMode = false;
            this.$bvModal.show('spend-money');
        },
        Edit(item, type){
            this.editMode = true,
            this.currientItems = item;
            type === true ? this.$bvModal.show('collect-money') : this.$bvModal.show('spend-money');
            if(type === true){
                this.name_user = this.currientItems.name_user;
            }
        },
        async Delete(item, type){
            var res = await this.$bvModal.msgBoxConfirm(
                "Vui lòng xác nhận thông tin :(",
                {
                    title: 'Xác nhận',
                    okTitle: 'Đồng ý',
                    cancelTitle: 'Hủy',
                    cancelVariant: 'danger'
                }
            );
            if(res){
                this.currientItems = item;
                if(type == true){
                    await axios.delete(`http://localhost:3000/api/collect_money/${this.currientItems.id}`).then(()=>{
                        this.loadData();
                        this.$bvToast.toast('Xóa khoản thu thành công', {
                            title: 'OK',
                            variant: 'success',
                            solid: true
                        });
                    }).catch(()=>{
                        this.$bvToast.toast('Xóa khoản thu thất bại',{
                            title: 'Lỗi',
                            variant: 'danger',
                            solid: true
                        });
                    })
                }else{
                    await axios.delete(`http://localhost:3000/api/spend_money/${this.currientItems.id}`).then(()=>{
                        this.loadData();
                        this.$bvToast.toast('Xóa khoản chi thành công', {
                            title: 'OK',
                            variant: 'success',
                            solid: true
                        });
                    }).catch(()=>{
                        this.$bvToast.toast('Xóa khoản chi thất bại',{
                            title: 'Lỗi',
                            variant: 'danger',
                            solid: true
                        });
                    })
                }
            }
        },
        selectUser(item){
            this.name_user = item.name;
            this.currientItems.name_user = item.name;
            this.currientItems.id_user = item.id_user;
        },
        async loadData(){
            await axios.get('http://localhost:3000/api/user').then((res) => {
                this.list_user = res.data.result;
            });
            this.list_user.sort((a, b) => {
                return a.genus - b.genus;
            });
            await axios.get('http://localhost:3000/api/collect_money').then((res) => {
                this.tabs[0].rows = res.data.result;
                this.bank = res.data.bank;
            });
            var pay = 0;
            await axios.get('http://localhost:3000/api/spend_money').then((res) => {
                this.tabs[1].rows = res.data.result;
                pay = res.data.pay;
            });
            this.bank -= pay;
        },
        formatPrice(value) {
            let val = (value/1).toFixed(0).replace('.', ',');
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        async submitCollect(){
            if(!this.editMode){
                await axios.post('http://localhost:3000/api/collect_money', this.currientItems).then(()=>{
                    this.loadData();
                    this.$bvToast.toast('Thêm khoản thu thành công', {
                        title: 'OK',
                        variant: 'success',
                        solid: true
                    });
                    this.$bvModal.hide('collect-money');
                }).catch(()=>{
                    this.$bvToast.toast('Thêm khoản thu thất bại',{
                        title: 'Lỗi',
                        variant: 'danger',
                        solid: true
                    });
                })
            }else{
                await axios.put(`http://localhost:3000/api/collect_money/${this.currientItems.id}`, this.currientItems).then(()=>{
                    this.loadData();
                    this.$bvToast.toast('Cập nhật thông tin thành công', {
                        title: 'OK',
                        variant: 'success',
                        solid: true
                    });
                    this.$bvModal.hide('collect-money');
                }).catch(()=>{
                    this.$bvToast.toast('Cập nhật thông tin thất bại', {
                        title: 'Lỗi',
                        variant: 'danger',
                        solid: true
                    });
                })
            }
        },
        async submitSpend(){
            if(!this.editMode){
                await axios.post('http://localhost:3000/api/spend_money', this.currientItems).then(()=>{
                    this.loadData();
                    this.$bvToast.toast('Thêm khoản chi thành công', {
                        title: 'OK',
                        variant: 'success',
                        solid: true
                    });
                    this.$bvModal.hide('spend-money');
                }).catch(()=>{
                    this.$bvToast.toast('Thêm khoản chi thất bại',{
                        title: 'Lỗi',
                        variant: 'danger',
                        solid: true
                    });
                })
            }else{
                await axios.put(`http://localhost:3000/api/spend_money/${this.currientItems.id}`, this.currientItems).then(()=>{
                    this.loadData();
                    this.$bvToast.toast('Cập nhật thông tin thành công', {
                        title: 'OK',
                        variant: 'success',
                        solid: true
                    });
                    this.$bvModal.hide('spend-money');
                }).catch(()=>{
                    this.$bvToast.toast('Cập nhật thông tin thất bại', {
                        title: 'Lỗi',
                        variant: 'danger',
                        solid: true
                    });
                })
            }
        }
    },
    data(){
        return {
            breadcrumb_title: 'Qũy họ',
            editMode: false,
            currientItems: {},
            list_user: [],
            list_user1: [], name_user: '',
            tabs: [
                { 
                    title: 'Thu quỹ họ', 
                    type: true,
                    columns: [
                        {
                            label: 'Thành viên',
                            field: 'id_user',
                            hidden: true,
                            validate: "required",
                        },
                        {
                            label: 'Tên thành viên',
                            field: 'name_user',
                            filterOptions: { enabled: true, placeholder: 'Tên thành viên' },
                            width: '150px',
                            validate: "required",
                            cols: 5,
                        },
                        {
                            label: 'Số tiền',
                            field: 'money',
                            width: '150px',
                            validate: "required",
                        },
                        {
                            label: 'Ngày chuyển tiền',
                            field: 'date_collect',
                            type: 'date',
                            dateInputFormat: 'yyyy-MM-dd',
                            dateOutputFormat: 'dd-MM-yyyy',
                            tdClass: 'text-left',
                            width: '170px',
                            validate: "required",
                            cols: 3,
                        },
                        {
                            label: 'Chú thích',
                            field: 'description',
                            cols: 12
                        },
                        {
                            label: 'Hoạt động',
                            field: 'action',
                            width: '120px'
                        }
                    ],
                    rows: []
                },
                { 
                    title: 'Chi quỹ họ',
                    type: false,
                    columns: [
                        {
                            label: 'Sự kiện',
                            field: 'event_pay',
                            filterOptions: { enabled: true, placeholder: 'Sự kiện' },
                            width: '150px',
                            validate: "required",
                        },
                        {
                            label: 'Số tiền',
                            field: 'money',
                            width: '150px',
                            validate: "required",
                        },
                        {
                            label: 'Ngày chi tiền',
                            field: 'date_pay',
                            type: 'date',
                            dateInputFormat: 'yyyy-MM-dd',
                            dateOutputFormat: 'dd-MM-yyyy',
                            tdClass: 'text-left',
                            width: '150px',
                            validate: "required",
                        },
                        {
                            label: 'Chú thích',
                            field: 'description',
                            cols: 12,
                        },
                        {
                            label: 'Hoạt động',
                            field: 'action',
                            width: '120px'
                        }
                    ],
                    rows: []
                }
            ],
            money: 0,
            bank: 0,
        }
    }
}
</script>

<style scoped>
.container-bank{
    border: 1px solid #cccc;
    border-radius: 20px;
    background-image: linear-gradient(red, yellow);
    padding: 20px;
    margin-bottom: 20px;
}
.list-item{
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