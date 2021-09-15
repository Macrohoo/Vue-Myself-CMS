import Vue from 'vue';
import utils from '../utils/utils';
import yian from '../index';
import modal from './Modal.vue';

const directives = {
  store: {},
  popup: {
    inserted(el, binding, vnode) {
      const keys = vnode.elm.id;
      directives.store[keys] = binding.value ?? {};
      utils.addEvent(el, 'click', () => {
        const value = directives.store[keys];
        const action = el.getAttribute('action') ?? ''; // 父组件上的回调事件名称
        const title = el.getAttribute('title') ?? '操作窗口'; // 获取窗口标题
        const hide_footer = el.getAttribute('hide_footer') ?? false; // 是否取消底部
        const hide_cancel = el.getAttribute('hide_cancel') ?? false; // 是否取消底部取消按钮
        const sure_btn = el.getAttribute('sure_btn') ?? '确定'; // 确认按钮文案
        const width = el.getAttribute('width') ?? 730; // 设置宽度
        const top = el.getAttribute('top') ?? '15vh'; // 设置距顶高度
        const main_modules = el.getAttribute('module'); // 获取组件隶属主模块名称
        const popup = utils.getShift(binding.modifiers); // 获取指令的修饰符 v-popup.orderShipping中的orderShipping
        const vm = vnode.context; // vnode的父组件，即渲染这个template模板的上下文对象实例
        // Determine whether the main instruction exists
        if (popup && main_modules) {
          let content = yian.component(main_modules, popup); // 这个方法起到取出组件对象的作用（组件已经是一个compiled的对象）
          // Determine whether the subcomponent of the popup component is registered
          if (content) {
            const visible = true;
            content = Vue.extend(content);
            const instance = utils.getInstance(Vue.extend(modal), {
              value,
              action,
              title,
              hide_cancel,
              hide_footer,
              sure_btn,
              width,
              top,
              content, // 构造体
              visible
            }, {
              route: vm.$route
            });
            const domDiv = vm.$root.$el.appendChild(instance.$el); // Dom element after successful mounting
            // Monitor Remove Vue.property.$watch
            console.log(value);
            instance.$watch('visible', () => {
              instance.visible = false;
              vm.$root.$el.removeChild(domDiv);
              if (instance.affirm) {
                vm.reload ? vm.reload() : false; // If the context object routing for rendering template template needs to be overloaded
                vm[action] ? vm[action].apply(vm, [keys, value]) : false;
              }
            });
          } else {
            console.error('component组件不存!');
          }
        } else {
          console.error('main_modules组件隶属主模块名称或popup指令修饰符不能为空!');
        }
      });
    },
    // 需要考虑到vnode更新的情况(这种是vnode更新，但是组件并没有销毁重建的情况，那我们需要去触发这个钩子来对sote中的数据进行重新赋值)
    update(el, binding, vnode) {
      !utils.empty(binding.value) ? directives.store[vnode.elm.id] = binding.value : delete directives.store[vnode.elm.id];
    }

  }
};

export default directives;
