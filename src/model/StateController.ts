import { RootState, store } from '../store/store'
import { togglePanel } from '../store/module/app'
import {playingAlbum, switchMusic, updateMode, updatePlayingStatus} from '../store/module/controller'
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

  get favorites() {
    return (state: RootState) => state.user.userFavorites;
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

  get userProfile() {
    return (state: RootState) => state.user.userProfile;
  }
  
  set userProfile(profile: any) {
//    store.dispatch()
  }

  switchPlayingMusic(direction: SwitchDirection) {
    store.dispatch(switchMusic(direction));
  }

  switchPlayMode() {
    store.dispatch(updateMode());
  }
}

export default StateController
