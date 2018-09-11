import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import LazyRoute from 'lazy-route';
import DevTools from 'mobx-react-devtools';

import { Layout, Menu, Breadcrumb, Modal } from 'antd';

const { Header, Content, Footer } = Layout;

@inject('store', 'routing', 'history')
@observer
export default class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {

		return (
			<Layout className="layout" location={this.props.routing.location} >
		    <Header>
		      <div className="logo" />
		      <Menu
		        theme="dark"
		        mode="horizontal"
		        defaultSelectedKeys={['2']}
		        style={{ lineHeight: '64px' }}
		      >
		        <Menu.Item key="1">nav 1</Menu.Item>
		        <Menu.Item key="2">nav 2</Menu.Item>
		        <Menu.Item className="float-right" key="3" onClick={() => this.props.history.push('/auth')}>Sign Up</Menu.Item>
		      </Menu>
		    </Header>
		    <Content style={{ padding: '0 50px' }}>
		      <Breadcrumb style={{ margin: '16px 0' }}>
		        <Breadcrumb.Item>Home</Breadcrumb.Item>
		        <Breadcrumb.Item>List</Breadcrumb.Item>
		        <Breadcrumb.Item>App</Breadcrumb.Item>
		      </Breadcrumb>
		      <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
					<Route
						exact
						path='/auth'
						render={props => (
							<LazyRoute {...props} component={import('./core/Auth')} />
						)}
					/>

					<Route
						exact
						path='/test'
						render={props => (
							<LazyRoute {...props} component={import('./UserProfileSetting')} />
						)}
					/>

					<Route
						exact
						path='/member'
						render={props => (
							<LazyRoute {...props} component={import('./Member')} />
						)}
					/>

					<Route
						exact
						path='/login'
						render={props => (
							<LazyRoute {...props} component={import('./Login')} />
						)}
					/>
					</div>
		    </Content>
		    <Footer style={{ textAlign: 'center' }}>
		      Ant Design ©2018 Created by Ant UED
		    </Footer>
		  </Layout>
		);
	}
}
