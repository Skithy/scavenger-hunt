<script type="ts">
  import type { Challenge } from './challenges'
  import { doneClass, lockedClass, unlockedClass } from './icons'
  import { markerStates } from './stores'
  import tickIcon from './assets/icons/tick.svg'

  export let challenge: Challenge
</script>

{#if $markerStates[challenge.id] === 'locked'}
  <div class={lockedClass}>
    {challenge.name[0]}
  </div>
{:else if $markerStates[challenge.id] === 'unlocked'}
  <div class={unlockedClass}>
    {challenge.name[0]}
  </div>
{:else}
  <div class={doneClass}>
    <img src={tickIcon} alt="Done" />
  </div>
{/if}
