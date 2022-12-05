<script type="ts">
  import downIcon from './assets/icons/down.svg'
  import { sortBy } from 'lodash'
  import {
    anywhereChallenges,
    challengeOrder,
    challenges,
    locationChallenges,
  } from './challenges'
  import { markerStates } from './stores'
  import List from './List.svelte'

  export let expanded: boolean
  export let toggleExpanded: () => void
  export let focusMarker: (id: string) => void

  $: sortedLocationChallenges = sortBy(locationChallenges, (id) =>
    challengeOrder.indexOf($markerStates[id])
  ).map((id) => challenges[id])
  $: sortedAnywhereChallenges = sortBy(anywhereChallenges, (id) =>
    challengeOrder.indexOf($markerStates[id])
  ).map((id) => challenges[id])

  let tab: 'specific' | 'anywhere' = 'specific'
</script>

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
  {#if tab === 'specific'}
    <List challenges={sortedLocationChallenges} {focusMarker} />
  {:else}
    <List challenges={sortedAnywhereChallenges} {focusMarker} />
  {/if}
</div>
