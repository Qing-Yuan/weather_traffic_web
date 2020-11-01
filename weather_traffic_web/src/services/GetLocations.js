import GetLocations from '@/services/GetLocations'

export default {
    get (date, time) {
        return Api().get('https://api.data.gov.sg/v1/transport/traffic-images?date_time=2020-10-29T12%3A00%3A00')
    }
}
