export default [
    {
        path: '/',
        redirect: '/login',
        component: () => import( '@/views/login/index'),
        children: [
            {
                //网页的地址
                path: '/login',
                //文件的地址
                component: () => import( '@/views/login/login')

            },
            {
                path: '/cut',
                component: () => import( '@/views/login/cut')

            },
            {
                path: '/regsiter',
                component: () => import( '@/views/login/regsiter')

            },

        ],

    },
]