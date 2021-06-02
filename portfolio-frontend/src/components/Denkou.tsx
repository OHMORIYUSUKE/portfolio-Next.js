import { Divider } from '@material-ui/core';
import { Typography, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './denkou.module.css';

function Denkou() {
  const [posts, setPosts] = useState([]);

  console.log(posts);

  // 無限ループを回避する
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          'https://sparql.crssnky.xyz/spql/imas/query?output=json&force-accept=text%2Fplain&query=PREFIX%20schema%3A%20%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX%20imas%3A%20%3Chttps%3A%2F%2Fsparql.crssnky.xyz%2Fimasrdf%2FURIs%2Fimas-schema.ttl%23%3E%0ASELECT%20%3Fo%20%3Fh%0AWHERE%20%7B%0A%20%20%3Fs%20schema%3Aname%7Cschema%3AalternateName%20%3Fo%3B%0A%20%20%20%20%20schema%3Aheight%20%3Fh.%0A%7Dorder%20by(%3Fh)'
        );
        setPosts(res.data.results.bindings);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <p className={styles.ledText} style={{ maxWidth: '75vw' }}>
        <span>
          {posts.map((data, idx) => (
            <>
              {data.o['xml:lang'] == 'ja' ? <>{data.o.value + '　'}</> : <></>}
            </>
          ))}
        </span>
      </p>
    </>
  );
}

export default Denkou;
