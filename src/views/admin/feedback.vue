<template>
    <div>
        <breadcumb :breadcrumb_title="breadcrumb_title"/>
        <div>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import breadcumb from '@/components/layout/Breadcrumb.vue'

export default {
    components: {
        breadcumb,
    },
    data(){
        return {
            breadcrumb_title: 'Phản hồi của thành viên'
        }
    }
}
</script>