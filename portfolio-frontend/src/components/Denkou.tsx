import { Divider } from '@material-ui/core';
import { Typography, Container } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import styles from './denkou.module.css';
import zeroPadding from '../lib/zeroPadding';

function Denkou() {
  const [posts, setPosts] = useState([]);

  console.log(posts);

  // 無限ループを回避する
  useEffect(() => {
    (async () => {
      try {
        const today = new Date();

        const M = zeroPadding(today.getMonth()+1, 2);
        const D = zeroPadding(today.getDate(), 2);

        var tomorrow = new Date();
        // 日付の確認（本日日付）
        console.log( "取得したdateインスタンス情報：", tomorrow );
        // １日未来に加算する
        tomorrow.setDate( tomorrow.getDate() + 1 );
        // 日付の確認（明日の日付）
        console.log( "加算後のdateインスタンス情報：", tomorrow );

        const tM = zeroPadding(tomorrow.getMonth()+1, 2);
        const tD = zeroPadding(tomorrow.getDate(), 2);

        const res = await axios.get(
          `https://sparql.crssnky.xyz/spql/imas/query?output=json&force-accept=text%2Fplain&query=PREFIX%20rdfs%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2000%2F01%2Frdf-schema%23%3E%0APREFIX%20schema%3A%20%3Chttp%3A%2F%2Fschema.org%2F%3E%0APREFIX%20xsd%3A%20%3Chttp%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema%23%3E%0ASELECT%20(sample(%3Fo)%20as%20%3Fdate)%20(sample(%3Fn)%20as%20%3Fname)%0AWHERE%20%7B%0A%20%20%20%3Fsub%20schema%3AbirthDate%20%3Fo%3B%0A%20%20%20%20%20%20%20%20rdfs%3Alabel%20%3Fn%3B%0A%20%20%20%20%20%20%20%20bind(%22--${M}-${D}%22%5E%5Exsd%3AgMonthDay%20as%20%3F3ago)%0A%20%20%20%20%20%20%20%20bind(%22--${tM}-${tD}%22%5E%5Exsd%3AgMonthDay%20as%20%3F3later)%0A%20%20%20%20%20%20%20%20FILTER(%3Fo%3E%3D%3F3ago%20%26%26%20%3Fo%3C%3D%3F3later).%0A%7Dgroup%20by(%3Fsub)%20order%20by(%3Fo)`
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
          {'【お知らせ】アイドルマスターのアイドルの誕生日をお知らせします。　　　　'}
          {posts.map((data, idx) => (
            <>
              {idx == 1 ? '明日 誕生日のアイドル🍰 ' + data.name.value + '　　' : '本日 誕生日のアイドル🎉 ' + data.name.value + '　　'}
            </>
          ))}
          {'　　お誕生日おめでとうございます！！'}
        </span>
      </p>
    </>
  );
}

export default Denkou;
