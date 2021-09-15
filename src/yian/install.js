import icon from './components/icon/index.vue';
import popups from './popups/index';

export default function install(Vue) {
  Vue.directive('popup', popups.popup);

  Vue.component('svg-icon', icon); // icon全局注册移入这个封装入口
}
