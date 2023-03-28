import React, { FC, useCallback, useMemo, useState } from 'react'
import { useAppSelector } from '../../store/hooks';
import placebo from '../../model/Placebo';
import styles from './style.module.scss';
import { useMount } from 'ahooks/es'
import { SearchResultMap, SearchType, SearchTypeList } from '../../defination/search'
import { debounce } from 'lodash'
import InfiniteList from '../InfiniteList'



const Search: FC = () => {

  const showSearch = useAppSelector(placebo.screen.showSearch);
  const [currentType, setCurrentType] = useState(SearchTypeList[0].type);
  const [lastType, setLastType] = useState<SearchType>();

  const [result, setResult] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handleSearch = useCallback(debounce(async (e) => {
    const { target: { value } } = e;
    console.log(value, '-------------');
    const searchResult = await placebo.screen.search(value, currentType, page);
    const result = searchResult[SearchResultMap.get(currentType) + 's'];
    const finalResult = lastType === currentType && page > 0 ? [...result, ...searchResult] : [...searchResult];
    setResult(finalResult);
    setTotalCount(result[SearchResultMap.get(currentType) + 'Count']);
    setLastType(currentType);
    setPage(page + 1);
  }, 500), [currentType, page, lastType])

  useMount(() => {
    placebo.screen.toggleSearch(true);
  });


  const item = (props: any) => {
    const { index, data } = props;
    return (
      <div style={{ height: '30px' }}>{index}</div>
    )
  }

  const hasNextPage = useMemo(() => {
    return totalCount > result.length;
  }, [result, totalCount])

  return (
    showSearch
    ? <>
        <div className={styles.search}>
          <input type="text" placeholder="Search..." autoFocus onInput={handleSearch}/>
          <div className={styles.results}>
            <div className={styles.categories}>
              {
                SearchTypeList.map(t => {
                  return (
                    <div
                      key={t.type}
                      className={`${styles.category} ${currentType === t.type ? styles.active : ''}`}
                      onClick={() => setCurrentType(t.type)}> {t.name} </div>
                  )
                })
              }
            </div>
            <div>
              <InfiniteList isNextPageLoading={false} loadNextPage={() => {}} list={result} hasNextPage={hasNextPage} width={520} height={240} itemRenderer={item} />
            </div>
          </div>
        </div>
      </>
    : <></>
  )
};

export default Search;
