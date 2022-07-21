<template>
    <div class="mt-3">
        <div class="w-25 mx-auto my-4">
            <Select :clients="clients" @showClient="fetchBuildings"></Select>
        </div>
        <div class="row">
            <div class="col-3">
                <div class="card">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item bg-light h5 mb-0 text-secondary">Buildings</li>
                        <li @click="selectedBuilding = client" :class="['cursor list-group-item ',{'active':client.name == selectedBuilding.name}]" v-for="client in clientBuildings[selectedClient]" :key="client.id">{{client.name}}</li>
                        <li class="list-group-item text-secondary" v-if="!clientBuildings[selectedClient]?.length">No Buildings Available.</li>
                    </ul>
                    <div class="card-body d-flex align-items-end">

                        <div class="d-grid mx-auto w-100">
                            <button class="btn btn-primary " @click.prevent="addNewBuilding()">Add Building</button>
                        </div>

                    </div>
                </div>
            </div>
            <div class="col-9">
                <div class="card">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item bg-light h5 text-secondary mb-0" v-if="newBuilding">Add Buidling</li>
                        <li class="list-group-item bg-light h5 text-secondary mb-0" v-if="editBuilding">Edit Buidling</li>
                        <li class="list-group-item bg-light h5 text-secondary mb-0" v-if="!newBuilding && !editBuilding && clientBuildings[selectedClient].length">Selected Building ({{selectedBuilding.name}}) Map View</li>
                    </ul>
                    <div class="card-body">
                        <div v-if="newBuilding" class="card mx-auto w-75 pt-3 form d-flex align-items-center justify-content-center">
                            <p class="h4 mb-4 text-primary">New Building</p>
                            <label class="d-flex mx-auto" style="width:20rem">
                                <span class="me-3 mt-1 text-secondary">Name</span>
                                <input class="form-control" v-model="name" type="text" placeholder="Building Name">
                            </label>
                            <label class="d-flex mx-auto mt-3" style="width:20rem">
                                <span class="me-3 mt-1 text-secondary">location</span>
                                <select class="form-select" v-model="location" label="Default select example">
                                    <option selected disabled>Select Country</option>
                                    <option v-for="country in countries" :key="country.id">{{ country.name }}</option>
                                </select>
                            </label>
                            <div class="w-50 mx-auto mt-5 d-flex justify-content-center ">

                                    <button type="button" class="btn btn-primary mx-2" @click.prevent="createNewBuilding()">Create</button>
                                    <button type="button" class="btn btn-secondary mx-2" @click="resetNewBuildingForm">Cancel</button>
  
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {
    useStore
} from 'vuex';
import {
    computed,
    ref
} from 'vue'
import Select from '@/components/selectClient.vue';
// countries list
const countries = require('@/DB/countriesList.json')



const clients = require('@/DB/clients.json')

// get clientBuildings list
const store = new useStore();
const clientBuildings = computed(() => store.getters.returnClients)

let location = ref('')
let name = ref('')
let selectedClient = ref('client 1')
let selectedBuilding = ref(clientBuildings.value[selectedClient.value][0])
let newBuilding = ref(false)
let editBuilding = ref(false)

// show new building form
function addNewBuilding() { 
    newBuilding.value = true
}
// show new building form
function createNewBuilding() { 
    location.value = countries.find(el => el.name == location.value);
    let buildingInfo = {}
    buildingInfo.id = clientBuildings.value[selectedClient.value].length + 1
    buildingInfo.name = name.value;
    buildingInfo.client = selectedClient.value;
    buildingInfo.location = location.value
    store.dispatch('createBuilding',buildingInfo)
    return resetNewBuildingForm()
}

function resetNewBuildingForm(){
    newBuilding.value = false
    location.value = ''
    name.value = ''
}

function fetchBuildings(data){
    selectedClient.value = data
}
</script>

<style scoped lang="scss">
.cursor{
    cursor: pointer;
}
.card{
    height: 75vh;
    &.form{
        height: 50vh;
    }
}
</style>
