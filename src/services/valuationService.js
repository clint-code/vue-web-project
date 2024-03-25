import getToken from '@/services/auth.js'
import config from '@/util/config.js'
import axios from 'axios'

export default {
    getPlaces(searchTerm) {
        const key = 'AIzaSyAJA-Ku2beBvsyGisvl1Au1gkbWm8iyd00'
        const url = config.mapURL + '?input=' + searchTerm + '&fields=formatted_address,name,geometry&key=' + key + '&inputtype=textquery'

        try {
            const response = axios.get(url, {
                headers: {
                'Content-Type': 'application/json'
                },
            });
        
            return response.data;

            } catch (error) {
                console.error('Error:', error.message);
            throw error;
        }    
    },
}