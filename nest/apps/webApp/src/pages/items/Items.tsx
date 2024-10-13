import { Component, createEffect, createSignal, For, JSXElement, onMount } from 'solid-js';
import { render } from 'solid-js/web';

import { ApolloQueryResult } from '@apollo/client';

import { ApolloProvider, useApollo } from '../../providers/apollo/Apollo';
import {
  OpItemsInActiveMenuDocument,
  OpItemsInActiveMenuQuery,
  OpItemsInActiveMenuQueryVariables,
  OpItemsInLocationDocument,
  OpItemsInLocationForCollectionDocument,
  OpItemsInLocationForCollectionQuery,
  OpItemsInLocationForCollectionQueryVariables,
  OpItemsInLocationQuery,
  OpItemsInLocationQueryVariables,
  OpItemsInMenuForCollectionDocument,
  OpItemsInMenuForCollectionQuery,
  OpItemsInMenuForCollectionQueryVariables,
  OpItemsInSiteBrandForCollectionDocument,
  OpItemsInSiteBrandForCollectionQuery,
  OpItemsInSiteBrandForCollectionQueryVariables,
  OpItemsInSiteDocument,
  OpItemsInSiteForBrandDocument,
  OpItemsInSiteForBrandQuery,
  OpItemsInSiteForBrandQueryVariables,
  OpItemsInSiteForCollectionDocument,
  OpItemsInSiteForCollectionQuery,
  OpItemsInSiteForCollectionQueryVariables,
  OpItemsInSiteQuery,
  OpItemsInSiteQueryVariables,
  OpSite,
  OpTopLineItem,
  Pagination,
  PaginationMeta,
  SingleOpSiteDocument,
  SingleOpSiteQuery,
  SingleOpSiteQueryVariables,
} from '../../providers/apollo/gql';
import { AuthProvider } from '../../providers/auth/Auth';

const root = document.getElementById('root');

export enum ItemDisplayType {
  SITEBRAND = 'sitebrand',
  SITEBRANDTAG = 'sitebrandtag',
  MENUTAG = 'menutag',
  LOCATIONTAG = 'locationtag',
  SITETAG = 'sitetag',
  SITE = 'site',
  LOCATION = 'location',
  ACTIVEMENU = 'activemenu',
}

const Items: Component = (): JSXElement => {
  // Create a signal to store the ID from the URL
  const [mode, setMode] = createSignal<ItemDisplayType | null>(null);
  const [siteId, setSiteId] = createSignal<string | null>(null);
  const [locationId, setLocationId] = createSignal<string | null>(null);
  const [menuId, setMenuId] = createSignal<string | null>(null);
  const [brandId, setBrandId] = createSignal<string | null>(null);
  const [tagMenuId, setTagMenuId] = createSignal<string | null>(null);

  // TEMP ======= this should come from above
  const [site, setSiteData] = createSignal<OpSite | null>(null);
  // TEMP ======= this should come from above

  const [paginationMeta, setPaginationMeta] = createSignal<PaginationMeta | null>(null);
  const [pagination, setPagination] = createSignal<Pagination | null>(null);

  const [itemsData, setItems] = createSignal<OpTopLineItem[] | null>(null);
  const [errorItemsState, setErrorItemsState] = createSignal<any>(null);
  const [loadingState, setLoadingState] = createSignal(true);

  const client = useApollo();

  const extractIdsFromUrl = () => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', '')); // Remove the '#' and parse

    const siteId = params.get('siteId');
    const locationId = params.get('locationId');
    const brandId = params.get('brandId');
    const menuId = params.get('menuId');
    const tagMenuId = params.get('tagMenuId');

    const mode = params.get('mode');

    if (siteId) {
      setSiteId(siteId);
    }

    if (locationId) {
      setLocationId(locationId);
    }

    if (menuId) {
      setMenuId(menuId);
    }

    if (brandId) {
      setBrandId(brandId);
    }

    if (tagMenuId) {
      setTagMenuId(tagMenuId);
    }

    if (mode) {
      setMode(mode as ItemDisplayType);
    }
  };

  onMount(() => {
    extractIdsFromUrl();
    // Optional: Listen to hash changes in the URL if you want to react to changes
    window.addEventListener('hashchange', extractIdsFromUrl);
    // Clean up event listener when component is unmounted
    return () => {
      window.removeEventListener('hashchange', extractIdsFromUrl);
    };
  });

  createEffect(() => {
    // TEMP ============== this should come from parent component
    if (siteId()) {
      client
        .query<SingleOpSiteQuery, SingleOpSiteQueryVariables>({
          query: SingleOpSiteDocument,
          variables: {
            siteId: Number(siteId()),
          },
        })
        .then((result) => {
          console.log(result.data.opSite);
          setSiteData(result.data.opSite);
        })
        .catch((err) => {
          setSiteData({ currencyCode: 'USD', currencySymbol: '$' } as OpSite);
        });
    }
    //  TEMP ============== this should come from parent component
    type Results = OpItemsInSiteQuery;

    let query: Promise<ApolloQueryResult<Results>>;
    if (mode() == ItemDisplayType.SITEBRANDTAG && siteId() && brandId() && tagMenuId()) {
      query = client.query<OpItemsInSiteBrandForCollectionQuery, OpItemsInSiteBrandForCollectionQueryVariables>({
        query: OpItemsInSiteBrandForCollectionDocument,
        variables: {
          siteId: Number(siteId()),
          brandId: Number(brandId()),
          tagMenuId: Number(tagMenuId()),
          pagination: pagination() || undefined,
        },
      });
    } else if (mode() == ItemDisplayType.MENUTAG && tagMenuId() && menuId()) {
      query = client.query<OpItemsInMenuForCollectionQuery, OpItemsInMenuForCollectionQueryVariables>({
        query: OpItemsInMenuForCollectionDocument,
        variables: {
          menuId: Number(menuId()),
          tagMenuId: Number(tagMenuId()),
          pagination: pagination() || undefined,
        },
      });
    } else if (mode() == ItemDisplayType.LOCATIONTAG && tagMenuId() && locationId()) {
      query = client.query<OpItemsInLocationForCollectionQuery, OpItemsInLocationForCollectionQueryVariables>({
        query: OpItemsInLocationForCollectionDocument,
        variables: {
          locationId: Number(locationId()),
          tagMenuId: Number(tagMenuId()),
          pagination: pagination() || undefined,
        },
      });
    } else if (mode() == ItemDisplayType.SITETAG && siteId() && tagMenuId()) {
      query = client.query<OpItemsInSiteForCollectionQuery, OpItemsInSiteForCollectionQueryVariables>({
        query: OpItemsInSiteForCollectionDocument,
        variables: {
          siteId: Number(siteId()),
          tagMenuId: Number(tagMenuId()),
          pagination: pagination() || undefined,
        },
      });
    } else if (mode() == ItemDisplayType.SITEBRAND && siteId() && brandId()) {
      query = client.query<OpItemsInSiteForBrandQuery, OpItemsInSiteForBrandQueryVariables>({
        query: OpItemsInSiteForBrandDocument,
        variables: {
          siteId: Number(siteId()),
          brandId: Number(brandId()),
          pagination: pagination() || undefined,
        },
      });
    } else if (mode() == ItemDisplayType.SITE && siteId()) {
      query = client.query<OpItemsInSiteQuery, OpItemsInSiteQueryVariables>({
        query: OpItemsInSiteDocument,
        variables: {
          siteId: Number(siteId()),
          pagination: pagination() || undefined,
        },
      });
    } else if (mode() == ItemDisplayType.LOCATION && locationId()) {
      query = client.query<OpItemsInLocationQuery, OpItemsInLocationQueryVariables>({
        query: OpItemsInLocationDocument,
        variables: {
          locationId: Number(locationId()),
          pagination: pagination() || undefined,
        },
      });
    } else if (mode() == ItemDisplayType.ACTIVEMENU && menuId()) {
      query = client.query<OpItemsInActiveMenuQuery, OpItemsInActiveMenuQueryVariables>({
        query: OpItemsInActiveMenuDocument,
        variables: {
          menuId: Number(menuId()),
          pagination: pagination() || undefined,
        },
      });
    } else {
      setLoadingState(false);
      setPaginationMeta(null);
      setErrorItemsState('Operation not supported');
      return;
    }

    query
      .then((result) => {
        console.log(result.data);
        setLoadingState(false);
        setItems((result?.data?.itemsWithPagination?.items as OpTopLineItem[]) ?? []);
        setPaginationMeta(result?.data?.itemsWithPagination?.pagination);
      })
      .catch((err) => {
        setLoadingState(false);
        setItems(null);
        setPaginationMeta(null);
        setErrorItemsState(err);
      });
  });

  return (
    <>
      <div class={`d-flex justify-content-center align-items-center px-5 py-2`}>
        {loadingState() && <p>Loading items...</p>}
        {errorItemsState() && <p>Error: {errorItemsState()}</p>}

        {itemsData() && !loadingState() && (
          <div class="row row-cols-1 row-cols-md-3 g-4">
            <For each={itemsData()}>
              {(item, index) => (
                <div class="col">
                  <div class="card h-100">
                    <img src={item?.images?.default || 'https://via.placeholder.com/150'} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">{item?.name}</h5>
                      <p class="card-text">
                        This is a longer card with supporting text below as a natural lead-in to additional content. This content is a
                        little bit longer.
                      </p>
                      <p>
                        {site()?.currencySymbol ?? ''}
                        {((item?.price ?? 0) / 100).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </For>
          </div>
        )}

        {/* <div>Pagination Ctrl</div> */}

        {/* Fallback if no site data is available */}
        {!itemsData() && !loadingState() && <p>No Items found</p>}
      </div>
    </>
  );
};

if (root) {
  render(
    () => (
      <AuthProvider>
        <ApolloProvider>
          <Items />
        </ApolloProvider>
      </AuthProvider>
    ),
    root,
  );
}

export default Items;
