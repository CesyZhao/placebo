import { store } from '../store/store'
import { togglePanel } from '../store/module/app'
import { switchMusic, updatePlayingStatus } from '../store/module/controller'
import { SwitchDirection } from '../defination/music'

class StateController {
  togglePlayingPanel(visible: boolean) {
    store.dispatch(togglePanel(visible))
  }

  updatePlayingStatus(playing: boolean) {
    store.dispatch(updatePlayingStatus(playing));
  }

  switchPlayingMusic(direction: SwitchDirection) {
    store.dispatch(switchMusic(direction))
  }
}

export default StateController
