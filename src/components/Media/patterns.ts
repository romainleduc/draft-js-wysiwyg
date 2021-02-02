export const IMAGE_EXTENSIONS = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;
export const AUDIO_EXTENSIONS = /\.(m4a|mp4a|mpga|mp2|mp2a|mp3|m2a|m3a|wav|weba|aac|oga|spx)($|\?)/;
export const VIDEO_EXTENSIONS = /\.(mp4|og[gv]|webm|mov|m4v)($|\?)/;
export const HLS_EXTENSIONS = /\.(m3u8)($|\?)/i;
export const DASH_EXTENSIONS = /\.(mpd)($|\?)/;
export const FLV_EXTENSIONS = /\.(flv)($|\?)/i;

const isImage = (url: string | string[]) => {
  if (url instanceof Array) {
    return url.every((item) => IMAGE_EXTENSIONS.test(item));
  }

  return IMAGE_EXTENSIONS.test(url);
};

const isAudio = (url: string | string[]) => {
  if (url instanceof Array) {
    return url.every((item) => AUDIO_EXTENSIONS.test(item));
  }

  return AUDIO_EXTENSIONS.test(url);
};

const isVideo = (url: string | string[]) => {
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

export const getMediaType = (url?: string | string[]): string => {
  if (!url) {
    return 'media';
  }

  if (isImage(url)) {
    return 'img';
  }

  if (isAudio(url)) {
    return 'audio';
  }

  if (isVideo(url)) {
    return 'video';
  }

  return 'media';
};
