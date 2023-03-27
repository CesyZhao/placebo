export interface IInfiniteListProps {
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  list: any[];
  loadNextPage: Function;
  itemRenderer: any;
  width: number;
  height: number;
  itemSize?: number;
}
