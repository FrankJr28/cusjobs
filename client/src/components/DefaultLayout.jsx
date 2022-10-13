import React, { useState } from 'react';
import Filter from './Filter';
import 'antd/dist/antd.css';
//import './index.css';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusSquareOutlined,
  PlusOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  HomeOutlined,
  CheckOutlined,
  LogoutOutlined
  
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header, Sider, Content } = Layout;

const DefaultLayout = (props) => {

  const logout=()=>{
    localStorage.removeItem('user')
    window.location.reload()
  }

  const ancho=()=>{
    if(window.innerWidth<=600){
      setCollapsed(!collapsed)
      console.log(window.innerWidth)
    }
  }

  const carga=()=>{
    console.log("ha cargado")
  }

  const [collapsed, setCollapsed] = useState(false);

  

  const user = JSON.parse(localStorage.getItem('user'))

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} breakpoint="lg" 
      onBreakpoint={() => {
        if(window.innerWidth<=990){
          setCollapsed(!collapsed)
        }
      }}
      style={{position:'sticky', overflow:'auto', top:'0'}}>
        <div className="logo">
          {collapsed ? (<h1>CJ</h1>) : (<h1>CusJobs</h1>)}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[window.location.pathname]}
          items={[
            {
              key: '/',
              icon: <HomeOutlined />,
              label: <Link to='/'>Home</Link>,
            },
            {
              key: '/profile',
              icon: <UserOutlined />,
              label: <Link to='/profile'>Profile</Link>,
            },
            {
              key: '/appliedjobs',
              icon: <PlusSquareOutlined />,
              label: <Link to='/appliedjobs'>Applied Jobs</Link>,
            },
            {
              key: '/postjobs',
              icon: <PlusOutlined />,
              label: <Link to='/postjob'>Post</Link>,
            },
            {
              key: '/posted',
              icon: <CheckOutlined />,
              label: <Link to='/posted'>Posted</Link>,
            },
            {
              key: '/logou',
              icon: <LogoutOutlined />,
              label: <Link onClick={logout}>Logout</Link>,
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            position:'sticky',
            overflow:'auto',
            top:'0',
            zIndex:10
          }}
        >

          <div style={{width: '100%',}} className='flex justify-content-between'>
            <div>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                  className: 'trigger',
                  onClick: () => setCollapsed(!collapsed),
                })}
            </div>

            <div>
                <Filter />
            </div>
          
            <div style={{display : collapsed ? 'none' : 'inline'}}>
              <h5 className='mr-2'><b>{user.username}</b></h5>
            </div>

          </div>

          
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;