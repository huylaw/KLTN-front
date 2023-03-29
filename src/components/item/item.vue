<template>
    <div class="d-flex justify-content-between align-items-center border rounded-lg p-2" style="cursor: pointer">
        <div>
            <span>
                <b-avatar rounded="lg" size="lg" :src="item.avatar"/>
            </span>
            <span class="ml-2" style="font-size: 15px">{{ item.name }}</span>
        </div>
        <span v-if="item.role == 0" style="font-size: 13px;" class="font-italic">Quản trị viên</span>
        <span v-else style="font-size: 13px;" class="font-italic">Thành viên</span>
    </div>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true,
        }
    },
    data(){
        return{

        }
    }
}
</script>

<style scoped>
img{
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 5px;
}
</style>