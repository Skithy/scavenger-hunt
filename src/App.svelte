<script type="ts">
  import Leaflet from 'leaflet'
  import { onMount } from 'svelte'
  import positionIcon from './assets/icons/position.svg'
  import { challenges } from './data/challenges'
  import { getDistanceFromLatLonInKm } from './utils/getDistance'
  import Details from './Details.svelte'
  import {
    doneIcon,
    hereIcon,
    hereLowIcon,
    hereYellowIcon,
    lockedIcon,
    unlockedIcon,
  } from './data/icons'
  import Sidebar from './Sidebar.svelte'
  import {
    currentAccuracy,
    currentCoord,
    markerDistances,
    markerStates,
  } from './data/stores'

  const DEBUG = true

  function createIcon(id: string, active = false) {
    const challenge = challenges[id]
    switch ($markerStates[challenge.id]) {
      case 'done':
        return doneIcon(active)
      case 'locked':
        return lockedIcon(challenge, active)
      case 'unlocked':
        return unlockedIcon(challenge, active)
    }
  }

  const posMarker = Leaflet.marker([0, 0], { icon: hereIcon })
  const markers: Record<string, Leaflet.Marker | undefined> = Object.entries(
    challenges
  ).reduce((total, [id, challenge]) => {
    if (challenge.location) {
      total[id] = Leaflet.marker(challenge.location.coords, {
        icon: createIcon(id),
      })
    }
    return total
  }, {})

  let selectedId: string | undefined

  let map: Leaflet.Map
  let expanded = false
  let locationWatch: number | undefined = undefined

  onMount(() => {
    map = Leaflet.map('map', {
      maxBounds: [
        [-33.85, 151.19972638009483],
        [-33.868, 151.218],
      ],
    })
      .setView([-33.85803526895217, 151.20859419563487], 16)
      .on('click', () => {
        unfocusMarker()
        toggleExpanded(false)
      })

    Leaflet.tileLayer(
      'https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token=GZQzSfPKg5ysveVGL3cr0No9YYGhlNkbxtpqF8nyQu4qWnSXj83kZpwnzG73lVmF',
      {
        minZoom: 15,
        maxZoom: 20,
      }
    ).addTo(map)

    posMarker.addTo(map)
    Object.entries(markers).forEach(([id, marker]) => {
      if (marker) {
        marker.on('click', () => focusMarker(id)).addTo(map)
      }
    })

    if (DEBUG) {
      map.on('contextmenu', (e) => {
        $currentCoord = [e.latlng.lat, e.latlng.lng]
        $currentAccuracy = 0
      })
    }

    getLocation()
  })

  async function toggleExpanded(newState = !expanded) {
    if (expanded !== newState) {
      expanded = newState
      return new Promise((res) => {
        setTimeout(() => res(map.invalidateSize({ pan: false })), 200)
      })
    }
  }

  async function focusMarker(id: string) {
    unfocusMarker()
    selectedId = id
    await toggleExpanded(true)
    const marker = markers[id]
    if (marker) {
      marker.setIcon(createIcon(id, true))
      map.flyTo(marker.getLatLng(), Math.max(map.getZoom(), 17))
    }
  }

  function unfocusMarker() {
    if (selectedId) {
      markers[selectedId]?.setIcon(createIcon(selectedId, false))
      selectedId = undefined
    }
  }

  function getLocation() {
    if (!navigator.geolocation) {
      alert('geolocation is not supported')
    }

    if (locationWatch) {
      return
    }

    locationWatch = navigator.geolocation.watchPosition(
      (position) => {
        $currentCoord = [position.coords.latitude, position.coords.longitude]
        $currentAccuracy = position.coords.accuracy
      },
      (error) => {
        alert(error.message)
      },
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 }
    )
  }

  $: if ($currentCoord) {
    posMarker.setLatLng($currentCoord)

    Object.entries(challenges).forEach(([id, challenge]) => {
      if (challenge.location) {
        $markerDistances[id] = getDistanceFromLatLonInKm(
          challenge.location.coords,
          $currentCoord
        )
        if ($markerStates[id] === 'locked' && $markerDistances[id] < 0.1) {
          $markerStates[id] = 'unlocked'
          markers[id].setIcon(createIcon(id))
        }
      }
    })
  }

  $: if ($currentAccuracy < 10) {
    posMarker.setIcon(hereIcon)
  } else if ($currentAccuracy < 50) {
    posMarker.setIcon(hereYellowIcon)
  } else {
    posMarker.setIcon(hereLowIcon)
  }

  function markChallenge(id: string) {
    if ($markerStates[id] === 'done') {
      $markerStates[id] = 'unlocked'
    } else if ($markerStates[id] === 'unlocked') {
      $markerStates[id] = 'done'
    }

    markers[id].setIcon(createIcon(id, true))
  }

  function centerLocation() {
    getLocation()
    if ($currentCoord) {
      map.flyTo($currentCoord)
    }
  }
</script>

<main class="h-full flex flex-col md:flex-row">
  <div id="map" class="relative flex-1 -mb-8 md:mb-0">
    <div class="absolute top-8 right-8 z-[9999]">
      <button
        on:click={centerLocation}
        class="flex justify-center items-center bg-base-100 rounded"
      >
        <img src={positionIcon} alt="Current position" />
      </button>
      {#if $currentAccuracy}
        <div>
          Accuracy: {$currentAccuracy.toFixed(2)}
        </div>
      {/if}
    </div>
  </div>
  <Sidebar {toggleExpanded} {expanded} {focusMarker} />

  {#if selectedId !== undefined}
    <Details
      challengeId={selectedId}
      onClose={unfocusMarker}
      completeChallenge={() => markChallenge(selectedId)}
    />
  {/if}
</main>
