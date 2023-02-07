const publicPath = [
  {
    path: "/login",
    component: () => import(`@/views/login/index.vue`),
  },
  {
    path: "",
    redirect: "/login",
  },
]

export default publicPath
