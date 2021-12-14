import Image from 'next/image';

const cloudflareImageLoader = ({ src, width, quality }) => {
  if (!quality) {
    quality = 75;
  }
  return `https://image-loader.maintacore.workers.dev?width=${width}&quality=${quality}&image=https://dash.maintacore.co.za${src}`;
};

// Image with CloudFlare Worker as loader
export default function ImageCF({ children, ...props }) {
  if (process.env.NODE_ENV === 'development') {
    return <Image unoptimized={true} {...props} />;
  }

  return <Image {...props} loader={cloudflareImageLoader} />;
}
