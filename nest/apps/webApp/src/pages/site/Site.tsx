import { Component, createEffect, createSignal, JSXElement, onMount } from 'solid-js';
import { render } from 'solid-js/web';

import { ApolloProvider, useApollo } from '../../providers/apollo/Apollo';
import { OpSiteDocument, OpSiteQuery, OpSiteQueryVariables, TagType } from '../../providers/apollo/gql';
import { AuthProvider } from '../../providers/auth/Auth';
import styles from './Site.module.css';

const root = document.getElementById('root');

const Site: Component = (): JSXElement => {
  // Create a signal to store the ID from the URL
  const [siteId, setSiteId] = createSignal<string | null>(null);
  const [siteData, setSiteData] = createSignal<OpSiteQuery['opSite'] | null>(null);
  const [brandsData, setBrandsData] = createSignal<OpSiteQuery['opSiteBrands'] | null>(null);
  const [businessData, setBusinessData] = createSignal<OpSiteQuery['opSiteBusiness'] | null>(null);
  const [tagsData, setTagsData] = createSignal<OpSiteQuery['opSiteTags'] | null>(null);
  const [menuTagsCollectionData, setMenuTagsCollectionData] = createSignal<OpSiteQuery['opSiteMenuTagsCollection'] | null>(null);
  const [menuTagsCategoryData, setMenuTagsCategoryData] = createSignal<OpSiteQuery['opSiteMenuTagsCategory'] | null>(null);

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
          query: OpSiteDocument,
          variables: {
            siteId: Number(siteId()),
            typeCategory: TagType.Category,
            typeCollection: TagType.Collection,
          },
        })
        .then((result) => {
          setLoadingState(false);
          setSiteData(result.data.opSite);
          setBrandsData(result.data.opSiteBrands);
          setBusinessData(result.data.opSiteBusiness);
          setTagsData(result.data.opSiteTags);
          setMenuTagsCategoryData(result.data.opSiteMenuTagsCategory);
          setMenuTagsCollectionData(result.data.opSiteMenuTagsCollection);
        })
        .catch((err) => {
          setLoadingState(false);
          setErrorSiteState(err);
        });
    }
  });

  return (
    <>
      <div class={`d-flex justify-content-center align-items-center vh-100 ${styles.Site} p-5`}>
        {loadingState() && <p>Loading site data...</p>}
        {errorSiteState() && <p>Error: {errorSiteState()}</p>}

        {/* Check if siteData exists */}
        {siteData() && (
          <div class="card text-center container-fluid">
            {siteData().images.default && <img src={siteData().images.default} class="card-img-top" alt={siteData().name} />}
            {!siteData().images.default && <img src="https://via.placeholder.com/150" class="card-img-top" alt={siteData().name} />}
            <div class="card-body">
              <h5 class="card-title">{siteData().name}</h5>
              {/* <!--- replace --> */}
              <p class="card-text">{siteData().name}</p>

              {/* TODO add configuerable elements */}

              {/* BRAND */}
              {brandsData() && brandsData()?.length > 1 && (
                <div id="siteCarouselBrands">
                  <div class="container-fluid">
                    <div class="d-flex flex-row flex-nowrap overflow-auto">
                      <For each={brandsData()}>
                        {(brand, index) => (
                          <div class="col-sm-3">
                            <div class="card card-body">{brand?.name}</div>
                          </div>
                        )}
                      </For>
                    </div>
                  </div>
                </div>
              )}

              {/* BUSINESS */}
              {businessData() && businessData()?.length > 1 && (
                <div id="siteCarouselBusiness">
                  <div class="container-fluid">
                    <div class="d-flex flex-row flex-nowrap overflow-auto">
                      <For each={businessData()}>
                        {(business, index) => (
                          <div class="col-sm-3">
                            <div class="card card-body">{business?.name}</div>
                          </div>
                        )}
                      </For>
                    </div>
                  </div>
                </div>
              )}

              {/* CATEGORIES */}
              {menuTagsCategoryData() && menuTagsCategoryData()?.length > 0 && (
                <div id="siteCarouselmenuTags" title="categories">
                  <div class="container-fluid">
                    <div class="d-flex flex-row flex-nowrap overflow-auto">
                      <For each={menuTagsCategoryData()}>
                        {(menuTag, index) => (
                          <div class="col-sm-3">
                            <div class="card card-body">{menuTag?.name}</div>
                          </div>
                        )}
                      </For>
                    </div>
                  </div>
                </div>
              )}

              {/* COLLECTIONS */}
              {menuTagsCollectionData() && menuTagsCollectionData()?.length > 0 && (
                <div id="siteCarouselmenuTags" title="collections">
                  <div class="container-fluid">
                    <div class="d-flex flex-row flex-nowrap overflow-auto">
                      <For each={menuTagsCollectionData()}>
                        {(menuTag, index) => (
                          <div class="col-sm-3">
                            <div class="card card-body">{menuTag?.name}</div>
                          </div>
                        )}
                      </For>
                    </div>
                  </div>
                </div>
              )}
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
