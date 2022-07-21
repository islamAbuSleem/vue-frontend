<template>
  <div>
    <select class="form-select" v-model="client" @change="$emit('showClient',client)">
      <option disabled selected>Select client</option>
      <option v-for="client in clients" :key="client.id">{{client.name}}</option>
    </select>

  </div>
</template>

<script setup>
/* eslint-disable */
import {ref} from 'vue'
  const props = defineProps(['clients'])
  let client = ref('client 1')

</script>

<style>

</style>
