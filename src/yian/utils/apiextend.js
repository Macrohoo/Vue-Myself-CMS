export const defaulter = {
  // 前置操作
  /**
   * 前置操作处理整合请求参数
   * @param {Object} value [Proxy代理的property]
   * @param {Function} resolve
   * @param {Function} reject
   * @param {Object} config
   */
  beforeEach(value, resolve, reject, config) {
    let url;
    let method;
    let data;
    let options;
    let keys;
    let argument;
    keys = Object.keys(value); //目前设计只会有两个keys，一个是请求关键url部分，一个是page
    options = {
      loading: config.ElementUILoading,
    };
    argument = value[keys[0]]; // 第一个方法中的参数最多5个，最先是请求方式，然后是id [{id: '12,13'}]，其次是include，再次是bahavior [{behavior: 'batch'}]，最后是主body或者主query
    method = argument[0].toLowerCase();
    let page = value['page'] ?? null;   //page({ currentPage: 1, pageSize: 10 })
    url = `/${config.baseVersionApi}/${keys[0]}`; //基底请求url构建好

    switch (method) {
      case 'post':
        if (Object.keys(argument).length === 2) {
          //当只有2个参数时
          data = argument[1];
          if (page) {
            Object.assign(data, page[0]);
          }
        } else if (Object.keys(argument).length === 3) {
          //当有3个参数时
          if (argument[1].include) {
            url += `?include=${argument[1].include}`;
          } else {
            url += `?behavior=${argument[1].behavior}`;
          }
          data = argument[2];
          if (page) {
            Object.assign(data, page[0]);
          }
        } else if (Object.keys(argument).length === 4) {
          //当有4个参数时
          url += `?include=${argument[1].include}&behavior=${argument[2].behavior}`;
          data = argument[3];
          if (page) {
            Object.assign(data, page[0]);
          }
        } else {
          reject('请检查yian请求写法!');
        }
        break;
      case 'get':
        if (Object.keys(argument).length === 1) {
          //当只有1个参数时
          if (page) {
            data = page[0];
          }
        } else if (Object.keys(argument).length === 2) {
          //当2个参数时
          if (argument[1].id) {
            url += `/${argument[1].id}`;
          } else {
            argument[1].include
              ? (url += `?include=${argument[1].include}`)
              : (url += `?behavior=${argument[1].behavior}`);
          }
          if (page) {
            data = page[0];
          }
        } else if (Object.keys(argument).length === 3) {
          //当3个参数时
          if (argument[1].id) {
            argument[2].include
              ? (url += `/${argument[1].id}?include=${argument[2].include}`)
              : (url += `/${argument[1].id}?behavior=${argument[2].behavior}`);
          } else {
            url += `?include=${argument[1].include}&behavior=${argument[2].behavior}`;
          }
          if (page) {
            data = page[0];
          }
        } else if (Object.keys(argument).length === 4) {
          url += `/${argument[1].id}?include=${argument[2].include}&behavior=${argument[3].behavior}`;
          if (page) {
            data = page[0];
          }
        } else {
          reject('请检查yian请求写法!');
        }
        break;
      case 'put':
        if (Object.keys(argument).length === 3) {
          //当3个参数时
          url += `/${argument[1].id}`;
          data = argument[2];
        }
        if (Object.keys(argument).length === 4) {
          //当4个参数时
          argument[2].include
            ? (url += `/${argument[1].id}?include=${argument[2].include}`)
            : (url += `/${argument[1].id}?behavior=${argument[2].behavior}`);
          data = argument[3];
        } else if (Object.keys(argument).length === 5) {
          //当5个参数时
          url += `/${argument[1].id}?include=${argument[2].include}&behavior=${argument[3].behavior}`;
          data = argument[4];
        } else {
          reject('请检查yian请求写法!');
        }
        break;
      case 'delete':
        //delete方式中id是肯定存在的
        if (Object.keys(argument).length === 2) {
          //当2个参数时
          url += `/${argument[1].id}`;
        } else if (Object.keys(argument).length === 3) {
          //当3个参数时
          if (argument[2].include) {
            url += `/${argument[1].id}?include=${argument[2].include}`;
          } else {
            if (argument[2].behavior) {
              url += `/${argument[1].id}?behavior=${argument[2].behavior}`;
            } else {
              url += `/${argument[1].id}`;
              data = argument[2];
            }
          }
        } else if (Object.keys(argument).length === 4) {
          //当4个参数时
          if (argument[2].include) {
            if (argument[3].behavior) {
              url += `/${argument[1].id}?include=${argument[2].include}&behavior=${argument[3].behavior}`;
            } else {
              url += `/${argument[1].id}?include=${argument[2].include}`;
              data = argument[3];
            }
          } else {
            url += `/${argument[1].id}?behavior=${argument[2].behavior}`;
            data = argument[3];
          }
        } else if (Object.keys(argument).length === 5) {
          //当5个参数时
          url += `/${argument[1].id}?include=${argument[2].include}&behavior=${argument[3].behavior}`;
          data = argument[4];
        } else {
          reject('请检查yian请求写法!');
        }
        break;

      default:
        reject('请注意请求方式!');
        break;
    }
    resolve({
      url,
      method,
      data,
      options,
    });
  },
};
