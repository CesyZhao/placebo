import { RootState, store } from '../store/store'
import { togglePanel } from '../store/module/app'
import {
  playingAlbum,
  switchMusic,
  updateMode, updatePlayingAlbum,
  updatePlayingMusic,
  updatePlayingStatus
} from '../store/module/controller'
import { SwitchDirection } from '../defination/music'
import { updateUser } from '../store/module/user';

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

  set currentMusic(music: any) {
    store.dispatch(updatePlayingMusic(music));
  }

  get playMode() {
    return (state: RootState) => state.controller.mode;
  }

  get favorites() {
    return (state: RootState) => state.user.userFavorites;
  }

  get currentAlbum(): any {
    return (state: RootState) => state.controller.playingAlbum;
  }

  set currentAlbum(album: any) {
    store.dispatch(updatePlayingAlbum(album));
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
    store.dispatch(updateUser(profile))
  }

  switchPlayingMusic(direction: SwitchDirection) {
    store.dispatch(switchMusic(direction));
  }

  switchPlayMode() {
    store.dispatch(updateMode());
  }
}

export default StateController
