import React, { FC } from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader  from 'react-window-infinite-loader';
import { IInfiniteListProps } from '../../defination/list'


const InfiniteList: FC<IInfiniteListProps> = (props) => {

  const { hasNextPage, list, isNextPageLoading, loadNextPage, itemRenderer, itemSize = 30, data, ...otherProps } = props;


  const itemCount = hasNextPage ? list.length + 1 : list.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems: any = isNextPageLoading ? () => {} : loadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = ({ index }: any) => !hasNextPage || index < list.length;



  return (
    <InfiniteLoader isItemLoaded={isItemLoaded} loadMoreItems={loadMoreItems}
                    itemCount={itemCount}>
      {({onItemsRendered, ref}) => (
        <List
          itemSize={itemSize}
          itemCount={itemCount}
          ref={ref}
          itemData={data}
          onItemsRendered={onItemsRendered}
          {...otherProps}
        >
          { itemRenderer }
        </List>
      )}
    </InfiniteLoader>
  );
};

export default InfiniteList;
