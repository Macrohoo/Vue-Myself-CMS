# vue-admin-template

![用户列表](https://github.com/Marhooo/Marhoo-Git/blob/master/IMG%E8%B5%84%E6%BA%90/20201110032520.jpg?raw=true)
![动态权限分配](https://github.com/Marhooo/Marhoo-Git/blob/master/IMG%E8%B5%84%E6%BA%90/20201110032453.jpg?raw=true)
![文章列表分页](https://github.com/Marhooo/Marhoo-Git/blob/master/IMG%E8%B5%84%E6%BA%90/1201-1.jpg?raw=true)
![文章编辑](https://github.com/Marhooo/Marhoo-Git/blob/master/IMG%E8%B5%84%E6%BA%90/1201-2.jpg?raw=true)
![Markdown](https://github.com/Marhooo/Marhoo-Git/blob/master/IMG%E8%B5%84%E6%BA%90/1201-3.jpg?raw=true)
![错误警报](https://github.com/Marhooo/Marhoo-Git/blob/master/IMG%E8%B5%84%E6%BA%90/1201-4.jpg?raw=true)

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
>- @keyup.enter.native="handleLogin",表示允许进行enter键盘按钮。
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
>- FormData 接口的append() 方法 会添加一个新值到 FormData 对象内的一个已存在的键中，如果键不存在则会添加该键。FormData.set 和 append() 的区别在于，如果指定的键已经存在， FormData.set 会使用新值覆盖已有的值，而 append() 会把新值添加到已有值集合的后面。
#### 1028添加组件editpassword页面修改&&修改部分layout全局组件的内容&&完善了login页面
>- [Element Dropdown 下拉菜单](https://element.eleme.cn/#/zh-CN/component/dropdown#dropdown-menu-item-attributes)。在下拉菜单中，有一个click事件和command事件的区分。command：点击菜单项触发的事件回调，回调dropdown-item的指令。
>- 父组件页面的子组件Dom上绑定一个事件监听器监听父组件给的事件@XXX，子组件内部处理某一事件（比如close事件）然后向外发送：$emit('XXX')。
>- 在一般html的tag上使用时：<div @click="方法"></div> 点击可以生效，但是在<component @click="方法" />点击不会生效。任何组件必须挂在到具体的DOM上，DOM本身具有事件属性，组件也有自己的事件系统，vue处理这两种事件的逻辑是不同的，所以你在component组件上定义事件，vue必须要知道是那种类型的事件好进入相应的处理逻辑，.native 就是区分的标识。至于什么情况下对vue组件绑定事件需要加native的判断是：在自定义组件想要使用原生事件的时候。比如你自己封装一个button组件，想要给这个组件写点击事件，这时候就需要加native了。或者在子组件emit出来一个click事件。
>- location.reload()方法类似于你浏览器上的刷新页面按钮，是Bom的Api方法。
>- 完善了登录界面因密码账号错误而显式提示。后续需要再补充一个功能，不能让用户多次尝试密码，最多尝试5次。
#### 1102修改部分layout全局组件的内容&&roleManage角色权限页面雏形
>- 完善NavBar中dialogInfoVisible个人信息部分按钮组件。
>- 需要完善routerpermission的内容，把permission_page和permission_button的二层权限锁也加入进去，完成完善的权限路由验证，且保证了权限的页面可视化。并要解决获取当前uid所拥有的permission_page和permission_button权限，放入vuex状态管理中。
#### 1104roleManage角色权限页面雏形&&routerpermission权限修改（完善实现）&&permission验证修改（完善实现）
>- 整个为了完善最终的permission_page和permission_button的二级路由页面权限锁，思路是①修改routerpermission.js的内容。②修改permission.js中，页面切换时需要异步提交routerpermission中的data参数数据。
>- ①修改routerpermission.js实现：【第一步hasPermission函数加入pageBtn_permission参数及后续boolean值判断逻辑。第二步：在action异步部分中，GenerateRoutes异步提交函数携带过来的data参数进行roles和pageBtn_permission的解构，借助Array.filter()数组Api进行用户的权限和之前在router.js里面asyncRouters的每一个页面所需要的权限做匹配，最后返回一个该用户能够访问路由】
>- ②修改permission.js实现（需要注意roles、authorityRouter、permissionButton为空字符串的情况）：【data参数设计成一个对象实例，包裹当前登录用户的roles信息和authorityRouter信息和permissionButton信息。第一步：res.role直接从字符串变成单个数组放入data对象中。第二步：authorityRouter信息和permissionButton信息，并且用string.split()方法把json键值对里的字符串值用“，”进行分割转化成array，再进行concat后放入data对象。】
>- 需要解决动态添加的路由无法删除的功能。现在暂时用登出后location.reload()刷新页面的方式实现。改进思路：后端实现logout（）接口，完成session会话的清空。前端去提交这个接口，并用resetRouter()方法生成一个新的路由表。[Detail see](https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465)
>- 401错误是因为token过期，页面无法跳转，无法resetToken的问题需要跟进。
>- 后端logout接口实现，实现了session会话的清空。但是前端动态路由还是无法resetRouter()，暂时只能通过location.reload()刷新页面的方式实现。
>- 拦截器继续优化了一下。
>- el-trees权限路由树结构建立，需要在vuex（routerpermission）中建立一个roleTree。然后根据permission_page和permission_button合并的data数组来进行操作。
#### 1108routerpermission中roleTree初步完成&&permission中完成异步提交支持
>- el-trees权限路由树结构建立，roleTree实现。但是roleTree中r_id元素是一个数组，改成字符串不知道为什么toString（）方法并不在这个array中。
>- 用实践理清楚了①dispatch：含有异步操作，数据提交至 actions ，可用于向后台提交数据。②commit：同步操作，数据提交至 mutations ，可用于读取用户信息写到缓存里。
>- 实际roleTree的实现并没有去调用后端Api，所以不需要用异步提交，只需要用同步操作就能实现。所以permission.js中同步提交代码：`store.commit('routerpermission/SET_ROLETREE', elTree)`，并保证elTree的深拷贝前提。
>- roleTree中r_id元素是一个数组，改成字符串用array的toString方法。前提是r_id存在，并保证把数组转换成字符串后再赋值给r_id元素。
>- 1.this.$router.push()描述：跳转到不同的url，但这个方法会向history栈添加一个记录，点击后退会返回到上一个页面。2.this.$router.replace()描述：同样是跳转到指定的url，但是这个方法不会向history里面添加新的记录，点击返回，会跳转到上上一个页面。上一个记录是不存在的。3.this.$router.go()相对于当前页面向前或向后跳转多少个页面,类似 window.history.go(n)。n可为正数可为负数。正数返回上一个页面
#### 1110roleManage角色权限页面完善中&&修复一个bug
>- 修复页面token过期后游览器刷新页面报出的indexOf这个方法无法使用的问题。路由前置守卫的原因，需要向vuex异步提交一些数据，但这些数据其实没有，也没不能用像indexof这个方法。修改在routerpermission.js中`catch (error) { removeToken() location.reload() }`的方法并不行，<font color=#008000 >***因为try catch并不能抓取到异步执行的错误，只能抓取同步执行代码的错误***</font>。正确修改方法应该是permission.js中修改第56-63行。
>- el-form中show-word-limit表示“常显示字数限制提示”
>- 各种UI组件库中都有自己的事件或者数据绑定参数。
>- autocomplete 属性是 HTML5 中的新属性，在input中autocomplete属性是默认开启的。属性规范表单是否启用bai自动完成功能。自动完成允许浏览器对字段的输入，是基于之前输入过的值。
>- `this.$refs.permission.setCheckedKeys([])`如何获取和设置选中节点。获取和设置各有两种方式：通过 node 或通过 key。这里表示通过 key 来获取或设置。如果setCheckedKeys()方法中没有内容表示重置清空。
>- el-Dialog中的内容是懒渲染的，即在第一次被打开之前，传入的默认 slot 不会被渲染到 DOM 上。因此，如果需要执行 DOM 操作，或通过 ref 获取相应组件，请在 open 事件回调中进行。
>- el-Tree中getCheckedKeys：若节点可被选择（即 show-checkbox 为 true），则返回目前被选中的节点的 key 所组成的数组。参数部分：(leafOnly) 接收一个 boolean 类型的参数，若为 true 则仅返回被选中的叶子节点的 keys，默认值为 false。
>- el-Tree中setCheckedNodes: 设置目前勾选的节点，使用此方法必须设置 node-key 属性。参数部分：(nodes) 接收勾选节点数据的数组。其中node-key是每个树节点用来作为唯一标识的属性，整棵树应该是唯一的。
>- vm.$el:提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例。在实例挂载之后，元素可以用 vm.$el 访问。
>- mounted 不会保证所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以在 mounted 内部使用 vm.$nextTick。
#### 1111roleManage角色权限页面完成&&权限按钮指令v-roleBtn完成&&addArticleEditor页面初步添加
>- 角色按钮权限实现:自定义指令指定一个权限按钮，和当前用户拥有的权限按钮比较，决定是否在页面删除按钮div。需要通过[自定义指令](https://cn.vuejs.org/v2/guide/custom-directive.html)的建立完成。全局的自定义指令（权限按钮指令v-roleBtn)写在了button.js文件中。逻辑用if...else if....else实现切换。<font color=#008000 >这个案例已经是UI组件库如何通过Vue指令绑定的小实现例子</font>。
>- 暂时懒得写法，直接把按钮权限也写进路由里面，用hidden: true, 不在侧边栏线上显示，把按钮路由隐藏起来，因为我们根本不需要按钮路由。
>- if...else if....else 语句，使用该语句来选择多个代码块之一来执行。
>- handleDelete()事件重新写，增加一个MessageBox美化的confirm。原生Window.confirm() 方法显示一个具有一个可选消息和两个按钮(确定和取消)的模态对话框。
>- 安装Typescript开发的Web富文本编辑器wangEditor：`npm i wangeditor -S`
>- [Vue插槽](https://cn.vuejs.org/v2/guide/components-slots.html)
>- <font color=#008000 >Vue具名插槽</font>:就是子组件中的提供给父组件使用的一个占位符，用`<slot> </slot>`表示，父组件可以在这个占位符中填充任何模板代码，如 HTML、组件等，填充的内容会替换子组件的`<slot> </slot>`标签。6以后的版本中的用法是这样的：`<template v-slot:header>`// 在父组件中使用模板语法，使用v-slot绑定插槽的名字。`<slot name="header">default</slot>`// 在子组件中仍然使用name来作为插槽的标识符。
>- <font color=#008000 >Vue作用域插槽</font>:有时让插槽内容能够访问子组件中才有的数据是很有用的，但是因为只有子组件可以访问到例如user数据，而我们提供的内容是在父级渲染的。为了让user数据在父级的插槽内容中可用，第一步：我们可以将user作为 <slot> 元素的一个 attribute 绑定上去，`<slot v-bind:user="user"> {{ user.lastName }} </slot>`，第二步：绑定在 <slot> 元素上的 attribute 被称为插槽 prop。现在在父级作用域中，我们可以使用带值的 v-slot 来定义我们提供的插槽 prop 的名字。`<template v-slot:default="slotProps"> {{ slotProps.user.firstName }} </template>`，在这个例子中，我们选择将包含所有插槽 prop 的对象命名为 slotProps，但你也可以使用任意你喜欢的名字。
>- el-form中`:inline="true"`行内表单模式：每个el-form-item横排
#### 1114VueCli3区分环境打包&&addArticleEditor页面修改&&css&&userInfo页面中头像上传的内容完善
>- 基本原理都是在node进程中配置`process.env`的属性，然后可以全局访问`process.env.xxx`。参考[入门笔记](https://www.jianshu.com/p/4bee12667f9b)
>- 在Webpack中实现，使用[DefignPlugin](https://webpack.docschina.org/plugins/define-plugin/)插件，配置全局常量，写入process.env，并在文件中以process.env.xxx方式使用。
>- Node.js中的[dotenv](https://github.com/motdotla/dotenv)包也是一个可以根据项目不同需求，需要配置不同环境变量，按需加载不同的环境变量文件的办法，使用dotenv，只需要将程序的环境变量配置写在.env文件中。Vue-cli3中使用dotenv包进行环境管理,集成在`@vue/cli-service`中了。
>- CSS选择器 :hover选择器用于选择鼠标指针浮动在上面的元素。
>- vue中`<style scoped>`实现组件的私有化，不对全局造成样式污染，表示当前style属性只属于当前模块，虽然方便但是我们需要慎用，它基本上符合以下两个原则：①父组件添加了scoped子组件子组件无论加不加scoped，父组件不能通过子组件的样式选择器修改子组件样式。②父组件不添加scoped，子组件添加scoped，父组件是可以通过子组件样式选择器来修改子组件的样式。还有一个最优雅的解决办法[/deep/](https://zhuanlan.zhihu.com/p/77112977)样式穿透：父子组件都有scope，可以在父组件中改子组件样式，加/deep/前缀，不会影响其他地方子组件使用。
>- el-upload中action="/api/editor/uploadImg"是后端上传文件接口
#### 1116addArticleEditor页面修改
>- 每一个axiosApi[fetchXXXX]返回的都是wrap函数携带参数提交后的结果即一个promise。源码中①`axios.create = function create(instanceConfig) { return createInstance(utils.merge(defaults, instanceConfig)); }`②源码中createInstance函数返回的instance是一个function【wrap（）它返回一个有特定this对象和参数的Axios.prototype.request】。
>- el-form中`:inline="true"`设置 inline 属性可以让表单域变为行内的表单域。
#### 1117富文本调试&&addArticleEditor页面修改
>- 安装富文本插件wangEditor，作为公共组件复用。V4版本和V3版本@3.1.1的配置和使用极为相似（把 editor.customConfig 改为 editor.config 即可）
>- [立即调用函数表达式](https://developer.mozilla.org/zh-CN/docs/Glossary/%E7%AB%8B%E5%8D%B3%E6%89%A7%E8%A1%8C%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F)称为自执行匿名函数的设计模式，主要包含两部分。第一部分是包围在 圆括号运算符 () 里的一个匿名函数，这个匿名函数拥有独立的词法作用域。这不仅避免了外界访问此 IIFE 中的变量，而且又不会污染全局作用域。第二部分再一次使用()创建了一个立即执行函数表达式，JavaScript 引擎到此将直接执行函数。
#### 1123addArticleEditor完善&&wangEditor完善
>- 保证路由跳转并传参，`this.$router.push({ path: "/addArticleEditor", query: { articleId: row.id } })`和`this.$route.query.articleId`
>- promise再翻看一遍。resolve()和reject()位置。
>- 通常我们父子组件传值并不只是需要这个值，而是需要这个值得同时进行一些操作。我们一般通过watch监听传来的值，如果子组件的props值从父组件传来了，将执行watch中的操作。
>- 深度监听
#### 1125addArticleEditor完善&&commentList部分初步放入
>- 关于addArticleEditor中提交文章后会新生成一篇文章的bug修复。sequelize中Model.upsert插入或更新单行，如果找到与主键或唯一键上提供的值匹配的行，则将执行更新。所以接口传参的时候带上id，会保证后端搜索主键并找到主键后完成更新。
>- 不应该使用箭头函数来定义watcher函数，例如 `searchQuery: newValue => this.updateAutocomplete(newValue)`。理由是箭头函数绑定了父级作用域的上下文，所以 this 将不会按照期望指向 Vue 实例，this.updateAutocomplete 将是 undefined。因为在标准函数中，this引用的是把函数当成方法调用的上下文对象，this指向的就是vue实例。在比如method函数（一般function写法下）中进行事件回调调用某个函数，this指向的并非想要的结果，此时把回调函数写成箭头函数的形式就可以解决问题，因为箭头函数的this就是父作用域的this，而父作用域就是method函数调用时生成的上下文作用域。从原理上的解释像vue中method函数中的代码，这个函数定义的时候是必须是一般函数。一般函数中指针this引用的是把函数当成方法调用的上下文，vue中就是实例vue把method函数作为方法调用，所以指向的是vue实例。method函数内部又有一个闭包箭头函数，这个闭包中的this指向的是method的上下文，而method的上下文是vue实例，所以就被覆盖了。闭包中的this指的就是vue实例也就是method的上下文，都是同一个。
>- 初始化组件中的所有数据:`Object.assign(this.$data,this.$options.data())`
>- 时间有的充裕的情况下完成一下Markdown组件，并在addArticleEditor实现富文本和Markdown的编辑功能。
#### 1126commentList完善&&tuiEditor组件初步完成&&暂时完成了实时错误日志管理
>- `@toast-ui/editor`关于Markdown包工具，组件化。
>- icons的全局实现需要再梳理一下。
>- vue有内置的[错误拦截器](https://cn.vuejs.org/v2/api/#optionMergeStrategies)基本实现如下。可是这个钩子好像无法捕捉到异步接口后端的错误。
```
Vue.config.errorHandler = function (err, vm, info) {
  // 参数解析：
  // 1.err：错误对象；
  // 2.vm：Vue实例；
  // 3.info：Vue 特定的错误信息，比如错误所在的生命周期钩子
  // 错误被捕获后，不会再在控制台输出错误信息，可以补输出：
  console.error(err) 
  // 然后完成错误上报，一般是发送到一个收集错误的 API 接口
  // 如有必要，你还可以把 navigator 对象(客户端信息)一起上报
}
```
#### 1129错误日志错误完善&&icon全局实现的梳理
>- CSS:no-repeat  背景图像将仅显示一次。
>- CSS 属性 mask 允许使用者通过遮罩或者裁切特定区域的图片的方式来隐藏一个元素的部分或者全部可见区域。
>- 在vue-admin-element潘家成的模板对错误日志收集是异步提交到了vuex中，是在模板中作为错误报警提示，也算一种错误日志的解决方案吧。但是利用`Vue.config.errorHandler`这个钩子，模板中只是解决了前端js同步的错误，并不支持捕获异步错误，于是对于网络请求等异步逻辑的错误我只能主动将错误提交给这个钩子处理。解决方案就是对于异步错误的处理还是注册一个Vue的实例方法，来把接口catch到的err提交到这个Vue.config.errorHandler这个钩子处理，并提交到Vuex中，来实现那个小蜘蛛错误警报提示。我是受到这篇[文章](https://segmentfault.com/q/1010000012399729?sort=created)的启发，对于封装技术的提升，还有更加优雅的解决方案。
>- 后续需要去修改异步的错误处理方式，加上this.$throw()
>- [vm.$listeners](https://cn.vuejs.org/v2/api/#vm-listeners)在文档中解释:包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。[参考](https://segmentfault.com/q/1010000017556758)，假设有父组件Parent和子组件Child，那么你在Parent父组件中使用Child时，传入的所有v-on事件都可以在$listeners对象中找到，子组件Child中只需要有`v-on="$listeners"`。
>- vue-admin-element中关于[icons](https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage)的介绍。
>- [关于svg的3种引入方式和最优雅的解决方案，也是vue-admin-element模板使用的这种](https://juejin.cn/post/6844903998563024910)
>- 如果想引入一个文件夹下面的所有文件，或者引入能匹配一个正则表达式的所有文件，webpack这个功能就会很有帮助!`require.context(directory, useSubdirectories, regExp)` 1directory: 要查找的文件路径; 2useSubdirectories: 是否查找子目录; 3regExp: 要匹配文件的正则。例如：`require.context('./components/', true, /\.js$/)`。[参考](https://webpack.docschina.org/guides/dependency-management/#requirecontext)
```
function importAll (r) {
  r.keys().forEach(r);
}
//keys也是一个函数，它返回一个数组

importAll(require.context('../components/', true, /\.js$/));
```
#### 1206修复bug
>- 修改了userList组件中关于userinfo子组件关闭后回调事件刷新的问题。




# 7个有用的Vue开发技巧 #

## 1 状态共享 ##

随着组件的细化，就会遇到多组件状态共享的情况， ` Vuex` 当然可以解决这类问题，不过就像 ` Vuex` 官方文档所说的，如果应用不够大，为避免代码繁琐冗余，最好不要使用它，今天我们介绍的是vue.js 2.6新增加的 [Observable API]( https://link.juejin.im?target=https%3A%2F%2Fvuejs.org%2Fv2%2Fapi%2F%23Vue-observable ) ，通过使用这个api我们可以应对一些简单的跨组件数据状态共享的情况。

如下这个例子，我们将在组件外创建一个 ` store` ，然后在 ` App.vue` 组件里面使用store.js提供的 ` store` 和 ` mutation` 方法，同理其它组件也可以这样使用，从而实现多个组件共享数据状态。

首先创建一个store.js，包含一个 ` store` 和一个 ` mutations` ，分别用来指向数据和处理方法。

` import Vue from "vue" ; export const store = Vue.observable({ count : 0 }); export const mutations = { setCount(count) { store.count = count; } }; 复制代码`

然后在 ` App.vue` 里面引入这个store.js，在组件里面使用引入的数据和方法

` <template> < div id = "app" > < img width = "25%" src = "./assets/logo.png" > < p > count:{{count}} </ p > < button @ click = "setCount(count+1)" > +1 </ button > < button @ click = "setCount(count-1)" > -1 </ button > </ div > </ template > <script> import { store, mutations } from "./store" ; export default { name : "App" , computed : { count() { return store.count; } }, methods : { setCount : mutations.setCount } }; </ script > <style> 复制代码`

你可以点击 [在线DEMO]( https://link.juejin.im?target=https%3A%2F%2Fcodesandbox.io%2Fs%2F4w0mo0kyow ) 查看最终效果

## 2 长列表性能优化 ##

我们应该都知道 ` vue` 会通过 ` object.defineProperty` 对数据进行劫持，来实现视图响应数据的变化，然而有些时候我们的组件就是纯粹的数据展示，不会有任何改变，我们就不需要 ` vue` 来劫持我们的数据，在大量数据展示的情况下，这能够很明显的减少组件初始化的时间，那如何禁止 ` vue` 劫持我们的数据呢？可以通过 ` object.freeze` 方法来冻结一个对象，一旦被冻结的对象就再也不能被修改了。

` export default { data : () => ({ users : {} }), async created() { const users = await axios.get( "/api/users" ); this.users = Object.freeze(users); } }; 复制代码`

另外需要说明的是，这里只是冻结了 ` users` 的值，引用不会被冻结，当我们需要 ` reactive` 数据的时候，我们可以重新给 ` users` 赋值。

` export default { data : () => ({ users : [] }), async created() { const users = await axios.get( "/api/users" ); this.users = Object.freeze(users); }, methods :{ // 改变值不会触发视图响应 this.users[ 0 ] = newValue // 改变引用依然会触发视图响应 this.users = newArray } }; 复制代码`

## 3 去除多余的样式 ##

随着项目越来越大，书写的不注意，不自然的就会产生一些多余的css，小项目还好，一旦项目大了以后，多余的css会越来越多，导致包越来越大，从而影响项目运行性能，所以有必要在正式环境去除掉这些多余的css，这里推荐一个库 [purgecss]( https://link.juejin.im?target=https%3A%2F%2Fwww.purgecss.com%2F ) ，支持CLI、JavascriptApi、Webpack等多种方式使用，通过这个库，我们可以很容易的去除掉多余的css。

我做了一个测试， [在线DEMO]( https://link.juejin.im?target=https%3A%2F%2Fcodesandbox.io%2Fs%2Fzkq258ly4 )

` < h1 > Hello Vanilla! </ h1 > < div > We use Parcel to bundle this sandbox, you can find more info about Parcel < a href = "https://parceljs.org" target = "_blank" rel = "noopener noreferrer" > here </ a >. </ div > 复制代码` ` body { font-family: sans-serif; } a { color: red; } ul { li { list-style: none; } } 复制代码` ` import Purgecss from "purgecss" ; const purgecss = new Purgecss({ content : [ "**/*.html" ], css : [ "**/*.css" ] }); const purgecssResult = purgecss.purge(); 复制代码`

最终产生的 ` purgecssResult` 结果如下，可以看到多余的 ` a` 和 ` ul` 标签的样式都没了

![](https://user-gold-cdn.xitu.io/2019/5/21/16ad97db704d6639?imageView2/0/w/1280/h/960/ignore-error/1)

## 4 作用域插槽 ##

利用好作用域插槽可以做一些很有意思的事情，比如定义一个基础布局组件A，只负责布局，不管数据逻辑，然后另外定义一个组件B负责数据处理，布局组件A需要数据的时候就去B里面去取。假设，某一天我们的布局变了，我们只需要去修改组件A就行，而不用去修改组件B，从而就能充分复用组件B的数据处理逻辑，关于这块我之前写过一篇实际案例，可以点击 [这里]( https://juejin.im/post/5c2d7030f265da613a54236f ) 查看。

这里涉及到的一个最重要的点就是父组件要去获取子组件里面的数据，之前是利用 ` slot-scope` ，自vue 2.6.0起，提供了更好的支持 ` slot` 和 ` slot-scope` 特性的 API 替代方案。

比如，我们定一个名为 ` current-user` 的组件：

` <span> <slot>{{ user.lastName }}</slot> </span> 复制代码`

父组件引用 ` current-user` 的组件，但想用名替代姓（老外名字第一个单词是名，后一个单词是姓）：

` <current-user> {{ user.firstName }} </current-user> 复制代码`

这种方式不会生效，因为 ` user` 对象是子组件的数据，在父组件里面我们获取不到，这个时候我们就可以通过 ` v-slot` 来实现。

首先在子组件里面，将 ` user` 作为一个 ` <slot>` 元素的特性绑定上去：

` < span > < slot v-bind:user = "user" > {{ user.lastName }} </ slot > </ span > 复制代码`

之后，我们就可以在父组件引用的时候，给 ` v-slot` 带一个值来定义我们提供的插槽 prop 的名字：

` < current-user > < template v-slot:default = "slotProps" > {{ slotProps.user.firstName }} </ template > </ current-user > 复制代码`

这种方式还有缩写语法，可以查看 [独占默认插槽的缩写语法]( https://link.juejin.im?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fguide%2Fcomponents-slots.html%23%25E7%258B%25AC%25E5%258D%25A0%25E9%25BB%2598%25E8%25AE%25A4%25E6%258F%2592%25E6%25A7%25BD%25E7%259A%2584%25E7%25BC%25A9%25E5%2586%2599%25E8%25AF%25AD%25E6%25B3%2595 ) ，最终我们引用的方式如下：

` <current-user v-slot="slotProps"> {{ slotProps.user.firstName }} </current-user> 复制代码`

相比之前 ` slot-scope` 代码更清晰，更好理解。

## 5 属性事件传递 ##

写过高阶组件的童鞋可能都会碰到过将加工过的属性向下传递的情况，如果碰到属性较多时，需要一个个去传递，非常不友好并且费时，有没有一次性传递的呢（比如react里面的 ` {...this.props}` ）？答案就是 ` v-bind` 和 ` v-on` 。

举个例子，假如有一个基础组件 ` BaseList` ，只有基础的列表展示功能，现在我们想在这基础上增加排序功能，这个时候我们就可以创建一个高阶组件 ` SortList` 。

` <!-- SortList --> < template > < BaseList v-bind = "$props" v-on = "$listeners" > <!-- ... --> </ BaseList > </ template > <script> import BaseList from "./BaseList" ; // 包含了基础的属性定义 import BaseListMixin from "./BaseListMixin" ; // 封装了排序的逻辑 import sort from "./sort.js" ; export default { props : BaseListMixin.props, components : { BaseList } }; </ script > 复制代码`

可以看到传递属性和事件的方便性，而不用一个个去传递

## 6 函数式组件 ##

函数式组件，即无状态，无法实例化，内部没有任何生命周期处理方法，非常轻量，因而渲染性能高，特别适合用来只依赖外部数据传递而变化的组件。

写法如下：

* 在 ` template` 标签里面标明 ` functional`
* 只接受 ` props` 值
* 不需要 ` script` 标签
` <!-- App.vue --> < template > < div id = "app" > < List :items = "['Wonderwoman', 'Ironman']" :item-click = "item => (clicked = item)" /> < p > Clicked hero: {{ clicked }} </ p > </ div > </ template > < script > import List from "./List" ; export default { name : "App" , data : () => ({ clicked : "" }), components : { List } }; </ script > 复制代码` ` <!-- List.vue 函数式组件 --> < template functional > < div > < p v-for = "item in props.items" @ click = "props.itemClick(item);" > {{ item }} </ p > </ div > </ template > 复制代码`

## 7 监听组件的生命周期 ##

比如有父组件 ` Parent` 和子组件 ` Child` ，如果父组件监听到子组件挂载 ` mounted` 就做一些逻辑处理，常规的写法可能如下：

` // Parent.vue <Child @mounted= "doSomething" /> // Child.vue mounted() { this.$emit( "mounted" ); } 复制代码`

这里提供一种特别简单的方式，子组件不需要任何处理，只需要在父组件引用的时候通过 ` @hook` 来监听即可，代码重写如下：

` <Child @hook:mounted= "doSomething" /> 复制代码`

当然这里不仅仅是可以监听 ` mounted` ，其它的生命周期事件，例如： ` created` ， ` updated` 等都可以，是不是特别方便~

参考链接：

* [vueTips]( https://link.juejin.im?target=https%3A%2F%2Fvuedose.tips%2Ftips )
* [vuePost]( https://link.juejin.im?target=https%3A%2F%2Falligator.io%2Fvuejs%2F )

*Alt + M快捷键Markdown*
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
