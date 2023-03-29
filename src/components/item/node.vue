<template>
    <div>
        <div class="d-flex justify-content-center">
            <span class="node-extract border rounded-lg">
                <img alt="image" :src="node.avatar"/>
            </span>
        </div>
        <p class="text-center mt-1 mb-0 font-weight-bolder" style="font-size: smaller;">{{ node.name }}</p>
    </div>
</template>

<script>
export default {
    props: {
        node: {
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
.node-extract{
    width: 70px;
    height: 70px;
    cursor: pointer;
}
img{
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 5px;
}
</style>