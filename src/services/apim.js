import axios from 'axios'

import config from '@/util/config.js';
import { useRouter } from 'vue-router'
import auth from '@/services/auth.js'

const router = useRouter()

let APIM = function () {
  let baseAPI = axios.create({
    baseURL: config.backendURL,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  })

  baseAPI.interceptors.request.use(
    async (request) => {
      try {
        const token = await auth.getToken()
        request.headers['Authorization'] = `Bearer ${token}`
        
        return request;
      } 
      
      catch (error) {
        console.error('Error adding token to request:', error.message)
        return Promise.reject(error)
      }
    },
    (error) => {
      console.error('Error intercepting request:', error.message)
      return Promise.reject(error);
    }
  );

  baseAPI.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        //
      }
      return Promise.reject(error)
    }
  )

  return baseAPI
}

export default APIM; 