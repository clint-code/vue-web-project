import filesApim from './files-apim.js'

export default {
    fileUpload(data) {
        return filesApim().post('/fileUpload', data)
    }
}