import { observable, action } from 'mobx';

class BaseForm {
  @observable value = {}
  @observable state = {
    wait: false
  }

  constructor(fieldArray) {
    this.fieldArray = fieldArray
    this.reset()
  }

  @action reset = () => {
    const self = this
    this.fieldArray.map( field => {
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
  @action submit = async () => {
    this.state.wait = true
    await Auth.login(this.value)
      .then( r => {this.reset()} )
      .catch( e => console.log(e) )
    this.state.wait = false
  }
}
export class Signup extends BaseForm {
  constructor() {
    super( ['email', 'password', 'passwordConfirm', 'gender', 'name', 'surname', 'birthdate'] )
  }
  @action submit = async () => {
    this.state.wait = true
    await Auth.signup(this.value)
      .then( r => {this.reset()} )
      .catch( e => console.log(e) )
    this.state.wait = false
  }
}

export default {
  login: new Login(),
  signup: new Signup()
}
