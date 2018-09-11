import { observable, action, toJS } from 'mobx';
import axios from 'axios'

const url = 'http://localhost:3333'

export default class Auth {
  @observable status
  @observable formValue
  @observable formState

  constructor() {
    this.status = {
      loginPass: false,
      loginFail: false,
      wait: false,
      signupFail: false,
    }
    this.formValue = {
      login: {
        email: '',
        password: ''
      }
    }
    this.formState = {
      login: {
        email: {
          validateStatus: '',
          help: ''
        },
        password: {
          validateStatus: '',
          help: ''
        }
      }
    }

    const token = localStorage.getItem('meepeekToken')
    if (token && token != 'undefined') this.load(token)
  }

  @action load = (token) => {
    this.token = token
    this.status.loginFail = false
    this.status.loginPass = true
  }
  @action signup = async (payload) => {
    this.status.wait = true
    await axios.post( `${url}/signup`, payload )
      .then( r => {
        const {email, password} = payload
        this.login({email, password})
      } )
      .catch(e => {
        this.status.signupFail = true
      })
    this.status.wait = false
  }
  @action login = async (payload) => {
    this.status.wait = true
    await axios.post( `${url}/login`, payload )
      .then( r => {
        const {data} = r
        localStorage.setItem('meepeekToken', data.token)
        this.load(data.token)
      } )
      .catch( e => {
        this.status.loginFail = true
      } )
    this.status.wait = false
  }
  @action logout = async () => {
    await this.post( 'SystemUsers/logout' ).catch( this.reportError )
    this.token = null
    localStorage.removeItem('meepeekToken')
    this.status.loginPass = false
  }
  @action post = async (path, payload) => {
    return await axios.post( `${url}/api/${path}?access_token=${this.token}`, payload )
      .then( r => { return {error: false, data: r.data } } )
      .catch(e => {return {error: true, data: e}})
  }
  @action checkEmailExist = async (email) => {
    return await axios.post( `${url}/checkEmail`, {email} )
      .then( r => { return true } )
      .catch(e => { return false })
  }

  // each client get a public uuid at startup, if user logn, switch to use account id to communicate with server
  // expect server to reply on all requests, if the server does not, send report
  @action getPublicId = async () => {}
  @action reportError = async (e) => {
    return {error: true }
  }
}
