import React from 'react';
import Image from 'next/image';

function AboutName() {
  return (
    <>
      <Image src="/images/profile.jpg" width={200} height={200} />
      <h3>大森裕介</h3>
      <ul>
        <li>大学生</li>
        <li>アニメ好き</li>
        <li>カラオケ好き</li>
      </ul>
    </>
  );
}

export default AboutName;
