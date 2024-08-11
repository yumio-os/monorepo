import { Component, JSXElement } from 'solid-js';
import { render } from 'solid-js/web';

import Footer from '../../modules/footer/Footer';
import Header from '../../modules/header/Header';
import Navigation from '../../modules/navigation/Navigation';
import { ApolloProvider } from '../../providers/apollo/Apollo';
import { AuthProvider } from '../../providers/auth/Auth';
import styles from './Sites.module.css';

const root = document.getElementById('root');

const Sites: Component = (): JSXElement => {
  return (
    <>
      <AuthProvider>
        <ApolloProvider>
          <Header />
          <Navigation />
          <div class={styles.Sites}>sites yu</div>asdf
          <Footer />
        </ApolloProvider>
      </AuthProvider>
    </>
  );
};

if (root) {
  render(() => <Sites />, root);
}

export default Sites;
