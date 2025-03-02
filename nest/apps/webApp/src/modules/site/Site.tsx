import { Component, createEffect, createSignal, onMount } from 'solid-js';

import { NavigationFuncs } from '../../pages/kiosk/Kiosk';
import { useApollo } from '../../providers/apollo/Apollo';
import {
  OpItemsInSiteQuery,
  OpItemsInSiteQueryVariables,
  OpOneSiteBrandQuery,
  OpOneSiteBrandQueryVariables,
  OpOneSiteBusinessQuery,
  OpOneSiteBusinessQueryVariables,
  OpOneSiteMenuTagsCategoryQuery,
  OpOneSiteMenuTagsCategoryQueryVariables,
  OpOneSiteMenuTagsCollectionQuery,
  OpOneSiteMenuTagsCollectionQueryVariables,
  OpOneSiteTagsQuery,
  OpOneSiteTagsQueryVariables,
  OpSiteQuery,
  TagType,
} from '../../providers/apollo/gql';
import {
  opItemsInSite,
  opOneSiteBrand,
  opOneSiteBusiness,
  opOneSiteMenuTagsCategory,
  opOneSiteMenuTagsCollection,
  opOneSiteTags,
} from '../../providers/apollo/queries/site';
import { useSite } from '../../providers/siteProvider/Site.provider';
import stylesSite from './Site.module.css';

interface SiteProfilesProps {
  navigate: NavigationFuncs;
  currentPage: string;
  params: {
    siteId: string;
  };
}

const Site: Component<SiteProfilesProps> = (props) => {
  // Create a signal to store the ID from the URL
  // const [siteData, setSiteData] = createSignal<OpSiteQuery['opSite'] | null>(null);
  const [brandsData, setBrandsData] = createSignal<OpSiteQuery['opSiteBrands'] | null>(null);
  const [businessData, setBusinessData] = createSignal<OpSiteQuery['opSiteBusiness'] | null>(null);
  const [tagsData, setTagsData] = createSignal<OpSiteQuery['opSiteTags'] | null>(null);
  const [menuTagsCollectionData, setMenuTagsCollectionData] = createSignal<OpSiteQuery['opSiteMenuTagsCollection'] | null>(null);
  const [menuTagsCategoryData, setMenuTagsCategoryData] = createSignal<OpSiteQuery['opSiteMenuTagsCategory'] | null>(null);
  const [itemsData, setItemsData] = createSignal<OpItemsInSiteQuery['opItemsInSite']['items'] | null>(null);

  const [errorSiteState, setErrorSiteState] = createSignal<any>(null);
  const [loadingState, setLoadingState] = createSignal(false);

  const { siteData, setSiteCurrentTag } = useSite();

  const client = useApollo();

  createEffect(() => {});

  onMount(async () => {
    if (props?.params?.siteId) {
      if (loadingState() == true) {
        return;
      }
      setLoadingState(true);

      await Promise.allSettled([
        // (async () => {
        //   setSiteData(
        //     await client
        //       .query<OpOneSiteQuery, OpOneSiteQueryVariables>({
        //         query: opOneSite,
        //         variables: {
        //           siteId: Number(props?.params?.siteId),
        //         },
        //       })
        //       .then((resp) => resp?.data?.opSite)
        //       .catch((_) => null),
        //   );
        // })(),
        (async () => {
          setItemsData(
            await client
              .query<OpItemsInSiteQuery, OpItemsInSiteQueryVariables>({
                query: opItemsInSite,
                variables: {
                  siteId: Number(props?.params?.siteId),
                  pagination: {
                    page: 1,
                    size: 10,
                  },
                },
              })
              .then((resp) => resp?.data?.opItemsInSite.items)
              .catch((_) => null),
          );
        })(),
        (async () => {
          setBrandsData(
            await client
              .query<OpOneSiteBrandQuery, OpOneSiteBrandQueryVariables>({
                query: opOneSiteBrand,
                variables: {
                  siteId: Number(props?.params?.siteId),
                },
              })
              .then((resp) => resp?.data?.opSiteBrands)
              .catch((_) => null),
          );
        })(),
        (async () => {
          setBusinessData(
            await client
              .query<OpOneSiteBusinessQuery, OpOneSiteBusinessQueryVariables>({
                query: opOneSiteBusiness,
                variables: {
                  siteId: Number(props?.params?.siteId),
                },
              })
              .then((resp) => resp?.data?.opSiteBusiness)
              .catch((_) => null),
          );
        })(),
        (async () => {
          setTagsData(
            await client
              .query<OpOneSiteTagsQuery, OpOneSiteTagsQueryVariables>({
                query: opOneSiteTags,
                variables: {
                  siteId: Number(props?.params?.siteId),
                },
              })
              .then((resp) => resp?.data?.opSiteTags)
              .catch((_) => null),
          );
        })(),
        (async () => {
          setMenuTagsCategoryData(
            await client
              .query<OpOneSiteMenuTagsCategoryQuery, OpOneSiteMenuTagsCategoryQueryVariables>({
                query: opOneSiteMenuTagsCategory,
                variables: {
                  siteId: Number(props?.params?.siteId),
                  type: TagType.Category,
                },
              })
              .then((resp) => resp?.data?.opSiteMenuTagsCategory)
              .catch((_) => null),
          );
        })(),
        (async () => {
          setMenuTagsCollectionData(
            await client
              .query<OpOneSiteMenuTagsCollectionQuery, OpOneSiteMenuTagsCollectionQueryVariables>({
                query: opOneSiteMenuTagsCollection,
                variables: {
                  siteId: Number(props?.params?.siteId),
                  type: TagType.Collection,
                },
              })
              .then((resp) => resp?.data?.opSiteMenuTagsCollection)
              .catch((_) => null),
          );
        })(),
      ]);

      setLoadingState(false);
      setErrorSiteState(null);
    }
  });

  return (
    <>
      <div class={`d-flex justify-content-center align-items-center ${stylesSite.Site} px-5 py-2`}>
        {loadingState() && <p>Loading site data...</p>}
        {errorSiteState() && <p>Error: {errorSiteState()}</p>}
        {/* Check if siteData exists */}
        {siteData() && (
          <div class="card text-center container-fluid p-0">
            <div class={`card-img-top overflow-hidden position-relative ${stylesSite.CustomImgContainer}`} x-alt={siteData().name}>
              <img
                src={siteData().images.default || 'https://via.placeholder.com/150'}
                class={`img-fluid ${stylesSite.CustomImg}`}
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

              {/* Items min 2 */}
              {itemsData() && itemsData()?.length > 0 && (
                <div id="siteCarouselBrands" class="my-2">
                  <h2 class="text-start">Items</h2>
                  <div class="container-fluid">
                    <div class="d-flex flex-row flex-nowrap overflow-auto">
                      {itemsData().map((brand) => (
                        <div class="col-sm-3">
                          <div class="card me-2">
                            <div class={`card-img-top overflow-hidden ${stylesSite.CustomCardImageContainer}`}>
                              <img
                                src={brand?.images?.default || 'https://via.placeholder.com/150'}
                                class={`img-fluid ${stylesSite.CustomImg}`}
                                alt={brand.name}
                              />
                            </div>
                            <div class="card-body">{brand?.name}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>Show all</div>
                </div>
              )}

              {/* BRAND min 2 */}
              {brandsData() && brandsData()?.length > 0 && (
                <div id="siteCarouselBrands" class="my-2">
                  <h2 class="text-start">Brands</h2>
                  <div class="container-fluid">
                    <div class="d-flex flex-row flex-nowrap overflow-auto">
                      {brandsData().map((brand) => (
                        <div class="col-sm-3">
                          <div class="card me-2">
                            <div class={`card-img-top overflow-hidden ${stylesSite.CustomCardImageContainer}`}>
                              <img
                                src={brand?.images?.default || 'https://via.placeholder.com/150'}
                                class={`img-fluid ${stylesSite.CustomImg}`}
                                alt={brand.name}
                              />
                            </div>
                            <div class="card-body">{brand?.name}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* BUSINESS  min 2*/}
              {businessData() && businessData()?.length > 0 && (
                <div id="siteCarouselBusiness" class="my-2">
                  <h2 class="text-start">Restaurants</h2>
                  <div class="container-fluid">
                    <div class="d-flex flex-row flex-nowrap overflow-auto">
                      {businessData().map((business) => (
                        <div class="col-sm-3">
                          <div class="card me-2">
                            <div class={`card-img-top overflow-hidden ${stylesSite.CustomCardImageContainer}`}>
                              <img
                                src={business?.images?.default || 'https://via.placeholder.com/150'}
                                class={`img-fluid ${stylesSite.CustomImg}`}
                                alt={business.name}
                              />
                            </div>
                            <div class="card-body">{business?.name}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CATEGORIES */}
              {menuTagsCategoryData() && menuTagsCategoryData()?.length > 0 && (
                <div id="siteCarouselmenuTags" title="categories" class="my-2">
                  <h2 class="text-start">Categories</h2>
                  <div class="container-fluid">
                    <div class="d-flex flex-row flex-nowrap overflow-auto">
                      {menuTagsCategoryData().map((menuTag) => (
                        <div class="col-sm-2">
                          <div
                            class="card me-2"
                            onClick={() => {
                              setSiteCurrentTag(menuTag.tag);
                              props.navigate.onNavigate('siteCollection', { siteId: props?.params?.siteId, collectionId: menuTag.tag.id });
                            }}
                          >
                            <div class={`card-img-top overflow-hidden ${stylesSite.CustomCardIconContainer}`}>
                              <img
                                src={menuTag?.images?.default || 'https://via.placeholder.com/150'}
                                class={`img-fluid ${stylesSite.CustomImg}`}
                                alt={menuTag.name}
                              />
                            </div>
                            <div class="card-body">{menuTag?.name}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SITE COLLECTIONS */}
              {menuTagsCollectionData() && menuTagsCollectionData()?.length > 0 && (
                <div id="siteCarouselmenuTags" title="collections" class="my-2">
                  <h2 class="text-start">Collections</h2>
                  <div class="container-fluid">
                    <div class="d-flex flex-row flex-nowrap overflow-auto">
                      {menuTagsCollectionData().map((menuTag) => (
                        <div class="col-sm-3">
                          <div
                            class="card me-2"
                            onClick={() => {
                              setSiteCurrentTag(menuTag.tag);
                              props.navigate.onNavigate('siteCollection', { siteId: props?.params?.siteId, collectionId: menuTag.tag.id });
                            }}
                          >
                            <div class={`card-img-top overflow-hidden ${stylesSite.CustomCardIconContainer}`}>
                              <img
                                src={menuTag?.images?.default || 'https://via.placeholder.com/150'}
                                class={`img-fluid ${stylesSite.CustomImg}`}
                                alt={menuTag.name}
                              />
                            </div>
                            <div class="card-body">{menuTag?.name}</div>
                          </div>
                        </div>
                      ))}
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

export default Site;
