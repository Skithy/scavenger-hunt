<script type="ts">
  import Leaflet from "leaflet";
  import { onMount } from "svelte";
  import { dataset_dev } from "svelte/internal";

  const createIcon = (content: string) =>
    Leaflet.divIcon({
      className:
        "bg-accent text-accent-content !h-10 !w-10 opacity-80 rounded-full !flex items-center justify-center text-xl",
      shadowSize: [20, 30], // size of the shadow
      iconAnchor: [20, 40],
      shadowAnchor: [4, 30], // the same for the shadow
      popupAnchor: [0, -30],
      html: content,
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
        name: "Memory is Crewation without End",
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

  let markers: Leaflet.Marker[] = [];

  onMount(() => {
    const map = Leaflet.map("map", {
      maxBounds: [
        [-33.853418374735334, 151.20314460366174],
        [-33.863664176851906, 151.21494632369132],
      ],
    }).setView([-33.85803526895217, 151.20859419563487], 17);
    Leaflet.tileLayer(
      "https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=GZQzSfPKg5ysveVGL3cr0No9YYGhlNkbxtpqF8nyQu4qWnSXj83kZpwnzG73lVmF",
      {
        minZoom: 16,
        maxZoom: 20,
      }
    ).addTo(map);

    challenges.forEach((data, index) => {
      if (data.location) {
        const marker = Leaflet.marker(data.location.coords, {
          icon: createIcon((index + 1).toString()),
        })
          .addTo(map)
          .bindPopup(data.description);
        markers.push(marker);
      }
    });
  });

  function focusMarker(index: number) {
    if (index < markers.length) {
      markers[index].openPopup();
    }
  }
</script>

<main class="h-full flex flex-col">
  <div id="map" class="flex-1" />
  <div class="p-2">
    <h1 class="text-xl">Challenges</h1>
    <div class="max-h-60 overflow-y-scroll">
      <ul class="menu p-2">
        {#each challenges as data, i}
          <li>
            <button on:click={() => focusMarker(i)}
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
