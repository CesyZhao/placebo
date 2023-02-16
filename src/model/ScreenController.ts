import { store } from '../store/store'
import { togglePanel } from '../store/module/app'
import { Placebo } from './Placebo'

class ScreenController {

  placebo: Placebo

  constructor(placebo: Placebo) {
    this.placebo = placebo
  }

  get showPanel() {
    return this.placebo.state.showPanel;
  }

  togglePanel(visible: boolean) {
    this.placebo.state.showPanel = visible

  }
}

export default ScreenController
