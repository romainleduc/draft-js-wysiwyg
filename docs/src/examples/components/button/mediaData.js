const path = '/static/images/media';
const audioPath = '/static/audios/media';
const videoPath = '/static/videos/media';

const mediaData = [
  [
    {
      type: 'img',
      background: `${path}/dairypanda.png`,
      tooltip: 'Dairypanda’s hytale fan art',
      mediaProps: {
        src: `${path}/dairypanda.png`,
      },
    },
    {
      type: 'img',
      background: `${path}/nuffy.jpg`,
      tooltip: 'Nuffy’s hytale fan art',
      mediaProps: {
        src: `${path}/nuffy.jpg`,
      },
    },
    {
      type: 'img',
      background: `${path}/aura.gif`,
      tooltip: 'Aura’s hytale fan art',
      mediaProps: {
        src: `${path}/aura.gif`,
      },
    },
  ],
  [
    {
      type: 'audio',
      background: `${path}/shine.jpg`,
      tooltip: 'Acoustic music',
      mediaProps: {
        controls: true,
        src: `${audioPath}/Shine.mp3`,
      },
    },
    {
      type: 'audio',
      background: `${path}/open.jpg`,
      tooltip: 'Orchestral music',
      mediaProps: {
        controls: true,
        src: [`${audioPath}/Open.mp3`],
      },
    },
    {
      type: 'audio',
      background: `${path}/percussion.jpg`,
      tooltip: 'Percussion music',
      mediaProps: {
        controls: true,
        src: `${audioPath}/Bongoland.mp3`,
      },
    },
  ],
  [
    {
      type: 'video',
      background: `${path}/casino.jpg`,
      tooltip: 'Orchestral music',
      mediaProps: {
        controls: true,
        src: `${videoPath}/casino.mp4`,
      },
    },
    {
      type: 'video',
      background: `${path}/react.jpg`,
      tooltip: 'Percussion music',
      mediaProps: {
        controls: true,
        src: `${videoPath}/react.mp4`,
      },
    },
    {
      type: 'video',
      background: `${path}/game.jpg`,
      tooltip: 'Percussion music',
      mediaProps: {
        controls: true,
        src: `${videoPath}/gaming.mp4`,
      },
    },
  ],
];

export default mediaData;
