import yian from '@/yian/index'
//import yian from 'yian'
import uploadPanel from './components/uploadPanel.vue'

const modules = {}

modules.install = function() {
  yian.component('gallery', 'uploadPanel', uploadPanel)
}

export default modules
