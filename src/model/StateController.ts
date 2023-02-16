import { RootState, store } from '../store/store'
import { togglePanel } from '../store/module/app'
import { switchMusic, updatePlayingStatus } from '../store/module/controller'
import { SwitchDirection } from '../defination/music'

class StateController {

  get showPanel() {
    return (state: RootState) => state.app.showPanel;
  }

  togglePlayingPanel(visible: boolean) {
    store.dispatch(togglePanel(visible))
  }

  updatePlayingStatus() {
    const playing = store.getState().controller.playingStatus;
    const nextState = !playing;
    store.dispatch(updatePlayingStatus(nextState));
  }

  switchPlayingMusic(direction: SwitchDirection) {
    store.dispatch(switchMusic(direction))
  }
}

export default StateController
