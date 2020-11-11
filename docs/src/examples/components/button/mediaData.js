const path = '/static/images/media';
const audioPath = '/static/audios/media';

const mediaData = [
  [
    {
      background: `${path}/dairypanda.png`,
      src: `${path}/dairypanda.png`,
      tooltip: 'Dairypanda’s hytale fan art',
      type: 'image',
      props: {},
    },
    {
      background: `${path}/nuffy.jpg`,
      src: `${path}/nuffy.jpg`,
      tooltip: 'Nuffy’s hytale fan art',
      type: 'image',
    },
    {
      background: `${path}/aura.gif`,
      src: `${path}/aura.gif`,
      tooltip: 'Aura’s hytale fan art',
      type: 'image',
    },
    // {
    //   background: `${path}/omnia.jpg`,
    //   src: `${path}/omnia.jpg`,
    //   tooltip: 'Omnia’s hytale fan art',
    //   type: 'image',
    // },
  ],
  [
    {
      background: `${path}/shine.jpg`,
      src: `${audioPath}/Shine.mp3`,
      tooltip: 'Acoustic music',
      type: 'audio',
      props: {},
    },
    {
      background: `${path}/open.jpg`,
      src: `${audioPath}/Open.mp3`,
      tooltip: 'Orchestral music',
      type: 'audio',
    },
    {
      background: `${path}/percussion.jpg`,
      src: `${audioPath}/Bongoland.mp3`,
      tooltip: 'Percussion music',
      type: 'audio',
    },
  ],
];

export default mediaData;
