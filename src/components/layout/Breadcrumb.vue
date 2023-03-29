<template>
    <div>
        <div v-if="role.role == 0"  class="breadcrumb-admin">
            <h4 class="mb-0">{{ breadcrumb_title }}</h4>
        </div>
        <div v-else class="breadcrumb-member">
            <h6 class="d-flex align-item-end ml-3">
                <span class="d-flex align-item-end"><feather type="home" size="18"/></span> Thành viên: {{ breadcrumb_title }}
            </h6>
        </div>
    </div>
</template>

<script>
export default {
    props: [ 'breadcrumb_title' ],
    computed: {
        role(){
            return this.$store.getters.getUser;
        }
    }
}
</script>

<style scoped>
.breadcrumb-admin{
    height: 70px;
    border-bottom: 1px solid blueviolet;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
}
.breadcrumb-member{
    border-bottom: 1px solid blueviolet;
    margin-bottom: 20px;
}
</style>