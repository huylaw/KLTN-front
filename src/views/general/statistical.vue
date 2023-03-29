<template>
    <div>
        <breadcrumb :breadcrumb_title="breadcrumb_title"/>
        <b-row>
            <b-col cols="12" lg="4">
                <b-row>
                    <b-col cols="12">
                        <div class="container-bank shadow-lg">
                            <div class="d-flex align-items-center text-white mb-2">
                                <img src="@/assets/image/logo_lee.png" width="60px" height="50px"/>
                                <h3 class="mx-2">Ngân sách</h3>
                            </div>
                            <div class="d-flex justify-content-end mb-4 text-white">
                                <div style="font-size: 30px">{{ formatPrice(money) }}</div>đ
                            </div>
                        </div>
                    </b-col>
                    <b-col cols="12" v-for="(i, index) in arr_object" :key="index">
                        <div class="border p-2 shadow-lg mb-3 bg-body rounded">
                            <h5>{{ i.title }}</h5>
                            <div>
                                <apexchart class="d-flex justify-content-center" type="pie" width="420" :options="i.chartOptions" :series="i.series"></apexchart>
                                <p class="text-center mt-3"><i>Biểu đồ tỉ lệ {{ i.title }}</i></p>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
            <b-col cols="12" lg="8">
                <b-row>
                    <b-col cols="12">
                        <div class="border rounded bg-body p-2 mb-3 shadow-lg">
                            <h5>Thông tin thu/chi quỹ</h5>
                            <b-tabs content-class="mt-3" active-nav-item-class="text-danger font-weight-bold" class="m-3">
                                <div v-for="(i, index) in tabs" :key="index">
                                    <b-tab :title="i.title">
                                        <vue-good-table
                                            :columns="i.columns"
                                            :rows="i.rows"
                                            :line-numbers="true"
                                            :pagination-options="{enabled: true}"
                                        >
                                            <template slot="table-row" slot-scope="props">
                                                <span v-if="props.column.field === 'money'">
                                                    {{ formatPrice(props.formattedRow[props.column.field]) }} đ
                                                </span>
                                            </template>
                                            <template slot="emptystate">
                                                <div class="d-flex justify-content-center">Không có dữ liệu</div>
                                            </template>
                                        </vue-good-table>
                                    </b-tab>
                                </div>
                            </b-tabs>
                        </div>
                    </b-col>
                    <b-col cols="12">
                        <div class="border rounded shadow-lg bg-body p-2 mb-3">
                            <h5>Lịch sử đóng tiền cá nhân</h5>
                            <div class="history-collect px-3 mb-2 mt-3">
                                <table class="table table-sm table-bordered m-0">
                                    <thead class="sticky-top">
                                        <tr>
                                            <th style="width: 50px" class="text-center font-weight-normal">STT</th>
                                            <th style="width: 200px" class="font-weight-normal">Họ tên</th>
                                            <th style="width: 150px" class="font-weight-normal">Số tiền</th>
                                            <th style="width: 120px" class="font-weight-normal">Ngày đóng</th>
                                            <th class="font-weight-normal">Chú thích</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(i, index) in collect" :key="index">
                                            <td class="text-center">{{ index }}</td>
                                            <td>{{ i.name_user }}</td>
                                            <td>{{ formatPrice(i.money) }} đ</td>
                                            <td>{{ i.date_collect }}</td>
                                            <td>{{ i.description }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import axios from 'axios';
import gsap from 'gsap';
import breadcrumb from '@/components/layout/Breadcrumb.vue'

export default {
    components: {
        breadcrumb,
    },
    data(){
        return {
            breadcrumb_title: 'Thống kê',
            data: '',
            arr_object: [],
            money: 0, bank: 0,
            //lịch sử đóng tiền
            collect: [],
            tabs: [
                { 
                    title: 'Thu quỹ họ', 
                    type: true,
                    columns: [
                        {
                            label: 'Tên thành viên',
                            field: 'name_user',
                            filterOptions: { enabled: true, placeholder: 'Tên thành viên' },
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
                            label: 'Ngày chuyển tiền',
                            field: 'date_collect',
                            type: 'date',
                            dateInputFormat: 'yyyy-MM-dd',
                            dateOutputFormat: 'dd-MM-yyyy',
                            tdClass: 'text-left',
                            width: '170px',
                            validate: "required",
                        },
                        {
                            label: 'Chú thích',
                            field: 'description',
                            cols: 12
                        },
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
                    ],
                    rows: []
                }
            ],
        }
    },
    watch: {
        bank(n){
            gsap.to(this, { duration: 0.5, money: Number(n) || 0 });
        }
    },
    mounted(){
        this.loadData();
    },
    methods: {
        formatPrice(value) {
            let val = (value/1).toFixed(0).replace('.', ',');
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        async loadData(){
            const data = await axios.get('http://localhost:3000/api/statistical');
            this.data = data.data.statistical;
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
            var id_user = this.$store.getters.getUser.id_user;
            await axios.get(`http://localhost:3000/api/statictical_money/${id_user}`).then((res) => {
                this.collect = res.data.result;
            });
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
thead{
    background-color: blueviolet;
    color: white;
}
.history-collect{
    height: 350px;
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