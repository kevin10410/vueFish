<template>
  <div>
      <app-banner></app-banner>
      <router-view></router-view>
      <app-footer></app-footer>
  </div>
</template>

<script>
import Home from "./components/Home.vue";
import Banner from "./components/Banner.vue";
import Footer from "./components/Footer.vue";
export default {
  components: {
    appHome: Home,
    appBanner: Banner,
    appFooter:Footer,
  }
};
</script>

<style>
  body {
    font-family:sans-serif;
  }

  p {
    margin: 0;
  }

</style>
