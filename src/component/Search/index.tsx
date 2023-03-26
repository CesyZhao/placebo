import React, { FC, useState } from 'react'
import { useAppSelector } from '../../store/hooks';
import placebo from '../../model/Placebo';
import styles from './style.module.scss';
import { useMount } from 'ahooks/es'
import { SearchTypeList } from '../../defination/search'



const Search: FC = () => {

  const showSearch = useAppSelector(placebo.screen.showSearch);
  const [currentType, setCurrentType] = useState(SearchTypeList[0].type);
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(0);
  useMount(() => {
    placebo.screen.toggleSearch(true);
  });

  return (
    showSearch
    ? <>
        <div className={styles.search}>
          <input type="text" placeholder="Search..." autoFocus/>
          <div className={styles.results}>
            <div className={styles.categories}>
              {
                SearchTypeList.map(t => {
                  return (
                    <div
                      className={`${styles.category} ${currentType === t.type ? styles.active : ''}`}
                      onClick={() => setCurrentType(t.type)}> {t.name} </div>
                  )
                })
              }
            </div>
          </div>
        </div>
      </>
    : <></>
  )
};

export default Search;
