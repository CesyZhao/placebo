import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { getLyric } from "../../api/music";
import {formatLyric} from "../../util/audio";
import Player from "../Controller/Player";
import {AvailableMusic} from "../../defination/music";
import styles from "./style.module.scss";
import placebo from '../../model/Placebo';

interface Props {
  lyric: string;

  translatedLyric: string;
}

const Lyric = (props: Props) => {

  const [nextIndex, setIndex] = useState(0);
  let timer: any;


  const formattedLyric = useMemo(() => {
    return formatLyric(props.lyric);
  }, [props.lyric]);

  const formattedTranslatedLyric = useMemo(() => {
    return formatLyric(props.translatedLyric);
  }, [props.translatedLyric]);

  const times = useMemo(() => {
    return Object.keys(formattedLyric);
  }, [formattedLyric]);

  useEffect(() => {
    timer = setInterval(() => {
      const time = Math.round(placebo.music.seekTime() * 1000);
      const nextIndex = times.findIndex(item => +item > time);
      setIndex(nextIndex);
      const lineEl = document.querySelector(`[data-lyric-line='${nextIndex - 1}']`) ??  document.querySelector(`[data-lyric-line='${nextIndex - 1}']`);
      lineEl?.scrollIntoView({ behavior: 'smooth' });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [times]);

  return (
    <div className={styles.wrapper}>
      {
        formattedLyric && times.length
        ? <div className={styles.lyric}>
            <ul className={styles.scroller}>
                    {
                      Object.entries(formattedLyric).map(([key, lyric], index) => {
                        return (
                          <li key={key} data-lyric-line={index} className={`${styles.scrollItem} ${nextIndex - 1 === times.indexOf(key) && styles.active}`}>
                            <div className={styles.lyricRow}>{ lyric }</div>
                            {
                              formattedTranslatedLyric &&
                              <div className={styles.tlyricRow}>{formattedTranslatedLyric[key] }</div>
                            }
                          </li>
                        );
                      })
                    }
            </ul>
          </div>
        : <div className={styles.empty}>No Lyric</div>
      }
    </div>

  );
};

export default Lyric;
