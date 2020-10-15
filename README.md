# vue-admin-template
*Alt + M快捷键Markdown*

#### 1012路由表&&用户登陆&&vuex内容的疏通①
>- 所有权限通用路由表constantRouters和动态需要根据权限加载的路由表asyncRouters
>- utils文件auth.js中改```const TokenKey = 'access_token'```
>- 游览器cookie设置过期期限时长暂时没有设置,设置需如下:```Cookies.set("access_token", token, { expires: 7 })```
>- vuex模块user.js文件中```RESET_STATE: (state) => { Object.assign(state, getDefaultState()) }```,关于Object.assign()的用法

#### 1013路由表&&用户登陆&&vuex内容&&axios跨域请求的疏通②
>- api中mock虚假api两个文件夹后续需要删除
>- axios拦截器写在utilj夹request.js文件中。跨域后续提上``` config.headers.Authorization = `Bearer${getToken()}` ```和```baseURL: 'http://localhost:7001'```。

#### 1014路由表&&用户登陆&&vuex内容&&axios跨域请求的疏通③
>- login页面沿用模板，loginform的校验器username不需要验证
>- el-form-item元素的prop属性绑定字段名name，表单验证时，就会验证el-input元素绑定的变量的值是否符合验证规则
>- sass和scss内容了解，[sass和scss极速上手](https://www.jianshu.com/p/bd1a152f3ca1)

#### 1015路由表&&用户登陆&&vuex内容&&axios跨域请求的疏通&&sass和scss④
>- @supports是CSS3新引入的规则之一，主要用于检测当前浏览器是否支持某个CSS属性并加载具体样式。此外，还支持逻辑运算符；not, and, or
>- overflow:hidden，那么该元素的内容若超出了给定的宽度和高度属性，那么超出的部分将会被隐藏
>- margin：0 auto 代表的是 上下边距为0,左右为自适应
>- padding: 160px 35px 0  表示上空160px，下空35px，左右0px
>- margin-bottom:10px 元素的下外边距10px
>- ①在入口js文件main.js中引入，一些公共的样式文件，可以在这里引入，②在index.html中引入公共样式文件(不推荐)
>- 具体每个页面的样式可以写在每个页面.vue文件里，加上scoped表明样式只在当前页面起作用。```<style scoped lang="scss"></style>```
>- ```span {&:first-of-type {margin-right: 16px;}}```&符号是scss和less里的语法，代表上一级选择器，实际编译成css就是```span:first-of-type{}```
>- ```span:first-of-type{}```指定父元素的首个span元素的属性
>- ```cursor：pointer```设定鼠标的形状为一只伸出食指的手，cursor默认是设定网页浏览时用户鼠标指针的样式
>- ```user-select: none```文字不能被选中。
>- ```@keyup.enter.native="handleLogin"```vue回车触发聚焦
>- vim查找关键字的好方法,命令模式下敲斜杆( / )这时在状态栏（也就是屏幕左下脚）就出现了 “/” 然后输入你要查找的关键字敲回车就可以了。如果你要继续查找此关键字，敲字符n就可以继续查找了。敲字符N（大写N）就会向前查询；



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
