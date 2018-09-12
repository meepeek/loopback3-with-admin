import { observable, action, toJS } from 'mobx';
import axios from 'axios'

const config = {
  url: 'http://localhost:3333',
  tokenName: 'meepeekToken'
}

class Auth {
  @observable state = {
    authenticated: false,
    visible: false,
    showSignup: false
  }
  @observable data = {
    clientId: null,
    token: localStorage.getItem(config.tokenName)
  }

  constructor() {
    this.init()
  }

  @action init = async () => {
    if (this.data.token && await this.checkToken( this.data.token )) {
      this.state.authenticated = true
    } else {
      this.data.token = null
      localStorage.removeItem(config.tokenName)
    }
  }
  // register client and get clientId
  @action register = async () => {}
  @action login = async (payload) => {
    await axios.post( `${config.url}/login`, payload )
      .then( r => {
        const {data} = r
        localStorage.setItem(config.tokenName, data.token)
        this.data.token = data.token
      } )
      .catch( e => {
        throw {message: 'Incorrect username or password'}
      } )
  }
  @action logout = async () => {
    await this.post( 'SystemUsers/logout' ).catch( this.reportError )
    this.data.token = null
    localStorage.removeItem(config.tokenName)
    this.state.authenticated = false
  }
  @action signup = async (payload) => {
    await axios.post( `${config.url}/signup`, payload )
      .then( r => {
        const {email, password} = payload
        this.login({email, password})
        this.state.visible = false
        this.state.showSignup = false
      } )
      .catch(e => {
        throw {message: 'Unable to signup, please try again'}
      })
  }
  @action post = async (path, payload) => {
    return await axios.post( `${config.url}/api/${path}?access_token=${this.data.token}`, payload )
      .then( r => { return {error: false, data: r.data } } )
      .catch(e => {return {error: true, data: e}})
  }
  @action checkToken = async () => {
    return true // currently not implemented
  }
  @action checkEmailExist = async (email) => {
    return await axios.post( `${url}/checkEmail`, {email} )
      .then( r => { return true } )
      .catch(e => { throw {message: 'Email already been used'} })
  }
  @action toggleShowSignup = () => {this.state.showSignup = !this.state.showSignup}
  @action toggleVisible = () => {this.state.visible = !this.state.visible}
}

const auth = new Auth()
export default auth
