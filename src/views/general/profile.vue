<template>
    <div>
        <breadcrumb :breadcrumb_title="breadcrumb_title"/>
        <div class="m-3">
            <b-tabs content-class="mt-3" active-nav-item-class="text-danger font-weight-bold">
                <b-tab title="Thông tin cá nhân">
                    <FormulateForm @submit="Submit">
                        <b-row>
                            <b-col cols="12" lg="3" class="mb-2">
                                <img :src="avatar" width="100%" height="200px" class="avatar border border-success rounded mb-2"/>
                                <input class="upload-image" type="file" ref="file" accept="image/*" @change="onFileChange"/>
                                <!-- <img src="@/assets/image/logo_lee.png" width="100%" height="200px" class="mt-3"/> -->
                            </b-col>
                            <b-col cols="12" lg="9">
                                <b-row>
                                    <b-col cols="12" :lg="i.cols != null ? i.cols : 3" v-for="i in item.filter((i) => i.field !== 'avatar' && i.show !== false)" :key="i.field">
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
                                        <div v-else-if="i.type == 'date'" class="mb-2">
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
                            </b-col>
                        </b-row>
                        <div class="d-flex justify-content-end my-3">
                            <b-button variant="primary" size="sm" pill type="submit">Cập nhật</b-button>
                        </div>
                    </FormulateForm>
                </b-tab>
                <b-tab title="Thay đổi mật khẩu">
                    <b-col cols="12" lg="5" class="border p-3 shadow-lg mb-5 bg-body rounded">
                        <FormulateForm @submit="changePass">
                            <b-row>
                                <b-col cols="12" class="mb-2">
                                    <FormulateInput 
                                        v-model="currientItems.username"
                                        label="Tên đăng nhập"
                                        placeholder="Tên đăng nhập"
                                        type="text"
                                        disabled
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
                            <div class="d-flex justify-content-end">
                                <b-button variant="primary" type="submit" size="sm" class="my-3">Xác nhận</b-button>
                            </div>
                        </FormulateForm>
                    </b-col>
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
        breadcrumb,
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
        async loadData(){
            var id_user = this.$store.getters.getUser.id_user;
            await axios.get(`http://localhost:3000/api/user/${id_user}`).then((res) => {
                this.currientItems = res.data.result[0];
            })
            this.avatar = this.currientItems.avatar;
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
            var classify = this.$store.getters.getUser.classify;
            if(classify == 1){
                this.label_spouse = 'Chồng';
                this.option_spouse = this.list_father;
            }else{
                this.label_spouse = 'Vợ';
                this.option_spouse = this.list_mother;
                this.option_mother = this.list_mother.filter((i) => i.genus == this.currientItems.genus - 1);
            }
        },
        async Submit(){
            var id_user = this.$store.getters.getUser.id_user;
            await axios.put(`http://localhost:3000/api/user/${id_user}`, this.currientItems).then(async ()=>{
                // await this.loadData();
                const formData = new FormData();
                if(this.$refs.file.files[0]){
                    formData.append('image', this.$refs.file.files[0]);
                    await axios.put(`http://localhost:3000/api/avatar/${id_user}`, formData).then(()=>{
                        //this.loadData();
                    })
                }
                await this.loadData();
                this.$store.commit('setUser', this.currientItems);
                this.$bvToast.toast('Cập nhật thông tin thành công', {
                    title: 'OK',
                    variant: 'success',
                    solid: true
                });
                location.reload();
            }).catch(()=>{
                this.$bvToast.toast('Cập nhật thông tin thất bại',{
                    title: 'Lỗi',
                    variant: 'danger',
                    solid: true
                });
            })
        },
        async changePass(){
            var id_user = this.$store.getters.getUser.id_user;
            if(this.currientItems.password === this.confirm_password){
                await axios.put(`http://localhost:3000/api/change_password/${id_user}`, {username: this.currientItems.username, password: this.currientItems.password}).then(()=>{
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
        }
    },
    data(){
        return{
            breadcrumb_title: 'Thông tin cá nhân',
            avatar: '',
            confirm_password: '',
            currientItems: {},
            list_father: [], //danh sách chọn bố
            list_mother: [], // danh sách mẹ
            option_mother: [], // danh sách chọn mẹ
            option_spouse: [], // danh sách chọn vợ/chồng
            label_spouse: 'Chồng/vợ', //label
            item: [
                {
                    label: 'Ảnh đại diện',
                    field: 'avatar',
                },
                {
                    label: 'Họ và tên',
                    field: 'name',
                    validate: "required",
                },
                {
                    label: 'Giới tính',
                    field: 'sex',
                    //cols: 2,
                },
                {
                    label: 'Ngày sinh dương lịch',
                    field: 'birthday',
                    type: 'date',
                    //cols: 3,
                    validate: "required",
                },
                {
                    label: 'Ngày sinh âm lịch',
                    field: 'lunar_birthday',
                    type: 'date',
                    //cols: 3,
                    validate: "required",
                },
                {
                    label: 'Quốc tịch',
                    field: 'country',
                    cols: 2,
                    validate: "required",
                },
                {
                    label: 'Gốc',
                    field: 'classify',
                    cols: 3,
                },
                {
                    label: 'Đời',
                    field: 'genus',
                    cols: 2,
                },
                {
                    label: 'Tôn giáo',
                    field: 'religion',
                    //cols: 2,
                    validate: "required",
                },
                {
                    label: 'Học vấn',
                    field: 'literacy',
                    cols: 2,
                },
                {
                    label: 'Điện thoại',
                    field: 'phone',
                    //cols: 2,
                },
                {
                    label: 'Nghề nghiệp',
                    field: 'job',
                    //cols: 2,
                    validate: "required",
                },
                {
                    label: 'Nơi làm việc',
                    field: 'work_address',
                    validate: "required",
                },
                {
                    label: 'Bố',
                    field: 'father',
                    // validate: "required",
                },
                {
                    label: 'Tên bố',
                    field: 'father_name',
                    show: false
                    // validate: "required",
                },
                {
                    label: 'Mẹ',
                    field: 'mother',
                    // validate: "required",
                },
                {
                    label: 'Tên mẹ',
                    field: 'mother_name',
                    show: false
                    // validate: "required",
                },
                {
                    label: 'Vợ/chồng',
                    field: 'spouse',
                },
                {
                    label: 'Tên vợ/chồng',
                    field: 'spouse_name',
                    show: false
                    // validate: "required",
                },
                {
                    label: 'Nguyên quán',
                    field: 'resident',
                    cols: 6,
                    validate: "required",
                },
                {
                    label: 'Nơi ở hiện tại',
                    field: 'domicile',
                    cols: 6,
                    validate: "required",
                },
                // {
                //     label: 'Ngày mất dương lịch',
                //     field: 'deadday',
                //     type: 'date',
                // },
                // {
                //     label: 'Ngày mất âm lịch',
                //     field: 'lunar_deadday',
                //     type: 'date',
                // },
                {
                    label: 'Chú thích',
                    field: 'description',
                    cols: 12,
                }
            ]
        }
    },
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
</style>