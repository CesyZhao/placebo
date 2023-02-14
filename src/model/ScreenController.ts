import { store } from '../store/store'
import { togglePanel } from '../store/module/app'
import { Placebo } from './Placebo'

class ScreenController {

  placebo: Placebo

  constructor(placebo: Placebo) {
    this.placebo = placebo
  }

  showPlayingPanel() {
    this.placebo.state.togglePlayingPanel(true)
  }

  hidePlayingPanel() {
    this.placebo.state.togglePlayingPanel(false)
  }
}

export default ScreenController