import React from 'react'
import { formatList, getArtistNames } from '../../util/audio'
import styles from './style.module.scss'
import { formatDuration } from '../../util/number'

const Music = (props: any) => {
  const { index, data } = props;
  const list = formatList(data);
  const music = list[index];

  return (
    music
    ? <div className={styles.result}>
        <div className={styles.musicName}>{music.album.name}</div>
        <div className={styles.musicArtist}>{getArtistNames(music.artists)}</div>
        <div>{formatDuration(music.duration)}</div>
      </div>
    : <></>
  )
};

export default Music;
