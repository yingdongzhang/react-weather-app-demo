const weather = (state = {
  weather: null,
  loading: false,
}, action) => {
  switch (action.type) {
    case 'FETCH_WEATHER':
      return { ...state, loading: true }
    case 'WEATHER_FETCHED':
      return { ...state, loading: false, weather: action.payload.weather }
    default:
      return state
  }
}
  
export default weather
