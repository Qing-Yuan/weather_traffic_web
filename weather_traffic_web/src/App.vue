<template>
  <div id="app">
    <b-row>
      Date
      <input type="date" class="form-control" id="date" v-model="date">
      <!-- <div>date selected: <strong>{{ date }}</strong></div> -->
      Time
      <input type="time" class="form-control" id="time" v-model="time">
      <!-- <div>time selected: <strong>{{ time }}</strong></div> -->
    </b-row>
    <b-row>
      <b-form-select v-model="selectedItem" text="Select a Location" :options="locations">
      </b-form-select>
      <!-- <div>selectedItem: <strong>{{ selectedItem }}</strong></div> -->
      DisplayWeatherHereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    </b-row>
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
      const response = await axios.get('https://api.data.gov.sg/v1/transport/traffic-images?date_time=2020-10-29T12%3A00%3A00')
      console.log(response)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
