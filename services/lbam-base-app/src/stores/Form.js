import { observable, action } from 'mobx';

class BaseForm {
  @observable value = {}
  @observable state = {}

  constructor(fieldArray) {
    const self = this
    fieldArray.map( field => {
      self.value[field] = ''
      self.state[field] = {
        validateStatus: '',
        help: ''
      }
    } )
  }

  @action update = (field, value) => {
    this.value[field] = value
  }
  @action validate = (field) => {}
}

import Auth from './Auth'

export class Login extends BaseForm {
  constructor() {
    super( ['email', 'password'] )
  }
  @action submit = () => {
    Auth.login(this.value)
  }
}
export class Signup extends BaseForm {
  constructor() {
    super( ['email', 'password', 'passwordConfirm', 'gender', 'name', 'surname', 'birthdate'] )
  }
  @action submit = () => {
  }
}

export default {
  login: new Login(),
  signup: new Signup()
}
