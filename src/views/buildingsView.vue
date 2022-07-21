<template>
  <div class="home">
        <BuildingList></BuildingList>
  </div>
</template>

<script setup>
/* eslint-disable */
import { useStore } from 'vuex';
import { computed } from 'vue'
import BuildingList from '@/components/buildingList.vue'

    const store = new useStore();

    const users = computed(() => store.getters.returnUsers)

</script>
