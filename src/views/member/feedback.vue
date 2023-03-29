<template>
    <div>
        <breadcrumb :breadcrumb_title="breadcrumb_title"/>
    </div>
</template>

<script>
import breadcrumb from '@/components/layout/Breadcrumb.vue'
export default {
    components: {
        breadcrumb,
    },
    data(){
        return{
            breadcrumb_title: 'Phản hồi'
        }
    }
}
</script>