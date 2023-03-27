import React, { FC, useCallback, useState } from 'react'
import { useAppSelector } from '../../store/hooks';
import placebo from '../../model/Placebo';
import styles from './style.module.scss';
import { useMount } from 'ahooks/es'
import { SearchTypeList } from '../../defination/search'
import { debounce } from 'lodash'
import InfiniteList from '../InfiniteList'



const Search: FC = () => {

  const showSearch = useAppSelector(placebo.screen.showSearch);
  const [currentType, setCurrentType] = useState(SearchTypeList[0].type);
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);

  const handleInput = useCallback(debounce(async (e) => {
    const { target: { value } } = e;
    console.log(value, '-------------');
    const result = await placebo.screen.search(value, currentType, page);
    setResult(result.songs);
  }, 500), [currentType, page])

  useMount(() => {
    placebo.screen.toggleSearch(true);
  });


  const item = (props: any) => {
    console.log(props, '---------')
    const { index } = props;
    return (
      <div>{index}</div>
    )
  }

  return (
    showSearch
    ? <>
        <div className={styles.search}>
          <input type="text" placeholder="Search..." autoFocus onInput={handleInput}/>
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
              <InfiniteList isNextPageLoading={false} loadNextPage={() => {}} list={result} hasNextPage={false} width={200} height={150} itemRenderer={item} />
            </div>
          </div>
        </div>
      </>
    : <></>
  )
};

export default Search;
