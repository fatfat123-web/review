import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {roleRouter} from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//在第一次登陆的时候做判断 有没有token
router.beforeEach((to, from, next) => {
  const token = store.getters.token;
  if (token !== null) {
    next();
    //    要加条件不然就会无限循环跳转路由，如果访问的路由不等于login则跳转到login页面
  } else if (to.path !== '/login') {
    next('/login');
  } else {
    next()
  }
});

const setHtmlFontSize = () => {
  const htmlDom = document.getElementsByTagName('html')[0];
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  if (htmlWidth >= 750) {
    htmlWidth = 750;
  }
  if (htmlWidth <= 320) {
    htmlWidth = 320;
  }
  htmlDom.style.fontSize = `${htmlWidth / 7.5}px`;
};
window.onresize = setHtmlFontSize;
setHtmlFontSize();
