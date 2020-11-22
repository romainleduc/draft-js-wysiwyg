import React from 'react';

interface ImagePrefabProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string | string[];
  sourceProps?: React.SourceHTMLAttributes<HTMLSourceElement>[];
}

export const ImagePrefab = ({
  src,
  sourceProps,
  ...other
}: ImagePrefabProps): JSX.Element => (
  <>
    {!Array.isArray(src) ? (
      <img src={src} {...other} />
    ) : (
      <picture>
        {src.map((srcImage, key) => {
          if (key !== 0) {
            const props = sourceProps?.[key];

            return <source src={srcImage} {...props} />;
          }
        })}
        <img src={src[0]} {...other} />
      </picture>
    )}
  </>
);
