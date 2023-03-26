export interface IInfiniteListProps {
  hasNextPage: boolean;
  isNextPageLoading: boolean;
  list: any[];
  loadNextPage: Function;
  rowRenderer: Function;
}
