import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        allBeach:[],
        allActivity:[],
        allReport:[],
        currentDisplay:'activity',
    },
    getters: {
        
    },
    mutations:{
      setAllBeach:(state, data) => {
        state.allBeach = data;
        console.log(state.allBeach) 
      },
      setAllReport:(state, data) => {
        state.allReport = data;
      },
      setAllActivity:(state, data) => {
        state.allActivity = data;
      },
      changeDisplay:(state, display) => {
          state.currentDisplay = display
          console.log(state.currentDisplay)
      }
    },
    actions:{
        getAllBeach:({commit}) => {
            console.log('actions')
            axios.get('https://demo2788502.mockable.io/api/beach')
               .then(res => {
                   console.log(res);
                   if (res.status === 200)
                   commit('setAllBeach', res.data.result);    
               })
               .catch(error => {
                   console.log(error)
               })
        },
        getAllReport:({commit}) => {
            axios.get('https://demo2788502.mockable.io/api/beach/notification')
               .then(res => {
                   if (res.status === 200)
                   commit('setAllReport', res.data.result);    
               })
               .catch(error => {
                   console.log(error)
               })
        },
        getAllActivity:({commit}) => {
            axios.get('https://demo2788502.mockable.io/api/beach/activity')
               .then(res => {
                   if (res.status === 200)
                   commit('setAllActivity', res.data.result);    
               })
               .catch(error => {
                   console.log(error)
               })
        },
    }
})