import { createStore } from 'vuex';
import User from '@/models/User';

export default createStore({
  state: {
    clients: JSON.parse(localStorage.getItem('clients')) || {
      "client 1": [],
      "client 2": [],
      "client 3": [],
      "client 4": [],
      "client 5": []
  },
    listLoading:false
  },
  getters: {
    returnClients: (state) => state.clients,
    listLoading: (state) => state.listLoading
  },
  mutations: {
    SAVE_BUILDING(state,building){

      state.clients[building.client].push(building);
      localStorage.setItem('clients',JSON.stringify(state.clients))
      state.listLoading = false
    },
    EDIT_BUILDING(state,building){
      state.clients[building.client][building.index].name = building.newEdit.name;
      state.clients[building.client][building.index].location = building.newEdit.location;
      localStorage.setItem('clients',JSON.stringify(state.clients))
    },
    REMOVE_BUILDING(state,building){
      state.clients[building.client].splice(building.index, 1);
      localStorage.setItem('clients',JSON.stringify(state.clients))
      this.state.listLoading = false
    }
  },
  actions: {
    createBuilding({commit},buildingInfo){
      return new Promise((resolve) => {
        this.state.listLoading = true
        let building = new User(buildingInfo.id,buildingInfo.client, buildingInfo.name, buildingInfo.location);
        
        setTimeout(() => {
          return resolve(commit('SAVE_BUILDING', building))
          
        }, 3000);
        
      })
    },
    editBuilding({commit},building){
      return new Promise((resolve) => {        
        // setTimeout(() => {
          return resolve(commit('EDIT_BUILDING', building))
        // }, 3000);
        
      })
    },
    removeBuilding({commit},building){
      return new Promise((resolve) => {
        this.state.listLoading = true
        setTimeout(() => {
          return resolve(commit('REMOVE_BUILDING', building))
        }, 3000);
        
      })
    }
    
  },
})
