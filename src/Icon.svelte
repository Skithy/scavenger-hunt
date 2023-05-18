<script type="ts">
  import { challenges, type Challenge } from './data/challenges'
  import { doneClass, lockedClass, unlockedClass } from './data/icons'
  import { markerStates } from './data/stores'
  import tickIcon from './assets/icons/tick.svg'

  export let challenge: Challenge
</script>

{#if $markerStates[challenge.id] === 'locked'}
  <div class={lockedClass}>
    {challenge.name[0]}
  </div>
{:else if $markerStates[challenge.id] === 'unlocked'}
  <div class={unlockedClass}>
    {(
      Object.values(challenges).findIndex((c) => c.id === challenge.id) + 1
    ).toString()}
  </div>
{:else}
  <div class={doneClass}>
    <img src={tickIcon} alt="Done" />
  </div>
{/if}
