const path = '/static/images/media';
const audioPath = '/static/audios/media';
const videoPath = '/static/videos/media';

const mediaData = [
  [
    {
      background: `${path}/dairypanda.png`,
      tooltip: 'Dairypanda’s hytale fan art',
      type: 'image',
      src: `${path}/dairypanda.png`,
    },
    {
      background: `${path}/nuffy.jpg`,
      tooltip: 'Nuffy’s hytale fan art',
      type: 'image',
      src: `${path}/nuffy.jpg`,
    },
    {
      background: `${path}/aura.gif`,
      tooltip: 'Aura’s hytale fan art',
      type: 'image',
      src: `${path}/aura.gif`,
    },
  ],
  [
    {
      background: `${path}/shine.jpg`,
      tooltip: 'Acoustic music',
      type: 'audio',
      src: `${audioPath}/Shine.mp3`,
    },
    {
      background: `${path}/open.jpg`,
      tooltip: 'Orchestral music',
      type: 'audio',
      src: `${audioPath}/Open.mp3`,
    },
    {
      background: `${path}/percussion.jpg`,
      tooltip: 'Percussion music',
      type: 'audio',
      src: `${audioPath}/Bongoland.mp3`,
    },
  ],
  [
    {
      background: `${path}/casino.jpg`,
      tooltip: 'Orchestral music',
      type: 'video',
      mediaProps: {
        videoProps: {
          poster: `${path}/casino.jpg`,
        },
        sourcesProps: [
          {
            src: `${videoPath}/casino.mp4`,
            type: 'video/mp4',
          },
        ],
        errorMessage: "Sorry, your browser doesn't support mp4 videos.",
      },
    },
    {
      background: `${path}/react.jpg`,
      tooltip: 'Percussion music',
      type: 'video',
      mediaProps: {
        videoProps: {
          poster: `${path}/react.jpg`,
        },
        sourcesProps: [
          {
            src: `${videoPath}/react.mp4`,
            type: 'video/mp4',
          },
        ],
        errorMessage: "Sorry, your browser doesn't support mp4 videos.",
      },
    },
    {
      background: `${path}/game.jpg`,
      tooltip: 'Percussion music',
      type: 'video',
      mediaProps: {
        videoProps: {
          poster: `${path}/game.jpg`,
        },
        sourcesProps: [
          {
            src: `${videoPath}/gaming.mp4`,
            type: 'video/mp4',
          },
        ],
        errorMessage: "Sorry, your browser doesn't support mp4 videos.",
      },
    },
  ],
];

export default mediaData;
