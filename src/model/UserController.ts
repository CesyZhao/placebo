import { checkQrCodeStatus, getAccount, getQrCode, getQrKey, getUserDetail } from "../api/user";
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

  refreshLoginStatus() {
    
  }

}

export default UserController