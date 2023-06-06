<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  // created() {
  //   const token = window.sessionStorage.getItem('token');
  //   if (token) {
  //     this.$router.replace('/selector');
  //   } else {
  //     this.$router.replace('/login1');
  //   }
  // }
}
</script>