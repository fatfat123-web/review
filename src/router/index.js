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
        path: '/product',
        name: '商品管理',
        redirect: '/product/supplyProduct/product',
        component: views,
        meta: {title: '商品管理',},
        children: [
            {
                path: '/product/supplyProduct/',
                name: '',
                meta: {title: '采供商品体系',},
                component: {render: h => h('router-view')},
                children: [
                    {
                        path: '/product/supplyProduct/product',
                        name: '平台标准商品 ',
                        meta: { title: '平台标准商品',},
                        component: () => import('@/views/product/product'),
                    },
                    {
                        path: '/product/supplyProduct/category',
                        name: '平台商品分类 ',
                        meta: { title: '平台商品分类',},
                        component: () => import('@/views/product/category')
                    },
                    {
                        path: '/product/supplyProduct/manage',
                        name: '供企商品管理 ',
                        meta: { title: '供企商品管理',},
                        component: () => import('@/views/product/manage')
                    },
                    {
                        path: '/product/supplyProduct/add',
                        name: '创建餐饮企业 ',
                        component: () => import('@/views/product/add'),
                        meta:{
                            hidden:true,
                        }
                    },
                    {
                        path: '/product/supplyProduct/compile',
                        name: '编辑餐饮企业 ',
                        component: () => import('@/views/product/compile'),
                        meta:{
                            hidden:true,
                        }
                    },
                ]
            },
        ]

    },
    {
        path: '/enterprise',
        name: '企业管理',
        redirect: '/enterprise/enterprise/enterprise',
        component: views,
        meta: {title: '企业管理',},
        children: [
            {
                path: '/enterprise/enterprise/',
                name: '',
                meta: {title: '供应企业管理',},
                component: {render: h => h('router-view')},
                children: [
                    {
                        path: '/enterprise/enterprise/enterprise',
                        name: '餐饮企业管理 ',
                        meta: { title: '餐饮企业管理',},
                        component: () => import('@/views/enterprise/catering'),
                    },
                    {
                        path: '/enterprise/enterprise/supply',
                        name: '供应企业管理 ',
                        meta: { title: '供应企业管理',},
                        component: () => import('@/views/enterprise/supply')
                    },
                    {
                        path: '/enterprise/enterprise/business',
                        name: '工商数据库 ',
                        meta: { title: '工商数据库',},
                        component: () => import('@/views/enterprise/business')
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
        meta: {title: '系统设置',},
        children: [
            {
                path: '/systematic/systematic/',
                name: '',
                meta: {title: '系统设置',},
                component: {render: h => h('router-view')},
                children: [
                    {
                        path: '/systematic/systematic/api',
                        name: '接口管理 ',
                        meta: { title: '接口管理',},
                        component: () => import('@/views/systematic/setting/api'),
                    },
                    {
                        path: '/systematic/systematic/versionSetting',
                        name: '权限管理 ',
                        meta: { title: '权限管理',},
                        component: () => import('@/views/systematic/setting/version-setting'),
                    },
                    {
                        path: '/systematic/systematic/permission',
                        name: '版本功能设置 ',
                        meta: { title: '版本功能设置',},
                        component: () => import('@/views/systematic/setting/permission'),
                    },
                    {
                        path: '/systematic/systematic/enterpriseRole',
                        name: '企业角色预览 ',
                        meta: { title: '企业角色预览',},
                        component: () => import('@/views/systematic/setting/enterprise-role'),
                    },
                ]
            },
            {
                path: '/systematic/management/',
                name: '',
                meta: { title: '员工管理',},
                component: {render: h => h('router-view')},
                children: [
                    {
                        path: '/systematic/management/staff',
                        name: '员工管理 ',
                        meta: { title: '员工管理',},
                        component: () => import('@/views/systematic/management/staff'),
                    },
                    {
                        path: '/systematic/management/department',
                        name: '部门管理 ',
                        meta: { title: '部门管理',},
                        component: () => import('@/views/systematic/management/department'),
                    },
                    {
                        path: '/systematic/management/systemRole',
                        name: '系统角色管理 ',
                        meta: { title: '系统角色管理',},
                        component: () => import('@/views/systematic/management/system-role'),
                    },
                ]
            },
            {
                path: '/systematic/image',
                name: '图片管理',
                meta: { title: '图片管理',},
                component: () => import('@/views/systematic/image/index'),
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

