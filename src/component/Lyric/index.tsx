import React, {useCallback, useEffect, useState} from "react";
import { getLyric } from "../../api/music";
import {formatLyric} from "../../util/audio";
import Player from "../Controller/Player";
import {AvailableMusic} from "../../defination/music";
import styles from "./style.module.scss";

interface Props {
  music: AvailableMusic;
}

const Lyric = (props: Props) => {

  const { music } = props;
  const { id } = music;
  const [lyrics, setLyrics] = useState({});
  const [tLyrisc, setTLyrics] = useState<Record<string, any>>({});
  const [times, setTimes] = useState<string[]>([]);
  let [nextIndex, setIndex] = useState(0);
  let timer: any;

  const initLyric = useCallback(async (id: number) => {
    try {
      const { lrc, tlyric, nolyric, uncollected } = await getLyric(id);
      if (nolyric || uncollected) {
        setLyrics({});
        return;
      }
      const { lyric } = lrc;
      const { lyric: tLyric } = tlyric;
      let formattedLyric = formatLyric(lyric);
      setLyrics(formattedLyric);
      setTimes(Object.keys(formattedLyric));
      let formattedTLyric = tLyric ? formatLyric(tLyric) : {};
      setTLyrics(formattedTLyric);
    } catch (e) {
      setLyrics({});
    }
  }, []);

  useEffect(() => {
    initLyric(id);
  }, [id]);

  useEffect(() => {
    const { id } = music;
    timer = setInterval(() => {
      const time = Math.round(Player.getCurrentTime() * 1000);
      const nextIndex = times.findIndex(item => +item > time);
      setIndex(nextIndex);
      const lineEl = document.querySelector(`[data-lyric-line='${nextIndex - 1}']`) ??  document.querySelector(`[data-lyric-line='${nextIndex - 1}']`);
      lineEl?.scrollIntoView({ behavior: 'smooth' });
    }, 1000);

    return () => {
      clearInterval(timer);
    }
  }, [times]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.songInfo}>
        <h2> {music.name} </h2>
        <span>歌手: {music.artists.map(artist => artist.name).join('/')} </span>
      </div>
      {
        lyrics
        && <div className={styles.lyric}>
			  <ul className={styles.scroller}>
                {
                  Object.entries(lyrics).map(([key, lyric], index) => {
                    return (
                      <li key={key} data-lyric-line={index} className={`${styles.scrollItem} ${nextIndex - 1 === times.indexOf(key) && styles.active}`}>
                        <div className={styles.lyricRow}>{ lyric  as string}</div>
                        {
                          tLyrisc &&
                          <div className={styles.tlyricRow}>{tLyrisc[key] as string}</div>
                        }
                      </li>
                    )
                  })
                }
			  </ul>
		  </div>
      }
    </div>

  );
};

export default Lyric;