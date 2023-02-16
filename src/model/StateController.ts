import { RootState, store } from '../store/store'
import { togglePanel } from '../store/module/app'
import { playingAlbum, switchMusic, updatePlayingStatus } from '../store/module/controller'
import { SwitchDirection } from '../defination/music'

class StateController {

  get playingStatus() {
    return (state: RootState) => state.controller.playingStatus;
  }

  set playingStatus(newStatus: any) {
    store.dispatch(updatePlayingStatus(newStatus));
  }

  get currentMusic() {
    return (state: RootState) => state.controller.playingMusic;
  }
  get playMode() {
    return (state: RootState) => state.controller.mode;
  }

  get currentAlbum() {
    return (state: RootState) => state.controller.playingAlbum;
  }

  get showPanel() {
    return (state: RootState) => state.app.showPanel;
  }

  set showPanel(visible: any) {
    store.dispatch(togglePanel(visible))
  }

  togglePlayingPanel(visible: boolean) {
    store.dispatch(togglePanel(visible));
  }

  updatePlayingStatus(status: boolean) {
    store.dispatch(updatePlayingStatus(status));
  }

  switchPlayingMusic(direction: SwitchDirection) {
    store.dispatch(switchMusic(direction));
  }
}

export default StateController
