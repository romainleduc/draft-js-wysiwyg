const path = '/static/images/media';
const audioPath = '/static/audios/media';
const videoPath = '/static/videos/media';

const mediaData = [
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
  ],
  [
    {
      type: 'video',
      background: 'https://i.ytimg.com/vi/o77MzDQT1cg/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBVJtS5r-538msWyVBzDEXAzmQpSQ',
      tooltip: "Youtube video",
      mediaProps: {
        src: `https://www.youtube.com/watch?v=o77MzDQT1cg`,
      }
    },
    {
      type: 'video',
      background: `https://i.vimeocdn.com/video/607688565_750x421.875.jpg?q=60`,
      tooltip: 'Vimeo',
      mediaProps: {
        src: `https://vimeo.com/195433452`,
      }
    },
  ],
  [
    {
      type: 'video',
      background: `https://static-cdn.jtvnw.net/previews-ttv/live_user_sweetsio-440x248.jpg`,
      tooltip: 'Twitch',
      mediaProps: {
        controls: true,
        src: 'https://www.twitch.tv/sweetsio',
      },
    },
    {
      type: 'video',
      background: `https://i.ytimg.com/vi/5qap5aO4i9A/hq720_live.jpg?sqp=CLiMjv4F-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB29_L4c1dVwJ7C5NI1Ta0JgdXyIg`,
      tooltip: 'Youtube video',
      mediaProps: {
        src: `https://www.youtube.com/watch?v=5qap5aO4i9A`,
      }
    },
  ],
];

export default mediaData;
