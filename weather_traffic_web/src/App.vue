<template>
  <div id="app">
    <b-container fluid>
      <b-row class="justify-content-md-center" cols="4" cols-sm="4" cols-md="4" cols-lg="4" cols-xl="4">
        <b-col class="my-auto">Date</b-col>
        <b-col>
          <input type="date" class="form-control" id="date" v-model="date">
        </b-col>
        <!-- <div>date selected: <strong>{{ date }}</strong></div> -->
        <b-col class="my-auto">Time</b-col>
        <b-col>
          <input type="time" class="form-control" id="time" v-model="time">
        </b-col>
        <!-- <div>time selected: <strong>{{ time }}</strong></div> -->
      </b-row>
      <b-row class="justify-content-md-center">
        <div class="error">
          {{ error }}
        </div>
      </b-row>
      <br>
      <b-row class="justify-content-md-center">
        <b-col lg="2">
          <b-button @click="getLocations">
            Get Locations
          </b-button>
        </b-col>
        <b-col lg="4">
          <b-form-select v-model="selectedItem" text="Select a Location" :options="locations">
          </b-form-select>
          <!-- <div>selectedItem: <strong>{{ selectedItem }}</strong></div> -->
        </b-col>
        <b-col class="my-auto" md="auto">
          {{ forecast }}
        </b-col>
      </b-row>
      <br>
      DisplayScreenShotHere
    </b-container>
  </div>
</template>

<script>
// import GetLocations from '@/services/GetLocations'
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      selectedItem: null,
      date: null,
      time: null,
      error: "",
      locations: [
        {
          text: 'Please select a Location',
          value: null
        }
      ],
      traffic: null,
      weather: null,
      forecast: null,
      imagesMap: null
    }
  },
  methods: {
    async getLocations () {
      if (date.value == "" || time.value == "") {
        this.error = "Date or Time is missing, please fill in and try again!"
        console.log("Missing inputs")
      } else {
        var url = "https://api.data.gov.sg/v1/transport/traffic-images?date_time="
        var splitTime = time.value.split(":")
        url = url.concat(date.value, "T", splitTime[0], "%3A", splitTime[1], "%3A00")
        const response = await axios.get(url)
        this.traffic = response
        console.log(response)

        var i
        var locations = []
        var imagesMap = {}
        locations.push({ text: "Please select a Location", value: null })
        for (i = 0; i < response.data.items[0].cameras.length; i++) {
          url = "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude="
          url = url.concat(response.data.items[0].cameras[i].location.latitude, "&longitude=", response.data.items[0].cameras[i].location.longitude, "&localityLanguage=en")
          const response2 = await axios.get(url)
          // console.log(response2)
          locations.push({ value: response2.data.locality, text: response2.data.locality })
          imagesMap[response2.data.locality] = response.data.items[0].cameras[i].image
        }
        this.locations = locations.sort()
        this.error = ""
        this.imagesMap = imagesMap
        console.log("locations retrieved")
      }
    },
    async getWeatherTraffic () {
      var url = "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time="
      var splitTime = time.value.split(":")
      url = url.concat(date.value, "T", splitTime[0], "%3A", splitTime[1], "%3A00")
      const response = await axios.get(url)
      this.weather = response
      
      var i
      for (i = 0; i < response.data.items[0].forecasts.length; i++) {
        if (response.data.items[0].forecasts[i].area == this.selectedItem) {
          this.forecast = response.data.items[0].forecasts[i].forecast
          console.log(this.forecast)
        }
      }
      if (this.forecast.value == "") {
        this.forecast = "No available forecast"
      }
    }
  },
  watch: {
    selectedItem() {
      this.getWeatherTraffic()
    }
  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin: auto;
  width: 100%;
  padding: 10px;
}
.error {
  color: red;
}
</style>
