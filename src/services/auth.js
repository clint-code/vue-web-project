  import axios from 'axios'
  import config from '@/util/config.js'
  import sha256 from 'js-sha256'

  export default {
    async getToken() {
      try {
        var key = 'JBSWY3DPEHPK3PXP'
        var timestamp = Date.now()

        var hash = sha256.hmac.create(key);
        hash.update(timestamp + '');
        var token = hash.hex();

        const response = await axios.get(config.wso2URL, {
          headers: {
            'Content-Type': 'application/json',
            'APP-T': timestamp,
            'APP-ID': token,
          },
        })

        if(response.data.code != 200) {
          throw error;
        }
        else {
          return response.data.data.token
        }        
      } 
      
      catch (error) {
        throw error;
      }
    }
  };
