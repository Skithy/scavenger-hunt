<script type="ts">
  import type { Challenge } from './challenges'
  import cupIcon from './assets/icons/cup.svg'
  import { markerDistances, markerStates } from './stores'
  import Icon from './Icon.svelte'

  export let challenges: Challenge[]
  export let focusMarker: (id: string) => void

  $: getDistanceText = (challenge: Challenge) => {
    const distance = $markerDistances[challenge.id]

    if (!distance) {
      return ''
    }

    if (distance > 1) {
      return `${distance.toFixed(1)}km`
    }

    return `${(distance * 1000).toFixed(0)}m`
  }
</script>

<div class="overflow-y-scroll">
  <ul class="flex flex-col">
    {#each challenges as challenge}
      <li class="contents">
        <button
          class="transition border-b-2 border-base-300 active:bg-base-200 "
          on:click={() => focusMarker(challenge.id)}
        >
          <div
            class="grid {challenge.location
              ? 'grid-cols-[auto_1fr]'
              : 'grid-cols-1'} gap-y-1 gap-x-4 p-4 text-left {$markerStates[
              challenge.id
            ] === 'locked'
              ? 'opacity-60'
              : 'opacity-100'}"
          >
            {#if challenge.location}
              <div>
                <Icon {challenge} />
              </div>
            {/if}
            <div
              class={$markerStates[challenge.id] === 'done' && 'line-through'}
            >
              {challenge.name}
            </div>
            {#if challenge.location}
              <div class="text-xs text-center">
                {getDistanceText(challenge)}
              </div>
            {/if}
            <div class="text-xs">
              {#if challenge.location}
                <span class="mr-2">
                  {challenge.location.name}
                </span>
              {/if}
              <img
                src={cupIcon}
                alt="Points"
                class="inline h-4 w-4 align-bottom"
              />
              {challenge.points}
            </div>
          </div>
        </button>
      </li>
    {/each}
  </ul>
</div>
