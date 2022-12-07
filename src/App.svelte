<script type="ts">
  import Leaflet from 'leaflet'
  import { onMount } from 'svelte'
  import positionIcon from './assets/icons/position.svg'
  import questionIcon from './assets/icons/question.svg'
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
  import Info from './Info.svelte'

  const DEBUG = false

  function createIcon(id: string, active = false) {
    const challenge = challenges[id]
    switch ($markerStates[id]) {
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

  const mapMode = new URLSearchParams(location.search).get('map')
  let selectedId: string | undefined
  let info = false
  let map: Leaflet.Map
  let expanded = false
  let locationWatch: number | undefined = undefined
  let locationError: string | undefined = undefined

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
        toggleHelp(false)
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

  async function toggleHelp(newState = !info) {
    if (info !== newState) {
      info = newState
      return new Promise((res) => {
        setTimeout(() => res(map.invalidateSize({ pan: false })), 200)
      })
    }
  }
  async function toggleExpanded(newState = !expanded) {
    if (expanded !== newState) {
      expanded = newState
      return new Promise((res) => {
        setTimeout(() => res(map.invalidateSize({ pan: false })), 200)
      })
    }
  }

  function focusMarker(id: string) {
    if (selectedId) {
      history.replaceState({ id }, '', '/#' + id)
    } else {
      history.pushState({ id }, '', '/#' + id)
    }
    onHashChange()
  }

  function unfocusMarker() {
    if (selectedId) {
      history.back()
    }
  }

  async function onHashChange() {
    if (selectedId) {
      markers[selectedId]?.setIcon(createIcon(selectedId, false))
    }

    selectedId = location.hash ? location.hash.slice(1) : undefined
    if (selectedId) {
      await toggleExpanded(true)
      const marker = markers[selectedId]
      if (marker) {
        marker.setIcon(createIcon(selectedId, true))
        map.flyTo(marker.getLatLng(), Math.max(map.getZoom(), 17))
      }
    }
  }

  function getLocation() {
    if (locationWatch) {
      return
    }

    if (!navigator.geolocation) {
      alert('geolocation is not supported')
      return
    }

    locationWatch = navigator.geolocation.watchPosition(
      (position) => {
        $currentCoord = [position.coords.latitude, position.coords.longitude]
        $currentAccuracy = position.coords.accuracy
        locationError = undefined
      },
      (error) => {
        locationError = error.message
      },
      { enableHighAccuracy: true, maximumAge: 2000, timeout: 10000 }
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
          localStorage.setItem(id, $markerStates[id])
          markers[id].setIcon(createIcon(id))
        }
      }
    })
  }

  $: if ($currentAccuracy < 10) {
    posMarker.setIcon(hereIcon)
  } else if ($currentAccuracy < 30) {
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

    localStorage.setItem(id, $markerStates[id])
    markers[id].setIcon(createIcon(id, true))
  }

  async function centerLocation(e: Event) {
    getLocation()
    e.stopPropagation()
    unfocusMarker()
    await toggleExpanded(false)
    if ($currentCoord) {
      map.flyTo($currentCoord)
    }
  }
</script>

<svelte:window on:popstate={onHashChange} />

<main class="h-full flex flex-col md:flex-row">
  <div id="map" class="relative flex-1 -mb-8 md:mb-0">
    <div class="absolute top-4 right-4 flex flex-col gap-y-2 z-[9999]">
      <button
        on:click={(e) => {
          e.stopPropagation()
          toggleHelp()
        }}
        class="flex justify-center items-center h-11 w-11 bg-base-100 rounded-full shadow-md"
      >
        <img src={questionIcon} alt="Info" />
      </button>
      <div
        class="{locationError && 'tooltip'} tooltip-left tooltip-error"
        data-tip={locationError}
      >
        <button
          on:click={centerLocation}
          class="flex justify-center items-center h-11 w-11 {locationError
            ? 'bg-error'
            : 'bg-base-100'} rounded-full shadow-md"
        >
          <img src={positionIcon} alt="Current position" />
        </button>
      </div>
    </div>
  </div>
  {#if !mapMode}
    <Sidebar {toggleExpanded} {expanded} {focusMarker} />
  {/if}

  {#if info}
    <Info onClose={() => toggleHelp(false)} />
  {:else if selectedId !== undefined}
    <Details
      challengeId={selectedId}
      onClose={unfocusMarker}
      completeChallenge={() => markChallenge(selectedId)}
    />
  {/if}
</main>
