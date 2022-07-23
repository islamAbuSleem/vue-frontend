<template>
  <div style="height: 60vh;">
    <l-map
      v-model="zoom"
      v-model:zoom="zoom"
      :center="[47.41322, -1.219482]"
    >
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>


      <l-marker :lat-lng="mapLocation.location.position" draggable >
        <l-popup>
          {{mapLocation.name}}
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>
<script>
/* eslint-disable */
import {
  LMap,
  LIcon,
  LTileLayer,
  LMarker,
  LControlLayers,
  LTooltip,
  LPopup,
  LPolyline,
  LPolygon,
  LRectangle,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default {
    props:['mapLocation'],
  components: {
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
    LControlLayers,
    LTooltip,
    LPopup,
    LPolyline,
    LPolygon,
    LRectangle,
  },
  data() {
    return {
      zoom: 2,
    };
  },
  computed: {
  },
  methods: {
  },
};
</script>