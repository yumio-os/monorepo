import { Component, JSXElement } from 'solid-js';
import { render } from 'solid-js/web';

import Footer from '../../modules/footer/Footer';
import Header from '../../modules/header/Header';
import Navigation from '../../modules/navigation/Navigation';
import { ApolloProvider } from '../../providers/apollo/Apollo';
import { AuthProvider } from '../../providers/auth/Auth';
import styles from './Home.module.css';

const root = document.getElementById('root');

const Home: Component = (): JSXElement => {
  return (
    <>
      <AuthProvider>
        <ApolloProvider>
          <Header />
          <Navigation />
          <div class={styles.Home}>Hello World 5</div>
          <Footer />
        </ApolloProvider>
      </AuthProvider>
    </>
  );
};

if (root) {
  render(() => <Home />, root);
}

export default Home;
