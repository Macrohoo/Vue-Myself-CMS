# vue-admin-template
*Alt + M快捷键Markdown*

#### 1012 路由表&&用户登陆&&vuex内容的疏通①
>- 所有权限通用路由表constantRouters和动态需要根据权限加载的路由表asyncRouters
>- utils文件auth.js中改```const TokenKey = 'access_token'```
>- 游览器cookie设置过期期限时长暂时没有设置,设置需如下:```Cookies.set("access_token", token, { expires: 7 })```
>- vuex模块user.js文件中```RESET_STATE: (state) => { Object.assign(state, getDefaultState()) }```,关于Object.assign()的用法。```Object.assign(target, ...sources)【target：目标对象】,【souce：源对象（可多个）】```用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
#### 1013 路由表&&用户登陆&&vuex内容&&axios跨域请求的疏通②
>- api中mock虚假api两个文件夹后续需要删除
>- axios拦截器写在utilj夹request.js文件中。跨域后续提上``` config.headers.Authorization = `Bearer ${getToken()}` ```和```baseURL: 'http://localhost:7001'```。
#### 1014 路由表&&用户登陆&&vuex内容&&axios跨域请求的疏通③
>- login页面沿用模板，loginform的校验器username不需要验证
>- el-form-item元素的prop属性绑定字段名name，表单验证时，就会验证el-input元素绑定的变量的值是否符合验证规则
>- sass和scss内容了解，[sass和scss极速上手](https://www.jianshu.com/p/bd1a152f3ca1)
#### 1015 路由表&&用户登陆&&vuex内容&&axios跨域请求的疏通&&sass和scss④
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
#### 1016 路由表&&用户登陆&&vuex内容&&axios跨域请求的疏通&&sass和scss⑤
>- 子组件：要想实现父组件内的点击事件，子组件必须监听点击并触发父组件定义的click。方法有两种①子组件可以通过调用内建的 $emit 方法并传入事件名称来触发一个事件：```<button v-on:click="$emit('enlarge-text')">Enlarge text</button>```。②在封装好的子组件上使用，所以要加上.native才能click。如：```<el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>```另外：prevent是用来阻止默认的事件。就相当于…event.preventDefault()，父组件想在子组件上监听自己的click的话，需要加上native修饰符。
>- watch时有一个特点，就是当值第一次绑定的时候，不会执行监听函数，只有值发生改变才会执行。如果我们需要在最初绑定值的时候也执行函数，则就需要用到immediate属性。
>- handler方法和immediate属性:①当父组件向子组件动态传值时，子组件props首次获取到父组件传来的默认值时，也需要执行函数，此时就需要将immediate设为true。②之前我们写的 watch 方法其实默认写的就是这个handler，Vue.js会去处理这个逻辑，最终编译出来其实就是这个handler。③immediate:true代表如果在 wacth 里声明了 viewDetials之后，就会立即先去执行里面的handler方法，如果为 false就跟我们以前的效果一样，不会在绑定的时候就执行
>- deep属性:①watch 里面还有一个属性 deep，默认值是 false，代表是否深度监听当需要监听一个对象的改变时，普通的watch方法无法监听到对象内部属性的改变，只有data中的数据才能够监听到变化，此时就需要deep属性对对象进行深度监听。②设置deep: true 则可以监听到newTemplateForm 的变化，此时会给newTemplateForm 的所有属性都加上这个监听器，当对象属性较多时，每个属性值的变化都会执行handler。如果只需要监听对象中的一个属性值，则可以做以下优化：使用字符串的形式监听对象属性：'newTemplateForm .cycleUpkeep'
>- ```document.getElementById("myAnchor").focus()``` focus() 方法用于为元素设置焦点(如果可以设置)。把光标聚焦到指定DOM上
>- ```vm.$nextTick( [callback] )```用法:①将回调延迟到下次 DOM 更新循环之后执行。②在修改数据之后立即使用它，然后等待 DOM 更新。③它跟全局方法 Vue.nextTick 一样，不同的是回调的this自动绑定到调用它的实例上。
>- 在后端中除了login APi是不需要判断verify外，其余所有接口都需要判断islogin。在后端getUserInfo()登录查询个人信息的时候验证了token，验证完token后把当前用户信息都放入了session中。所以getUserInfo()这个API是必须要走的一步。
>- ①后续改permission中的动态添加addRoutes可访问路由表。②路由文件中asyncRoutes：那些需求动态判断权限并通过addRoutes动态添加的页面完善。③创建一个routerpermission，通过用户的权限和之前在router.js里面asyncRouterMap的每一个页面所需要的权限做匹配，最后返回一个该用户能够访问路由表
#### 1018 路由表&&用户登陆&&vuex内容&&axios跨域请求的疏通&&sass和scss⑥
>- [session](https://stackoverflow.com/questions/3804209/what-are-sessions-how-do-they-work):由于HTTP是无状态的，因此为了将请求与任何其他请求相关联，您需要一种在HTTP请求之间存储用户数据的方法。
>- 仔细看了一下后台的refresh_token和access_token的逻辑暂时没问题，在前端暂时先不尝试加入refresh_token来保证无感知刷新，因为permission控制中对于有token的情况下抓取了token过期而返回的错误，会直接resetToken并返回登录界面,为了前期连桥实现，暂不加入这个功能。
>- array.some() 方法测试数组中是不是至少有1个元素通过了被提供的函数测试。它返回的是一个Boolean类型的值。
>- array.filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
#### 1020 完成了用户登录基本疏通
>- addRoutes需要疏通完成
>- logout需要完善一下先
#### 1022 logout完成&&权限sidebar显示完成&&用户列表页面sidebar&&通用组件之userinfo.vue
>- rouerpermission的state中{ routers, addRouters }都需要在getters中被计算保存到vuex全局状态中。①其中addRouters是为了把根据权限遍历出来的动态路由最终添加到可访问路由表，实现```router.addRoutes(store.getters.addRouters)```这步。②修改layout/components/Sidebar/index.vue ，遍历路由生成菜单的时候不要使用siderbar，而要使用routers。此时的routers已经是该用户权下可以访问的页面路由表了，这样sidebar才会最终渲染成我们想要的样子。
>- 在routerpermission中如果role不是超级管理员的时候会进行另一个逻辑判断，就会用到前面定义的hasPermission函数，但需要保证参数roles是一个数组才能使用array.some()等方法，所以在action中需要定义一个数组```const roles = []```，把参数data(role)赋值到roles中，让其成为一个数组，后面才能去调用数组方法进行权限遍历动态路由表。
>- logout暂时不需要用到promise，修改掉模板源码中的promise写法。
>- GET后退按钮/刷新无害，POST数据会被重新提交（浏览器应该告知用户数据会被重新提交）。GET书签可收藏，POST为书签不可收藏。GET能被缓存，POST不能缓存 。GET编码类型application/x-www-form-url，POST编码类型encodedapplication/x-www-form-urlencoded 或 multipart/form-data。为二进制数据使用多重编码。GET历史参数保留在浏览器历史中。POST参数不会保存在浏览器历史中。GET对数据长度有限制，当发送数据时，GET 方法向 URL 添加数据；URL 的长度是受限制的（URL 的最大长度是 2048 个字符）。POST无限制。GET只允许 ASCII 字符。POST没有限制。也允许二进制数据。与 POST 相比，GET 的安全性较差，因为所发送的数据是 URL 的一部分。在发送密码或其他敏感信息时绝不要使用 GET ！POST 比 GET 更安全，因为参数不会被保存在浏览器历史或 web 服务器日志中。GET的数据在 URL 中对所有人都是可见的。POST的数据不会显示在 URL 中。
>- ```:visible.sync="visible"```表示双向绑定值。初始情况下通过visible该值控制dialog显示。
>- destroy-on-close表示关闭时销毁 Dialog 中的元素。vue原生中可以用v-if，在关闭dialog标签的的时候将v-if设置为false这样el-form会直接将其从DOM结构中抹除。
>- props的作用是父组件中引用了子组件并给子组件加了一个属性，这个属性可以是静态的，可以是动态的，可以是数字，可以是字符串，可以是数组，还可以是对象。总结：子P父传子。
#### 1023 用户列表页面
>- 添加了global插件，暂时实现了一个$getDateDiff的实例方法。[Vue插件开发](https://cn.vuejs.org/v2/guide/plugins.html)
>- ```ilter-placement="bottom-end"```userList中这个元素属性是不是没有必要？
#### 1025 用户列表页面代码优化和按键功能实现
>- userinfo.vue中的getList()函数重写。
>- 404页面放到动态路由最后。
>- routerpermission路由权限中GenerateRoutes方法提交过来的参数data有可能是一个Array，有可能是一个字符串，导致后面的一些方法Array方法会无法使用。这里做j进一步的代码完善。首先保证后面Array内置方法可以调用，这个data参数传入的值必须处理成一个Array，那就先定义一个空Array，然后用push和concat方法区分传入的data有可能数据类型不一致的做法。
#### 1026 组件userInfo页面优化&&添加组件editpassword页面雏形&&修改部分layout全局组件的内容
>- eval() 函数会将传入的字符串当做 JavaScript 代码进行执行。```console.log(eval('2 + 2'));  // expected output: 4```
>- for ... of和for ... in的到底哪个更适合哪种业务场景呢？Array.prototype.forEach()和for ... of最常用的地方应该是用于调试，可以更方便的去检查对象属性（通过输出到控制台或其他方式），尽管对于处理存储数据，数组更实用些。但在处理有key-value数据（比如属性用作“键”），需要检查其中的任何键是否为某值的情况时，还是推荐用for ... in。且for...in不应该用于迭代一个关注索引顺序的 Array。
>- Layout全局子组件上的click监听，都需要用到native。



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
