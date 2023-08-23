import {
  checkQrCodeStatus,
  getAccount,
  getLoginStatus,
  getQrCode,
  getQrKey,
  getUserDetail,
  getUserLikeList, likeMusic,
  refreshLoginStatus
} from '../api/user';
import placebo, { type Placebo } from "./Placebo";
import { updateUserFavorites } from '../store/module/user';
import music from '../component/Search/music';

class UserController {

  placebo: Placebo;

  constructor(placebo: Placebo) {
    this.placebo = placebo;
  }

  get userProfile() {
    return this.placebo.state.userProfile;
  }


  async getQrKeyString() {
    return await getQrKey();
  }

  async getQrUrl(key: string) {
    return await getQrCode(key);
  }

  async checkQrStatus(key: string) {
    return await checkQrCodeStatus(key);
  }

  async getUserProfile() {
    const { profile } = await getAccount();
    const { level } = await getUserDetail(profile.userId);
    this.placebo.state.userProfile = { ...profile, level };
    this.getLikedSongIds();
  }

  async refreshLoginStatus() {
    try {
      const { profile } = await getLoginStatus();
      profile ? refreshLoginStatus() : (this.placebo.state.userProfile = {});
    } catch (error) {
      console.log(error);
      this.placebo.state.userProfile = {};
    }
  }

  async getLikedSongIds() {
    const { user } = this.placebo.state.getOriginalState();
    const { userProfile } = user;
    const { userId } = userProfile;

    let list: number[] = [];
    if (userId) {
      try {
        const { ids } = await getUserLikeList(userId);
        list = ids;
      } catch (e) {
        list = [];
      }
    }
    this.placebo.state.favorites = list;
  }


  async likeMusic(musicId: number) {
    try {
      await likeMusic(musicId);
      this.getLikedSongIds();
    } catch (e) {

    }
  }

}

export default UserController;
