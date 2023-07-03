import {
  checkQrCodeStatus,
  getAccount,
  getLoginStatus,
  getQrCode,
  getQrKey,
  getUserDetail,
  getUserLikeList, likeMusic,
  refreshLoginStatus
} from '../api/user'
import placebo, { Placebo } from "./Placebo";
import { updateUserFavorites } from '../store/module/user'
import music from '../component/Search/music'

class UserController {

  placebo: Placebo

  constructor(placebo: Placebo) {
    this.placebo = placebo;
  }

  get userProfile() {
    return this.placebo.state.userProfile;
  }


  getQrKeyString() {
    return getQrKey();
  }

  getQrUrl(key: string) {
    return getQrCode(key);
  }

  checkQrStatus(key: string) {
    return checkQrCodeStatus(key);
  }

  async getUserProfile() {
    const { profile } = await getAccount();
    const { level } = await getUserDetail(profile.userId);
    this.placebo.state.userProfile = { ...profile, level };
    this.getLikedSongIds();
  }

  async refreshLoginStatus() {
    try {
      const { profile } = await getLoginStatus()
      profile ? refreshLoginStatus() : (this.placebo.state.userProfile = {})
    } catch (error) {
      console.log(error)
      this.placebo.state.userProfile = {}
    }
  }

  async getLikedSongIds() {
    const { user } = this.placebo.state.getOriginalState();
    const { userProfile } = user;
    const { userId } = userProfile;

    let list: number[] = [];
    if (userId) {
      try {
        // @ts-ignore
        const { ids } = await getUserLikeList(userId);
        list = ids;
      } catch (e) {
        list = []
      }
    }
    this.placebo.state.favorites = list
  }


  async likeMusic(musicId: number) {
    try {
      await likeMusic(musicId)
      this.getLikedSongIds()
    } catch (e) {

    }
  }

}

export default UserController
