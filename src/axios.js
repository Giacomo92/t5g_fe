import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://the5game-default-rtdb.firebaseio.com/',
})

export default instance
