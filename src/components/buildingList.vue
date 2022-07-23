<template>
    <div class="mt-3">
        <div class="w-25 mx-auto my-4">
            <Select :clients="clients" @showClient="fetchBuildings"></Select>
        </div>
        <div class="row">
            <div class="col-3">
                <div class="card">

                    <ul :class="['list-group list-group-flush',{'border-b-0':listLoading}]">
                        <li class="list-group-item bg-light h5 mb-0 text-secondary">Buildings</li>
                        <li class="list-group-item text-secondary" v-if="!clientBuildings[selectedClient]?.length &&!listLoading">No
                        Buildings Available.</li>
                       <template v-if="!listLoading" >
                       <li @click="selectedBuilding = client"
                            :class="['cursor list-group-item ',{'active':client.name == selectedBuilding.name}]"
                            v-for="client in clientBuildings[selectedClient]" :key="client.id">{{client.name}}

                            <p
                                :class="[' justify-content-end position-absolute text-right icons',{'d-inline-flex':client.name == selectedBuilding.name}]">
                                <!-- edit icon -->
                                <svg @click="editBuilding = true;newBuilding = false" xmlns="http://www.w3.org/2000/svg"
                                    width="16" height="16" fill="currentColor" class="bi bi-pencil-square mx-1"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fill-rule="evenodd"
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                </svg>

                                <!-- delete icon -->
                                <svg @click="removeBuilding(selectedBuilding)" xmlns="http://www.w3.org/2000/svg"
                                    width="16" height="16" fill="currentColor" class="bi bi-trash-fill mx-1"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                </svg>
                            </p>
                        </li>
                        </template>
                        <div v-else class="spinner-border text-warning text-center mx-auto mt-5" role="status">
                        <span class="visually-hidden">Loading...</span>
                        </div>
                        
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
                        <li class="list-group-item bg-light h5 text-secondary mb-0" v-if="editBuilding">Edit Buidling
                        </li>
                        <li class="list-group-item bg-light h5 text-secondary mb-0"
                            v-if="!newBuilding && !editBuilding && clientBuildings[selectedClient].length">Selected
                            Building ({{selectedBuilding.name}}) Map View</li>
                    </ul>
                    <div class="card-body">
                        <div v-if="newBuilding"
                            class="card mx-auto w-75 pt-3 form d-flex align-items-center justify-content-center">
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

                                <button type="button" class="btn btn-primary mx-2"
                                    @click.prevent="createNewBuilding()">Create</button>
                                <button type="button" class="btn btn-secondary mx-2"
                                    @click="resetNewBuildingForm">Cancel</button>

                            </div>
                        </div>
                        <div v-if="editBuilding"
                            class="card mx-auto w-75 pt-3 form d-flex align-items-center justify-content-center">
                            <p class="h4 mb-4 text-primary">New Building</p>
                            <label class="d-flex mx-auto" style="width:20rem">
                                <span class="me-3 mt-1 text-secondary">Name</span>
                                <input class="form-control" v-model="selectedBuilding.name" type="text"
                                    placeholder="Building Name">
                            </label>
                            <label class="d-flex mx-auto mt-3" style="width:20rem">
                                <span class="me-3 mt-1 text-secondary">location</span>
                                <select class="form-select" v-model="selectedBuilding.location.name"
                                    label="Default select example">
                                    <option selected disabled>Select Country</option>
                                    <option v-for="country in countries" :key="country.id">{{ country.name }}</option>
                                </select>
                            </label>
                            <div class="w-50 mx-auto mt-5 d-flex justify-content-center ">

                                <button type="button" class="btn btn-primary mx-2"
                                    @click.prevent="editSelectedBuilding(selectedBuilding)">Save</button>
                                <button type="button" class="btn btn-secondary mx-2"
                                    @click="resetEditBuildingForm">Cancel</button>

                            </div>
                        </div>
                        <div v-if="!newBuilding && !editBuilding && clientBuildings[selectedClient].length" class="">
                            <Map :mapLocation="selectedBuilding"></Map>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
/* eslint-disable */
import {
    useStore
} from 'vuex';
import {
    computed,
    ref
} from 'vue'
import Select from '@/components/selectClient.vue';
import Map from '@/components/map.vue';
// countries list
const countries = require('@/DB/countriesList.json')



const clients = require('@/DB/clients.json')

// get clientBuildings list
const store = new useStore();
let listLoading = computed(() => store.getters.listLoading)
const clientBuildings = computed(() => store.getters.returnClients)

let location = ref('')
let name = ref('')
let selectedClient = ref('client 1')
let selectedBuilding = ref(clientBuildings.value[selectedClient.value][0] || {})
let newBuilding = ref(false)
let editBuilding = ref(false)

// show new building form
function addNewBuilding() {
    editBuilding.value = false;
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
    store.dispatch('createBuilding', buildingInfo)
    return resetNewBuildingForm()
}

function resetNewBuildingForm() {
    newBuilding.value = false
    location.value = ''
    name.value = ''
}
function resetEditBuildingForm() {
    editBuilding.value = false
}

function fetchBuildings(data) {
    selectedClient.value = data
}

function removeBuilding(building) {
    let selected = clientBuildings.value[selectedClient.value].findIndex(el => el.id == building.id);
    let buildingInfo = {
        client: selectedClient.value,
        index: selected
    }
    store.dispatch('removeBuilding', buildingInfo)
}
function editSelectedBuilding(building) {

    selectedBuilding.value.location = countries.find(el => el.name === selectedBuilding.value.location.name);
    let selected = clientBuildings.value[selectedClient.value].findIndex(el => el.id == building.id);
    let buildingInfo = {
        client: selectedClient.value,
        index: selected,
        newEdit: selectedBuilding.value
    }
    store.dispatch('editBuilding', buildingInfo)

    editBuilding.value = false
}
</script>

<style scoped lang="scss">

.cursor{
    cursor: pointer;
}
.icons{
    top:15px;
    right: 0;
    display: none !important;
}
.border-b-0{
    border-bottom: none !important
}
.list-group-item.active{
    .icons{
        display: inline-flex !important
    }
}
.card{
    height: 75vh;
    &.form{
        height: 50vh;
    }
}
</style>
