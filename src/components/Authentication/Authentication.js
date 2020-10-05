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
