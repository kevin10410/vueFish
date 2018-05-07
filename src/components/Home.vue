<template>
  <div class="container-fluid">
      <div class="displaySelector">
           <label>目前顯示:</label>
            <select id="displayFilter" v-model="display" @change="changeDisplay">
                <option value="activity" selected>近期活動</option>
                <option value="report">累積回報</option>
            </select>  
      </div>
      <app-google-map></app-google-map>
  </div>
</template>

<script>
import GoogleMap from "./GoogleMap.vue";
export default {
  data() {
    return {
      display: "activity"
    };
  },
  methods: {
    changeDisplay() {
      this.$store.commit("changeDisplay", this.display);
    }
  },
  components: {
    appGoogleMap: GoogleMap
  },
  mounted() {
      this.display = this.$store.state.currentDisplay
  }
};
</script>

<style scoped>
.displaySelector {
  padding: 12px 0;
}

select {
  width: 200px;
  border: 1px solid #ccc;
  background: #ffffff;
}

label {
  margin: 0;
}
</style>
