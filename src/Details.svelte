<script type="ts">
  import { fly } from 'svelte/transition'
  import { cubicIn, cubicOut } from 'svelte/easing'
  import lockIcon from './assets/icons/lock.svg'
  import leftIcon from './assets/icons/left.svg'
  import cameraIcon from './assets/icons/camera.svg'
  import cupIcon from './assets/icons/cup.svg'
  import clockIcon from './assets/icons/clock.svg'
  import chatIcon from './assets/icons/chat.svg'
  import videoIcon from './assets/icons/video.svg'
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
          {#if challenge.points}
            Earn {challenge.points} point{challenge.points > 1 ? 's' : ''}
          {:else}
            Earn 1 point per photo
          {/if}
        </span>
      </li>
      {#if challenge.scoring === 'photo'}
        <li class="flex gap-x-2">
          <img src={cameraIcon} alt="Proof" />
          <span>Upload photos to your Slack channel</span>
        </li>
      {:else if challenge.scoring === 'video'}
        <li class="flex gap-x-2">
          <img src={videoIcon} alt="Video" />
          <span>Upload video to your Slack channel</span>
        </li>
      {:else if challenge.scoring === 'answer'}
        <li class="flex gap-x-2">
          <img src={chatIcon} alt="Time limit" />
          <span>Share answer in your Slack channel</span>
        </li>
      {:else if challenge.scoring === 'manned'}
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
        Nailed it. Cross it off my list!
        <input
          on:change={() => completeChallenge()}
          checked={state === 'done'}
          class="toggle toggle-secondary toggle-lg"
          type="checkbox"
        />
      </label>
    {/if}
    {#if challenge.location}
      <div class="overflow-hidden rounded-lg pb-4">
        <img
          class="w-full"
          src={challenge.location.photo}
          alt={challenge.location.name}
        />
      </div>
    {/if}
  </div>
</div>
