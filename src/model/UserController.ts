import {
  checkQrCodeStatus,
  getAccount,
  getLoginStatus,
  getQrCode,
  getQrKey,
  getUserDetail,
  getUserLikeList,
  refreshLoginStatus
} from '../api/user'
import placebo, { Placebo } from "./Placebo";
import { updateUserFavorites } from '../store/module/user'

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

  getLikedSongIds() {
    const { userId } = this.placebo.state.userProfile;
    if (!userId) return
    let list: number[] = [];
    try {
      // @ts-ignore
      const { ids } = await getUserLikeList(userId);
      list = ids;
    } catch (e) {
      list = []
    }
    this.placebo.state.favorites = list
  }


  likeSong() {

  }

}

export default UserController
