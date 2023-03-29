<template>
    <div>
        <div class="border rounded mb-3 p-3">
            <div class="d-flex align-items-center justify-content-between border-bottom pb-2">
                <span class="d-flex align-items-end">
                    <img :src="user.avatar" width="40px" height="40px" class="rounded-circle"/>
                    <div class="ml-2">
                        <div style="font-weight: bold; font-size: 15px; margin-bottom: -5px;">{{ user.name }}</div>
                        <span style="font-size: 12px">{{ event.date }}</span>
                    </div>
                </span>
                <span>
                    <b-dropdown size="sm" variant="link" toggle-class="text-decoration-none" no-caret>
                        <template #button-content>
                            <div class="d-flex justify-content-center"><feather type="more-horizontal"/></div>
                        </template>
                        <b-dropdown-item>
                            <span class="d-flex align-items-center">
                                <feather class="mr-2" type="edit" size="16px"/>Chỉnh sửa
                            </span>
                        </b-dropdown-item>
                        <b-dropdown-item>
                            <span class="d-flex align-items-center">
                                <feather class="mr-2" type="trash" size="16px"/>Xóa sự kiện
                            </span>
                        </b-dropdown-item>
                    </b-dropdown>
                </span>
            </div>
            <div class="mt-2">{{ event.content }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        event: {
            type: Object,
            required: true,
        }
    },
    data(){
        return{

        }
    },
    computed: {
        user(){
            return this.$store.getters.getUser;
        }
    }
}
</script>

<style scoped>
img {
    object-fit: cover;
}
</style>