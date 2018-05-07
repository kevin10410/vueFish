import Home from '../components/Home.vue';
import Activity from '../components/Activity.vue';
import Report from '../components/Report.vue';

export const routes = [
    { path:'/', component:Home }, 
    { path:'/activity', component:Activity },
    { path:'/report', component:Report },  
]