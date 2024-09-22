import { Component, createEffect, createSignal, JSXElement, onMount } from 'solid-js';
import { render } from 'solid-js/web';

import { gql } from '@apollo/client';

import { ApolloProvider, useApollo } from '../../providers/apollo/Apollo';
import { OpSiteQuery, OpSiteQueryVariables } from '../../providers/apollo/gql';
import { AuthProvider } from '../../providers/auth/Auth';
import styles from './Site.module.css';

const root = document.getElementById('root');

const get_OpSite = gql`
  query OpSite($siteId: Int!) {
    opSite(siteId: $siteId) {
      id
      name
      shortName
      images {
        default
        defaultLowRes
        thumbnail
        thumbnailLowRes
      }
    }
  }
`;

const Site: Component = (): JSXElement => {
  // Create a signal to store the ID from the URL
  const [siteId, setSiteId] = createSignal<string | null>(null);
  const [siteData, setSiteData] = createSignal<OpSiteQuery['opSite'] | null>(null);
  const [errorSiteState, setErrorSiteState] = createSignal<any>(null);
  const [loadingState, setLoadingState] = createSignal(true);

  const client = useApollo();

  const extractSiteIdFromUrl = () => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', '')); // Remove the '#' and parse
    const id = params.get('id');
    setSiteId(id);
  };

  onMount(() => {
    extractSiteIdFromUrl();

    // Optional: Listen to hash changes in the URL if you want to react to changes
    window.addEventListener('hashchange', extractSiteIdFromUrl);

    // Clean up event listener when component is unmounted
    return () => {
      window.removeEventListener('hashchange', extractSiteIdFromUrl);
    };
  });

  createEffect(() => {
    if (siteId()) {
      client
        .query<OpSiteQuery, OpSiteQueryVariables>({
          query: get_OpSite,
          variables: { siteId: Number(siteId()) },
        })
        .then((result) => {
          setLoadingState(false);
          setSiteData(result.data.opSite);
        })
        .catch((err) => {
          setLoadingState(false);
          setErrorSiteState(err);
        });
    }
  });

  return (
    <>
      <div class={styles.Site}>
        {loadingState() && <p>Loading site data...</p>}
        {errorSiteState() && <p>Error: {errorSiteState()}</p>}

        {/* Check if siteData exists */}
        {siteData() && (
          <div class="d-flex justify-content-center align-items-center vh-100">
            <div class="card text-center" style="width: 18rem;">
              {siteData().images.thumbnail && <img src={siteData().images.thumbnail} class="card-img-top" alt={siteData().name} />}
              {!siteData().images.thumbnail && <img src="https://via.placeholder.com/150" class="card-img-top" alt={siteData().name} />}
              <div class="card-body">
                <h5 class="card-title">{siteData().name}</h5>
                <p class="card-text">{siteData().description}</p>
                <a href="#" class="btn btn-primary">
                  View Menu
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Fallback if no site data is available */}
        {!siteData() && !loadingState() && <p>No Site ID found</p>}
      </div>
    </>
  );
};

if (root) {
  render(
    () => (
      <AuthProvider>
        <ApolloProvider>
          <Site />
        </ApolloProvider>
      </AuthProvider>
    ),
    root,
  );
}

export default Site;
