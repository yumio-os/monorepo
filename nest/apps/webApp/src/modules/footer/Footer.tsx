import { Component, JSXElement } from 'solid-js';

import { useAuth } from '../../providers/auth/Auth';

const Footer: Component = (): JSXElement => {
  const { authState, setAuthState } = useAuth();

  return (
    <>
      <div>Footer</div>
      <p>User is {authState().isAuthenticated ? 'logged in' : 'not logged in'}</p>
    </>
  );
};

export default Footer;
