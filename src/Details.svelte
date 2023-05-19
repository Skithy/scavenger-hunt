<script type="ts">
  import { fly } from 'svelte/transition'
  import { cubicIn, cubicOut } from 'svelte/easing'
  import lockIcon from './assets/icons/lock.svg'
  import leftIcon from './assets/icons/left.svg'
  import topRightIcon from './assets/icons/up-right.svg'
  import locationIcon from './assets/icons/location.svg'
  import cinewav from './assets/photos/cinewav.png'
  import { renderer } from './utils/markdown'
  import { challenges } from './data/challenges'
  import { marked } from 'marked'
  import { markerStates } from './data/stores'

  export let onClose: () => void
  export let completeChallenge: () => void
  export let challengeId: string

  $: state = $markerStates[challengeId]
  $: challenge = challenges[challengeId]
</script>

<div
  class="fixed bottom-0 left-0 md:left-6 md:max-w-lg h-[70vh] bg-base-100 rounded-t-2xl z-[9999] flex flex-col md:border-4 border-base-300"
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
  <div class="overflow-y-auto px-4">
    <h1
      class="text-lg flex items-center gap-x-2 {state === 'done' &&
        'line-through'}"
    >
      {challenge.name}
      {#if state === 'locked'}
        <img src={lockIcon} alt="locked" />
      {/if}
    </h1>
    <h2 class="text-sm mt-2 mb-6">
      {#if challenge.location}
        <a
          href={challenge.location.link}
          target="_blank"
          class="text-primary inline-flex items-center gap-x-1"
          rel="noreferrer"
          ><img
            src={locationIcon}
            alt="Location"
            height="16"
            width="16"
          />{challenge.location.name}</a
        >
      {:else}
        Anywhere
      {/if}
    </h2>
    <div class="-mx-4 mb-6">
      <img
        class="w-full"
        src={challenge.location.photo}
        alt={challenge.location.name}
      />
    </div>
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
    <a
      href={challenge.link}
      target="_blank"
      rel="noreferrer"
      class="flex items-center gap-x-1 mt-6 text-sm text-primary"
      ><img src={topRightIcon} alt="Location" height="16" width="16" />More
      details</a
    >
    {#if challenge.cinewavLink}
      <div
        class="border-y-2 py-6 border-base-300 mt-6 mb-8 flex gap-x-2 items-center"
      >
        <div>
          <img src={cinewav} alt="Cinewav app" height="40" width="40" />
        </div>
        <div>
          <div>Listen with Cinewav</div>
          <a
            href={challenge.cinewavLink}
            target="_blank"
            rel="noreferrer"
            class="text-primary text-sm">Download audio ticket</a
          >
        </div>
      </div>
    {/if}

    <a
      href={challenge.location.link}
      target="_blank"
      rel="noreferrer"
      class="bg-primary text-primary-content rounded-full p-4 text-base font-bold my-6 w-full block text-center"
      >Get directions</a
    >
    {#if state !== 'locked'}
      <label class="text-sm flex justify-between items-center my-6">
        Cross it off my list!
        <input
          on:change={() => completeChallenge()}
          checked={state === 'done'}
          class="toggle toggle-primary toggle-lg"
          type="checkbox"
        />
      </label>
    {/if}
  </div>
</div>
