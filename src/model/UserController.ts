import { checkQrCodeStatus, getAccount, getLoginStatus, getQrCode, getQrKey, getUserDetail, refreshLoginStatus } from "../api/user";
import { Placebo } from "./Placebo";

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
  }

  async refreshLoginStatus() {
    try {
      const { profile } = await getLoginStatus()
      console.log(profile, '--------------')
      profile ? refreshLoginStatus() : (this.placebo.state.userProfile = {})
    } catch (error) {
      console.log(error)
      this.placebo.state.userProfile = {}
    }
  }

}

export default UserController
