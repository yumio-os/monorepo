/** @jsxImportSource solid-js */

import './index.css';

/* @refresh reload */
import { render } from 'solid-js/web';

import App from './App';

// const App: Component = () => {
//   return <div>Hello, Solid!</div>;
// };

const root = document.getElementById('root');

// if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
//   throw new Error('Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?');
// }

// render(() => <App />, root!);

if (root) {
  render(() => <App />, root);
}