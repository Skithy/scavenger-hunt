<script type="ts">
  import Leaflet from 'leaflet'
  import { onMount } from 'svelte'
  import { fly } from 'svelte/transition'
  import * as easingFns from 'svelte/easing'
  import { marked, Renderer } from 'marked'
  import { sortBy } from 'lodash'
  import lockIcon from './assets/icons/lock.svg'
  import positionIcon from './assets/icons/position.svg'
  import tickIcon from './assets/icons/tick.svg'
  import leftIcon from './assets/icons/left.svg'
  import downIcon from './assets/icons/down.svg'
  import cameraIcon from './assets/icons/camera.svg'
  import cupIcon from './assets/icons/cup.svg'
  import clockIcon from './assets/icons/clock.svg'
  import {
    anywhereChallenges,
    challenges,
    locationChallenges,
    type Challenge,
  } from './challenges'
  import { getDistanceFromLatLonInKm, type Coord } from './getDistance'

  const DEBUG = true

  type State = 'locked' | 'unlocked' | 'done'
  const markerStates: Record<string, State> = Object.entries(challenges).reduce(
    (total, [id, challenge]) => {
      total[id] = challenge.location ? 'locked' : 'unlocked'
      return total
    },
    {}
  )

  const markerDistances: Record<string, number> = Object.keys(
    challenges
  ).reduce((total, id) => {
    total[id] = 0
    return total
  }, {})

  const markerClass = (active = false) =>
    `!h-8 !w-8 rounded-full !flex items-center justify-center !font-bold !text-md shadow-md ${
      active ? 'ring-info ring-4 !z-[300]' : ''
    }`

  const createIcon = (challenge: Challenge, active = false) => {
    switch (markerStates[challenge.id]) {
      case 'done':
        return doneIcon(active)
      case 'locked':
        return lockedIcon(challenge, active)
      case 'unlocked':
        return unlockedIcon(challenge, active)
    }
  }

  const unlockedClass = (active = false) =>
    `${markerClass(active)} bg-accent text-accent-content`
  const unlockedIcon = (challenge: Challenge, active = false) =>
    Leaflet.divIcon({
      className: `opacity-90 ${unlockedClass(active)}`,
      html: challenge.name[0],
    })

  const hereIcon = Leaflet.divIcon({
    className: 'bg-info !h-4 !w-4 rounded-full shadow-md border-2 border-white',
  })

  const lockedClass = (active = false) =>
    `${markerClass(active)} bg-secondary text-secondary-content`
  const lockedIcon = (challenge: Challenge, active = false) =>
    Leaflet.divIcon({
      className: `opacity-80 ${lockedClass(active)}`,
      html: challenge.name[0],
    })

  const doneClass = (active = false) =>
    `${markerClass(active)} bg-success text-success-content`
  const doneIcon = (active = false) =>
    Leaflet.divIcon({
      className: `opacity-90 ${doneClass(active)}`,
      html: `<img src=${tickIcon} alt="Done" />`,
    })

  let selectedId: string | undefined
  $: selectedChallenge = challenges[selectedId]
  $: selectedState = markerStates[selectedId]

  let currentCoord: Coord | undefined = undefined
  const posMarker: Leaflet.Marker = Leaflet.marker(currentCoord ?? [0, 0], {
    icon: hereIcon,
  })
  const markers: Record<string, Leaflet.Marker | undefined> = Object.entries(
    challenges
  ).reduce((total, [id, challenge]) => {
    if (challenge.location) {
      const marker = Leaflet.marker(challenge.location.coords, {
        icon: createIcon(challenge),
      }).on('click', () => {
        focusMarker(id)
      })
      total[id] = marker
    }
    return total
  }, {})

  let map: Leaflet.Map
  let expanded = false
  let tab: 'specific' | 'anywhere' = 'specific'
  let locationWatch: number | undefined = undefined

  const challengeOrder: State[] = ['unlocked', 'locked', 'done']

  $: sortedLocationChallenges = sortBy(locationChallenges, (id) =>
    challengeOrder.indexOf(markerStates[id])
  )
  $: sortedAnywhereChallenges = sortBy(anywhereChallenges, (id) =>
    challengeOrder.indexOf(markerStates[id])
  )

  const renderer = new Renderer()
  const linkRenderer = renderer.link
  renderer.link = (href, title, text) => {
    const html = linkRenderer.call(renderer, href, title, text)
    return html.replace(/^<a /, '<a target="_blank" rel="nofollow noreferrer" ')
  }

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

    getLocation()
    posMarker.addTo(map)
    Object.values(markers).forEach((marker) => marker?.addTo(map))
  })

  $: toggleExpanded = (newState = !expanded) => {
    console.log('toggleExpanded', expanded, newState)
    if (expanded !== newState) {
      console.log('set expanded')
      expanded = newState
      return new Promise((res) => {
        setTimeout(() => {
          map.invalidateSize({ pan: false })
          res(null)
        }, 200)
      })
    }
  }

  function unfocusMarker() {
    if (selectedId) {
      markers[selectedId]?.setIcon(createIcon(challenges[selectedId], false))
      selectedId = undefined
    }
  }

  async function focusMarker(id: string) {
    unfocusMarker()
    selectedId = id
    await toggleExpanded(true)
    const marker = markers[id]
    if (marker) {
      map.flyTo(marker.getLatLng(), Math.max(map.getZoom(), 17))
      marker.setIcon(createIcon(challenges[id], true))
    }
  }

  function getLocation() {
    if (DEBUG) {
      map.on('contextmenu', (e) => {
        currentCoord = [e.latlng.lat, e.latlng.lng]
      })
    }

    if (navigator.geolocation) {
      if (locationWatch === undefined) {
        locationWatch = navigator.geolocation.watchPosition(
          (position) => {
            currentCoord = [position.coords.latitude, position.coords.longitude]
          },
          (error) => {
            alert(error.message)
          },
          { enableHighAccuracy: true, maximumAge: 2000, timeout: 5000 }
        )
      }
    } else {
      alert('geolocation is not supported')
    }
  }

  $: if (currentCoord) {
    posMarker.setLatLng(currentCoord)

    Object.entries(challenges).forEach(([id, challenge]) => {
      if (challenge.location) {
        markerDistances[id] = getDistanceFromLatLonInKm(
          challenge.location.coords,
          currentCoord
        )
        if (markerStates[id] === 'locked' && markerDistances[id] < 0.1) {
          markerStates[id] = 'unlocked'
          markers[id].setIcon(createIcon(challenge))
        }
      }
    })
  }

  function markChallenge(challenge: Challenge) {
    if (markerStates[challenge.id] === 'done') {
      markerStates[challenge.id] = 'unlocked'
    } else if (markerStates[challenge.id] === 'unlocked') {
      markerStates[challenge.id] = 'done'
    }

    markers[challenge.id].setIcon(createIcon(challenge, true))
  }

  $: centerLocation = () => {
    if (currentCoord) {
      map.flyTo(currentCoord)
    } else {
      getLocation()
    }
  }

  $: getDistanceText = (challenge: Challenge) => {
    const distance = markerDistances[challenge.id]

    if (!distance) {
      return ''
    }

    if (distance > 1) {
      return `${distance.toFixed(1)}km`
    }

    return `${(distance * 1000).toFixed(0)}m`
  }
</script>

<main class="h-full flex flex-col md:flex-row">
  <div id="map" class="relative flex-1 -mb-8 md:mb-0">
    <div class="absolute top-8 right-8 z-[9999]">
      <button on:click={centerLocation} class="bg-base-100 rounded">
        <img src={positionIcon} alt="Current position" />
      </button>
    </div>
  </div>
  <div
    class="relative {expanded
      ? 'h-[70vh]'
      : 'h-16'} md:h-full md:w-96 flex flex-col rounded-t-2xl z-[1100] bg-base-100 shadow-md transition-[height] duration-200 overflow-hidden"
  >
    <button
      class="transition px-4 pt-6 pb-4 flex justify-between active:bg-base-200 md:active:bg-base-100 md:cursor-default"
      on:click={() => toggleExpanded()}
    >
      <span>Team challenges</span>
      <span class="transition md:hidden {expanded ? 'rotate-0' : 'rotate-180'}"
        ><img src={downIcon} alt={expanded ? 'Close' : 'Open'} /></span
      >
    </button>
    <div class="flex shadow-md">
      <button
        class="text-sm transition p-2 flex-1 {tab === 'specific'
          ? 'border-accent font-bold'
          : 'border-base-300'} border-b-2 active:bg-base-200"
        on:click={() => (tab = 'specific')}>Specific locations</button
      >
      <button
        class="text-sm transition p-2 flex-1 {tab === 'anywhere'
          ? 'border-accent font-bold'
          : 'border-base-300'} border-b-2 active:bg-base-200"
        on:click={() => (tab = 'anywhere')}>Do anywhere</button
      >
    </div>
    <div class="overflow-y-scroll">
      <ul class="flex flex-col">
        {#if tab === 'specific'}
          {#each sortedLocationChallenges.map((id) => challenges[id]) as challenge}
            <li class="contents">
              <button
                class="transition border-b-2 border-base-300 active:bg-base-200 "
                on:click={() => focusMarker(challenge.id)}
              >
                <div
                  class="transition grid grid-cols-[auto_1fr] gap-y-1 gap-x-4 p-4 text-left {markerStates[
                    challenge.id
                  ] === 'locked'
                    ? 'opacity-60'
                    : 'opacity-100'}"
                >
                  <div>
                    {#if markerStates[challenge.id] === 'locked'}
                      <div class={lockedClass()}>
                        {challenge.name[0]}
                      </div>
                    {:else if markerStates[challenge.id] === 'unlocked'}
                      <div class={unlockedClass()}>
                        {challenge.name[0]}
                      </div>
                    {:else}
                      <div class={doneClass()}>
                        <img src={tickIcon} alt="Done" />
                      </div>
                    {/if}
                  </div>
                  <div
                    class={markerStates[challenge.id] === 'done'
                      ? 'line-through'
                      : ''}
                  >
                    {challenge.name}
                  </div>
                  <div class="text-xs text-center">
                    {getDistanceText(challenge)}
                  </div>
                  <div class="text-xs">
                    {challenge.location.name}
                    <span class="ml-2">
                      <img
                        src={cupIcon}
                        alt="Points"
                        class="inline h-4 w-4 align-bottom"
                      />
                      {challenge.points}
                    </span>
                  </div>
                </div>
              </button>
            </li>
          {/each}
        {:else}
          {#each sortedAnywhereChallenges.map((id) => challenges[id]) as challenge}
            <li class="contents">
              <button
                class="transition block border-b-2 border-base-300 p-4 text-left active:bg-base-200"
                on:click={() => focusMarker(challenge.id)}
              >
                <div
                  class={markerStates[challenge.id] === 'done'
                    ? 'line-through'
                    : ''}
                >
                  {challenge.name}
                </div>
                <div class="text-xs mt-1">
                  <img
                    src={cupIcon}
                    alt="Points"
                    class="inline h-4 w-4 align-bottom"
                  />
                  {challenge.points}
                </div></button
              >
            </li>
          {/each}
        {/if}
      </ul>
    </div>
  </div>

  {#if selectedChallenge !== undefined}
    <div
      class="fixed bottom-0 left-0 right-0 h-[70vh] bg-base-100 rounded-t-2xl z-[9999] flex flex-col"
      in:fly={{
        y: 1000,
        opacity: 1,
        duration: 200,
        easing: easingFns.cubicOut,
      }}
      out:fly={{
        y: 1000,
        opacity: 1,
        duration: 400,
        easing: easingFns.cubicIn,
      }}
    >
      <button
        class="px-3 py-4 flex w-full transition active:bg-base-200"
        on:click={unfocusMarker}><img src={leftIcon} alt="Back" /></button
      >
      <div class="overflow-y-scroll px-4">
        <h1
          class="text-lg flex items-center gap-x-2 {selectedState === 'done'
            ? 'line-through'
            : ''}"
        >
          {selectedChallenge.name}
          {#if selectedState === 'locked'}
            <img src={lockIcon} alt="locked" />
          {/if}
        </h1>
        <h2 class="text-xs mt-2 mb-6">
          {#if selectedChallenge.location}
            <a
              href={selectedChallenge.location.link}
              target="_blank"
              class="underline font-bold"
              rel="noreferrer">{selectedChallenge.location.name}</a
            >
          {:else}
            Anywhere
          {/if}
        </h2>
        <div class="prose text-base-content">
          {#if selectedState === 'locked'}
            <p>This is a locked challenge.</p>
            <p>
              Move closer to {selectedChallenge.location.name} to unlock the challenge
              details.
            </p>
          {:else}
            {@html marked(selectedChallenge.description, { renderer })}
          {/if}
        </div>
        <ul class="text-sm mt-6 flex flex-col gap-y-3">
          <li class="flex gap-x-2">
            <img src={cupIcon} alt="Points" />
            <span>
              Earn {selectedChallenge.points} point
            </span>
          </li>
          <li class="flex gap-x-2">
            <img src={cameraIcon} alt="Proof" />
            <span>Upload proof to your Slack channel</span>
          </li>
          {#if selectedChallenge.timeLocked}
            <li class="flex gap-x-2">
              <img src={clockIcon} alt="Time limit" />
              <span>Activity closes at <b>5.15pm</b></span>
            </li>
          {/if}
        </ul>

        <div class="text-sm" />
        {#if selectedChallenge.location}
          <a
            href={selectedChallenge.location.link}
            target="_blank"
            rel="noreferrer"
            class="bg-accent text-accent-content rounded-full p-4 text-md font-bold my-6 w-full block text-center"
            >Get directions</a
          >
        {/if}
        {#if selectedState !== 'locked'}
          <label class="text-sm flex justify-between items-center mt-6 mb-10">
            Nailed it, cross it off my list!
            <input
              on:change={() => markChallenge(selectedChallenge)}
              checked={selectedState === 'done'}
              class="toggle toggle-secondary toggle-lg"
              type="checkbox"
            />
          </label>
        {/if}
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
</main>
