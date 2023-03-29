<template>
  <div>
    <component :is="layout"></component>
  </div>
</template>

<script>

import admin from './layouts/admin.vue'
import auth from './layouts/auth.vue'
import member from './layouts/member.vue'
import error from './layouts/error.vue'

export default {
  components: {
    admin, auth, member, error
  },
  data(){
    return{}
  },
  computed: {
    layout(){
      return this.$store.getters.getLayout;
    }
  }
}
</script>

<style>
*{
  margin: 0;
}
</style>