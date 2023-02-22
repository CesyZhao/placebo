import React, {useCallback, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import { humanNumber } from "../../util/number";
import {getRankingList} from "../../api/music";
import { PlayList } from "../../defination/music";
import placebo from '../../model/Placebo'



const Top = () => {

  const [topList, setTopList] = useState<PlayList[]>([]);

  const getTopList = useCallback(async () => {
    try {
      const list  = await placebo.music.getRankingList();
      setTopList(list);
    } catch (e) {
      // TODO
    }
  }, []);

  useEffect(() => {
    getTopList();
  }, [])

  return (
    <div className={styles.top}>
      {
        topList.map(item => {
          return (
            <Link to={`/album/${item.id}`} key={item.id}>
              <div className={styles.topItem}>
                <img src={item.coverImgUrl} alt="cover"></img>
                <span className={styles.topItemCount}>
                    <i className="iconfont icon-iosplay"></i>
                    <span> { humanNumber(item.playCount) } </span>
                  </span>
                <span className={styles.topItemName}> {item.name} </span>
              </div>
            </Link>
          )
        })
      }
    </div>
  );
}

export default Top;
