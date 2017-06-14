/* @flow */

// Data used on the application
const data = [
  {
    name: 'Pier 39',
    owner: 'State of San Francisco',
    description: 'Pier 39 is a shopping center and popular tourist attraction built on a pier in San Francisco, California. At Pier 39, there are shops, restaurants, a video arcade, street performances and etc...',
    visit: 'Open to the public',
    address: 'Beach Street & The Embarcadero, San Francisco, CA 94133, United States',
    image: require('./../img/pier.png'),
    latlng: {
      latitude: 37.808676,
      longitude: -122.409825,
    },
  },
  {
    name: 'Golden Gate',
    owner: 'State of San Francisco',
    description: 'The Golden Gate Bridge is a suspension bridge spanning the Golden Gate strait, the one-mile-wide, one-point-seven-mile-long channel between San Francisco Bay and the Pacific Ocean.',
    visit: 'Open to the public',
    address: 'Golden Gate Bridge, San Francisco, CA, USA',
    image: require('./../img/goldengate.png'),
    latlng: {
      latitude: 37.8199328,
      longitude: -122.4804438,
    },
  },
  {
    name: 'Alcatraz',
    owner: 'State of San Francisco',
    description: 'Alcatraz Island is located in San Francisco Bay, 1.25 miles (2.01 km) offshore from San Francisco, California, United States. The small island was developed with facilities for a lighthouse, a military fortification, a military prison (1868), and a federal prison from 1934 until 1963.',
    visit: 'Open to the public',
    address: 'San Francisco, CA 94133, USA',
    image: require('./../img/alcatraz.png'),
    latlng: {
      latitude: 37.8269775,
      longitude: -122.4229555,
    },
  },
  {
    name: 'Facebook HQ',
    owner: 'Facebook Inc.',
    description: 'The new Facebook headquarters looks like a cross between high-art, 21st century corporate thinking and a child`s candy-fueled daydream.',
    visit: 'Only at events',
    address: '1 Hacker Way, Menlo Park, CA 94025, USA',
    image: require('./../img/facebook.png'),
    latlng: {
      latitude: 37.4843857,
      longitude: -122.1476721,
    },
  },
  {
    name: 'Google Campus',
    owner: 'Google Inc.',
    description: 'The Google Campus is one of the most famous technology campus in the world because of he minimalistic construction. Its a nice place to meet and see how the people at google works and know more things about the google company',
    visit: 'Open to the public',
    address: '1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA',
    image: require('./../img/google.png'),
    latlng: {
      latitude: 37.4201197,
      longitude: -122.0883069,
    },
  },
  {
    name: 'Apple Campus',
    owner: 'Apple Inc.',
    description: 'The Apple Campus is the corporate headquarters of Apple Inc., located at Cupertino, California, United States. Its design resembles that of a university, with the buildings arranged around green spaces, similar to a suburban business park.',
    visit: 'Open to the public',
    address: '19111 Pruneridge Ave, Cupertino, CA 95014, USA',
    image: require('./../img/apple.png'),
    latlng: {
      latitude: 37.3402493,
      longitude: -122.0397761,
    },
  },
];

module.exports = data;
