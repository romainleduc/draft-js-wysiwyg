const path = '/static/images/media';
const audioPath = '/static/audios/media';
const videoPath = '/static/videos/media';

const mediaData = [
  [
    {
      background: `${path}/shine.jpg`,
      tooltip: 'Acoustic music',
      src: `${audioPath}/Shine.mp3`,
    },
    {
      background: `${path}/open.jpg`,
      tooltip: 'Orchestral music',
      src: [`${audioPath}/Open.mp3`],
    },
    {
      background: `${path}/percussion.jpg`,
      tooltip: 'Percussion music',
      src: `${audioPath}/Bongoland.mp3`,
    },
  ],
  [
    {
      background: `${path}/casino.jpg`,
      tooltip: 'Orchestral music',
      src: `${videoPath}/casino.mp4`,
    },
    {
      background: `${path}/react.jpg`,
      tooltip: 'Percussion music',
      src: `${videoPath}/react.mp4`,
    },
    {
      background: `${path}/game.jpg`,
      tooltip: 'Percussion music',
      src: `${videoPath}/gaming.mp4`,
    },
  ],
  // [
  //   {
  //     background: `https://i.vimeocdn.com/video/826491820.jpg`,
  //     tooltip: 'Orchestral music',
  //     src: `https://player.vimeo.com/video/369521302/config?autopause=1&byline=0&collections=1&context=Vimeo%5CController%5CClipController.main&default_to_hd=1&outro=nothing&portrait=0&share=1&title=0&watch_trailer=0&s=32ec6c8ef0c6d53a1c2a44788684d7476c7eac7f_1606750930`,
  //   },
  //   {
  //     background: `${path}/react.jpg`,
  //     tooltip: 'Percussion music',
  //     src: `https://www.youtube.com/watch?v=nn-0rd2fDsU`,
  //   },
  //   {
  //     background: `https://i.ytimg.com/vi/5qap5aO4i9A/hq720_live.jpg?sqp=CLiMjv4F-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB29_L4c1dVwJ7C5NI1Ta0JgdXyIg`,
  //     tooltip: 'Percussion music',
  //     src: `https://www.youtube.com/watch?v=5qap5aO4i9A`,
  //   },
  // ],
];

export default mediaData;
