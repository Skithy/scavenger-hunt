<script type="ts">
  import { fly } from 'svelte/transition'
  import { cubicIn, cubicOut } from 'svelte/easing'
  import leftIcon from './assets/icons/left.svg'
  import upRightIcon from './assets/icons/up-right.svg'
  import cinewav from './assets/photos/cinewav.png'

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
  <div class="px-4 overflow-auto">
    <h1 class="text-lg mb-4">
      Vivid Light Walk
      <a
        href="https://www.vividsydney.com/itinerary/the-ultimate-8km-vivid-sydney-light-walk"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={upRightIcon}
          alt="Read more about the Vivid Light Walk"
          height="24"
          width="24"
          class="inline-block"
        />
      </a>
    </h1>

    <div class="prose text-base-content">
      <p>
        This year’s Vivid Light Walk attractions include light installations,
        3D-mapped projections, venue takeovers and jaw-dropping spectacles.
      </p>
      <p>
        Use this map to find your way to attractions in Circular Quay and The
        Rocks.
      </p>
    </div>

    <h1 class="text-lg mb-4 mt-6">
      Cinewav
      <a
        href="https://www.vividsydney.com/how-to-use-cinewav"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={upRightIcon}
          alt="Read more about Cinewav"
          height="24"
          width="24"
          class="inline-block"
        />
      </a>
    </h1>

    <div class="prose text-base-content">
      <p>
        Put on some earphones or headphones and enjoy immersive HD audio
        perfectly in-sync with a public show.
      </p>
      <p>
        We recommend you do this when you’re connected to Wifi to save on your
        mobile data.
      </p>
    </div>
    <div class="flex gap-x-2 mt-6 items-center">
      <div>
        <img src={cinewav} alt="Cinewav app" height="40" width="40" />
      </div>
      <div>
        <div>Listen with Cinewav</div>
        <a
          href="http://onelink.to/h875sa"
          target="_blank"
          rel="noreferrer"
          class="text-primary text-sm">Download app</a
        >
      </div>
    </div>
  </div>
</div>
