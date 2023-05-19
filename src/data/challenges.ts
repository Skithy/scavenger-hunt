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
      name: 'Eastern Circular Quay',
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
      name: 'Alfred Street',
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
  dandelion: {
    id: 'dandelion',
    location: {
      coords: [-33.855523, 151.210472],
      name: 'Hickson Road Reserve',
      link: 'https://goo.gl/maps/t2mdbsEjbBDogdoH6',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/events/1drKcpEVBO2ZFhpRytei8FwfntTWl_nVO.jpeg?itok=eLIr3J_n',
    },
    name: 'Dandelion',
    description: `
Make a wish, take a deep breath, and come watch Dandelion blow!

This 4,000kg steel recreation of the flower's wispy calyx, also known as a 'pappus', may appear less fragile than the common dandelion, but the pappus is much stronger than it looks. Not only has this flower found a home across much of the globe, but it's able to retain roughly 100 times its own weight in water. And don't forget, folklore says making a wish while blowing it apart will make sure it comes true.

A testament to the flower's strength and beauty, this installation moves continually in a dazzling dance. Take in its beauty from afar, or head into the pappus dome to be in the thick of it, with hand sensors to send your own light-shifting winds across the flower.`,
    link: 'https://www.vividsydney.com/event/light/dandelion',
  },
  futureNatives: {
    id: 'futureNatives',
    location: {
      coords: [-33.85389744552464, 151.20869845270465],
      name: 'Sydney CBD and Surrounds',
      link: 'https://goo.gl/maps/bbPL3JQ1xaMprP5Z7',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/2023-03/FN-1900x900.jpg?itok=rIKpRyCm',
    },
    name: 'Future Natives',
    description: `
Follow the Vivid Sydney flock along the Light Walk to spot stylised light sculptures resembling our native birds. This 'birdwatching' adventure highlights the diversity and survival skills of our feathered friends whose habitats and existence are encroached upon by our sprawling cityscapes, increasing populations and lifestyles.

Each 'bird' bears the colours of one of our most vibrant species, from the Rainbow Lorikeet to the Sulphur-crested Cockatoo. Their shape is a geometric abstraction of a bird in flight, inspired by the post-1960s resurgence of futurism, where artists imagined what the bright, bold and tech-driven future may look like.

Returning from Vivid Sydney 2022 to connect the Light Walk from Circular Quay to Central Station, Future Natives is a scavenger hunt of 13 of our most colourful native birds. Will you spot the likes of the Crimson Rosella, Sacred Kingfisher, Galah, Yellow-tailed Black Cockatoo, Superb Parrot and the Major Mitchell’s Cockatoo, among others?`,
    link: 'https://www.vividsydney.com/event/light/future-natives',
  },
  monad: {
    id: 'monad',
    location: {
      coords: [-33.854975, 151.207465],
      name: 'Walsh Bay',
      link: 'https://goo.gl/maps/ow5WtHo1mucjbyWf7',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/events/12X4EQ-WaS32Pqs8VXwdGpIseWi1zZgE3.jpeg?itok=siKnyR84',
    },
    name: 'Monad',
    description: `
For aeons, the circle has been revered as a symbol of endless life and equilibrium. Pythagoras declared it a perfect shape and a symbol of 'Monad' - a divine, all-encompassing force.

Projected onto a mist of water from a series of jets, Monad floats as a 3D display mid-air. These awe-inspiring technics help conjure a sense of wonder at nature and the ongoing rhythm of the universe.

As a philosophical and concept, Monad has been widely influential – it was adapted from Greek philosophy by some of the great thinkers of the modern era and had held multiple meanings for humanity for centuries. This work brings the concept into 2023, creating a moment of stillness and reflection for us to ponder the bigger picture we’re all part of.`,
    link: 'https://www.vividsydney.com/event/light/monad',
  },
  bumpSway: {
    id: 'bumpSway',
    location: {
      coords: [-33.855553, 151.206689],
      name: 'Walsh Bay',
      link: 'https://goo.gl/maps/ow5WtHo1mucjbyWf7',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/events/1m50e1CVZaYZft8Aq16StC1U33gnKkg0h.jpeg?itok=Id-L0h2F',
    },
    name: 'Bump and Sway',
    description: `
Eternally in motion, the waters of Walsh Bay are constantly pushed and pulled into different sized ripples and swell. This installation draws our attention to the subtle beauty of the ever-changing shapes and reflections of the water. Using motion sensors attached to twelve of the floating poles between piers 3 and 4, this work translates these movements into a dance of light on the water.

Facing each other from opposite sides of the piers, the two groups of six poles play a game of call-and-response with light, as waves move from one group to the other. Passing watercraft and the natural elements create an unpredictable show that beckons us to look closer at everyday nature and its overlooked movements.`,
    link: 'https://www.vividsydney.com/event/light/bump-and-sway',
  },
  ghosts: {
    id: 'ghosts',
    location: {
      coords: [-33.856244, 151.205824],
      name: 'Walsh Bay',
      link: 'https://goo.gl/maps/ow5WtHo1mucjbyWf7',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/2023-02/ghosts-1900x900.jpg?itok=wiX3XA17',
    },
    name: 'Ghosts',
    description: `
In Japan, origami cranes are given to ill family members and friends to wish them well, referencing an old saying that the birds live for up to 1,000 years.

A symbol of health and vitality for those who need it, the cranes of Ghosts fly high and dart in and out of the breezeway between piers at Walsh Bay.

Using traditional paper folding techniques, these cranes are lanterns made from folded natural recycled polypropylene.`,
    link: 'https://www.vividsydney.com/event/light/ghosts',
  },
  spirograph: {
    id: 'spirograph',
    location: {
      coords: [-33.856525, 151.204027],
      name: 'Walsh Bay',
      link: 'https://goo.gl/maps/ow5WtHo1mucjbyWf7',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/2023-05/spirograph-1900x900.jpg?itok=rMFO5zFB',
    },
    name: 'Spirograph',
    description: `
Sydney's newest fountain doesn't feature a drop of water – instead, light flows in an impressive illusion. Don't worry about any spray in the wind, either, as Spirograph's motion sensors will transform that energy into speed and new colours.

Inspired by the elegant patterns formed when using a spirograph ruler, this artwork treats each 'droplet' as a precious part in a much larger picture. Spirograph is the latest water fountain to offer a moment of respite in our city, a splash of restorative nature.`,
    link: 'https://www.vividsydney.com/event/light/spirograph',
  },
  nightWhisper: {
    id: 'nightWhisper',
    location: {
      coords: [-33.856077, 151.201679],
      name: 'Barangaroo Reserve',
      link: 'https://goo.gl/maps/yBejDWHZ797hBEiz8',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/2023-03/Nightwhisper%201900%20x%20900%20pixels.jpg?itok=hKAxZDqo',
    },
    name: 'Night Whisper',
    description: `We're not that dissimilar to moths: as Vivid Sydney shows, humans are also innately drawn toward light for warmth and a chance to come together. This silhouette of an oversized lightbulb invites us in, as does the fluttering inside, thanks to an eclipse of Australia's endangered Bogong Moths inside the bulb. Stand and watch as their wings cast shadows as they move, creating an enticing yet calming dance of light.`,
    link: 'https://www.vividsydney.com/event/light/night-whisper',
  },
  nightWalkers: {
    id: 'nightWalkers',
    location: {
      coords: [-33.855911, 151.201157],
      name: 'Barangaroo Reserve',
      link: 'https://goo.gl/maps/yBejDWHZ797hBEiz8',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/2023-02/night-walkers-1900x900.jpg?itok=PUQ2uM3o',
    },
    name: 'Night Walkers',
    description: `
If you've never spent time up-close with a frog, you might not appreciate how beautiful their skin patterns can be. This intricate camouflage can, in some species, even change colour and texture!

Night Walkers supersizes these wondrous amphibians to highlight not just their beauty but also their ecological importance. These unique creatures – considered the 'walker' between the two worlds of water and earth in shamanic cultures - are considered bellwethers by environmentalists, as a decline in their population can signal serious environmental damage.

Each of these giant frogs represent an endangered species; head to their nearby panels to hear their individual frog songs. Will you be able to find all eight placed across the Light Walk? It's a scavenger hunt – be sure to keep an eye (and ear) out for them at Dawes Point Reserve, Barangaroo Headland, Darling Quarter and Tumbalong Boulevard!`,
    link: 'https://www.vividsydney.com/event/light/night-walkers',
  },
  dune: {
    id: 'dune',
    location: {
      coords: [-33.856736, 151.201301],
      name: 'Barangaroo Reserve',
      link: 'https://goo.gl/maps/yBejDWHZ797hBEiz8',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/2023-03/dune-1900x900.jpg?itok=nfmXal8y',
    },
    name: 'Dune',
    description: `Sand dunes prove that you can move some mountains, as forces of wind constantly change their shape - maybe even completely eradicating what was once an insurmountable height. Representing the sand dune by an illuminated top ridge, Dune is sculpted by unseen and unfelt winds. A row of 12 LED lines move constantly, reflecting the ever-changing landscape of a desert and the hypnotic beauty of its endless rises and falls.`,
    link: 'https://www.vividsydney.com/event/light/dune',
  },
  ocean: {
    id: 'ocean',
    location: {
      coords: [-33.8576755, 151.2011718],
      name: 'Stargazer Lawn',
      link: 'https://goo.gl/maps/oRHJbudz9VpTn2kC7',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/2023-02/the-last-ocean-desk.jpg?itok=4O9TTPHp',
    },
    name: 'The Last Ocean',
    description: `
The Last Ocean is rubbish. No, really: this massive tessellated 'ice sheet' is made of reclaimed ocean plastic. Taking its name from photographer John Weller's organisation that works to protect one of the most unique ecosystems on Earth, Antarctica's Ross Sea, The Last Ocean is a chance to step onto the continent’s icy wonderland without harming it.

After swirling between captivating blue and whites during the day, at nightfall, your movements upon the expansive artwork stir the seas, causing them to splash up and shift the ice’s shape and colour under your feet. Capturing the sublime beauty of Antarctica even as it melts and shifts due to warming waters, The Last Ocean is an ode to what we risk losing if we don't limit our impact on this Earth.`,
    link: 'https://www.vividsydney.com/event/light/the-last-ocean',
  },
  vividHouse: {
    id: 'vividHouse',
    location: {
      coords: [-33.857142720845616, 151.2017580891243],
      name: 'Vivid House',
      link: 'https://goo.gl/maps/u1FwHaJmz82JFGPV9',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/2023-03/vivid-house-2023.png?itok=bF1LdjGE',
    },
    name: 'Vivid House',
    description: `Welcome to Vivid House: an immersive 360° experience through four awe-inspiring artworks. Head on a hyper-real journey across Australia’s mountain peaks, verdant valleys and more. Marvel at the beautiful resilience of corals. Experience oceanic photography like never before. Take a psychedelic trip through Sydney's hidden coves.`,
    link: 'https://www.vividsydney.com/event/light/vivid-house',
  },

  whatLiesBeneath: {
    id: 'whatLiesBeneath',
    location: {
      coords: [-33.858843, 151.202071],
      name: 'Nawi Cove',
      link: 'https://goo.gl/maps/4Ew6uGCMtwx1QFkB6',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/2023-03/1900x900_26.png?itok=_zVYn8u_',
    },
    name: 'What Lies Beneath',
    description: `Soak in our glowing, ethereal coral reefs, home to all kinds of colourful creatures – no wetsuit required. 3D-mapped onto the curved rocks of Nawi Cove, this projection uses real data from ocean currents to show how our reefs are moving and changing in warming waters. A hypnotising portal to an otherworldly ecosystem that needs our help to survive the pressures of climate change and continue to captivate generations to come.`,
    link: 'https://www.vividsydney.com/event/light/what-lies-beneath',
  },
  tunnel: {
    id: 'tunnel',
    location: {
      coords: [-33.861162, 151.200551],
      name: 'Wulugal Walk',
      link: 'https://goo.gl/maps/jkWx5JnLw3cHdCV16',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/2023-02/tunnel-1900x900.jpg?itok=6b6afCyI',
    },
    name: 'The Tunnel',
    description: `
They say that most adventures are about the journey, not the destination. However, The Tunnel is a trip of itself, steered by fellow Vivid Sydney spectators.

Travel through an open hallway made of 16 otherworldly, space-age structures, controlled by 'Pilots' - those watching from a nearby console. Each journey is unique, as each Pilot has complete control over The Tunnel’s soundscape and 8,000+ LEDs, creating a one-of-a-kind experience.`,
    link: 'https://www.vividsydney.com/event/light/the-tunnel',
  },
  houseNaturalia: {
    id: 'houseNaturalia',
    location: {
      coords: [-33.86557369662993, 151.20148779982492],
      name: 'Barangaroo House',
      link: 'https://goo.gl/maps/MJbE12tMPJb9f26R8',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/2023-05/house-of-naturalia-1900x900_1.jpg?itok=fe8WsTPp',
    },
    name: 'House of Naturalia',
    description: `Welcome to the House of Naturalia – Barangaroo House transformed into an oasis. Projected tendrils of moss intertwine with the building’s cascading plants, forming a luscious flowering garden. As we're led to a cascading waterfall and dive into a colourful underwater world, we’re reminded of both nature’s tranquillity and power.`,
    link: 'https://www.vividsydney.com/event/food/house-of-naturalia',
  },
  elemental: {
    id: 'elemental',
    location: {
      coords: [-33.872823, 151.200746],
      name: 'Cockle Bay',
      link: 'https://goo.gl/maps/92NbaSnGx5F3EZcS9',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/events/1_f79mtRysXxTfYyKL1TU96_VpfY_UZZ_.jpeg?itok=aBhL9Ni1',
    },
    name: 'Elemental',
    description: `
It starts with a spark...

Across countless cultures and centuries, the four elements are opposing forces that make up all life, representing the raw power and alchemic equilibrium of our planet. From the big bang to the natural world as we know it, this breathtaking show celebrates these elements - fire, air, water and earth - combining spectacular 80 metre water shooters, flames, projection and pyro technics – making it more than an essential stop on the Light Walk: it's elemental. 

Australians know the power of the elements first-hand, with fire and water causing havoc across the country in recent years. Unbalanced, these forces can be destructive, but when in harmony, they are essential to the world’s cycles of renewal. But it's not just the environment that craves this balance, as recent years have proved, our individual connection to nature is intrinsic to our wellbeing: a fact that First Nations people have lived by for 60,000 years.

Elemental takes us on a journey from the origins of our planet, through the ages that have defined our land and waterways and delivers us to the world we call home. Jaw dropping effects mix with an original soundtrack to showcase the awe-inspiring and magical moments created when these four elements are at work. 

Elemental inspires us to restore balance to both ourselves and our world, naturally.`,
    link: 'https://www.vividsydney.com/event/light/elemental',
    cinewavLink: 'https://cinewav.page.link/odnN',
  },
  harbour: {
    id: 'harbour',
    location: {
      coords: [-33.871114, 151.199042],
      name: 'Australian National Maritime Museum',
      link: 'https://goo.gl/maps/rqJ2aetEcbwJTNbw6',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/2023-03/harbour-life-1900x900.jpg?itok=AekMgBDp',
    },
    name: 'Harbour Life',
    description: `
Dive into the history of Australia's harbours with this stunning projection on the HMAS Vampire. Swim alongside 200-year-old sea turtles; join Eora people as they fish with a spear and burra (fishing hook), while keeping the ecosystem in balance; witness the desolation of oceans as colonial settlers arrive and industrial fishing takes hold; see how conservationists are saving our sea life from pollution and stray nets with ocean-based drones and recycling efforts with local artists.

A celebration of Australia's harbour beauty and the importance of utilising First Nations knowledge and maritime management practices alongside new technology in conservation efforts, Harbour Life is a moving story of the underwater world's resilience.`,
    link: 'https://www.vividsydney.com/event/light/harbour-life',
    cinewavLink: 'https://cinewav.page.link/Jtmz',
  },
  spectrumHappiness: {
    id: 'spectrumHappiness',
    location: {
      coords: [-33.8751763, 151.2019257],
      name: 'Darling Quarter',
      link: 'https://goo.gl/maps/hviJNFm3ELTHrxbX6',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/2023-02/spectrum-of-happiness-1900x900.jpg?itok=rFCmdVTT',
    },
    name: 'Spectrum of Happiness',
    description: `
There's nothing quite like reaching to the skies on a swing as a child, but Spectrum Of Happiness comes close – and this swing set is for everyone.

Sway away and create a beaming rainbow, as your movement activates the LED tubes and balls attached to each swing. Expect instant and infectious happiness, no matter how young or old you are.`,
    link: 'https://www.vividsydney.com/event/light/spectrum-of-happiness',
  },

  danceTogether: {
    id: 'danceTogether',
    location: {
      coords: [-33.875501313334624, 151.2017373270379],
      name: 'Tumbalong Park',
      link: 'https://goo.gl/maps/JDwtWd65HrpPkb6b8',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/events/1m6kO1Xy_VYo-xXorV1GpWKfVlibSnD6g.jpeg?itok=wD3ol53Y',
    },
    name: 'Dance Together',
    description: `Conceived during COVID lockdowns, Dance Together celebrates the importance of gathering and the magic that can happen when strangers congregate. Meet under an unusual source - three giant floating rings, suspended above our heads - for a 360° show that unites us in haloes of light and an ethereal soundscape. Messages rotate around the inner band, allowing us to connect and reach out in new ways - maybe even with a little boogie underneath.`,
    link: 'https://www.vividsydney.com/event/light/dance-together',
  },
  aloft: {
    id: 'aloft',
    location: {
      coords: [-33.877759, 151.202062],
      name: 'Exchange Building',
      link: 'https://goo.gl/maps/v7vPVE8mQJp5Wcwq6',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/events/1s3ysyavJEKMvmoXgoZDZ2jti0SMmpBnV.jpeg?itok=g0AkPrqB',
    },
    name: 'Aloft',
    description: `Taking inspiration from the Exchange Building's timber wrapping around the circular building, this installation brings birds to what locals lovingly refer to as 'The Bird's Nest'. Inspired by the classic neon sign animations of Chinatown, giant birds flap their wings across the building in the form of 24 LED outlines, lighting up in sequence across the façade as they take flight.`,
    link: 'https://www.vividsydney.com/event/light/aloft',
  },
  commonGround: {
    id: 'commonGround',
    location: {
      coords: [-33.878419992769565, 151.19954179820178],
      name: 'Powerhouse Museum',
      link: 'https://goo.gl/maps/H5GkjXWaouqg9jLX8',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/events/1GXvIWZwdoYa3Diehy8uw-_pIndCIvOX5.jpeg?itok=hAJWZBFH',
    },
    name: 'Common Ground',
    description: `
Like us, the natural world has its moods: it can be troubled or serene, furious or loving, chaotic or caring. And with intense reactions to our changing climate, nature is extra moody, not always able to offer us a calming site of respite.

Common Ground offers a chance to recentre and unite, projecting an entrancing journey of nature’s calm and chaos. Glitches, cutting geometric forms and a jolting soundscape gives way to lush imagery of seas, fields and mountains - a communal journey towards a sanctuary of peace.`,
    link: 'https://www.vividsydney.com/event/light/common-ground',
  },
  voiture: {
    id: 'voiture',
    location: {
      coords: [-33.88316690170525, 151.20298938660412],
      name: 'Goods Line Tunnel',
      link: 'https://goo.gl/maps/thvrrmQqPiPAED8H8',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/events/1G7hhpE3Bk4U5R2B8LrmOrihw9WtcFigB.jpeg?itok=BZSXWyYM',
    },
    name: 'Voiture 21',
    description: `
All aboard Voiture 21, where there’s no ticket needed to travel Australia and the world. Dreamlike landscapes flicker by, projected on the walls of the abandoned tunnel at the end of The Goods Line. All of the footage is taken from the artist's own travels with new footage filmed in Sydney and the Blue Mountains and surrounds, encouraging us to think about our own travels and where we're travelling to. But for now, with no destination, simply take in the view and daydream as you speed past busy cities, empty beaches, snowy mountains and more.

Filmed on location at Gibraltar Range National Park, Warrumbungle National park (Siding Spring Observatory), Wollemi National park, Blue Mountains National Park, Goolawah National Park, Washpool National Park, Hat Head National Park, Crowdy Bay National Park, Toorale National Park, Gundabooka National Park, Mount Kaputar National Park. No environmental damage was incurred on location.The conservation values of the areas have been preserved.`,
    link: 'https://www.vividsydney.com/event/light/voiture-21',
  },
  kineticPerspective: {
    id: 'kineticPerspective',
    location: {
      coords: [-33.881317, 151.201858],
      name: 'The Goods Line Walk',
      link: 'https://goo.gl/maps/thvrrmQqPiPAED8H8',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/2023-05/kinetic-perspective_0.jpg?itok=LMFSHnbJ',
    },
    name: 'Kinetic Perspective',
    description: `
A throwback to the seeing eye illusions of the 1960s, Kinetic Perspective is a spin-out. A row of 32 illuminated spinning circles, with each circle moving in sync with one other, this deceptively simple work plays with our perception as circles continually disappear and reappear.

Come closer and what you see might change completely, reminding us that what we believe and know to be reality might just be a matter of perspective.`,
    link: 'https://www.vividsydney.com/event/light/kinetic-perspective',
  },
  waterlightGraffiti: {
    id: 'waterlightGraffiti',
    location: {
      coords: [-33.882701, 151.202569],
      name: 'The Goods Line Walk',
      link: 'https://goo.gl/maps/thvrrmQqPiPAED8H8',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/events/1P7oJ57szdiv31ARTuUzl6MN1YhaJpzGc.jpeg?itok=wh1PJKd8',
    },
    name: 'Waterlight Graffiti',
    description: `
Pick up a brush, stamp or spray, and make your mark with Waterlight Graffiti - no paint required! Inspired by the practice of 'dishu' in China, where artists paint ephemeral but elaborate water calligraphies on the ground that evaporate and disappear completely, Antonin Fourneau created a new technology, a moisture-responsive LED board.

Part dishu, part 'Etch A Sketch', Waterlight Graffiti is a large electronic blackboard that you can 'paint' with water, each stroke immediately transforming into light. Unleash your inner artist, or just have a scribble - whatever your creation, it'll shine bright for minutes, before it fades to make way for a new 'layer' of graffiti.`,
    link: 'https://www.vividsydney.com/event/light/waterlight-graffiti',
  },
  fluxit: {
    id: 'fluxit',
    location: {
      coords: [-33.882937, 151.204804],
      name: 'Central Station Park',
      link: 'https://goo.gl/maps/bW9Xr7B3KVXNZeS87',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/2023-02/fluxit-1900x900.jpg?itok=ub7Eotc7',
    },
    name: 'Fluxit',
    description: `
For millennia, bonfires have been a meeting place: a way to connect, celebrate, survive and grieve. This design duo's electronic bonfire Fluxit lights up at Vivid Sydney after burning bright in South Africa, the Netherlands and China, arriving to warm up a Sydney winter.

Built from 400 silver bamboo sticks, Fluxit sits dormant during the daytime before relighting each night of the festival. LED tubes glow with orange embers at random as the fire runs through the bamboo, offering a chance to gather, reflect and watch the flames flicker`,
    link: 'https://www.vividsydney.com/event/light/fluxit',
  },
  eco: {
    id: 'eco',
    location: {
      coords: [-33.882226313877, 151.20608063398],
      name: 'Central Station George Street Façade',
      link: 'https://goo.gl/maps/v8vyWfpJQes1mSRT9',
      photo:
        'https://www.vividsydney.com/sites/default/files/styles/original_compressed/public/events/1ZO8UBVztKhoZXJ-VQBqablmfQ3b5e2M4.jpeg?itok=Y1LjM--f',
    },
    name: 'Eco',
    description: `
Each day, hundreds of thousands of Sydneysiders pass through Central Station, too busy to ponder the stories the building’s surrounds might hold.

Eco tells this history across its west façade and clock tower, from The Dreaming to now and beyond. Let this surreal and transportive work wash over you and see your daily commute with new eyes.`,
    link: 'https://www.vividsydney.com/event/light/eco',
  },
}
