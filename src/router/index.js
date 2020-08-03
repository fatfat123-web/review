import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
import login from './login'
import views from '@/views'

export const roleRouter = [
    {
        path: '/index',
        name: '首页',
        meta: {
            // icon: 'iconshouye'
            //    按需加载 只有用到的时候才引入
        },
        component: () => import('@/views/index')
    },
    {
        path: '/enterprise',
        name: '企业管理',
        redirect: '/enterprise/enterprise/enterprise',
        component: views,
        meta: {},
        children: [
            {
                path: '/enterprise/enterprise/',
                name: '供应企业管理',
                component: {render: h => h('router-view')},
                children: [
                    {
                        path: '/enterprise/enterprise/enterprise',
                        name: '餐饮企业管理 ',
                        component: () => import('@/views/enterprise/catering'),
                    },
                    {
                        path: '/enterprise/enterprise/supply',
                        name: '供应企业管理 ',
                        component: () => import('@/views/enterprise/supply')
                    },
                    {
                        path: '/enterprise/enterprise/business',
                        name: '工商数据库 ',
                        component: () => import('@/views/enterprise/business')
                    },
                         ]
            },
        ]

    },
    {
        path: '/product',
        name: '商品管理',
        redirect: '/product/supplyProduct/product',
        component: views,
        meta: {},
        children: [
            {
                path: '/product/supplyProduct/',
                name: '采供商品体系',
                component: {render: h => h('router-view')},
                children: [
                    {
                        path: '/product/supplyProduct/product',
                        name: '平台标准商品 ',
                        component: () => import('@/views/product/product'),
                    },
                    {
                        path: '/product/supplyProduct/category',
                        name: '平台商品分类 ',
                        component: () => import('@/views/product/category')
                    },
                    {
                        path: '/product/supplyProduct/manage',
                        name: '供企商品管理 ',
                        component: () => import('@/views/product/manage')
                    },
                ]
            },
        ]

    },
    {
        path: '/systematic',
        name: '系统设置',
        redirect: '/systematic/systematic/api',
        component: views,
        meta: {},
        children: [
            {
                path: '/systematic/systematic/',
                name: '系统设置',
                component: {render: h => h('router-view')},
                children: [
                    {
                        path: '/systematic/systematic/api',
                        name: '接口管理 ',
                        component: () => import('@/views/systematic/setting/api'),
                    },
                    {
                        path: '/systematic/systematic/versionSetting',
                        name: '权限管理 ',
                        component: () => import('@/views/systematic/setting/version-setting'),
                    },
                    {
                        path: '/systematic/systematic/permission',
                        name: '版本功能设置 ',
                        component: () => import('@/views/systematic/setting/permission'),
                    },
                    {
                        path: '/systematic/systematic/enterpriseRole',
                        name: '企业角色预览 ',
                        component: () => import('@/views/systematic/setting/enterprise-role'),
                    },
                ]
            },
        ]

    },

]


export default new Router({
    routes: [
        ...roleRouter,
        ...login,
    ]
})
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

