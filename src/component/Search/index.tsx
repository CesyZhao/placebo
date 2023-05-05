import React, { FC, useCallback, useMemo, useState } from 'react'
import { useAppSelector } from '../../store/hooks'
import placebo from '../../model/Placebo'
import styles from './style.module.scss'
import { useMount } from 'ahooks/es'
import { SearchResultMap, SearchType, SearchTypeList } from '../../defination/search'
import { debounce } from 'lodash'
import InfiniteList from '../InfiniteList'
import Music from './music'
import Artist from './artist'
import Playlist from './playlist'
import User from './user'


// @ts-ignore
const itemMap = new Map(
  [
    [SearchType.Music, Music],
    [SearchType.Artist, Artist],
    [SearchType.Playlist, Playlist],
    [SearchType.User, User]
  ]
)

const Search: FC = () => {

  const showSearch = useAppSelector(placebo.screen.showSearch)
  const [currentType, setCurrentType] = useState(SearchTypeList[0].type)
  const [lastType, setLastType] = useState<SearchType>()

  const [result, setResult] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [keyword, setKeyword] = useState('')
  const [searching, setSearching] = useState(false)

  const handleSearch = useCallback(debounce(async (e) => {
    const { target: { value } } = e
    setKeyword(value)
    search(value, page, currentType)
  }, 500), [result, currentType, page])

  const handleLoadNext = useCallback(() => {
    search(keyword, page, currentType)
  }, [keyword, currentType, page])

  const search = async (keyword: string, page: number, type: SearchType) => {
    setSearching(true)
    try {
      const searchResult = await placebo.screen.search(keyword, type, page)
      const newResult = searchResult[SearchResultMap.get(currentType) + 's']
      const finalResult = lastType === currentType && page > 0 ? [...result, ...newResult] : [...newResult]
      setResult(finalResult)
      setTotalCount(searchResult[SearchResultMap.get(currentType) + 'Count'])
      setPage(page + 1)
    } catch (e) {
      setResult([])
      setTotalCount(0)
    }
    setSearching(false)
    setLastType(currentType)
  }

  useMount(() => {
    placebo.screen.toggleSearch(true)
  })

  const item = useMemo(() => {
    return itemMap.get(currentType)
  }, [currentType])

  const hasNextPage = useMemo(() => {
    return totalCount > result.length
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
              <InfiniteList isNextPageLoading={searching} loadNextPage={handleLoadNext} list={result}
                            hasNextPage={hasNextPage} width={520} height={240} itemRenderer={item} data={result}/>
            </div>
          </div>
        </div>
      </>
      : <></>
  )
}

export default Search
