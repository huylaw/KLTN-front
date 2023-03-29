import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '@/router'
//
import { websocketPlugin } from '@/plugins/socket'

Vue.use(Vuex)

axios.interceptors.request.use(function (config) {
  const token = `Bearer ${localStorage.token}`;
  config.headers.token = token;
  return config;
}, function (error) {
  return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  return response;
}, async function (error) {
  if (error.response.status === 401){
    localStorage.clear();
    router.push("/login");
    return Promise.reject(error);
  } 
  return Promise.reject(error);
});

export default new Vuex.Store({
  plugins: [ websocketPlugin ],
  
  state: {
    layout: 'member', // xét layout cho giao diện
    //user: null,
    //beforePage: null,
  },
  getters: {
    //layout
    getLayout(state){
      return state.layout;
      //return localStorage.layout;
    },
    //thong tin user
    getUser(state){
      return JSON.parse(localStorage.user);
    },
    getRole(){
      return localStorage.role;
    }
  },
  mutations: {
    // setBeforePage(state, payload){
    //   state.beforePage = payload;
    // },
    //xet giao dien
    setLayout(state, payload){
      state.layout = payload;
    },
    //xet thong tin user
    setUser(state, payload){
      localStorage.user = JSON.stringify(payload);
    },
    //xet token
    setToken(state, payload){
      localStorage.token = payload;
    },
    setRole(state, payload){
      localStorage.role = payload;
    }
  },
  actions: {
    //login
    async login({commit}, params){
      const data = await axios.post('http://localhost:3000/api/login', params);
      commit('setUser', data.data.user);
      commit('setToken', data.data.token);
      commit('setRole', data.data.role);
    }
  },
  modules: {
  }
})
