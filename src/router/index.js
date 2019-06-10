import store from '../store'
const Register = () => import('@/view/login/register')
const Index = () => import('@/view/index')
const Home = () => import('@/view/home')
const HabitIndex = () => import('@/view/habit/index')
const InfoIndex = () => import('@/view/info/index')
const ScheduleIndex = () => import('@/view/schedule/index')
const HelloIndex = () => import('@/view/hello/index')
const NewHabit = () => import('@/view/habit/newhabit')
const HabbitCheck = () => import('@/view/habit/habitcheck.vue')
const HabbitData= () => import('@/view/habit/habitdata.vue')
const ScheduleData = () => import('@/view/schedule/scheduledata.vue')
const HelloData = () => import('@/view/hello/hellodata.vue')
const HelloTeam = () => import('@/view/hello/helloteam.vue')
const Login = () => import('@/view/login/login')

const Router=require('vue-router')
const Vue=require('vue')
Vue.use(Router)

if (localStorage.getItem('token')) {
  store.commit('setToken', localStorage.getItem('token'))
}

const router=  new Router({
	mode: 'history',
	routes: [
	 {
	  path: '/',
	  redirect: '/login',
	  component: Index,
	  children: [
      {
        path: '/login',
        component: Login
      },
      {
        path: '/register',
        component: Register
      },
	  ]
	 },
	 {
		 path: '/home',
		 component: Home,
     meta: {
		   requireAuth: true
     },
		 name: 'home'
	 },
    {
      path: '/habit',
      component: HabitIndex,
      name: 'HabitIndex',
      redirect: '/habit/check',
      meta: {
        requireAuth: true
      },
      children:[
        {
          path: 'data',
          component: HabbitData,
          meta: {
            requireAuth: true
          },
        },
        {
          path: 'check',
          component: HabbitCheck,
          meta: {
            requireAuth: true
          },
        },

      ]
    },
    {
      path: '/habit/add',
      component: NewHabit,
      name: 'NewHabit',
      meta: {
        requireAuth: true
      },
    },
    {
      path: '/hello',
      component: HelloIndex,
      name: 'HelloIndex',
      redirect: '/hello/data',
      meta: {
        requireAuth: true
      },
      children:[
        {
          path: 'data',
          component: HelloData,
          meta: {
            requireAuth: true
          },
        },
        {
          path: 'team',
          component: HelloTeam,
          meta: {
            requireAuth: true
          },
        }
      ]
    },
    {
      path: '/schedule',
      component: ScheduleIndex,
      name: 'ScheduleIndex',
      redirect: '/schedule/data',
      meta: {
        requireAuth: true
      },
      children:[
        {
          path: 'data',
          component: ScheduleData,
          meta: {
            requireAuth: true
          },
        }
      ]
    },
    {
      path: '/info/index',
      component: InfoIndex,
      name: 'InfoIndex',
      meta: {
        requireAuth: true
      },
    }
	]
})

router.beforeEach((to,from,next) => {
  if(to.meta.requireAuth){
    const token=store.state.token ? store.state.token : localStorage.getItem("token")
    if (token) {
      next();
    }
    else {
      next('/login')
    }

  }else{
    next();
  }
})

export default router
