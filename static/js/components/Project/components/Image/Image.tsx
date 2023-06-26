import React from 'react';
import { mediaAddress } from 'config';

export const Image = ({
  data,
  rounded,
  fluid = true,
  className
}: {
  data: any;
  rounded?: boolean;
  fluid?: boolean;
  className?: string;
}) => {
  if (!data?.data) {
    return null;
  }

  if (Array.isArray(data.data)) {
    const imageArray = data.data.map((imgData: any) => {
      return `${mediaAddress}/${imgData.attributes.hash}${imgData.attributes.ext}`;
    });

    if (imageArray.length === 0) {
      return null;
    }

    return (
      <picture>
        {imageArray[2] && (
          <source media='(max-width: 576px)' srcSet={imageArray[2]} />
        )}
        {imageArray[1] && (
          <source media='(max-width: 992px)' srcSet={imageArray[1]} />
        )}
        <img
          src={imageArray[0]}
          alt=''
          className={`${fluid ? 'img-fluid' : ''} ${rounded ? 'rounded' : ''} ${
            className ?? ''
          }`}
        />
      </picture>
    );
  } else {
    const image = data?.data?.attributes;

    if (!image) {
      return null;
    }

    const url = `${mediaAddress}/${image.hash}${image.ext}`;

    return (
      <img
        className={`${fluid ? 'img-fluid' : ''} ${rounded ? 'rounded' : ''} ${
          className ?? ''
        }`}
        src={url}
        alt={image.hash}
      />
    );
  }
};
