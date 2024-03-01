import axios from 'axios'
import config from '@/util/config.js'
import sha256 from 'js-sha256';

export default {
  getToken () {
    var key = 'JBSWY3DPEHPK3PXP'
    var timestamp = Date.now()

    var hash = sha256.hmac.create(key)
    hash.update(timestamp + "")
    var token = hash.hex()

    try {
      const response = axios.get(config.wso2URL, {
        headers: {
          'Content-Type': 'application/json',
          'APP-T': timestamp,
          'APP-ID': token,
        },
      });

      return response.data;

    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }
  }
}
