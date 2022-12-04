<script type="ts">
  import Leaflet from "leaflet";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { marked, Renderer } from "marked";
  import leftIcon from "./assets/icons/Left.svg";
  import {
    anywhereChallenges,
    challenges,
    locationChallenges,
    type Challenge,
  } from "./challenges";
  import { getDistanceFromLatLonInKm, type Coord } from "./getDistance";

  const markerClass = (active = false) =>
    `!h-8 !w-8 rounded-full !flex items-center justify-center font-bold text-md shadow-md ${
      active ? "ring-info ring-4 !z-[300]" : ""
    }`;

  const createIcon = (challenge: Challenge, active = false) =>
    Leaflet.divIcon({
      className: `${markerClass(active)} bg-accent/80 text-accent-content`,
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

  let currentCoord: Coord | undefined = undefined;
  const posMarker: Leaflet.Marker = Leaflet.marker(currentCoord ?? [0, 0], {
    icon: hereIcon,
  });
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

  const renderer = new Renderer();
  const linkRenderer = renderer.link;
  renderer.link = (href, title, text) => {
    const html = linkRenderer.call(renderer, href, title, text);
    return html.replace(
      /^<a /,
      '<a target="_blank" rel="nofollow noreferrer" '
    );
  };

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
        currentCoord = [-33.85803526895217, 151.20859419563487];
        posMarker.setLatLng(currentCoord);
      });
    } else {
      alert("geolocation is not supported");
    }
  }

  $: getDistanceText = (challenge: Challenge) => {
    if (!currentCoord) {
      return "";
    }

    const distance = getDistanceFromLatLonInKm(
      challenge.location.coords,
      currentCoord
    );

    if (distance > 1) {
      return `${distance.toFixed(1)}km`;
    }

    return `${(distance * 1000).toFixed(0)}m`;
  };
</script>

<main class="h-full flex flex-col md:flex-row">
  <div id="map" class="flex-1 -mb-8 md:mb-0" />
  <div
    class="relative {expanded
      ? 'h-[70vh]'
      : 'h-[35vh]'} md:h-full md:w-96 flex flex-col rounded-t-2xl z-[1100] bg-white shadow-md transition-[height] duration-300"
  >
    {#if selectedChallenge !== undefined}
      <div
        class="absolute inset-0 bg-white rounded-t-2xl z-20 flex flex-col"
        transition:fly={{ y: 1000, opacity: 1 }}
      >
        <button class="px-3 py-4 flex w-full" on:click={unfocusMarker}
          ><img src={leftIcon} alt="Back" /></button
        >
        <div class="overflow-y-scroll px-4">
          <h1 class="text-lg">
            {selectedChallenge.name}
          </h1>
          <h2 class="underline font-bold text-xs mt-2 mb-6">
            {#if selectedChallenge.location}
              <a
                href={selectedChallenge.location.link}
                target="_blank"
                rel="noreferrer">{selectedChallenge.location.name}</a
              >
            {:else}
              Anywhere
            {/if}
          </h2>
          <p class="prose">
            {@html marked(selectedChallenge.description, { renderer })}
          </p>
          <div class="text-sm mt-6 mb-3">
            🏆 Earn {selectedChallenge.points} point
          </div>
          <div class="text-sm">📷 Upload proof to your Slack channel</div>
          {#if selectedChallenge.location}
            <a
              href={selectedChallenge.location.link}
              target="_blank"
              rel="noreferrer"
              class="bg-accent text-accent-content rounded-full p-4 text-md font-bold my-6 w-full block text-center"
              >Get directions</a
            >
          {/if}
          <label class="text-sm flex justify-between items-center mt-6 mb-10">
            Nailed it, cross it off my list!
            <input class="toggle toggle-secondary toggle-lg" type="checkbox" />
          </label>
          {#if selectedChallenge.photo}
            <div class="overflow-hidden rounded-lg pb-4">
              <img
                class="w-full"
                src={selectedChallenge.photo}
                alt={selectedChallenge.location.name}
              />
            </div>
          {/if}
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
    <div class="flex shadow-md">
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
          {#each locationChallenges.map((id) => challenges[id]) as challenge}
            <li class="contents">
              <button
                class="grid grid-cols-[auto_1fr] gap-y-1 gap-x-4 border-b-2 border-base-300 p-4 text-left"
                on:click={() => focusMarker(challenge.id, true)}
              >
                <div>📌</div>
                <div>{challenge.name}</div>
                <div class="text-xs">
                  {getDistanceText(challenge)}
                </div>
                <div class="text-xs">
                  {challenge.location.name}
                  <span class="ml-2">
                    🏆 {challenge.points}
                  </span>
                </div>
              </button>
            </li>
          {/each}
        {:else}
          {#each anywhereChallenges.map((id) => challenges[id]) as challenge}
            <li class="contents">
              <button
                class="block border-b-2 border-base-300 p-4 text-left"
                on:click={() => focusMarker(challenge.id, true)}
              >
                <div>
                  {challenge.name}
                </div>
                <div class="text-xs mt-1">
                  🏆 {challenge.points}
                </div></button
              >
            </li>
          {/each}
        {/if}
      </ul>
    </div>
  </div>
</main>
