<script type="ts">
  import Leaflet from "leaflet";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { anywhereChallenges, challenges } from "./challenges";

  const createIcon = (content: string, active = false) =>
    Leaflet.divIcon({
      className: `bg-accent/75 text-accent-content border-4 ${
        active ? "border-primary !z-[300]" : "border-accent"
      } !h-10 !w-10 rounded-full !flex items-center justify-center text-xl`,
      shadowSize: [20, 30], // size of the shadow
      iconAnchor: [20, 40],
      shadowAnchor: [4, 30], // the same for the shadow
      popupAnchor: [0, -30],
      html: content,
    });

  const hereIcon = Leaflet.divIcon({
    className: "bg-primary !h-6 !w-6 rounded-full",
    shadowSize: [20, 30], // size of the shadow
    iconAnchor: [20, 40],
    shadowAnchor: [4, 30], // the same for the shadow
    popupAnchor: [0, -30],
  });

  let selectedIndex: number | undefined;
  let posMarker: Leaflet.Marker = Leaflet.marker([0, 0], { icon: hereIcon });
  let markers: Leaflet.Marker[] = [];
  let map: Leaflet.Map;
  let expanded = false;
  let tab: "specific" | "anywhere" = "specific";

  onMount(() => {
    map = Leaflet.map("map", {
      maxBounds: [
        [-33.85, 151.19972638009483],
        [-33.868, 151.218],
      ],
    }).setView([-33.85803526895217, 151.20859419563487], 16);
    Leaflet.tileLayer(
      "https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=GZQzSfPKg5ysveVGL3cr0No9YYGhlNkbxtpqF8nyQu4qWnSXj83kZpwnzG73lVmF",
      {
        minZoom: 15,
        maxZoom: 20,
      }
    ).addTo(map);

    challenges.forEach((data, index) => {
      if (data.location) {
        const marker = Leaflet.marker(data.location.coords, {
          icon: createIcon((index + 1).toString()),
        }).addTo(map);
        marker.on("click", () => {
          focusMarker(index);
        });
        markers.push(marker);
      }
    });

    getLocation();
    posMarker.addTo(map);
  });

  function toggleExpanded(newState = !expanded) {
    if (expanded !== newState) {
      expanded = newState;
      return new Promise((res) => {
        setTimeout(() => {
          map.invalidateSize({ pan: false });
          res(null);
        }, 200);
      });
    }
  }

  function unfocusMarker() {
    if (selectedIndex !== undefined) {
      if (selectedIndex < markers.length) {
        markers[selectedIndex].setIcon(
          createIcon((selectedIndex + 1).toString(), false)
        );
      }
      selectedIndex = undefined;
    }
  }

  async function focusMarker(index: number, zoom?: boolean) {
    unfocusMarker();
    selectedIndex = index;
    await toggleExpanded(true);
    if (index < markers.length) {
      map.flyTo(markers[index].getLatLng(), zoom ? 17 : undefined);
      markers[index].setIcon(createIcon((index + 1).toString(), true));
    }
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        posMarker.setLatLng([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      });
    } else {
      alert("geolocation is not supported");
    }
  }
</script>

<main class="h-full flex flex-col md:flex-row">
  <div id="map" class="flex-1 -mb-8" />
  <div
    class="relative {expanded
      ? 'h-[70vh]'
      : 'h-[35vh]'} md:h-full flex flex-col rounded-t-2xl z-[1100] bg-base-100 shadow-md transition-[height] duration-300"
  >
    {#if selectedIndex !== undefined}
      <div
        class="absolute inset-0 bg-base-100 shadow-md rounded-t-2xl z-20"
        transition:fly={{ y: 600, opacity: 1 }}
      >
        <button on:click={unfocusMarker}>Back</button>
        <h1 class="text-xl p-2">
          {selectedIndex + 1}: {challenges[selectedIndex].location
            ? challenges[selectedIndex].location.name
            : challenges[selectedIndex].description}
        </h1>
        <div class="overflow-y-scroll p-2">
          {challenges[selectedIndex].description}
        </div>
      </div>
    {/if}
    <button
      class="text-xl px-4 pt-5 pb-3 flex justify-between"
      on:click={() => toggleExpanded()}
    >
      <span>Your challenges</span>
      <span class="transition {expanded ? 'rotate-0' : 'rotate-180'}">V</span>
    </button>
    <div class="overflow-y-scroll">
      <div class="px-4 mb-6">
        Finish as many challenges as you can to claim glory (and a prize) for
        your team. It's up to you how many & which ones you want to do. Choose
        wisely & have fun!
      </div>
      <div
        class="flex gap-x-3 px-4 sticky top-0 bg-base-100 z-10 pb-4 border-b-2 border-base-300 shadow"
      >
        <button
          class="text-sm transition p-1 flex-1 {tab === 'specific' &&
            'bg-base-200 font-bold'} border-base-200 border-2 rounded-lg"
          on:click={() => (tab = "specific")}
          >{tab === "specific" ? "✔️ " : ""}Specific locations</button
        >
        <button
          class="text-sm transition p-1 flex-1 {tab === 'anywhere' &&
            'bg-base-200 font-bold'} border-base-200 border-2 rounded-lg"
          on:click={() => (tab = "anywhere")}
          >{tab === "anywhere" ? "✔️ " : ""}Do anywhere</button
        >
      </div>
      <ul class="flex flex-col">
        {#if tab === "specific"}
          {#each challenges as data, i}
            <li class="contents">
              <button
                class="grid grid-cols-[auto_1fr] gap-y-1 gap-x-4 border-b-2 border-base-300 p-4 text-left"
                on:click={() => focusMarker(i, true)}
              >
                <div>📌</div>
                <div>{data.name}</div>
                <div class="text-xs">50m</div>
                <div class="text-xs">
                  {data.location.name}
                  <span class="ml-2">
                    🏆 {data.points}
                  </span>
                </div>
              </button>
            </li>
          {/each}
        {:else}
          {#each anywhereChallenges as data, i}
            <li class="contents">
              <button
                class="block border-b-2 border-base-300 p-4 text-left"
                on:click={() => focusMarker(i, true)}
              >
                <div>
                  {data.name}
                </div>
                <div class="text-xs mt-1">
                  🏆 {data.points}
                </div></button
              >
            </li>
          {/each}
        {/if}
      </ul>
    </div>
  </div>
</main>
