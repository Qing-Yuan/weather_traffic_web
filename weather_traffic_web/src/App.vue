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
      <b-form-select v-model="selectedItem">
          <option value="Action">Action</option>
          <option value="Another action">Another action</option>
          <option value="Something else here">Something else here</option>
      </b-form-select>
      <!-- <div>selectedItem: <strong>{{ selectedItem }}</strong></div> -->
      DisplayWeatherHereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
    </b-row>
    DisplayScreenShotHere
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      selectedItem: '',
      date: '',
      time: ''
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
