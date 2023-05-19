<script type="ts">
  import { fly } from 'svelte/transition'
  import { cubicIn, cubicOut } from 'svelte/easing'
  import leftIcon from './assets/icons/left.svg'
  import upRightIcon from './assets/icons/up-right.svg'

  export let onClose: () => void
</script>

<div
  class="fixed bottom-0 left-0 md:left-6 md:max-w-lg md:border-4 border-base-300 h-[70vh] bg-base-100 rounded-t-2xl z-[9999] flex flex-col"
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
        Use our map to find your way to attractions in Circular Quay and The
        Rocks.
      </p>
    </div>

    <h1 class="text-lg mb-4 mt-6">Cinewav</h1>

    <div class="prose text-base-content">
      <p>
        Discover a deeper experience at Vivid Sydney - put on some earphones or
        headphones and enjoy immersive HD audio as you explore the Light Walk
        with Cinewav.
      </p>
      <p>
        Cinewav is patented world-first technology that allows users to listen
        to an HD-quality soundtrack on their smartphone perfectly in-sync with a
        public show.
      </p>
    </div>
    <a
      class="flex gap-x-1 text-primary mt-4 items-center"
      href="https://www.vividsydney.com/how-to-use-cinewav"
    >
      How to use Cinewav
      <img src={upRightIcon} alt="Cinewav app" height="16" width="16" />
    </a>
  </div>
</div>
