import React, {
  type ComponentProps, createRef,
  type FormEvent,
  forwardRef,
  useCallback, useEffect,
  useImperativeHandle,
  useMemo, useRef,
  useState
} from 'react';
import {type AvailableMusic} from "../../defination/music";
import styles from './style.module.scss';
import {formatDuration} from "../../util/number";
import { debounce } from "lodash";
import {useMount} from "ahooks";
import { getArtistNames } from '../../util/audio';


interface Props extends ComponentProps<any> {
  list: AvailableMusic[];
  currentSongId: number;
  handleSongPlay: (index: number, song: AvailableMusic) => void;
}

const List = forwardRef((props: Props, ref) => {

  const [searching, setSearching] = useState(false);
  const [filterList, setList] = useState(props.list);
  const inputRef: any = createRef();

  useImperativeHandle(ref, () => {
    return {
      search
    };
  });

  const search = useCallback((status: boolean) => {
    setSearching(status);
  }, []);

  const onSearch = useCallback(debounce((e: FormEvent) => {
    const { target } = e;
    const { value } = target as any;
    console.log(value, '-----------')
    const filterList = value ? props.list.filter(song => song.name.includes(value)) : props.list;
    setList(filterList);
  }, 500), []);

  const list = useMemo(() => {
    return searching ? filterList : props.list;
  }, [searching, filterList, props]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [searching]);

  return (
    <div className={styles.wrapper}>
      {
        searching
          ? <div className={styles.header}>
              <input type="text" placeholder="Search..." onInput={onSearch} ref={inputRef}/>
              <i className="iconfont icon-close" onClick={() => { search(false); }}></i>
            </div>
          : <div className={styles.header}>
              <div className={styles.td}>TRACK</div>
              {/* <div className={styles.td} onClick={() => search(true)}>NAME</div> */}
              {/* <div className={styles.td}>ARTIST</div> */}
              <div className={styles.td}>TIME</div>
            </div>
      }
      {
        list?.length
         ? <div className={styles.songs}>
            {
              list.map((song, index) => {
                return <div className={`${styles.song} ${ song.id === props.currentSongId ? styles.active : null}`} key={song.id} onDoubleClick={() => { props.handleSongPlay(index, song); }}>
                  {
                    song.id === props.currentSongId
                      ? <div className={styles.indicator}> <div> <i className="iconfont icon-ios-pause"></i> </div> </div>
                      : <span> { index + 1 } </span>
                  }
                  <span>{ song.name }</span>
                  <span>{ getArtistNames(song.artists) }</span>
                  <span>{ formatDuration(song.duration) }</span>
                </div>;
              })
            }
          </div>
          : <div className={styles.empty}>Nothing here...</div>
      }
    </div>
  );
});

export default List;
