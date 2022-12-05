import { writable } from 'svelte/store'
import { challenges, type State } from './challenges'
import type { Coord } from './getDistance'

export const currentCoord = writable<Coord | undefined>(undefined)
export const currentAccuracy = writable<number | undefined>(undefined)

export const markerStates = writable<Record<string, State>>(
  Object.entries(challenges).reduce((total, [id, challenge]) => {
    total[id] = challenge.location ? 'locked' : 'unlocked'
    return total
  }, {})
)

export const markerDistances = writable<Record<string, number>>(
  Object.keys(challenges).reduce((total, id) => {
    total[id] = 0
    return total
  }, {})
)
