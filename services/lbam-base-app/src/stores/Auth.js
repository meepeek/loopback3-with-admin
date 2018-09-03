import { observable, action } from 'mobx';
import axios from 'axios'

const url = 'http://localhost:3333'

export default class Auth {
  @observable status
  @observable formData
  @observable remoteData

  constructor() {
    this.status = {
      loginPass: false,
      loginFail: false,
      wait: false
    }
    this.formData = {}
    this.formData.login = {
      username: '',
      password: ''
    }
    const token = localStorage.getItem('meepeekToken')
    if (token) this.load(token)
  }

  @action formUpdate = (formName, field, value) => {
    this.formData[formName][field] = value
  }
  @action load = (token) => {
    this.token = token
    this.status.loginFail = false
    this.status.loginPass = true
  }
  @action login = async () => {
    this.status.wait = true
    const payload = this.formData.login
    const {error, data} = await axios.post( `${url}/login`, payload )
      .then( r => { return {error: false, data: r.data } } )
      .catch(e => {return {error: true, data: e}})
    if (error) this.status.loginFail = true
    else {
      localStorage.setItem('meepeekToken', data.token)
      this.load(data.token)
    }
    this.status.wait = false
  }
  @action logout = async () => {
    await this.post( 'SystemUsers/logout' )
    this.token = null
    localStorage.removeItem('meepeekToken')
    this.status.loginPass = false
  }
  @action post = async (path, payload) => {
    return await axios.post( `${url}/api/${path}?access_token=${this.token}`, payload )
      .then( r => { return {error: false, data: r.data } } )
      .catch(e => {return {error: true, data: e}})
  }
}
