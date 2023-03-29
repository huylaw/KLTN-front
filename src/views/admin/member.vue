<template>
    <div>
        <breadcrumb :breadcrumb_title="breadcrumb_title"/>
        <div class="d-flex justify-content-between mx-3 my-0">
            <b-button variant="primary" size="sm" pill class="mb-3" @click="New">
                <span class="d-flex align-items-center">
                    <feather size="15px" type="plus"/> Thêm thành viên
                </span>
            </b-button>
            <b-button variant="primary" size="sm" pill class="mb-3" @click="Relationship"> 
                <span class="d-flex align-items-center">
                    Xác định mối quan hệ
                </span>
            </b-button>
        </div>
        <!--table-->
        <b-row class="mx-0">
            <b-col cols="12" lg="8">
                    <vue-good-table
                        :columns="columns"
                        :rows="rows"
                        :line-numbers="true"
                        :pagination-options="{enabled: true}"
                        class="mb-3"
                    >
                    <!--column Action-->
                        <template slot="table-row" slot-scope="props">
                            <span v-if="props.column.field === 'action'">
                                <span class="d-flex justify-content-around" style="margin: -4px;">
                                    <b-button variant="primary" size="sm" @click="Edit(props.row)">
                                        <feather size="15px" type="edit"/>
                                    </b-button>
                                    <b-button variant="primary" size="sm" @click="ChangePass(props.row)">
                                        <feather size="15px" type="lock"/>
                                    </b-button>
                                    <b-button size="sm" variant="danger" @click="Delete(props.row)">
                                        <feather size="15px" type="trash"/>
                                    </b-button>
                                </span>
                            </span>
                            <!--status-->
                            <span v-else-if="props.column.field === 'sex'">
                                {{props.formattedRow[props.column.field] === 0 ? "Nữ" : "Nam"}}
                            </span>
                            <!--Đời thứ-->
                            <span v-else-if="props.formattedRow[props.column.field] && props.column.field === 'genus'">
                                {{ props.formattedRow[props.column.field] === 1 ? "Tổ tiên" : `Đời thứ ${props.formattedRow[props.column.field]}` }}
                            </span>
                        </template> 
                    <!--Pagination-->
                    <!--no data-->
                        <template slot="emptystate">
                            <div class="d-flex justify-content-center">
                                <span>Không có dữ liệu</span>
                            </div>
                        </template>
                    </vue-good-table>
            </b-col>
            <b-col cols="12" lg="4">
                <b-row class="">
                    <b-col cols="12" class="" v-for="(i, index) in arr_object" :key="index">
                        <div class="border p-2 mb-3 bg-body rounded">
                            <h5>{{ i.title }}</h5>
                            <div>
                                <apexchart class="d-flex justify-content-center" type="pie" width="420" :options="i.chartOptions" :series="i.series"></apexchart>
                                <p class="text-center mt-3"><i>Biểu đồ tỉ lệ {{ i.title }}</i></p>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <!--Thêm / sửa thành viên-->
        <b-modal id="modal-edit" :title="getTitle()" size="xl" hide-footer>
            <!--Content Modal-->
            <FormulateForm @submit="Submit">
                <b-row>
                    <b-col cols="12" lg="3" class="mb-2">
                        <img :src="avatar" width="100%" height="200px" class="avatar border border-success rounded mb-2"/>
                        <input class="upload-image" type="file" ref="file" accept="image/*" @change="onFileChange"/>
                        <img src="@/assets/image/logo_lee.png" width="100%" height="200px" class="mt-3"/>
                    </b-col>
                    <b-col cols="12" lg="9">
                        <b-row>
                            <b-col cols="12" :lg="i.cols != null ? i.cols : 3" v-for="i in columns.filter((i) => i.field !== 'action' && i.field !== 'avatar' && i.show !== false)" :key="i.field">
                                <div v-if="i.field == 'sex'">
                                    <FormulateInput
                                        class="w-100"
                                        v-model="currientItems[i.field]"
                                        :label="i.label"
                                        :placeholder="i.label"
                                        type="select"
                                        :options="[
                                            { value: 0, label: 'Nữ' },
                                            { value: 1, label: 'Nam'}
                                        ]"
                                        validation="required"
                                        @change="changeSex"
                                    />
                                </div>
                                <div v-else-if="i.field == 'classify'">
                                    <FormulateInput
                                        v-model="currientItems[i.field]"
                                        class="w-100"
                                        :label="i.label"
                                        :placeholder="i.label"
                                        type="select"
                                        :options="[
                                            { value: 0, label: 'Huyết thống' },
                                            { value: 1, label: 'Con dâu' }
                                        ]"
                                        validation="required"
                                        @change="changeClassify"
                                    />
                                </div>
                                <div v-else-if="i.field == 'spouse'" class="d-flex align-items-start">
                                    <FormulateInput
                                        v-model="currientItems[i.field]"
                                        class="w-100"
                                        :label="label_spouse"
                                        :placeholder="i.label"
                                        type="select"
                                        :options="option_spouse"
                                        :disabled="currientItems['classify'] == null || currientItems['sex'] == null"
                                        @change="changeSpouse"
                                    />
                                    <div 
                                        class="ml-1 d-flex align-items-center" 
                                        style="margin-top: 32px;"
                                        @click="deleteUser(i.field)"
                                    >
                                        <feather type="x-circle"/>
                                    </div>
                                </div>
                                <div v-else-if="i.field == 'father'" class="d-flex align-items-start">
                                    <FormulateInput
                                        v-model="currientItems[i.field]"
                                        class="w-100"
                                        :label="i.label"
                                        :placeholder="i.label"
                                        type="select"
                                        :options="list_father"
                                        @change="changeFather"
                                        :disabled="currientItems['classify'] == 1 || currientItems['classify'] == null"
                                    />
                                    <div 
                                        class="ml-1 d-flex align-items-center" 
                                        style="margin-top: 32px;"
                                        @click="deleteUser(i.field)"
                                    >
                                        <feather type="x-circle"/>
                                    </div>
                                </div>
                                <div v-else-if="i.field == 'mother'" class="d-flex align-items-start">
                                    <FormulateInput
                                        v-model="currientItems[i.field]"
                                        class="w-100"
                                        :label="i.label"
                                        :placeholder="i.label"
                                        type="select"
                                        :options="option_mother"
                                        :disabled="currientItems['classify'] == 1 || currientItems['classify'] == null"
                                        @change="changeMother"
                                    />
                                    <div 
                                        class="ml-1 d-flex align-items-center" 
                                        style="margin-top: 32px;"
                                        @click="deleteUser(i.field)"
                                    >
                                        <feather type="x-circle"/>
                                    </div>
                                </div>
                                <div v-else-if="i.type == 'date' && i.field != 'deadday' && i.field != 'lunar_deadday'" class="mb-2">
                                    <FormulateInput
                                        v-model="currientItems[i.field]"
                                        :label="i.label"
                                        :placeholder="i.label"
                                        type="date"
                                        :validation="i.validate"
                                    />
                                </div>
                                <div v-else-if="i.field == 'deadday' && editMode === true || i.field == 'lunar_deadday' && editMode === true" class="mb-2">
                                    <FormulateInput
                                        v-model="currientItems[i.field]"
                                        :label="i.label"
                                        :placeholder="i.label"
                                        type="date"
                                        :validation="i.validate"
                                    />
                                </div>
                                <div v-else-if="i.field == 'description'">
                                    <FormulateInput
                                        v-model="currientItems[i.field]"
                                        :label="i.label"
                                        :placeholder="i.label"
                                        type="textarea"
                                        rows="3"
                                    />
                                </div>
                                <div v-else-if="i.field != 'deadday' && i.field != 'lunar_deadday'" class="mb-2">
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
                    </b-col>
                </b-row>
                <!--footer-modal-->
                <div class="modal-footer mt-3 pt-3 pb-0">
                    <b-button variant="danger" class="ml-1" pill size="sm" @click="$bvModal.hide('modal-edit')">Thoát</b-button>
                    <b-button variant="primary" type="submit" pill size="sm">{{ getTextAction }}</b-button>
                </div>
            </FormulateForm>
            <b-overlay :show="show" no-wrap></b-overlay>
        </b-modal>
        <!--Xác định mối quan hệ-->
        <b-modal id="relationship" scrollable title="Xác định mối quan hệ" size="lg">
            <div>
                <b-row>
                    <b-col cols="12" lg="6">
                        <FormulateInput
                            v-model="name_1"
                            label="Thành viên 1"
                            placeholder="Thành viên 1"
                            type="text"
                        />
                        <div>
                            <b-row v-show="list_user1.length != 0" class="m-0 p-0 list-item bg-body">
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
                            <b-row v-show="list_user2.length != 0" class="m-0 p-0 list-item bg-body">
                                <b-col cols="12" class="p-0">
                                    <div class="w-100 mb-2" v-for="(i, index) in list_user2" :key="index" @click="selectUser2(i)">
                                        <item :item="i"/>
                                    </div>
                                </b-col>
                            </b-row>
                        </div>
                    </b-col>
                </b-row>
                <div class="text-center py-3">
                    <h5>Mối quan hệ:</h5>
                    <h6 class="text-success">{{ relationship }}</h6>
                </div>
                <b-row>
                    <b-col cols="12" lg="6" v-for="(i, index) in member" :key="index">
                        <div v-for="j in columns.filter((x) => x.field !== 'action' && x.field !== 'avatar' && x.field !== 'father' && x.field !== 'mother' && x.field !== 'spouse')" :key="j.field">
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
            <template #modal-footer>
                <div>
                    <b-button class="mr-2" variant="danger" size="sm" pill @click="$bvModal.hide('relationship')">Thoát</b-button>
                    <b-button variant="primary" size="sm" pill @click="Check">Xác định</b-button>
                </div>
            </template>
        </b-modal>
        <!--Thay đổi password-->
        <b-modal id="change-pass" title="Tài khoản" size="lg" hide-footer>
            <b-row>
                <b-col cols="12" lg="5">
                    <img :src="avatar" width="100%" height="250px" class="avatar border border-success rounded"/>
                </b-col>
                <b-col cols="12" lg="7">
                    <b-tabs content-class="border border-top-0 pt-2" active-nav-item-class="text-danger font-weight-bold">
                        <b-tab title="Đổi mật khẩu">
                            <FormulateForm @submit="changePassword">
                                <b-row class="px-2">
                                    <b-col cols="12" class="mb-2">
                                        <FormulateInput 
                                            v-model="currientItems.username"
                                            label="Tên đăng nhập"
                                            placeholder="Tên đăng nhập"
                                            type="text"
                                            validation="required"
                                        />
                                    </b-col>
                                    <b-col cols="12" class="mb-2">
                                        <FormulateInput 
                                            v-model="currientItems.password"
                                            label="Mật khẩu"
                                            placeholder="Mật khẩu"
                                            type="password"
                                            validation="required"
                                        />
                                    </b-col>
                                    <b-col cols="12" class="mb-2">
                                        <FormulateInput 
                                            v-model="confirm_password"
                                            label="Nhập lại mật khẩu"
                                            placeholder="Nhập lại mật khẩu"
                                            type="password"
                                            validation="required"
                                        />
                                    </b-col>
                                </b-row>
                                <div class="text-right mr-2 my-2">
                                    <b-button variant="primary" type="submit" size="sm" pill>Xác nhận</b-button>
                                </div>
                            </FormulateForm>
                        </b-tab>
                        <b-tab title="Cấp quyền">
                            <FormulateForm @submit="changeRole">
                                <b-row class="px-2">
                                    <b-col cols="12" class="mb-2">
                                        <FormulateInput 
                                        v-model="currientItems.role"
                                        label="Quyền người dùng"
                                        placeholder="Thay đổi quyền người dùng"
                                        type="select"
                                        :options="[
                                            { value: 0, label: 'Quản trị viên' },
                                            { value: 1, label: 'Thành viên' }
                                        ]"
                                        validation="required"
                                        />
                                    </b-col>            
                                </b-row>
                                <div class="text-right mr-2 mb-2 mt-5">
                                    <b-button variant="primary" type="submit" size="sm" pill>Xác nhận</b-button>
                                </div>
                            </FormulateForm>
                        </b-tab>
                    </b-tabs>
                </b-col>
            </b-row>
        </b-modal>
        <!-- <b-overlay :show="show" no-wrap></b-overlay> -->
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import breadcrumb from '@/components/layout/Breadcrumb.vue'
import item from '@/components/item/item.vue'

export default {
    components: {
        breadcrumb, item,
    },
    watch: {
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
    computed: {
        getTextAction(){
            if(this.editMode===true){
                return "Cập nhật";
            }
            return "Thêm mới";
        },
    },
    mounted(){
        this.loadData();
    },
    methods: {
        onFileChange(e){
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;
            var data = (files[0]);
            console.log(data);

            const reader = new FileReader();
            reader.addEventListener('loadend', () => {
                this.avatar = reader.result;
            }, false)
            if(data){
                 reader.readAsDataURL(data);
            }
        },
        getTitle(){
            if(this.editMode===true){
                return "Cập nhật thông tin thành viên";
            }
            return "Thêm mới thành viên";
        },
        ChangePass(item){
            this.currientItems = item;
            this.confirm_password = '';
            this.avatar = item.avatar;
            this.$bvModal.show('change-pass');
        },
        Relationship(){
            this.$bvModal.show('relationship');
        },
        New(){
            this.currientItems = {}; 
            this.avatar = '';
            this.editMode = false;
            this.$bvModal.show('modal-edit');
            this.label_spouse = 'Chồng/vợ';
        },
        Edit(item){
            this.currientItems = item;
            this.avatar = item.avatar;
            this.editMode = true;

            this.option_mother = this.list_mother.filter((i) => i.genus == (this.currientItems.genus - 1));
            if(this.currientItems.classify == 0 && this.currientItems.sex == 1){
                this.label_spouse = 'Vợ';
                this.option_spouse = this.list_mother;
            }else if(this.currientItems.classify == 1 && this.currientItems.sex == 0){
                this.label_spouse = 'Chồng';
                this.option_spouse = this.list_father;
            }else{
                this.label_spouse = 'Chồng/vợ';
                this.option_spouse = [];
            }
            this.$bvModal.show('modal-edit');
        },
        changeSex(){
            // giới tính = 1 thì classify = huyết thống.
            if(this.currientItems.sex == 1){
                this.currientItems.classify = 0;
                this.label_spouse = 'Vợ';
                this.option_spouse = this.list_mother;
            }
            if(this.currientItems.classify == 1 && this.currientItems.sex == 0){
                this.label_spouse = "Chồng";
                this.option_spouse = this.list_father;
            }else if(this.currientItems.classify == 0 && this.currientItems.sex == 0){
                this.label_spouse = 'Chồng/vợ';
                this.option_spouse = [];
            }

        },
        changeClassify(){
            // khi classify = 1 thi sex = 0 và hủy bố + mẹ 
            this.currientItems.sex = null;
            if(this.currientItems.classify == 1){
                this.currientItems.sex = 0;
                this.currientItems.father = null;
                this.currientItems.mother = null;
                this.currientItems.father_name = null;
                this.currientItems.mother_name = null;
                this.label_spouse = "Chồng";
                this.option_spouse = this.list_father;
            }else{
                this.currientItems.spouse = null;
                this.label_spouse = 'Chồng/vợ';
                this.option_spouse = [];
            }
            if(this.currientItems.classify == 0 && this.currientItems.sex == 1){
                this.label_spouse = 'Vợ';
                this.option_spouse = this.list_mother;
            }else if(this.currientItems.classify == 0 && this.currientItems.sex == 0){
                this.label_spouse = 'Chồng/vợ';
                this.option_spouse = [];
            }
        },
        changeFather(){
            // khi bố thay đổi sẽ thay đổi mẹ và thay đổi đời
            var father = this.list_father.filter((i) => i.id_user == this.currientItems.father);
            this.currientItems.father_name = father[0].name;
            this.currientItems.genus = father[0].genus + 1;
            this.option_mother = this.list_mother.filter((i) => i.genus == father[0].genus);
            //console.log(this.currientItems.father_name);
        },
        changeMother(){
            var mother = this.option_mother.filter((i) => i.id_user == this.currientItems.mother);
            this.currientItems.mother_name = mother[0].name;
            console.log(this.currientItems.mother);
            console.log(this.currientItems.mother_name);
        },
        changeSpouse(){
            var spouse = this.option_spouse.filter((i) => i.id_user == this.currientItems.spouse);
            this.currientItems.spouse_name = spouse[0].name;
            console.log(this.currientItems.spouse);
            console.log(this.currientItems.spouse_name);
            //trường hợp con dâu thì thay đổi luôn đời
            if(this.currientItems.classify == 1){
                this.currientItems.genus = spouse[0].genus;
            }
            // trường hợp con trai huyết thống thì k cần thiết.
        },
        deleteUser(param){
            if(param == 'spouse'){
                this.currientItems.spouse = null;
                this.currientItems.spouse_name = null;
            }else if(param == 'father'){
                this.currientItems.father = null;
                this.currientItems.father_name = null;
                this.currientItems.genus = null;
                this.currientItems.mother = null;
                this.currientItems.mother_name = null;
                this.option_mother = [];
            }else if(param == 'mother'){
                this.currientItems.mother = null;
                this.currientItems.mother_name = null;
            }
        },
        selectUser1(item){
            this.name_1 = item.name;
            this.id_user1 = item.id_user;
        },
        selectUser2(item){
            this.name_2 = item.name;
            this.id_user2 = item.id_user;
        },
        async Delete(item){
            var res = await this.$bvModal.msgBoxConfirm(
                "Vui lòng xác nhận xóa thành viên :(",
                {
                    title: 'Xác nhận',
                    okTitle: 'Đồng ý',
                    cancelTitle: 'Hủy',
                    cancelVariant: 'danger'
                }
            );
            this.currientItems = item;
            if(res){
                // this.show = true;
                axios.delete(`http://localhost:3000/api/user/${this.currientItems.id_user}`).then(() => {
                    this.loadData();
                    this.$bvToast.toast('Xóa thành viên thành công',{
                        title: 'OK',
                        variant: 'success',
                        solid: true
                    });
                }).catch(() => {
                    this.$bvToast.toast('Xóa thành viên thất bại',{
                        title: 'Lỗi',
                        variant: 'danger',
                        solid: true
                    });
                })
                // this.show = true;
            }
            this.$bvModal.hide('modal-edit');
        },
        async Submit(){ 
            this.show = true;    
            if(!this.editMode){
                await axios.post('http://localhost:3000/api/user', this.currientItems).then(async ()=>{
                    await this.loadData();
                    const formData = new FormData();
                    if(this.$refs.file.files[0]){
                        formData.append('image',this.$refs.file.files[0]);
                        var len = this.rows.length;
                        var id = this.rows[len - 1].id_user;
                        await axios.put(`http://localhost:3000/api/avatar/${id}`, formData).then(()=>{
                            this.loadData();
                        })
                    }
                    this.$bvToast.toast('Thêm thành viên thành công', {
                        title: 'OK',
                        variant: 'success',
                        solid: true
                    });
                    this.$bvModal.hide('modal-edit');
                }).catch(() => {
                    this.$bvToast.toast('Thêm thành viên thất bại',{
                        title: 'Lỗi',
                        variant: 'danger',
                        solid: true
                    });
                })
                this.show = false;
            }else{
                await axios.put(`http://localhost:3000/api/user/${this.currientItems.id_user}`, this.currientItems).then(async ()=>{
                    await this.loadData();
                    const formData = new FormData();
                    if(this.$refs.file.files[0]){
                        formData.append('image',this.$refs.file.files[0]);
                        await axios.put(`http://localhost:3000/api/avatar/${this.currientItems.id_user}`, formData).then(()=>{
                            this.loadData();
                        }) 
                    } 
                    this.$bvToast.toast('Cập nhật thành viên thành công', {
                        title: 'OK',
                        variant: 'success',
                        solid: true
                    });  
                    this.$bvModal.hide('modal-edit');
                }).catch(() => {
                    this.$bvToast.toast('Cập nhật thành viên thất bại',{
                        title: 'Lỗi',
                        variant: 'danger',
                        solid: true
                    });
                })
                this.show = false;
            }
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
        async changePassword(){
            if(this.currientItems.password === this.confirm_password){
                await axios.put(`http://localhost:3000/api/change_password/${this.currientItems.id_user}`, 
                    {   username: this.currientItems.username, 
                        password: this.currientItems.password,
                    }).then(()=>{
                    this.$bvModal.hide('change-pass');
                    //this.confirm_password = '';
                    this.$bvToast.toast('Thay đổi mật khẩu thành công', {
                        title: 'OK',
                        variant: 'success',
                        solid: true
                    });
                }).catch(()=>{
                    this.$bvToast.toast('Thay đổi mật khẩu thất bại',{
                        title: 'Lỗi',
                        variant: 'danger',
                        solid: true
                    });
                })
            }else{
                this.$bvToast.toast('Mật khẩu không trung nhau',{
                    title: 'Lỗi',
                    variant: 'danger',
                    solid: true
                });
            }
        },
        async changeRole(){
            try{
                await axios.put(`http://localhost:3000/api/change_role/${this.currientItems.id_user}`, {role: this.currientItems.role}).then(()=>{
                    this.$bvToast.toast('Thay đổi quyền người dùng thành công', {
                        title: 'OK',
                        variant: 'success',
                        solid: true
                    });
                    this.$bvModal.hide('change-pass');
                }).catch(()=>{
                    this.$bvToast.toast('Thay đổi mật khẩu thất bại',{
                        title: 'Lỗi',
                        variant: 'danger',
                        solid: true
                    });
                })
            }catch(error){
                console.log(error);
            }
        },
        async loadData(){
            const data = await axios.get("http://localhost:3000/api/user");
            this.rows = data.data.result;
            //danh sách user để xác định mối quan hệ
            this.list_user = data.data.result.map(item => ({
                ...item,
                id: item.id_user,
                text: `Đời ${item.genus} : ${item.name}`
            }));
            this.list_user.sort((a, b) => {
                return a.genus - b.genus;
            });
            //thống kê
            this.arr_object = [];
            const data1 = await axios.get('http://localhost:3000/api/statistical');
            this.data = data1.data.statistical;
            for(let i in this.data){
                let object = {
                    title: '',
                    series: [],
                    chartOptions: {
                        labels: [],
                    },
                }
                object.title = this.data[i].title;
                object.series = this.data[i].series;
                object.chartOptions.labels = this.data[i].labels;
                this.arr_object.push(object);
            }
            //load father
            await axios.get('http://localhost:3000/api/father').then((res)=>{
                this.list_father = res.data.result.map(item => ({
                    ...item,
                    value: item.id_user,
                    label: item.name + ' - đời ' + item.genus 
                }))
            })
            //load mother
            await axios.get('http://localhost:3000/api/mother').then((res)=>{
                this.list_mother = res.data.result.map(item => ({
                    ...item,
                    value: item.id_user,
                    label: item.name + ' - đời ' + item.genus
                }))
            })
        }
    },
    data(){
        return{
            breadcrumb_title: "Danh sách thành viên",
            show: false,
            editMode: false,
            currientItems : {},
            confirm_password: '',
            avatar: '',
            name_1: '', name_2: '', member: [], relationship: '', list_user: [], list_user1: [], list_user2: [], id_user1: '', id_user2: '',
            data: '', // thống kê
            arr_object: [],
            list_father: [], //danh sách chọn bố
            list_mother: [], // danh sách mẹ
            option_mother: [], // danh sách chọn mẹ
            option_spouse: [], // danh sách chọn vợ/chồng
            label_spouse: 'Chồng/vợ', //label
            columns: [
                {
                    label: 'Ảnh đại diện',
                    field: 'avatar',
                    hidden: true,
                },
                {
                    label: 'Họ và tên',
                    field: 'name',
                    filterOptions: { enabled: true, placeholder: "Họ và tên" },
                    width: '140px',
                    validate: "required",
                },
                {
                    label: 'Giới tính',
                    field: 'sex',
                    filterOptions: { 
                        enabled: true, 
                        placeholder: "Giới tính",
                        filterDropdownItems: [
                            { value: '1', text: 'Nam' },
                            { value: '0', text: 'Nữ' },
                        ],
                    },
                    width: '110px',
                },
                {
                    label: 'Ngày sinh dương lịch',
                    field: 'birthday',
                    type: 'date',
                    dateInputFormat: 'yyyy-MM-dd',
                    dateOutputFormat: 'dd-MM-yyyy',
                    tdClass: 'text-left',
                    filterOptions: { enabled: true, placeholder: "Ngày sinh" },
                    width: '200px',
                    //cols: 3,
                    validate: "required",
                },
                {
                    label: 'Ngày sinh âm lịch',
                    field: 'lunar_birthday',
                    type: 'date',
                    dateInputFormat: 'yyyy-MM-dd',
                    dateOutputFormat: 'dd-MM-yyyy',
                    tdClass: 'text-left',
                    hidden: true,
                    //cols: 3,
                    validate: "required",
                },
                {
                    label: 'Quốc tịch',
                    field: 'country',
                    filterOptions: { enabled: true, placeholder: "Quốc tịch" },
                    width: '120px',
                    cols: 2,
                    validate: "required",
                    hidden: true,
                },
                {
                    label: 'Gốc',
                    field: 'classify',
                    hidden: true,
                    cols: 3,
                },
                {
                    label: 'Đời',
                    field: 'genus',
                    filterOptions: { 
                        enabled: true, 
                        placeholder: "Đời",
                    },
                    width: '93px',
                    cols: 2,
                    validate: 'required'
                },
                {
                    label: 'Tôn giáo',
                    field: 'religion',
                    hidden: true,
                    //cols: 2,
                    validate: "required",
                },
                {
                    label: 'Học vấn',
                    field: 'literacy',
                    hidden: true,
                    cols: 2,
                },
                {
                    label: 'Điện thoại',
                    field: 'phone',
                    filterOptions: { enabled: true, placeholder: "Điện thoại" },
                    width: '115px',
                    //cols: 2,
                },
                {
                    label: 'Nghề nghiệp',
                    field: 'job',
                    hidden: true,
                    //cols: 2,
                    validate: "required",
                },
                {
                    label: 'Nơi làm việc',
                    field: 'work_address',
                    hidden: true,
                    validate: "required",
                },
                {
                    label: 'Bố',
                    field: 'father',
                    hidden: true,
                    // validate: "required",
                },
                {
                    label: 'Tên bố',
                    field: 'father_name',
                    hidden: true,
                    show: false
                },
                {
                    label: 'Mẹ',
                    field: 'mother',
                    hidden: true,
                    // validate: "required",
                },
                {
                    label: 'Tên mẹ',
                    field: 'mother_name',
                    hidden: true,
                    show: false
                },
                {
                    label: 'Vợ/chồng',
                    field: 'spouse',
                    hidden: true,
                },
                {
                    label: 'Tên vợ/chồng',
                    field: 'spouse_name',
                    hidden: true,
                    show: false
                },
                {
                    label: 'Nguyên quán',
                    field: 'resident',
                    filterOptions: { enabled: true, placeholder: "Địa chỉ" },
                    cols: 6,
                    validate: "required",
                    hidden: true,
                },
                {
                    label: 'Nơi ở hiện tại',
                    field: 'domicile',
                    hidden: true,
                    cols: 6,
                    validate: "required",
                },
                {
                    label: 'Ngày mất dương lịch',
                    field: 'deadday',
                    type: 'date',
                    dateInputFormat: 'yyyy-MM-dd',
                    dateOutputFormat: 'dd-MM-yyyy',
                    tdClass: 'text-left',
                    hidden: true,
                },
                {
                    label: 'Ngày mất âm lịch',
                    field: 'lunar_deadday',
                    type: 'date',
                    dateInputFormat: 'yyyy-MM-dd',
                    dateOutputFormat: 'dd-MM-yyyy',
                    tdClass: 'text-left',
                    hidden: true,
                },
                {
                    label: 'Chú thích',
                    field: 'description',
                    hidden: true,
                    cols: 12,
                },
                {
                    label: 'Hoạt động',
                    field: 'action',
                    width: '120px'
                }
            ],
            rows: [],
        }
    }
}
</script>

<style scoped>
.upload-image{
    width: 100%;
    border: 1px solid #cccc;
    padding: 5px 10px;
    border-radius: 5px;
}
.avatar{
    object-fit: cover;
}
.label-relationship{
    font-weight: bolder;
}

input[type=file]::file-selector-button {
  border: none;
  background: #084cdf;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  padding: 3px 5px;
  font-size: 15px;
}

input[type=file]::file-selector-button:hover {
  background: #0d45a5;
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