import Head from 'next/head';
import React from 'react';

type Props = {
  pageName: string;
};

const OGPHead: React.FC<Props> = (props) => {
  return (
    <>
      <Head>
        <title>Portfolio</title>
        <link rel="icon" href="/favicon.ico" />

        <meta property="og:title" content={`Portfolio | ${props.pageName}`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.baseUrl} />
        <meta
          property="og:image"
          content={
            'https://images.microcms-assets.io/assets/440b9bbd003d40c49f24485329b6243b/292716af845b4967b9b3cbaf6439f91b/profile.jpg'
          }
        />
        <meta property="og:site_name" content="Portfolio" />
        <meta
          property="og:description"
          content={'ポートフォリオサイトです。'}
        />
        {/* Twitter設定 */}
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
    </>
  );
};

export default OGPHead;
