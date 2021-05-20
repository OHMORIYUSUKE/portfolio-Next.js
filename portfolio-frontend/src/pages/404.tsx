import React from "react";
import Image from 'next/image';
import Footer from "../components/Footer";
import OGPHead from "../components/OGPHead";

import Layout from '../layout/layout';



export default function Custom404() {
  return (
    <>
    <OGPHead pageName={'404 NotFound'}/>
    <Layout pageName="404 NotFound">
      <div style={{textAlign: 'center',marginBottom: 50}}>
      <h1>ページが見つかりませんでした。</h1>
      <Image
              src="/images/404.png"
              width={300}
              height={300}
            />
      </div>
      <Footer />
    </Layout>
    </>
  );
}
