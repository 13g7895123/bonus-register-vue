const routes = [ 
    {
        path: "/",
        component: () => import('../view/phone.vue'),
    },
    {
        path: "/box",
        component: () => import('../components/box.vue'),
    },
    {
        path: "/demo/1",
        component: () => import('../view/demo/1.vue'),
    },
    {
        path: "/demo/2",
        component: () => import('../view/demo/2.vue'),
    },
    {
        path: "/demo/3",
        component: () => import('../view/demo/3.vue'),
    },
    {
        // path: "/verify",
        path: "/verify/:serverCode",
        component: () => import('../view/verify.vue'),
    },
    {
        path: "/register",
        component: () => import('../view/register.vue'),
    },
]

export default routes;