<template>
  <div id="app">
    <b-row class="justify-content-md-center">
      <b-col cols="12" md="auto">Date</b-col>
      <b-col lg="4">
        <input type="date" class="form-control" id="date" v-model="date">
      </b-col>
      <!-- <div>date selected: <strong>{{ date }}</strong></div> -->
      <b-col cols="12" md="auto">Time</b-col>
      <b-col lg="4">
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
      <b-col lg="5">
        <b-form-select v-model="selectedItem" text="Select a Location" :options="locations">
        </b-form-select>
        <!-- <div>selectedItem: <strong>{{ selectedItem }}</strong></div> -->
      </b-col>
      <b-col cols="12" md="auto">DisplayWeatherHereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee </b-col>
    </b-row>
    <br>
    DisplayScreenShotHere
    <b-button @click="getLocations">
      Click me
    </b-button>
  </div>
</template>

<script>
// import GetLocations from '@/services/GetLocations'
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      selectedItem: null,
      date: null,
      time: null,
      error: "",
      locations: [
        {
          text: 'Please select a Location',
          value: null
        }
      ]
    }
  },
  methods: {
    async getLocations () {
      if (date.value == "" || time.value == "") {
        this.error = "Date or Time is missing, please fill in and try again"
      } else {
        var url = "https://api.data.gov.sg/v1/transport/traffic-images?date_time="
        var splitTime = time.value.split(":")
        url = url.concat(date.value, "T", splitTime[0], "%3A", splitTime[1], "%3A00")
        console.log(url)
        const response = await axios.get(url)
        var i
        var locations = []
        locations.push({ text: "Please select a location", value: null })
        for (i = 0; i < response.data.items[0].cameras.length; i++) {
          locations.push({ value:response.data.items[0].cameras[i].location.latitude + " " + response.data.items[0].cameras[i].location.longitude, text:response.data.items[0].cameras[i].location.latitude + " " + response.data.items[0].cameras[i].location.longitude })
        }
        this.locations = locations
        this.error = ""
      }
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
