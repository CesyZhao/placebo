import { Placebo } from "./Placebo";

class UserController {

  placebo: Placebo

  constructor(placebo: Placebo) {
    this.placebo = placebo;
  }

  get userProfile() {
    return this.placebo.state.userProfile;
  }
}

export default UserController