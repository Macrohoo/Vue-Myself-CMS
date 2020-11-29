import Vue from "vue";
import store from "@/store";
import { isString, isArray } from "@/utils/validate";
import settings from "@/settings";

// you can set in settings.js
// errorLog:'production' | ['production', 'development']
const { errorLog: needErrorLog } = settings;

function checkNeed() {
  const env = process.env.NODE_ENV;
  if (isString(needErrorLog)) {
    return env === needErrorLog;
  }
  if (isArray(needErrorLog)) {
    return needErrorLog.includes(env);
  }
  return false;
}

// if (checkNeed()) {
//   Vue.config.errorHandler = function(err, vm, info) {
//     Vue.nextTick(() => {
//       store.dispatch("errorLog/addErrorLog", {
//         err,
//         vm,
//         info,
//         url: window.location.href
//       });
//       console.error(err, info);     //既然前端js的错误都会被全局捕捉到了，那么还是需要一个console.error的出口去抛出。
//     });
//   };
// }

const handler = (err, vm, info) => {
  Vue.nextTick(() => {
    store.dispatch("errorLog/addErrorLog", {
      err,
      vm,
      info,
      url: window.location.href
    });
    console.error(err, info);     //既然前端js的错误都会被全局捕捉到了，那么还是需要一个console.error的出口去抛出。
  });
};


export default {
  install(Vue) {
    if (checkNeed()) {
      Vue.config.errorHandler = handler
      Vue.prototype.$throw = function (error) {
        handler(error, this)
      }
    }
  }
};
