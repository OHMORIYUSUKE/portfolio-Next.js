import { Divider, Link } from '@material-ui/core';
import { Typography, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './denkou.module.css';
import zeroPadding from '../lib/zeroPadding';

import ChevronRightIcon from '@material-ui/icons/ChevronRight';

function Denkou() {
  const [posts, setPosts] = useState([]);
  const [tposts, tsetPosts] = useState([]);

  console.log(posts);

  console.log(tposts);

  // 無限ループを回避する
  useEffect(() => {
    (async () => {
      try {
        const today = new Date();

        const M = zeroPadding(today.getMonth() + 1, 2);
        const D = zeroPadding(today.getDate(), 2);

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tM = zeroPadding(tomorrow.getMonth() + 1, 2);
        const tD = zeroPadding(tomorrow.getDate(), 2);

        // const M = '12'
        // const D = '24'
        // const tM = '12'
        // const tD = '25'
        const res = await axios.get(
          `https://sparql.crssnky.xyz/spql/imas/query?output=json&force-accept=text%2Fplain&query=PREFIX%20schema%3A%20%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX%20rdfs%3A%20%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0A%0ASELECT%20(sample(%3Fo)%20as%20%3Fdate)%20(sample(%3Fn)%20as%20%3Fname)%0AWHERE%20%7B%20%0A%20%20%3Fs%20schema%3AbirthDate%20%3Fo%3B%0A%20%20rdfs%3Alabel%20%3Fn%3B%0A%20%20FILTER(regex(str(%3Fo)%2C%20%22${M}-${D}%22)).%0A%7D%0Agroup%20by(%3Fn)%0Aorder%20by(%3Fname)`
        );
        setPosts(res.data.results.bindings);

        const tres = await axios.get(
          `https://sparql.crssnky.xyz/spql/imas/query?output=json&force-accept=text%2Fplain&query=PREFIX%20schema%3A%20%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX%20rdfs%3A%20%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0A%0ASELECT%20(sample(%3Fo)%20as%20%3Fdate)%20(sample(%3Fn)%20as%20%3Fname)%0AWHERE%20%7B%20%0A%20%20%3Fs%20schema%3AbirthDate%20%3Fo%3B%0A%20%20rdfs%3Alabel%20%3Fn%3B%0A%20%20FILTER(regex(str(%3Fo)%2C%20%22${tM}-${tD}%22)).%0A%7D%0Agroup%20by(%3Fn)%0Aorder%20by(%3Fname)`
        );
        tsetPosts(tres.data.results.bindings);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const today = new Date();
  const M = zeroPadding(today.getMonth() + 1, 2);
  const D = zeroPadding(today.getDate(), 2);

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tM = zeroPadding(tomorrow.getMonth() + 1, 2);
  const tD = zeroPadding(tomorrow.getDate(), 2);

  // const M = '12'
  // const D = '24'
  // const tM = '12'
  // const tD = '25'

  return (
    <>
    <div style={{marginTop: 15}}>
    <p className={styles.ledText} style={{ maxWidth: '76vw',margin: 0 }}>
        <span>
          {`【お知らせ】アイドル達の誕生日をお知らせします。　　　　`}
          {posts.map((data, idx) => (
            <>
              {idx == 0
                ? posts.length == idx + 1
                  ? `今日(${M + '/' + D})生まれ　` +
                    data.name.value +
                    ' 🎉　　/　　'
                  : `今日(${M + '/' + D})生まれ　` + data.name.value + ' , '
                : posts.length == idx + 1
                ? data.name.value + ' 🎉　　/　　'
                : data.name.value + ' , '}
            </>
          ))}
          {tposts.map((data, jdx) => (
            <>
              {jdx == 0
                ? tposts.length == jdx + 1
                  ? `明日(${tM + '/' + tD})生まれ　` +
                    data.name.value +
                    ' 🍰　　　　'
                  : `明日(${tM + '/' + tD})生まれ　` + data.name.value + ' , '
                : tposts.length == jdx + 1
                ? data.name.value + ' 🍰　　　　'
                : data.name.value + ' , '}
            </>
          ))}
          {'お誕生日おめでとうございます！！'}
        </span>
      </p>
      <div style={{textAlign: 'right'}}>
      <Link href="https://sparql.crssnky.xyz/imas/" underline='always' style={{color: '#ffb400'}} target="_blank"
            rel="noopener noreferrer">
        使用しているAPI<ChevronRightIcon style={{ display: 'inline-flex', verticalAlign: 'middle'}} />
      </Link>
      </div>
    </div>
    </>
  );
}

export default Denkou;
