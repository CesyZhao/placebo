import React, {
  ComponentProps,
  FormEvent,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState
} from 'react'
import {AvailableMusic} from "../../defination/music";
import styles from './style.module.scss';
import {formatDuration} from "../../util/number";
import { debounce } from "lodash";
import {useMount} from "ahooks";


interface Props extends ComponentProps<any> {
  list: AvailableMusic[];
  currentSongId: number;
  handleSongPlay: (index: number, song: AvailableMusic) => void;
}

const List = forwardRef((props: Props, ref) => {

  const [searching, setSearching] = useState(false);
  const [filterList, setList] = useState([] as AvailableMusic[]);

  useImperativeHandle(ref, () => {
    return {
      search
    }
  })

  const search = useCallback((status: boolean) => {
    setSearching(status);
    if (!status) setList(props.list);
  }, []);

  const onSearch = useCallback(debounce((e: FormEvent) => {
    const { target } = e;
    const { value } = target as any;
    const filterList = props.list.filter(song => song.name.includes(value));
    setList(filterList);
  }, 500), []);

  const list = useMemo(() => {
    return searching ? filterList : props.list;
  }, [searching, props])

  return (
    <div className={styles.wrapper}>
      {
        searching
          ? <div className={styles.header}>
              <input type="text" placeholder="Search..." onInput={onSearch}/>
              <i className="iconfont icon-close" onClick={() => search(false)}></i>
            </div>
          : <div className={styles.header}>
              <div className={styles.td}>TRACK</div>
              {/*<div className={styles.td} onClick={() => search(true)}>NAME</div>*/}
              {/*<div className={styles.td}>ARTIST</div>*/}
              <div className={styles.td}>TIME</div>
            </div>
      }
      {
        list?.length
         ? <div className={styles.songs}>
            {
              list.map((song, index) => {
                return <div className={styles.song} key={song.id} onDoubleClick={() => props.handleSongPlay(index, song)}>
                  {
                    song.id === props.currentSongId
                      ? <div className={styles.indicator}> <div> <i className="iconfont icon-ios-pause"></i> </div> </div>
                      : <span> { index + 1 } </span>
                  }
                  <span>{ song.name }</span>
                  <span>{ formatDuration(song.duration) }</span>
                </div>
              })
            }
          </div>
          : <div className={styles.empty}>Nothing here...</div>
      }
    </div>
  )
})

export default List;
