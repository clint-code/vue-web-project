import { createApp } from 'vue'
import App from './App.vue'

import store from './store'
import router from './router'

import PrimeVue from 'primevue/config'

import 'primevue/resources/themes/bootstrap4-light-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeflex/primeflex.css'

import './assets/css/style.css'
import './assets/css/custom-style.css'
import './assets/css/responsive.css'

import './assets/icons/fontawesome-web/css/all.css'

import Button from 'primevue/button'
import Card from 'primevue/card'
import FloatLabel from 'primevue/floatlabel'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import RadioButton  from 'primevue/radiobutton'
import Checkbox from 'primevue/checkbox'
import ProgressBar from 'primevue/progressbar'
import FileUpload from 'primevue/fileupload'
import Sidebar from 'primevue/sidebar'
import MultiSelect from 'primevue/multiselect'
import Dialog from 'primevue/dialog'
import Listbox from 'primevue/listbox'
import Steps from 'primevue/steps'

const app = createApp(App)

app.use(store)
app.use(router)
app.use(PrimeVue)

app.component('Button', Button)
app.component('Card', Card)
app.component('FloatLabel', FloatLabel)
app.component('InputText', InputText)
app.component('Dropdown', Dropdown)
app.component('Calendar', Calendar)
app.component('IconField', IconField)
app.component('InputIcon', InputIcon)
app.component('InputGroup', InputGroup)
app.component('InputGroupAddon', InputGroupAddon)
app.component('TabView', TabView)
app.component('TabPanel', TabPanel)
app.component('RadioButton', RadioButton)
app.component('Checkbox', Checkbox)
app.component('ProgressBar', ProgressBar)
app.component('FileUpload', FileUpload)
app.component('Sidebar', Sidebar)
app.component('MultiSelect', MultiSelect)
app.component('Dialog', Dialog)
app.component('Listbox', Listbox)
app.component('Steps', Steps)

app.mount('#app')