# flow

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# Binding properties
绑定属性
// 选择对象为Node节点
if (ev.item.isNode) {
  // 获取属性
  const nm = ev.item.getModel()
  _this.nodeLabel = nm.label
}
if (ev.item.isNode) {
  // 获取属性
  const nm = ev.item.getModel()
  _this.code = nm.code
}
#Echo display data
数据回显
page.read(data)
