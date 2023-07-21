import { store } from '../store/store';
import { togglePanel } from '../store/module/app';
import { type Placebo } from './Placebo';
import { type SearchType } from '../defination/search';
import { search } from '../api/app';

class ScreenController {

  placebo: Placebo;

  constructor(placebo: Placebo) {
    this.placebo = placebo;
  }

  get showPanel() {
    return this.placebo.state.showPanel;
  }

  get showSearch() {
    return this.placebo.state.showSearch;
  }

  togglePanel(visible: boolean) {
    this.placebo.state.showPanel = visible;
  }

  toggleSearch(visible: boolean) {
    this.placebo.state.showSearch = visible;
  }

  async search(keyword: string, type: SearchType, page: number) {
    let result;
    try {
      const { result: searchResult } = await search(keyword, type, page);
      result = searchResult;
    } catch (e) {
      result = {};
    }

    return result;
  }
}

export default ScreenController;
