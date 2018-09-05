import { observable, action } from 'mobx';

export default class UserProfileSetting {
  @observable userProfile
  @observable changePasswordInfo

  constructor() {
  }

  @action load() {}
  @action submit() {}
  @action reset() {}
}
