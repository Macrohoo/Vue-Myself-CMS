import utils from '../utils/utils'
import yian from '../index'
import modal from './Modal.vue'
import Vue from 'vue'

let directives = {
  store: {},
  popup: {
    inserted: function (el, binding, vnode) {
      let keys = vnode.elm.id
      directives.store[keys] = binding.value ?? {}
      utils.addEvent(el, 'click', () => {
        const value = directives.store[keys];
        const action = el.getAttribute('action') ?? ''; //父组件上的回调事件名称
        const title = el.getAttribute('title') ?? '操作窗口'; // 获取窗口标题
        const hide_footer = el.getAttribute('hide_footer') ?? false; // 是否开启底部
        const hide_cancel = el.getAttribute('hide_cancel') ?? false; // 是否开启底部取消按钮
        const sure_btn = el.getAttribute('sure_btn') ?? '确定'; // 确认按钮文案
        const width = el.getAttribute('width') ?? 730; // 设置宽度
        const top = el.getAttribute('top') ?? '15vh'; // 设置宽度
        let main_modules = el.getAttribute('module'); // 获取组件隶属主模块名称
        const popup = utils.getShift(binding.modifiers); // 获取指令的修饰符 v-popup.orderShipping中的orderShipping
        console.log(vnode)
        console.log(directives.store)
        let vm = vnode.context // vnode的父组件，即渲染这个模板的上下文对象实例
        // 判断主指令是否存在
        if(popup && main_modules) {
          console.log(vm)
          let content = yian.component(main_modules, popup); //这个方法在这里是起到取出组件对象的作用（组件已经是一个compiled的对象）
          //判断popup组件的子组件component是否被注册
          console.log(content)
          if(content) {
            const visible = true
            content = Vue.extend(content)
            console.log(content)
            let instance = utils.getInstance(Vue.extend(modal), {
              value,
              action,
              title,
              hide_cancel,
              hide_footer,
              sure_btn,
              width,
              top,
              content,
              visible
            }, {
              route: vm.$route
            })
            let model = vm.$root.$el.appendChild(instance.$el)  //挂载成功后的Dom元素
            console.log(instance)
            console.log(instance.$watch)
            //监听 移除
            instance.$watch('visible', () => {
              instance.visible = false
              vm.$root.$el.removeChild(model)
              //if()
            })
          } else {
            console.error('component组件不存!');
          }
        } else {
          console.error('main_modules组件隶属主模块名称或popup指令修饰符不能为空!')
        }
      })
    }
  }
}


export default directives
