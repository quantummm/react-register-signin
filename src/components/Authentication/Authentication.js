import React, { createContext } from "react";

import { CURRENT_USER } from "../../constants/applicationConstants";

import { getInitAuthData } from "../../utils/help";

import { authUrl, registUrl } from "../../config/url";
import request from "../../utils/request";

const initialAuthData = getInitAuthData();

const AuthenticationCtx = createContext({
  isAuthenticated: false,
  token: null,
  permissions: ["anonymous"],
});

export class AuthenticationManger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialAuthData,
    };
  }

  authenticate = async (email, password) => {
    const resp = await request(authUrl, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (resp.status === 200) {
      const currentUser = {
        isAuthenticated: true,
        token: "blabla...",
        permissions: ["admin"],
        currentUser: {
          email,
          password,
        },
      };

      localStorage.setItem(CURRENT_USER, JSON.stringify(currentUser));
      this.setState({ ...currentUser });
    }

    return resp;
  };

  //老师这边register是不是要想这样单独写一个方法，post数据进后端
  //那后面render 里面的authenticate还需要更改到authenticateRegister这个方法吗
  authenticateRegister = async (email, name, password) => {
    const resp = await request(registUrl, {
      method: "POST",
      body: JSON.stringify({
        email,
        name,
        password,
      }),
    });

    if (resp.status === 200) {
      const currentUser = {
        isAuthenticated: true,
        token: "blabla...",
        permissions: ["admin"],
        currentUser: {
          email,
          password,
        },
      };

      localStorage.setItem(CURRENT_USER, JSON.stringify(currentUser));
      this.setState({ ...currentUser });
    }
    return resp;
  };
  // 这个key authenticate 不是上面AuthenticationManger 中authenticate方法的名字
  // 是单独一个key,后面this.authenticate是方法
  // 所以在signin,signup里面的参数是那个key
  render = () => (
    <AuthenticationCtx.Provider
      value={{
        ...this.state,
        authenticate: this.authenticate,
        authenticateRegister: this.authenticateRegister,
      }}
    >
      {this.props.children}
    </AuthenticationCtx.Provider>
  );
}

export const Auth = ({ children }) => (
  <AuthenticationCtx.Consumer>
    {({
      isAuthenticated,
      authenticate,
      authenticateRegister,
      token,
      permissions = [],
    }) => {
      return children({
        isAuthenticated,
        authenticate,
        authenticateRegister,
        token,
        permissions,
      });
    }}
  </AuthenticationCtx.Consumer>
);

export const Guard = ({ allowed = [], children }) => (
  <Auth>
    {({ permissions }) => {
      if (permissions.some((permission) => allowed.includes(permission))) {
        return children;
      }
    }}
  </Auth>
);

export const withAuth = (Component) => (props) => (
  <Auth>
    {({
      isAuthenticated,
      authenticate,
      authenticateRegister,
      token,
      permissions = [],
    }) => (
      <Component
        {...props}
        isAuthenticated={isAuthenticated}
        authenticate={authenticate}
        authenticateRegister={authenticateRegister}
        token={token}
        permissions={permissions}
      />
    )}
  </Auth>
);
