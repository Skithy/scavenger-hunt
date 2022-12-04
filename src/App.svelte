<script type="ts">
  import Leaflet from "leaflet";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import {
    anywhereChallenges,
    challenges,
    locationChallenges,
    type Challenge,
  } from "./challenges";

  const markerClass = (active = false) =>
    `!h-8 !w-8 rounded-full !flex items-center justify-center font-bold text-md shadow-md ${
      active ? "ring-info ring-2 !z-[300]" : ""
    }`;

  const createIcon = (challenge: Challenge, active = false) =>
    Leaflet.divIcon({
      className: `${markerClass(active)} bg-accent/75 text-accent-content`,
      html: challenge.name[0],
    });

  const hereIcon = Leaflet.divIcon({
    className: "bg-info !h-4 !w-4 rounded-full shadow-md border-2 border-white",
  });

  const lockedIcon = (active = false) =>
    Leaflet.divIcon({
      className: `${markerClass(active)} bg-secondary/75 text-accent-content`,
      html: "🔒",
    });

  const doneIcon = (active = false) =>
    Leaflet.divIcon({
      className: `${markerClass(active)} bg-success/75 text-success-content`,
      html: "✔️",
    });

  let selectedId: string | undefined;
  $: selectedChallenge = challenges[selectedId];

  const posMarker: Leaflet.Marker = Leaflet.marker([0, 0], { icon: hereIcon });
  const markers: Record<string, Leaflet.Marker | undefined> = Object.entries(
    challenges
  ).reduce((total, [id, challenge]) => {
    if (challenge.location) {
      const marker = Leaflet.marker(challenge.location.coords, {
        icon: createIcon(challenge),
      }).on("click", () => {
        focusMarker(id);
      });
      total[id] = marker;
    }
    return total;
  }, {});

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

    getLocation();
    posMarker.addTo(map);
    Object.values(markers).forEach((marker) => marker?.addTo(map));
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
    if (selectedId) {
      markers[selectedId]?.setIcon(createIcon(challenges[selectedId], false));
      selectedId = undefined;
    }
  }

  async function focusMarker(id: string, zoom?: boolean) {
    unfocusMarker();
    selectedId = id;
    await toggleExpanded(true);
    const marker = markers[id];
    if (marker) {
      map.flyTo(marker.getLatLng(), zoom ? 17 : undefined);
      marker.setIcon(createIcon(challenges[id], true));
    }
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        // posMarker.setLatLng([
        //   position.coords.latitude,
        //   position.coords.longitude,
        // ]);

        posMarker.setLatLng([-33.85803526895217, 151.20859419563487]);
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
    {#if selectedChallenge !== undefined}
      <div
        class="absolute inset-0 bg-base-100 shadow-md rounded-t-2xl z-20 flex flex-col"
        transition:fly={{ y: 600, opacity: 1 }}
      >
        <button
          class="text-xl px-4 pt-6 pb-3 flex w-full"
          on:click={unfocusMarker}>&lt;</button
        >
        <div class="overflow-y-scroll px-4">
          <h1 class="text-xl">
            {selectedChallenge.name}
          </h1>
          <h2 class="underline font-bold text-sm mt-2 mb-6">
            {#if selectedChallenge.location}
              <a href="/" target="_blank">{selectedChallenge.location.name}</a>
            {:else}
              Anywhere
            {/if}
          </h2>
          <p>{selectedChallenge.description}</p>
          <div class="mt-6 mb-3">🏆 Earn {selectedChallenge.points} point</div>
          <div>📷 Upload the pic in your Slack channel</div>
          <label class="flex justify-between py-2 my-4">
            Nailed it, cross it off my list!
            <input class="checkbox" type="checkbox" />
          </label>
          <div class="-mx-4">
            <img
              class="w-full"
              src="https://lh5.googleusercontent.com/p/AF1QipODxgoMM_ZyWwDAf27VmY-DxkTMnx9z-47fp_ok=w203-h152-k-no"
              alt={selectedChallenge.location.name}
            />
          </div>
        </div>
      </div>
    {/if}
    <button
      class="px-4 pt-6 pb-3 flex justify-between"
      on:click={() => toggleExpanded()}
    >
      <span>Team challenges</span>
      <span class="transition {expanded ? 'rotate-0' : 'rotate-180'}">V</span>
    </button>
    <div class="flex shadow-lg">
      <button
        class="text-xs transition p-2 flex-1 {tab === 'specific'
          ? 'border-accent font-bold'
          : 'border-base-200'} border-b-2"
        on:click={() => (tab = "specific")}>Specific locations</button
      >
      <button
        class="text-xs transition p-2 flex-1 {tab === 'anywhere'
          ? 'border-accent font-bold'
          : 'border-base-300'} border-b-2"
        on:click={() => (tab = "anywhere")}>Do anywhere</button
      >
    </div>
    <div class="overflow-y-scroll">
      <ul class="flex flex-col">
        {#if tab === "specific"}
          {#each locationChallenges as id}
            <li class="contents">
              <button
                class="grid grid-cols-[auto_1fr] gap-y-1 gap-x-4 border-b-2 border-base-300 p-4 text-left"
                on:click={() => focusMarker(id, true)}
              >
                <div>📌</div>
                <div>{challenges[id].name}</div>
                <div class="text-xs">50m</div>
                <div class="text-xs">
                  {challenges[id].location.name}
                  <span class="ml-2">
                    🏆 {challenges[id].points}
                  </span>
                </div>
              </button>
            </li>
          {/each}
        {:else}
          {#each anywhereChallenges as id}
            <li class="contents">
              <button
                class="block border-b-2 border-base-300 p-4 text-left"
                on:click={() => focusMarker(id, true)}
              >
                <div>
                  {challenges[id].name}
                </div>
                <div class="text-xs mt-1">
                  🏆 {challenges[id].points}
                </div></button
              >
            </li>
          {/each}
        {/if}
      </ul>
    </div>
  </div>
</main>
