import React from 'react'
import { formatList, formatMusic, getArtistNames } from '../../util/audio'
import styles from './style.module.scss'
import { formatDuration } from '../../util/number'

const Music = (props: any) => {
  const { item } = props;
  const music = formatMusic(item);

  return (
    music
    ? <div className={styles.result}>
        <div className={styles.musicName}>{music.name}</div>
        <div className={styles.musicArtist}>{getArtistNames(music.artists)}</div>
        <div>{formatDuration(music.duration)}</div>
      </div>
    : <div></div>
  )
};

export default Music;
