import React from 'react';
import Image from 'next/image';
import Footer from '../components/Footer';
import OGPHead from '../components/OGPHead';

import Layout from '../layout/layout';

export default function Custom500() {
  return (
    <>
      <OGPHead pageName={'500 InternalServerError'} />
      <Layout pageName="500 InternalServerError" space={3}>
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <h2>サーバーに障害が発生しました。</h2>
          <Image src="/images/500.png" width={300} height={300} />
        </div>
        <Footer />
      </Layout>
    </>
  );
}
