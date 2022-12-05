import Leaflet from 'leaflet'
import tickIcon from './assets/icons/tick.svg'
import type { Challenge } from './challenges'

const activeClass = 'ring-info ring-4 !z-[300]'

const markerClass =
  '!h-8 !w-8 rounded-full !flex items-center justify-center !font-bold !text-md shadow-md'

export const lockedClass = `${markerClass} bg-secondary text-secondary-content`
export const lockedIcon = (challenge: Challenge, active = false) =>
  Leaflet.divIcon({
    className: `opacity-80 ${lockedClass} ${active && activeClass}`,
    html: challenge.name[0],
  })

export const unlockedClass = `${markerClass} bg-accent text-accent-content`
export const unlockedIcon = (challenge: Challenge, active = false) =>
  Leaflet.divIcon({
    className: `opacity-90 ${unlockedClass} ${active && activeClass}`,
    html: challenge.name[0],
  })

export const doneClass = `${markerClass} bg-success text-success-content`
export const doneIcon = (active = false) =>
  Leaflet.divIcon({
    className: `opacity-90 ${doneClass} ${active && activeClass}`,
    html: `<img src=${tickIcon} alt="Done" />`,
  })

const hereClass = '!h-4 !w-4 rounded-full shadow-md border-2 border-white'

export const hereIcon = Leaflet.divIcon({
  className: `bg-info ${hereClass}`,
})

export const hereYellowIcon = Leaflet.divIcon({
  className: `bg-warning ${hereClass}`,
})

export const hereLowIcon = Leaflet.divIcon({
  className: `bg-critical ${hereClass}`,
})
