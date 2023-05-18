export type State = 'locked' | 'unlocked' | 'done'
export const challengeOrder: State[] = ['unlocked', 'locked', 'done']

export type Challenge = {
  id: string
  location: {
    coords: [number, number]
    name: string
    link: string
    photo: string
  }
  name: string
  description: string
  link?: string
  cinewavLink?: string
}

export const challenges: Record<string, Challenge> = {
  sonder: {
    id: 'sonder',
    location: {
      coords: [-33.861453, 151.211636],
      name: 'Circular Quay and the Rocks',
      link: 'https://goo.gl/maps/P74xU4KYry3ACrUG9',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/2023-02/sonder-1900x900.jpg?itok=0CPGGU3G',
    },
    name: 'Sonder',
    description: `
Named after the profound realisation that every stranger you see has a rich, complex inner life, *Sonder* celebrates the colourful worlds within us all and what happens when they interconnect.

A set of beacons made of LED tubes reach up to the Circular Quay station's rooftop, their lines curving to make a transfixing ceiling of light above our heads.`,
    link: 'https://www.vividsydney.com/event/light/sonder',
  },
  insideOut: {
    id: 'insideOut',
    location: {
      coords: [-33.862196, 151.210853],
      name: 'Customs House',
      link: 'https://goo.gl/maps/TDoDPzV9vPvsrTBp8',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/2023-03/inside-out-1900x900_0.jpg?itok=RBPKeR2q',
    },
    name: 'Inside Out',
    description: `
A celebration of Australian interior design featuring beautiful hand-drawn wallpaper and fabrics by Florence Broadhurst projected onto the façade of Customs House – bringing the inside, out!
`,
    link: 'https://www.vividsydney.com/event/light/inside-out',
    cinewavLink: 'https://cinewav.page.link/nxqf',
  },
  losting: {
    id: 'losting',
    location: {
      coords: [-33.86127, 151.209162],
      name: 'Circular Quay and the Rocks',
      link: 'https://goo.gl/maps/nmUBKXuUGryQ4mXR8',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/events/1yRlD_0nnhmzCvinwI2s_rgKPese0S20i.jpeg?itok=M8ajdDm9',
    },
    name: 'Losting',
    description: `
'Losting' is an invented word, describing that deliberate act of losing yourself in nature without any bearings or ties to our tech, in order to feel yourself anew.


A jungle contained in a cube of double-mirrors, Losting is a portal into a strange, ever-shifting world as its mirrors oscillate between transparent and reflective, illuminated and dark.


Lose yourself in this otherworldly landscape, as it contracts, expands and changes constantly in front of our own eyes. Confusing and mesmerising in equal measure, Losting has no ending and no beginning, a mirage in the middle of Vivid Sydney.


Are you ready to be lost - and, more pivotally, to see what you might find?`,
    link: 'https://www.vividsydney.com/event/light/losting',
  },
  barerarerungar: {
    id: 'barerarerungar',
    location: {
      coords: [-33.859945, 151.209023],
      name: 'Museum of Contemporary Art',
      link: 'https://goo.gl/maps/cUNW3X4rCwjy13fq6',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/events/1Y2JB675qgHnPni02cGkudhqPb3sx84-Z_0.png?itok=9_Dy61wo',
    },
    name: 'Barerarerungar',
    description: `
Barerarerungar means 'Country' in Boonwurrung, a language from Kulin Nation, where Maree Clarke lives. It draws from the artist's three decades of reclaiming and resurfacing south-east First Nations art and cultural practices. From the MCA façade, overlooking Sydney Harbour, she features river reeds, a symbol representing safe travels and friendship.


This multi-disciplinary Yorta Yorta/Wamba Wamba/Mutti Mutti/Boonwurrung artist is collaborating with building projection specialist The Electric Canvas to transform the façade of the Museum of Contemporary Art Australia. River reeds stand tall, referencing her famed oversized River Reed necklaces – a communal practice that often sees Maree congregate with family to collect, soak, dye and dry the raw materials from their natural environment. This impressive, stunning projection pays tribute to practices on Country, while also creating a space for communal reflection at the heart of Vivid Sydney.`,
    link: 'https://www.vividsydney.com/event/light/barerarerungar',
    cinewavLink: 'https://cinewav.page.link/EK5c',
  },
  sails: {
    id: 'sails',
    location: {
      coords: [-33.85668636783084, 151.21533961354592],
      name: 'Sydney Opera House',
      link: 'https://goo.gl/maps/PjiajsvYG1RkBK5H9',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/2023-03/Vivid_SOH_Sydney_Sun_1900x900.jpg?itok=95rHw3A2',
    },
    name: 'Lighting of the Sails: Life Enlivened',
    description: `
The late Australian artist John Olsen's vibrant paintings of life and energy within the natural world illuminates the Sydney Opera House’s sails in 2023 as part of Vivid Sydney.


Distilling the essence of Olsen's esteemed career, spanning over sixty years, the animated artwork Lighting of the Sails: Life Enlivened spotlights Olsen’s enduring interest and fascination with Australian nature and landscape. Through images selected by curator Dr. Deborah Hart and animated by creative technologists Curiious, Life Enlivened (2023) celebrates the propulsive power of Olsen's painterly brush to envision the natural world anew.`,
    link: 'https://www.vividsydney.com/event/light/lighting-of-the-sails-life-enlivened-john-olsen',
  },
  biotechture: {
    id: 'biotechture',
    location: {
      coords: [-33.8575025, 151.2094602],
      name: 'ASN Clock Tower',
      link: 'https://goo.gl/maps/Zw1uizR8SKEna45t6',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/events/1pzdk4xP_L-4VNvDoynfBgVosJMwFf08B.jpeg?itok=UwP3cXpW',
    },
    name: 'Biotechture',
    description: `
Buildings aren't so different from bodies: humans are also architectural wonders, having evolved to improve over millennia. Our entire ecosystem, too, is filled with mathematical marvels and smart design - the otherworldly Biotechture imagines what it would mean if our human-made structures were living and breathing. Peeling back the ASN Clock Tower's façade, Biotechture is an otherworldly view into the arteries, bones and all behind the building. It's also a reminder of the beautiful architecture that makes up both our city and the natural world.`,
    link: 'https://www.vividsydney.com/event/light/biotechture',
    cinewavLink: 'https://cinewav.page.link/BwX3',
  },
  cityGazing: {
    id: 'cityGazing',
    location: {
      coords: [-33.8560556, 151.2080278],
      name: 'Dawes Point Park',
      link: 'https://goo.gl/maps/4jgXYwdAaHy7vKSY9',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/2023-02/City-Gazing-desk.jpg?itok=kpqOOpB5',
    },
    name: 'City Gazing Sydney',
    description: `
With their ongoing global City Gazing series, VOUW recreates a view that very few humans would normally see with their own eyes: the Earth from space.


At night, astronauts see cities as glowing arteries, the shining outline inspiring both awe at humanity's might and our meekness.`,
    link: 'https://www.vividsydney.com/event/light/city-gazing-sydney',
  },
}
