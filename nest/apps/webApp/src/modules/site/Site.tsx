import { Component, createEffect, createSignal, onMount } from 'solid-js';

import { NavigationFuncs } from '../../pages/kiosk/Kiosk';
import { useApollo } from '../../providers/apollo/Apollo';
import {
  OpItemsInSiteQuery,
  OpItemsInSiteQueryVariables,
  OpOneSiteBrandQuery,
  OpOneSiteBrandQueryVariables,
  OpOneSiteMenuTagsCategoryQuery,
  OpOneSiteMenuTagsCategoryQueryVariables,
  OpOneSiteMenuTagsCollectionQuery,
  OpOneSiteMenuTagsCollectionQueryVariables,
  OpOneSiteTagsQuery,
  OpOneSiteTagsQueryVariables,
  OpSiteLocationQuery,
  OpSiteLocationQueryVariables,
  OpSiteQuery,
  TagType,
} from '../../providers/apollo/gql';
import {
  opItemsInSite,
  opOneSiteBrand,
  opOneSiteMenuTagsCategory,
  opOneSiteMenuTagsCollection,
  opOneSiteTags,
  OpSiteLocation,
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
  const [brandsData, setBrandsData] = createSignal<OpSiteQuery['opSiteBrands']>([]);
  const [locationData, setLocationData] = createSignal<OpSiteLocationQuery['opSiteLocation']>([]);

  const [tagsData, setTagsData] = createSignal<OpSiteQuery['opSiteTags']>([]);
  const [menuTagsCollectionData, setMenuTagsCollectionData] = createSignal<OpSiteQuery['opSiteMenuTagsCollection']>([]);
  const [menuTagsCategoryData, setMenuTagsCategoryData] = createSignal<OpSiteQuery['opSiteMenuTagsCategory']>([]);
  const [itemsData, setItemsData] = createSignal<OpItemsInSiteQuery['opItemsInSite']['items']>([]);

  const [errorSiteState, setErrorSiteState] = createSignal<any>(null);
  const [loadingState, setLoadingState] = createSignal(false);

  const { siteData, setSiteCurrentTag, setSiteCurrentLocation } = useSite();

  const client = useApollo();

  createEffect(() => {});

  onMount(async () => {
    if (props?.params?.siteId) {
      if (loadingState() == true) {
        return;
      }
      setLoadingState(true);

      await Promise.allSettled([
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
              .catch((e) => {
                console.log(e);
                return [];
              }),
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
              .catch((e) => {
                console.log(e);
                return [];
              }),
          );
        })(),
        (async () => {
          setLocationData(
            await client
              .query<OpSiteLocationQuery, OpSiteLocationQueryVariables>({
                query: OpSiteLocation,
                variables: {
                  siteId: Number(props?.params?.siteId),
                },
              })
              .then((resp) => resp?.data?.opSiteLocation)
              .catch((e) => {
                console.log(e);
                return [];
              }),
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
              .catch((e) => {
                console.log(e);
                return [];
              }),
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
              .catch((e) => {
                console.log(e);
                return [];
              }),
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
              .catch((e) => {
                console.log(e);
                return [];
              }),
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
              {locationData() && locationData()?.length > 0 && (
                <div id="siteCarouselBusiness" class="my-2">
                  <h2 class="text-start">Restaurants</h2>
                  <div class="container-fluid">
                    <div class="d-flex flex-row flex-nowrap overflow-auto">
                      {locationData().map((location) => (
                        <div class="col-sm-3">
                          <div
                            class="card me-2"
                            onClick={() => {
                              setSiteCurrentLocation(location);
                              props.navigate.onNavigate('siteLocation', {
                                siteId: props?.params?.siteId,
                                locationId: location.id,
                                ts: Date.now(),
                              });
                            }}
                          >
                            <div class={`card-img-top overflow-hidden ${stylesSite.CustomCardImageContainer}`}>
                              <img
                                src={location?.business?.images?.default || 'https://via.placeholder.com/150'}
                                class={`img-fluid ${stylesSite.CustomImg}`}
                                alt={location?.name}
                              />
                            </div>
                            <div class="card-body">{location?.name}</div>
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
                              props.navigate.onNavigate('siteCollection', {
                                siteId: props?.params?.siteId,
                                collectionId: menuTag.tag.id,
                                ts: Date.now(),
                              });
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
                              props.navigate.onNavigate('siteCollection', {
                                siteId: props?.params?.siteId,
                                collectionId: menuTag.tag.id,
                                ts: Date.now(),
                              });
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
