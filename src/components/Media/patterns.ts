export const MATCH_URL_YOUTUBE =
  /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:embed\/|v\/|watch\/|watch\?v=|watch\?.+&v=))((\w|-){11})|youtube\.com\/playlist\?list=|youtube\.com\/user\//;
export const MATCH_URL_SOUNDCLOUD = /(?:soundcloud\.com|snd\.sc)\/[^.]+$/;
export const MATCH_URL_VIMEO = /vimeo\.com\/.+/;
export const MATCH_URL_FACEBOOK =
  /^https?:\/\/(www\.)?facebook\.com.*\/(video(s)?|watch|story)(\.php?|\/).+$/;
export const MATCH_URL_FACEBOOK_WATCH = /^https?:\/\/fb\.watch\/.+$/;
export const MATCH_URL_STREAMABLE = /streamable\.com\/([a-z0-9]+)$/;
export const MATCH_URL_WISTIA =
  /(?:wistia\.(?:com|net)|wi\.st)\/(?:medias|embed)\/(?:iframe\/)?(.*)$/;
export const MATCH_URL_TWITCH_VIDEO =
  /(?:www\.|go\.)?twitch\.tv\/videos\/(\d+)($|\?)/;
export const MATCH_URL_TWITCH_CHANNEL =
  /(?:www\.|go\.)?twitch\.tv\/([a-zA-Z0-9_]+)($|\?)/;
export const MATCH_URL_DAILYMOTION =
  /^(?:(?:https?):)?(?:\/\/)?(?:www\.)?(?:(?:dailymotion\.com(?:\/embed)?\/video)|dai\.ly)\/([a-zA-Z0-9]+)(?:_[\w_-]+)?$/;
export const MATCH_URL_MIXCLOUD = /mixcloud\.com\/([^/]+\/[^/]+)/;
export const MATCH_URL_VIDYARD = /vidyard.com\/(?:watch\/)?([a-zA-Z0-9-]+)/;
export const MATCH_URL_KALTURA =
  /^https?:\/\/[a-zA-Z]+\.kaltura.(com|org)\/p\/([0-9]+)\/sp\/([0-9]+)00\/embedIframeJs\/uiconf_id\/([0-9]+)\/partner_id\/([0-9]+)(.*)entry_id.([a-zA-Z0-9-_]+)$/;
export const IMAGE_EXTENSIONS = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
export const AUDIO_EXTENSIONS =
  /\.(m4a|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/;
export const VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm|mov|m4v)($|\?)/;
export const HLS_EXTENSIONS = /\.(m3u8)($|\?)/i;
export const DASH_EXTENSIONS = /\.(mpd)($|\?)/;
export const FLV_EXTENSIONS = /\.(flv)($|\?)/i;

export const isImage = (url: string | string[]): boolean => {
  if (url instanceof Array) {
    return url.every((item) => IMAGE_EXTENSIONS.test(item));
  }

  return IMAGE_EXTENSIONS.test(url);
};

export const isAudio = (url: string | string[]): boolean => {
  if (url instanceof Array) {
    return url.every((item) => AUDIO_EXTENSIONS.test(item));
  }

  return AUDIO_EXTENSIONS.test(url);
};

export const isVideo = (url: string | string[]): boolean => {
  if (url instanceof Array) {
    return url.every(
      (item) =>
        VIDEO_EXTENSIONS.test(item) ||
        isHls(item) ||
        isDash(item) ||
        isFlv(item)
    );
  }

  return VIDEO_EXTENSIONS.test(url) || isHls(url) || isDash(url) || isFlv(url);
};

export const isEmbeddedLink = (url: string | string[]): boolean => {
  if (url instanceof Array) {
    return url.every(
      (item) =>
        MATCH_URL_YOUTUBE.test(item) ||
        MATCH_URL_SOUNDCLOUD.test(item) ||
        MATCH_URL_VIMEO.test(item) ||
        MATCH_URL_FACEBOOK.test(item) ||
        MATCH_URL_FACEBOOK_WATCH.test(item) ||
        MATCH_URL_STREAMABLE.test(item) ||
        MATCH_URL_WISTIA.test(item) ||
        MATCH_URL_TWITCH_VIDEO.test(item) ||
        MATCH_URL_TWITCH_CHANNEL.test(item) ||
        MATCH_URL_DAILYMOTION.test(item) ||
        MATCH_URL_MIXCLOUD.test(item) ||
        MATCH_URL_VIDYARD.test(item) ||
        MATCH_URL_KALTURA.test(item)
    );
  }

  return (
    MATCH_URL_YOUTUBE.test(url) ||
    MATCH_URL_SOUNDCLOUD.test(url) ||
    MATCH_URL_VIMEO.test(url) ||
    MATCH_URL_FACEBOOK.test(url) ||
    MATCH_URL_FACEBOOK_WATCH.test(url) ||
    MATCH_URL_STREAMABLE.test(url) ||
    MATCH_URL_WISTIA.test(url) ||
    MATCH_URL_TWITCH_VIDEO.test(url) ||
    MATCH_URL_TWITCH_CHANNEL.test(url) ||
    MATCH_URL_DAILYMOTION.test(url) ||
    MATCH_URL_MIXCLOUD.test(url) ||
    MATCH_URL_VIDYARD.test(url) ||
    MATCH_URL_KALTURA.test(url)
  );
};

const isHls = (url: string | string[]) => {
  if (url instanceof Array) {
    return url.every((item) => HLS_EXTENSIONS.test(item));
  }

  return HLS_EXTENSIONS.test(url);
};

const isDash = (url: string | string[]) => {
  if (url instanceof Array) {
    return url.every((item) => DASH_EXTENSIONS.test(item));
  }

  return DASH_EXTENSIONS.test(url);
};

const isFlv = (url: string | string[]) => {
  if (url instanceof Array) {
    return url.every((item) => FLV_EXTENSIONS.test(item));
  }

  return FLV_EXTENSIONS.test(url);
};
