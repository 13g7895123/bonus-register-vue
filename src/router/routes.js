const routes = [
    {
        path: "/verify/:serverCode",
        component: () => import('../view/verify.vue'),
    },
    {
        path: "/register/:serverCode/:token",
        component: () => import('../view/register.vue'),
    },
    {
        path: "/forget-password/verify/:serverCode",
        component: () => import('../view/forgetPassword/verify.vue'),
    },
    {
        path: "/forget-password/:serverCode/:token",
        component: () => import('../view/forgetPassword/forget-password.vue'),
    },
    {
        path: "/account-transfer/choose-identify/:serverCode",
        component: () => import('../view/account-transfer/choose-identify.vue'),
    },
    {
        path: "/account-transfer/transfer/:serverCode/:token",
        component: () => import('../view/account-transfer/Transfer.vue'),
    },
    {
        path: "/account-transfer/receiver/:serverCode/:token",
        component: () => import('../view/account-transfer/Receiver.vue'),
    },
]

export default routes;