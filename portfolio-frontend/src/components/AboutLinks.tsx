import React from 'react';
import { aboutLinks } from '../testData/aboutLinks';

function AboutLinks() {
  return (
    <>
      {aboutLinks.map((data) => (
        <>
          <a href={data.url}>{data.title}</a>
          <br />
        </>
      ))}
    </>
  );
}

export default AboutLinks;
