<script type="ts">
  import { fly } from 'svelte/transition'
  import { cubicIn, cubicOut } from 'svelte/easing'
  import lockIcon from './assets/icons/lock.svg'
  import leftIcon from './assets/icons/left.svg'
  import cameraIcon from './assets/icons/camera.svg'
  import cupIcon from './assets/icons/cup.svg'
  import clockIcon from './assets/icons/clock.svg'
  import type { State } from './markers'
  import { renderer } from './markdown'
  import type { Challenge } from './challenges'
  import { marked } from 'marked'

  export let onClose: () => void
  export let completeChallenge: () => void
  export let state: State
  export let challenge: Challenge
</script>

<div
  class="fixed bottom-0 left-0 right-0 h-[70vh] bg-base-100 rounded-t-2xl z-[9999] flex flex-col"
  in:fly={{
    y: 1000,
    opacity: 1,
    duration: 200,
    easing: cubicOut,
  }}
  out:fly={{
    y: 1000,
    opacity: 1,
    duration: 300,
    easing: cubicIn,
  }}
>
  <button
    class="px-3 py-4 flex w-full transition active:bg-base-200"
    on:click={onClose}><img src={leftIcon} alt="Back" /></button
  >
  <div class="overflow-y-scroll px-4">
    <h1
      class="text-lg flex items-center gap-x-2 {state === 'done' &&
        'line-through'}"
    >
      {challenge.name}
      {#if state === 'locked'}
        <img src={lockIcon} alt="locked" />
      {/if}
    </h1>
    <h2 class="text-xs mt-2 mb-6">
      {#if challenge.location}
        <a
          href={challenge.location.link}
          target="_blank"
          class="underline font-bold"
          rel="noreferrer">{challenge.location.name}</a
        >
      {:else}
        Anywhere
      {/if}
    </h2>
    <div class="prose text-base-content">
      {#if state === 'locked'}
        <p>This is a locked challenge.</p>
        <p>
          Move closer to {challenge.location.name} to unlock the challenge details.
        </p>
      {:else}
        {@html marked(challenge.description, { renderer })}
      {/if}
    </div>
    <ul class="text-sm mt-6 flex flex-col gap-y-3">
      <li class="flex gap-x-2">
        <img src={cupIcon} alt="Points" />
        <span>
          Earn {challenge.points} point
        </span>
      </li>
      <li class="flex gap-x-2">
        <img src={cameraIcon} alt="Proof" />
        <span>Upload proof to your Slack channel</span>
      </li>
      {#if challenge.timeLocked}
        <li class="flex gap-x-2">
          <img src={clockIcon} alt="Time limit" />
          <span>Activity closes at <b>5.15pm</b></span>
        </li>
      {/if}
    </ul>

    <div class="text-sm" />
    {#if challenge.location}
      <a
        href={challenge.location.link}
        target="_blank"
        rel="noreferrer"
        class="bg-accent text-accent-content rounded-full p-4 text-md font-bold my-6 w-full block text-center"
        >Get directions</a
      >
    {/if}
    {#if state !== 'locked'}
      <label class="text-sm flex justify-between items-center mt-6 mb-10">
        Nailed it, cross it off my list!
        <input
          on:change={() => completeChallenge()}
          checked={state === 'done'}
          class="toggle toggle-secondary toggle-lg"
          type="checkbox"
        />
      </label>
    {/if}
    {#if challenge.photo}
      <div class="overflow-hidden rounded-lg pb-4">
        <img
          class="w-full"
          src={challenge.photo}
          alt={challenge.location.name}
        />
      </div>
    {/if}
  </div>
</div>
