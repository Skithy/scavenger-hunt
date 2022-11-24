<script type="ts">
  import Leaflet from "leaflet";
  import { onMount } from "svelte";

  onMount(() => {
    const map = Leaflet.map("map", {
      maxBounds: [
        [-33.85422636918259, 151.1994092482807],
        [-33.86392825593579, 151.21528210962805],
      ],
      minZoom: 16,
      maxZoom: 19,
    }).setView([-33.85803526895217, 151.20859419563487], 17);
    Leaflet.tileLayer(
      "https://{s}.tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=f1d38c09f59e40c8806d35f8311e5b13"
    ).addTo(map);

    const marker = Leaflet.marker([
      -33.85803526895217, 151.20859419563487,
    ]).addTo(map);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.");
  });
</script>

<main class="h-full flex flex-col">
  <div id="map" class="flex-1" />
</main>
