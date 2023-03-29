<template>
    <div class="auth-layout">
        <div class="text-white text-center p-5">
            <h1 class="name-genealogy fw-bold"> Gia tộc họ Lê</h1>
        </div>
        <div class="d-flex justify-content-center w-100">
            <router-view/>
        </div>
    </div>
</template>

<style scoped>
.auth-layout{
    background-image: url('../assets/image/background2.jpg');
    background-size: cover;
    height: 100vh;
}
.name-genealogy{
    font-size: 70px;
    font-style: italic;
}
</style>