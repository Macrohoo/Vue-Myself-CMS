import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'; // lang i18n

import '@/styles/index.scss'; // global css
import '@/styles/flex-class.css'; // 引入flex快写样式
import '@/styles/yel-ui.scss'; //引入个人定制化修改的element-ui样式
import '@/icons/js/symbolIcon.js'; // 最新symbol引入全新的使用方式,应该说是未来的Icon引入主流,还对Icon组件进行了处理，即可以用aliIcon，也可以用静态本地icons

import App from './App';
import store from './store';
import router from './router';

import '@/permission'; // permission control
import errorLog from '@/utils/error-log'; // error log
import btnDirective from '@/utils/directive/button';
import yian from '@/yian/index';
//import yian from 'yian'
import service from '@/utils/request'; // interceptor可以在大入口外面自己封装
import order from '@/views/order/index';

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale });
// 如果想要中文版 element-ui，按如下方式声明  Vue.use(ElementUI)

Vue.use(btnDirective);

Vue.use(errorLog);

Vue.config.productionTip = false;

Vue.use(yian);
const $_Y = {
  service,
  ElementUILoading: false,
  baseVersionApi: 'v2'
};

Vue.prototype.$yian = yian.content($_Y);
const req = require.context('@/icons/svg', false, /\.svg$/);
const requireAll = (requireContext) => requireContext.keys().map(requireContext);
requireAll(req);

Vue.use(order);

new Vue({
  el: '#app',
  router,
  store,
  render: (h) => h(App),
});
