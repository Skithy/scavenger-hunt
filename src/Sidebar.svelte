<script type="ts">
  import downIcon from './assets/icons/down.svg'
  import { sortBy } from 'lodash'
  import { challengeOrder, challenges } from './data/challenges'
  import { markerStates } from './data/stores'
  import List from './List.svelte'

  export let expanded: boolean
  export let toggleExpanded: () => void
  export let focusMarker: (id: string) => void

  $: sortedLocationChallenges = sortBy(Object.keys(challenges), (id) =>
    challengeOrder.indexOf($markerStates[id])
  ).map((id) => challenges[id])
</script>

<div
  class="relative {expanded
    ? 'h-[70vh]'
    : 'h-16'} md:h-full md:w-96 flex flex-col rounded-t-2xl z-[1100] bg-base-100 shadow-md transition-[height] duration-200 overflow-hidden"
>
  <button
    class="transition px-4 pt-6 pb-4 flex justify-between active:bg-base-200 md:active:bg-base-100 md:cursor-default border-b-2 border-base-300"
    on:click={() => toggleExpanded()}
  >
    <span>2023 Vivid Light Walk</span>
    <span class="transition md:hidden {expanded ? 'rotate-0' : 'rotate-180'}"
      ><img src={downIcon} alt={expanded ? 'Close' : 'Open'} /></span
    >
  </button>
  <List challenges={sortedLocationChallenges} {focusMarker} />
</div>
