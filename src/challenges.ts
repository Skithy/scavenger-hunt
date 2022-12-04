export type Challenge = {
  id: string
  location?: {
    coords: [number, number]
    name: string
  }
  name: string
  description: string
  points: string
}

export const challenges: Record<string, Challenge> = {
  'shackle-up': {
    id: 'shackle-up',
    location: {
      coords: [-33.8570829503414, 151.20922473426515],
      name: 'The Rocks Square',
    },
    name: 'Shackle up!',
    description: '',
    points: '1',
  },
  'aussie-feast': {
    id: 'aussie-feast',
    location: {
      coords: [-33.85779725595838, 151.20880174912443],
      name: "Cadman's Cottage",
    },
    name: 'Feast on Aussie icons',
    description:
      'A spoon of Vegemite or eat a whole Weetbix without water? Your choice.',
    points: '1',
  },
  'wheres-my-stuff': {
    id: 'wheres-my-stuff',
    location: {
      coords: [-33.85779725595838, 151.20880174912443],
      name: 'Foundation Park',
    },
    name: "Where's my stuff?",
    description: '',
    points: '1',
  },
  'gimme the creeps': {
    id: 'gimme the creeps',
    location: {
      coords: [-33.85832079294985, 151.20808850678037],
      name: 'Foundation Park',
    },
    name: 'Gimme the creeps!',
    description: '',
    points: '1',
  },
  'its-getting-hot-in-here': {
    id: 'its-getting-hot-in-here',
    location: {
      coords: [-33.85969678809165, 151.20905456097734],
      name: 'Foundation Park',
    },
    name: "It's getting hot in herrrre",
    description: '',
    points: '1',
  },
  'enjoy-a-free-icecream': {
    id: 'enjoy-a-free-icecream',
    location: {
      coords: [-33.86002086226806, 151.20901566894543],
      name: 'Messina',
    },
    name: 'Enjoy a free ice cream',
    description: '',
    points: '1',
  },
  'shoot-for-the-stars': {
    id: 'shoot-for-the-stars',
    location: {
      coords: [-33.85913200650135, 151.20479104526223],
      name: 'Observatory Hill',
    },
    name: 'Shoot for the stars',
    description: '',
    points: '2',
  },
  'i-could-do-that-myself': {
    id: 'i-could-do-that-myself',
    location: {
      coords: [-33.86199113923606, 151.21229407502204],
      name: 'Museum of Contemporary Art',
    },
    name: 'I could do that myself',
    description: '',
    points: '1',
  },
  'thats-a-lot-of-flags': {
    id: 'thats-a-lot-of-flags',
    location: {
      coords: [-33.86126950448042, 151.2135332555823],
      name: 'Museum of Contemporary Art',
    },
    name: "That's a lot of flags",
    description: '',
    points: '1',
  },
  'selfie-eye-us': {
    id: 'selfie-eye-us',
    location: {
      coords: [-33.86126950448042, 151.2135332555823],
      name: 'Museum of Contemporary Art',
    },
    name: 'Selfie-eye-us',
    description: '',
    points: '1',
  },
  'faulty-towers': {
    id: 'faulty-towers',
    location: {
      coords: [-33.86126950448042, 151.2135332555823],
      name: 'Location TBC',
    },
    name: 'Faulty towers',
    description: '',
    points: '1',
  },
  'year-of-the-tiger': {
    id: 'year-of-the-tiger',
    location: {
      coords: [-33.86126950448042, 151.2135332555823],
      name: 'Location TBC',
    },
    name: 'Year of the Tiger',
    description: '',
    points: '1',
  },
  'smooth-criminal': {
    id: 'smooth-criminal',
    location: {
      coords: [-33.86126950448042, 151.2135332555823],
      name: 'Justice and Police Museum',
    },
    name: 'Smooth criminal',
    description: '',
    points: '1',
  },
  'and-the-grammy-goes-to': {
    id: 'and-the-grammy-goes-to',
    location: {
      coords: [-33.86126950448042, 151.2135332555823],
      name: 'Memory is Creation without End',
    },
    name: 'And the Grammy goes to...',
    description: '',
    points: '3',
  },
  'susannahs-place': {
    id: 'susannahs-place',
    location: {
      coords: [-33.86126950448042, 151.2135332555823],
      name: "Susannah's Place",
    },
    name: '3,2,1...',
    description: '',
    points: '3',
  },
  'steal-some-points': {
    id: 'steal-some-points',
    name: 'Steal some points mwahahahah!',
    description: '',
    points: 'Many',
  },
  'take-a-selfie': {
    id: 'take-a-selfie',
    name: 'Take a selfie with a street performer',
    description: '',
    points: '1',
  },
  photobomb: {
    id: 'photobomb',
    name: 'Photobomb a tourist pic',
    description: '',
    points: '1',
  },
  'little-boat-big-boat': {
    id: 'little-boat-big-boat',
    name: 'Team selfie with a little boat, big boat',
    description: '',
    points: '2',
  },
  'best-pic': {
    id: 'best-pic',
    name: 'Take the best ever scavvy hunt pic',
    description: '',
    points: '2',
  },
  'movie-scene': {
    id: 'movie-scene',
    name: 'Recreate a famous movie scene',
    description: '',
    points: '3',
  },
}

export const locationChallenges: string[] = [
  'shackle-up',
  'aussie-feast',
  'wheres-my-stuff',
  'gimme the creeps',
  'its-getting-hot-in-here',
  'enjoy-a-free-icecream',
  'shoot-for-the-stars',
  'i-could-do-that-myself',
  'thats-a-lot-of-flags',
  'selfie-eye-us',
  'faulty-towers',
  'year-of-the-tiger',
  'smooth-criminal',
  'and-the-grammy-goes-to',
  'susannahs-place',
]

export const anywhereChallenges: string[] = [
  'steal-some-points',
  'take-a-selfie',
  'photobomb',
  'little-boat-big-boat',
  'best-pic',
  'movie-scene',
]
