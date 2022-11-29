<script type="ts">
  import Leaflet from "leaflet";
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";

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

  type Challenge = {
    location?: {
      coords: [number, number];
      name: string;
    };
    description: string;
  };

  const challenges: Challenge[] = [
    {
      location: {
        coords: [-33.8570829503414, 151.20922473426515],
        name: "Honey Office",
      },
      description: "Solve this movie quote",
    },
    {
      location: {
        coords: [-33.85779725595838, 151.20880174912443],
        name: "Playfair St",
      },
      description: "Take a photo of the sandy trio",
    },
    {
      location: {
        coords: [-33.85832079294985, 151.20808850678037],
        name: "Foundation Park",
      },
      description: "Take a family portrait with a resident of Foundation Park",
    },
    {
      location: {
        coords: [-33.85969678809165, 151.20905456097734],
        name: "Museum of Contemporary Art",
      },
      description:
        "Take a photo of [open-ended description of artwork] on level X of the MCA",
    },
    {
      location: {
        coords: [-33.86002086226806, 151.20901566894543],
        name: "Museum of Contemporary Art",
      },
      description: "Take a photo of 8 flags",
    },
    {
      location: {
        coords: [-33.85913200650135, 151.20479104526223],
        name: "Sydney Observatory",
      },
      description: "Shoot for the moon, where stargazers meet",
    },
    {
      location: {
        coords: [-33.86199113923606, 151.21229407502204],
        name: "Justice and Police Museum",
      },
      description: "Take a team selfie with a crim",
    },
    {
      location: {
        coords: [-33.86126950448042, 151.2135332555823],
        name: "Memory is Creation without End",
      },
      description:
        "Pretend you’re in a band.<br/>Pose for your next album cover with some building off-cuts.<br/>Tell us the name of your album and it’s genre when you send us your photo.",
    },
    {
      description: "Photobomb a tourist’s pic",
    },
    {
      description: "Take a photo with a street performer",
    },
    {
      description: "Enjoy an icecream",
    },
  ];

  let selectedIndex: number | undefined;
  let posMarker: Leaflet.Marker = Leaflet.marker([0, 0], { icon: hereIcon });
  let markers: Leaflet.Marker[] = [];
  let map: Leaflet.Map;
  let scroll = 0;

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

  function focusMarker(index: number, zoom?: boolean) {
    unfocusMarker();
    selectedIndex = index;
    if (index < markers.length) {
      map?.flyTo(markers[index].getLatLng(), zoom ? 17 : undefined);
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
  <div id="map" class="flex-1" />
  <div class="relative h-[30vh] md:h-full flex flex-col">
    {#if selectedIndex !== undefined}
      <div
        class="absolute inset-0 bg-base-100 z-10"
        transition:fly={{ x: 400, opacity: 1 }}
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
    <h1 class="text-xl p-2">Honey Scavenger Hunt Challenges</h1>
    <div class="overflow-y-scroll">
      <ul class="menu p-2">
        {#each challenges as data, i}
          <li>
            <button on:click={() => focusMarker(i, true)}
              >{i + 1}: {data.location
                ? data.location.name
                : data.description}</button
            >
          </li>
        {/each}
      </ul>
    </div>
  </div>
</main>
