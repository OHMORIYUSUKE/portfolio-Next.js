import React from 'react';
import Container from '@material-ui/core/Container';

import Layout from '../layout/layout';
import AboutEvents from '../components/AboutEvents';
import AboutSkill from '../components/AboutSkill';
import AboutName from '../components/AboutName';
import AboutLinks from '../components/AboutLinks';
import Footer from '../components/Footer';

const about: React.FC = () => {
  return (
    <Layout pageName="About">
      <Container style={{ width: '90%',marginBottom: '20px' }}>
        <h2>名前</h2>
        <AboutName />
        <h2>スキル</h2>
        <AboutSkill />
        <h2>イベント</h2>
        <AboutEvents />
        <h2>リンク</h2>
        <AboutLinks />
      </Container>
      <Footer/>
    </Layout>
  );
};

export default about;
