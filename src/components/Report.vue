<template>
  <div class="container-fluid report">
      <div class="shadow" :class="{open:loading}">
          <div class="shadowTable">
            <p><i class="fas fa-spinner fa-pulse fa-5x"></i></p>
            <p>上傳中...</p> 
          </div>
      </div>
      <GmapMap
        :center="center"
        :zoom="zoom"
        :options="{disableDefaultUI:true}"
        style="width: 100%; height: 300px">
        <GmapMarker
            v-if="reportLocation===''"
            v-for="(item, index) in titleOption"
            :key="'m'+item.title"
            :position="{lat:item.geojson[0][1], lng:item.geojson[0][0]}"
            :clickable="true"
            :draggable="false"
            :animation="4"
            :icon="{url:`./src/assets/GoogleMarkers/yellow_Marker${capital[index]}.png`}"
            @click="openInfoWindow(item)"
            />

        <GmapMarker
            v-else
            v-for="(item, index) in selectBeach"
            :key="'l'+item.title"
            :position="{lat:item.geojson[0][1], lng:item.geojson[0][0]}"
            :clickable="true"
            :draggable="false"
            :animation="4"
            :icon="{url:`./src/assets/GoogleMarkers/yellow_Marker${capital[index]}.png`}"
            @click="openInfoWindow(item)"
            />

        <gmap-info-window v-if="displayBeach.beachName !== undefined"  :options="infoOptions" :position="{lat:displayBeach.geojson[0][1], lng:displayBeach.geojson[0][0]}" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
                <p>{{displayBeach.title}}</p>
            </gmap-info-window>    
      </GmapMap>
      <div class="reportSelector">
          <p>請選擇要通報的海灘</p>
          <select class="selectorItem">
              <option>台南市</option>
          </select>
          <select class="selectorItem" v-model="reportBeach">
              <option selected disabled :value="''">選擇海灘</option>
              <option value = "黃金海岸">黃金海岸</option>
              <option value = "漁光島">漁光島</option>
              <option value = "觀夕平台">觀夕平台</option>
              <option value = "橋頭公園">橋頭公園</option>
              <option value = "馬沙溝濱海遊憩區">馬沙溝濱海遊憩區</option>
              <option value = "府城天險">府城天險</option>
          </select>
          <select class="selectorItem" v-model="reportLocation">
              <option selected disabled :value="''">選擇海灘分段</option>
              <option v-for="item in titleOption" :key="'option'+item.title" :value="item.title">{{item.title}}</option>
          </select>
      </div>
      <div class="form-group">
            <div class='controller'>
                <input type='file' accept="image/*" class='selectImage' required @change="choosePic">
            </div>
            <div class='previewTable'>
                <img v-if="image!==''" class="previewArea" :src="image" />
                <button @click="submitReport">送出回報</button>
            </div>
        </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      center: { lat: 23.5, lng: 121 },
      zoom: 6,
      reportBeach: "",
      reportLocation: "",
      capital: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N"
      ],
      infoWinOpen: false,
      displayBeach: {},
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      },
      image: "",
      file: "",
      loading:false,

    }
  },
  watch: {
    reportBeach() {
      this.zoom = 12;
      this.reportLocation = "";
      this.infoWinOpen = false;
      this.center = {
        lat: this.titleOption[0].geojson[0][1],
        lng: this.titleOption[0].geojson[0][0]
      };
    },
    selectBeach() {
      let vm = this;
      if (this.selectBeach.length !== 0) {
        vm.openInfoWindow(vm.selectBeach[0]);
        vm.zoom = 15;
        vm.center = {
          lat: vm.selectBeach[0].geojson[0][1],
          lng: vm.selectBeach[0].geojson[0][0]
        };
      }
    }
  },
  methods: {
    getAllBeachData() {
      this.$store.dispatch("getAllBeach");
    },
    openInfoWindow(beach) {
      this.infoWinOpen = true;
      this.displayBeach = beach;
      this.zoom = 15;
      this.center = {
        lat: this.displayBeach.geojson[0][1],
        lng: this.displayBeach.geojson[0][0]
      };
    },
    choosePic(event) {
      let files = event.target.files || event.dataTransfer.files;
      if (!files.length) return;
      this.file = files[0];
      this.createImage(files[0]);
    },
    createImage(file) {
      let image = new Image();
      let reader = new FileReader();
      let vm = this;
      reader.onload = event => {
        vm.image = event.target.result;
      };
      reader.readAsDataURL(file);
    },
    submitReport() {
      if (this.reportLocation === "") {
        window.alert("請選擇回報海灘！");
      } else if (this.image === "") {
        window.alert("請選擇上傳照片！");
      } else if (this.file.size > 10485760) {
        window.alert('請重新選擇小於10MB的上傳照片！');
      } else {
        this.loading = true;
        console.log(this.file);
        let form = new FormData();
        form.append("image", this.file);
        let settings = {
          async: true,
          crossDomain: true,
          album: "CVbLU",
          url: "https://api.imgur.com/3/image",
          method: "POST",
          headers: {
            Authorization: "Client-ID 11fea8a380dfefb"
          },
          processData: false,
          contentType: false,
          mimeType: "multipart/form-data",
          data: form
        };
        axios(settings)
          .then(res => {
            if(res.status === 200) {
              console.log(res);
              this.loading = false;
              window.alert(`圖片網址: ${res.data.data.link}`)
            }
          })
          .catch(err => {
            console.log(err);
            this.loading = false;
          });
      }
    }
  },
  computed: {
    allBeach() {
      return this.$store.state.allBeach;
    },
    titleOption() {
      let vm = this;
      return this.$store.state.allBeach.filter(item => {
        return item.beachName === vm.reportBeach;
      });
    },
    selectBeach() {
      let vm = this;
      let selectBeach = this.titleOption.filter(item => {
        return item.title === vm.reportLocation;
      });
      return selectBeach;
    }
  },
  mounted() {
    this.getAllBeachData();
  }
};
</script>

<style scoped>
.report {
  height: 600px;
  position: relative;
}

.shadow {
  z-index: 2;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  display: none;
  justify-content: center;
  align-items: center;
}

.shadow.open {
  display: flex;
}

.shadowTable{
  border-radius:10px; 
  width: 50%;
  height: 50%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #ffffff;
}

.shadowTable p{
  margin-bottom: 10px;
  font-size: 1rem;
}

.reportSelector p {
  padding: 5px 0;
}

.selectorItem {
  height: 30px;
  width: 100%;
  border: 1px solid #ccc;
  background: #ffffff;
  margin-bottom: 10px;
}

.previewTable {
  margin-top: 10px;
  width: 100%;
  height: 100px;
  position: relative;
}

.previewArea {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.previewTable button {
  position: absolute;
  right: 0;
  bottom: 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  background: #ffffff;
  padding: 5px 15px;
  color: #666666;
}
</style>
