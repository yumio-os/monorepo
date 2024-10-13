import { Component, createEffect, createSignal, For, JSXElement, onMount } from 'solid-js';
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
      <div class={`d-flex justify-content-center align-items-center ${styles.Site} px-5 py-2`}>
        {loadingState() && <p>Loading site data...</p>}
        {errorSiteState() && <p>Error: {errorSiteState()}</p>}

        {/* Check if siteData exists */}
        {siteData() && (
          <div class="card text-center container-fluid p-0">
            <div class={`card-img-top overflow-hidden position-relative ${styles.CustomImgContainer}`} title={siteData().name}>
              <img
                src={siteData().images.default || 'https://via.placeholder.com/150'}
                class={`img-fluid ${styles.CustomImg}`}
                alt={siteData().name}
              />
              {/* overlay this section over image, so it is on the bottom of card-img-top */}
              <div
                class="overlay-content position-absolute bottom-0 w-100 p-3 text-white text-start"
                style="background: rgba(0, 0, 0, 0.5);"
              >
                <h5 class="card-title m-0">{siteData().name}</h5>
                <p class="card-text m-0">Location Address and some other info</p>
              </div>
            </div>
            <div class="card-body">
              {/* TODO add configuerable elements */}

              {/* BRAND min 2 */}
              {brandsData() && brandsData()?.length > 0 && (
                <div id="siteCarouselBrands" class="my-2">
                  <div class="container-fluid">
                    <div class="d-flex flex-row flex-nowrap overflow-auto">
                      <For each={brandsData()}>
                        {(brand, index) => (
                          <div class="col-sm-3">
                            <div class="card me-2">
                              <div class={`card-img-top overflow-hidden ${styles.CustomCardImageContainer}`}>
                                <img
                                  src={brand?.images?.default || 'https://via.placeholder.com/150'}
                                  class={`img-fluid ${styles.CustomImg}`}
                                  alt={brand.name}
                                />
                              </div>
                              <div class="card-body">{brand?.name}</div>
                            </div>
                          </div>
                        )}
                      </For>
                    </div>
                  </div>
                </div>
              )}

              {/* BUSINESS  min 2*/}
              {businessData() && businessData()?.length > 0 && (
                <div id="siteCarouselBusiness" class="my-2">
                  <div class="container-fluid">
                    <div class="d-flex flex-row flex-nowrap overflow-auto">
                      <For each={businessData()}>
                        {(business, index) => (
                          <div class="col-sm-3">
                            <div class="card me-2">
                              <div class={`card-img-top overflow-hidden ${styles.CustomCardImageContainer}`}>
                                <img
                                  src={business?.images?.default || 'https://via.placeholder.com/150'}
                                  class={`img-fluid ${styles.CustomImg}`}
                                  alt={business.name}
                                />
                              </div>
                              <div class="card-body">{business?.name}</div>
                            </div>
                          </div>
                        )}
                      </For>
                    </div>
                  </div>
                </div>
              )}

              {/* CATEGORIES */}
              {menuTagsCategoryData() && menuTagsCategoryData()?.length > 0 && (
                <div id="siteCarouselmenuTags" title="categories" class="my-2">
                  <div class="container-fluid">
                    <div class="d-flex flex-row flex-nowrap overflow-auto">
                      <For each={menuTagsCategoryData()}>
                        {(menuTag, index) => (
                          <div class="col-sm-2">
                            <div class="card me-2">
                              <div class={`card-img-top overflow-hidden ${styles.CustomCardIconContainer}`}>
                                <img
                                  src={menuTag?.images?.default || 'https://via.placeholder.com/150'}
                                  class={`img-fluid ${styles.CustomImg}`}
                                  alt={menuTag.name}
                                />
                              </div>
                              <div class="card-body">{menuTag?.name}</div>
                            </div>
                          </div>
                        )}
                      </For>
                    </div>
                  </div>
                </div>
              )}

              {/* COLLECTIONS */}
              {menuTagsCollectionData() && menuTagsCollectionData()?.length > 0 && (
                <div id="siteCarouselmenuTags" title="collections" class="my-2">
                  <div class="container-fluid">
                    <div class="d-flex flex-row flex-nowrap overflow-auto">
                      <For each={menuTagsCollectionData()}>
                        {(menuTag, index) => (
                          <div class="col-sm-3">
                            <div class="card me-2">
                              <div class={`card-img-top overflow-hidden ${styles.CustomCardIconContainer}`}>
                                <img
                                  src={menuTag?.images?.default || 'https://via.placeholder.com/150'}
                                  class={`img-fluid ${styles.CustomImg}`}
                                  alt={menuTag.name}
                                />
                              </div>
                              <div class="card-body">{menuTag?.name}</div>
                            </div>
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
