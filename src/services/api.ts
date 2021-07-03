import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://stopalab-admin.herokuapp.com/',
})
