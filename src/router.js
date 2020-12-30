import Vue from 'vue'
import Router from 'vue-router'
import Playspace from './components/Playspace.vue'
import Planet from './components/Planet.vue'

Vue.use(Router)

export default new Router({ 
    routes: [
        { path: '/space', component: Playspace },
        { path: '/planet', component: Planet }
    ]
})