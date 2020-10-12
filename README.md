# vue-admin-template
*Alt + M快捷键Markdown*

#### 1012路由表&&用户登陆&&vuex内容的疏通①
>- 所有权限通用路由表constantRouters和动态需要根据权限加载的路由表asyncRouters
>- utils文件auth.js中改```const TokenKey = 'access_token'```
>- 游览器cookie设置过期期限时长暂时没有设置,设置需如下:```Cookies.set("access_token", token, { expires: 7 })```
>- vuex模块user.js文件中```RESET_STATE: (state) => { Object.assign(state, getDefaultState()) }```,关于Object.assign()的用法

#### 1013路由表&&用户登陆&&vuex内容&&axios跨域请求的疏通②
>- api中moc虚假api两个文件夹后续需要删除
>- axios拦截器写在utilj夹request.js文件中。跨域后续提上``` config.headers.Authorization = `Bearer${getToken()}` ```和```baseURL: 'http://localhost:7001'```。

## Build Setup

```bash
# clone the project
git clone https://github.com/PanJiaChen/vue-admin-template.git

# enter the project directory
cd vue-admin-template

# install dependency
npm install

# develop
npm run dev
```

This will automatically open http://localhost:9528

## Build

```bash
# build for test environment
npm run build:stage

# build for production environment
npm run build:prod
```

## Advanced

```bash
# preview the release environment effect
npm run preview

# preview the release environment effect + static resource analysis
npm run preview -- --report

# code format check
npm run lint

# code format check and auto fix
npm run lint -- --fix
```

Refer to [Documentation](https://panjiachen.github.io/vue-element-admin-site/guide/essentials/deploy.html) for more information
