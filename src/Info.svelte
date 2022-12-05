<script type="ts">
  import { fly } from 'svelte/transition'
  import { cubicIn, cubicOut } from 'svelte/easing'
  import leftIcon from './assets/icons/left.svg'

  export let onClose: () => void
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
  <div class="px-4">
    <h1 class="text-lg mb-4">How to play</h1>

    <div class="prose text-base-content">
      <p>
        You have one hour to finish as many challenges as you can – you can
        choose how many you’d like to do and in which order, it’s up to you!
      </p>
      <p>
        Remember, the team with the most points at the end claims glory and a
        schweet prize.
      </p>
    </div>

    <h1 class="text-lg mb-4 mt-6">Locked challenges</h1>

    <div class="prose text-base-content">
      <p>
        Make your way towards the location and the details will be revealed when
        you’re close by.
      </p>
    </div>
  </div>
</div>
