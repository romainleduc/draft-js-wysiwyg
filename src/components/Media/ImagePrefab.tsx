import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
  media: {
    display: 'block',
    margin: '0 auto',
    width: '100%',
    // Fix an issue with Firefox rendering video controls
    // with 'pre-wrap' white-space
    whiteSpace: 'initial',
  },
});

interface ImagePrefabProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string | string[];
  sourceProps?: React.SourceHTMLAttributes<HTMLSourceElement>[];
}

export const ImagePrefab = ({
  src,
  sourceProps,
  ...other
}: ImagePrefabProps): JSX.Element => {
  const classes = useStyles();

  return (
    <>
      {!Array.isArray(src) ? (
        <img className={classes.media} src={src} {...other} />
      ) : (
          <picture className={classes.media}>
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
  )
};
