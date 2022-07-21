import { createStore } from 'vuex';
import User from '@/models/User';

export default createStore({
  state: {
    clients: JSON.parse(localStorage.getItem('clients')) || {}
  },
  getters: {
    returnClients: (state) => state.clients
  },
  mutations: {
    SAVE_BUILDING(state,building){

      state.clients[building.client].push(building);
      localStorage.setItem('clients',JSON.stringify(state.clients))
    }
  },
  actions: {
    createBuilding({commit},buildingInfo){
      return new Promise((resolve) => {
        let building = new User(buildingInfo.id,buildingInfo.client, buildingInfo.name, buildingInfo.location);
        commit('SAVE_BUILDING', building)
        setTimeout(() => {
          return resolve(building)
        }, 3000);
        
      })
    },
    
  },
})
