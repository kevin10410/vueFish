<template>
    <div class="googleMapBox">
        <GmapMap
        :center="center"
        :zoom="zoom"
        :options="{disableDefaultUI:true}"
        style="width: 100%; height: 550px">
            <GmapMarker
                v-if="currentDisplay==='activity'"
                v-for="(item, index) in allActivity"
                :key="'activity_'+item.id"
                :position="{lat:item.geojson[0][1], lng:item.geojson[0][0]}"
                :clickable="true"
                :draggable="false"
                :animation="4"
                :icon="{url:`./src/assets/GoogleMarkers/yellow_Marker${capital[index]}.png`}"
                @click="openInfoWindow(item)"
            />
             <GmapMarker
                v-else
                v-for="(item, index) in allReport"
                :key="'report_'+item.id"
                :position="{lat:item.geojson[0][1], lng:item.geojson[0][0]}"
                :clickable="true"
                :draggable="false"
                :animation="4"
                :icon="{url:`./src/assets/GoogleMarkers/green_Marker${capital[index]}.png`}"
                @click="openInfoWindow(item)"
            />

            <gmap-info-window v-if="infoWinOpen && currentDisplay==='activity'" :options="infoOptions" :position="{lat:selectBeach.geojson[0][1], lng:selectBeach.geojson[0][0]}" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
                <div class="infoWindow">
                    <p class="beachTitle">{{selectBeach.activity}}</p>
                    <p class="infoDetail"><span>海灘名稱:</span>{{selectBeach.beachName}}</p>
                    <p class="infoDetail"><span>活動日期:</span>{{selectBeach.activityDate}}</p>
                    <p class="infoDetail"><span>聯絡人:</span>{{JSON.parse(selectBeach.contact).name}}</p>
                    <p class="infoDetail"><span>聯絡電話:</span>{{JSON.parse(selectBeach.contact).phone}}</p>
                </div>
            </gmap-info-window>
            <gmap-info-window v-if="infoWinOpen && currentDisplay==='report'" :options="infoOptions" :position="{lat:selectBeach.geojson[0][1], lng:selectBeach.geojson[0][0]}" :opened="infoWinOpen" @closeclick="infoWinOpen=false">
                <div class="infoWindow">
                    <p class="beachTitle">{{selectBeach.beachName}}</p>
                    <p class="infoDetail"><span>海灘分段:</span>{{selectBeach.title}}</p>
                    <p class="infoDetail"><span>回報日期:</span>{{selectBeach.updateDate}}</p>
                    <p class="infoDetail"><span>淨灘需求:</span>{{cleanRequire}}</p>
                    <p class="infoDetail"><span>回報照片:</span>
                        <img class="reportPic" :src="selectBeach.imageURL">
                    </p>
                </div>
            </gmap-info-window>
        </GmapMap>
        <div class="sideTable" :class="{open:sideOpen}">
            <p class="switcher open" v-html="icon" @click.stop="openTable"></p>
            <ul class="allBeachList">
                <li v-if="currentDisplay==='activity'" 
                    class="allBeachItem" 
                    v-for="(item, index) in allActivity" 
                    :key="'activityList_'+item.id"
                    @click="openInfoWindow(item)">
                    <div class="icon"><img :src="`./src/assets/GoogleMarkers/yellow_Marker${capital[index]}.png`"></div>
                    <div class="info">
                        <p>活動日期: {{item.activityDate}}</p>
                        <p>淨灘活動: {{item.activity}}</p>
                    </div>
                </li>
                <li v-if="currentDisplay === 'report'" 
                    class="allBeachItem" 
                    v-for="(item, index) in allReport" 
                    :key="'reportList_'+item.id"
                    @click="openInfoWindow(item)">
                    <div class="icon"><img :src="`./src/assets/GoogleMarkers/green_Marker${capital[index]}.png`"></div>
                    <div class="info">
                        <p>更新日期: {{item.updateDate}}</p>
                        <p>回報地點: {{item.beachName}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>  
</template>
<script>
export default {
  data() {
    return {
      capital: [
        "A","B","C","D","E","F","G","H","I","J","K","L","M","N"
      ],
      icon: '<i class="fas fa-angle-left fa-2x"></i>',
      sideOpen: false,
      center: { lat: 23.5, lng: 121 },
      zoom: 7,
      infoWindowPos: { lat: 23.5, lng: 121 },
      infoWinOpen: false,
      selectBeach: {},
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35
        }
      }
    };
  },
  watch: {
    currentDisplay() {
      this.zoom = 7;
      this.center = { lat: 23, lng: 121 };
      this.infoWinOpen = false;
      this.closeTable();
    }
  },
  computed: {
    allBeach() {
      return this.$store.state.allBeach;
    },
    allActivity() {
      return this.$store.state.allActivity;
    },
    allReport() {
      return this.$store.state.allReport;
    },
    currentDisplay() {
      return this.$store.state.currentDisplay;
    },
    cleanRequire() {
        if (this.selectBeach.clean === true) {
            return '否'
        } else {
            return '是'
        }
    }
  },
  methods: {
    openTable() {
      if (this.icon === '<i class="fas fa-angle-left fa-2x"></i>') {
        this.icon = '<i class="fas fa-angle-right fa-2x"></i>';
        this.sideOpen = true;
      } else {
        this.icon = '<i class="fas fa-angle-left fa-2x"></i>';
        this.sideOpen = false;
      }
    },
    closeTable() {
      this.icon = '<i class="fas fa-angle-left fa-2x"></i>';
      this.sideOpen = false;
    },
    openInfoWindow(item) {
      this.center = { lat: item.geojson[0][1], lng: item.geojson[0][0] };
      this.zoom = 15;
      this.infoWinOpen = true;
      this.selectBeach = item;
      this.closeTable();
    },
    getAllBeach() {
      this.$store.dispatch("getAllBeachData");
    },
    getAllReport() {
      this.$store.dispatch("getAllReport");
      this.$store.dispatch("getAllActivity");
      this.$store.dispatch("getAllBeach")
    }
  },
  mounted() {
    this.getAllReport();
  }
};
</script>
<style scoped>
.googleMapBox {
  height: 550px;
  position: relative;
  overflow: hidden;
}

.sideTable {
  width: 275px;
  height: 550px;
  position: absolute;
  background: #ffffff;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  border-left: 2px solid black;
  top: 0;
  left: 100%;
  transform: translateX(0);
  padding: 0;
  transition: transform 0.2s linear;
}

.sideTable.open {
  transform: translateX(-100%);
  transition: transform 0.2s linear;
  /* transform:  */
}

.switcher {
  padding: 0 12px;
  position: absolute;
  top: -2px;
  left: -42px;
  margin: 0;
  border-radius: 5px 0 0 5px;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  border-left: 2px solid black;
  background: #ffffff;
}

.allBeachList {
  height: 400px;
  padding: 0;
  list-style: none;
  overflow-y: scroll;
}

.allBeachItem {
  height: 50px;
  background: #eeeeee;
  display: flex;
}

.allBeachItem:nth-child(2n + 2) {
  background: #ffffff;
}

.icon {
  display: flex;
  width: 40px;
}

.icon img {
  object-fit: contain;
  margin: 0 auto;
}

.infoDetail {
  margin-bottom: 2px;
  font-size: 0.9rem;
}

.infoDetail span {
  display: inline-block;
  font-weight: bold;
  width: 70px;
}

.beachTitle {
  margin: 0 0 2px 0;
  font-size: 1.1rem;
  font-weight: bold;
}

.reportPic{
    width: 100px;
    height: 100px;
    object-fit: cover;
}

.info{
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
</style>


