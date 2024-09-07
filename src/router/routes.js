const routes = [ 
    {
        path: "/",
        component: () => import('../view/phone.vue'),
    },
    {
        path: "/box",
        component: () => import('../components/box.vue'),
    },
]

export default routes;