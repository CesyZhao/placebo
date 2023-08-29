import React, { type FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import placebo from '../../model/Placebo';
import styles from './style.module.scss';
import { useMount } from 'ahooks/es';
import { SearchResultMap, SearchType, SearchTypeList } from '../../defination/search';
import { debounce } from 'lodash';
import Music from './music';
import Artist from './artist';
import Playlist from './playlist';
import User from './user';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '../Loading';
import { CSSTransition } from "react-transition-group";

const itemMap = new Map(
  [
    [SearchType.Music, Music],
    [SearchType.Artist, Artist],
    [SearchType.Playlist, Playlist],
    [SearchType.User, User]
  ]
);

const Search: FC = () => {

  const showSearch: boolean = useAppSelector(placebo.screen.showSearch);
  const [currentType, setCurrentType] = useState(SearchTypeList[0].type);
  const [lastType, setLastType] = useState<SearchType>(SearchTypeList[0].type);

  const [result, setResult] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSearch = useCallback((e: any) => {
    const { target: { value } } = e;
    setKeyword(value);
    setPage(1);
  }, [currentType]);

  const handleClear = () => {
    setKeyword('');
    setPage(1);
  };

  useEffect(debounce(() => {
    search(keyword, 1, currentType);
  }, 500, { leading: true }), [currentType, keyword]);

  const handleLoadNext = useCallback(() => {
    setPage(page + 1);
    search(keyword, page + 1, currentType);
  }, [keyword, currentType, page, result]);

  const search = async (keyword: string, page: number, type: SearchType) => {
    if (!keyword) return;
    setSearching(true);
    try {
      const searchResult = await placebo.screen.search(keyword, type, page);
      const newResult = searchResult[SearchResultMap.get(currentType) + 's'];
      const finalResult = lastType === currentType && page > 1 ? [...result, ...newResult] : [...newResult];
      setResult(finalResult);
      setTotalCount(searchResult[SearchResultMap.get(currentType) + 'Count']);
    } catch (e) {
      setResult([]);
      setTotalCount(0);
    }
    setSearching(false);
    setLastType(currentType);
  };

  const hasNextPage = useMemo(() => {
    return totalCount > result.length;
  }, [result, totalCount]);

  const nodeRef = useRef(null);

  return (
     <CSSTransition nodeRef={nodeRef} in={showSearch} timeout={200} unmountOnExit classNames="search-panel">
        <div ref={nodeRef} className={styles.searchPanel}>
          <div className={styles.inputWrapper}>
            <input type="text" placeholder="Search..." value={keyword} autoFocus onInput={handleSearch}/>
            { keyword && <i className="iconfont icon-close" onClick={handleClear}></i> }
          </div>
          <CSSTransition in={!!keyword} timeout={100} unmountOnExit classNames="results">
            <div className={styles.results}>
              <div className={styles.categories}>
                {
                  SearchTypeList.map(t => {
                    return (
                      <div
                        key={t.type}
                        className={`${styles.category} ${currentType === t.type ? styles.active : ''}`}
                        onClick={() => { setCurrentType(t.type); }}> {t.name} </div>
                    );
                  })
                }
              </div>
              <div className={styles.scrollWrapper}>
                {
                  !searching && result.length
                    ?  <InfiniteScroll
                      dataLength={result.length}
                      next={handleLoadNext}
                      hasMore={true}
                      height={240}
                      loader={<Loading />}
                    >
                      {
                        result.map(r => {
                          const Component = itemMap.get(currentType);
                          // @ts-expect-error
                          return <Component item={r} key={r.id}></Component>;
                        })
                      }
                    </InfiniteScroll>
                    : <div className={styles.empty}>No result</div>
                }
              </div>
            </div>
          </CSSTransition>
        </div>
      </CSSTransition>
  );
};

export default Search;
