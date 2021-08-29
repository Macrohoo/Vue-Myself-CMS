import yian from '@/yian/index'
import orderShipping from './components/orderShipping.vue'  //任何导入的vue组件已经是一个compiled的对象

const modules = {}

modules.install = function() {
  yian.component('order', 'orderShipping', orderShipping)
}

export default modules
