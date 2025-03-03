import { Component, createEffect, createSignal, onMount } from 'solid-js';

import { NavigationFuncs } from '../../pages/kiosk/Kiosk';
import { useApollo } from '../../providers/apollo/Apollo';
import {
  OpItemsInLocationQuery,
  OpItemsInLocationQueryVariables,
  OpLocationQuery,
  OpLocationQueryVariables,
} from '../../providers/apollo/gql';
import { OpItemsInLocation } from '../../providers/apollo/queries/items-in-location';
import { OpLocation } from '../../providers/apollo/queries/site';
import { useSite } from '../../providers/siteProvider/Site.provider';
import styleSiteLocation from './SiteLocation.module.css';

interface SiteLocationProfilesProps {
  navigate: NavigationFuncs;
  currentPage: string;
  params: {
    siteId: string;
    locationId: string;
  };
}

interface Pagination {
  page: number;
  size: number;
  totalCount: number;
}

function paginationSanitized(pagination: Pagination) {
  return {
    size: +pagination.size,
    page: +pagination.page,
  };
}

const SiteLocation: Component<SiteLocationProfilesProps> = (props) => {
  const [itemsLocation, setItemsLoocation] = createSignal<OpItemsInLocationQuery['opItemsInLocation']['items']>([]);
  const [errorSiteState, setErrorSiteState] = createSignal<any>(null);
  const [loadingState, setLoadingState] = createSignal(false);

  const [locationId, setLocationId] = createSignal<string | null>(null); //

  const [pagination, setPagination] = createSignal<Pagination>({
    page: 1,
    size: 50,
    totalCount: 0,
  });

  const { siteCurrentLocation, setSiteCurrentLocation } = useSite();

  const client = useApollo();

  const loadData = async () => {
    if (props?.params?.siteId && props?.params?.locationId) {
      if (props?.params?.locationId == locationId()) {
        return;
      }

      setLocationId(props?.params?.locationId);
      if (loadingState() == true) {
        return;
      }

      setLoadingState(true);
      setErrorSiteState(null);

      await Promise.allSettled([
        // pull tag
        (async () => {
          const locationSet = !!(siteCurrentLocation()?.id || 0);
          const locationChanged = siteCurrentLocation()?.id != Number(props?.params?.locationId);
          const okProp = !!props?.params?.locationId;

          if (okProp && (!locationSet || locationChanged)) {
            await client
              .query<OpLocationQuery, OpLocationQueryVariables>({
                query: OpLocation,
                variables: {
                  locationId: Number(locationId()),
                },
              })
              .then((resp) => {
                setSiteCurrentLocation(resp?.data?.opLocation);
              })
              .catch((_) => null);
          }
        })(),

        // ITEMS IN Location IN Site
        (async () => {
          await client
            .query<OpItemsInLocationQuery, OpItemsInLocationQueryVariables>({
              query: OpItemsInLocation,
              variables: {
                locationId: Number(props.params?.locationId),
                pagination: paginationSanitized(pagination()),
              },
            })
            .then((resp) => {
              setPagination(resp?.data?.opItemsInLocation?.pagination);
              setItemsLoocation(resp?.data?.opItemsInLocation?.items || []);
            })
            .catch((_) => setErrorSiteState(_));
        })(),

        // Brands in Location - location config

        // Categories in location - location config

        // Collection in location - location config
      ]);

      setLoadingState(false);
    }
  };

  createEffect(async () => {
    loadData().catch((x) => console.error(x));
  });

  onMount(async () => {
    loadData().catch((x) => console.error(x));
  });

  return (
    <>
      <div class={`d-flex justify-content-center align-items-center ${styleSiteLocation.Site} px-5 py-2`}>
        {loadingState() && <p>Loading site tag data...</p>}
        {errorSiteState() && <p>Error: {errorSiteState()}</p>}
        {/* Check if siteData exists */}
        {/* <div>test {`${itemsCollection().length}`}</div> */}

        <div class="card text-center container-fluid p-0">
          <div class={`card-img-top overflow-hidden position-relative ${styleSiteLocation.CustomImgContainer}`}>
            <img
              src={siteCurrentLocation()?.business.images?.default || 'https://via.placeholder.com/150'}
              class={`img-fluid ${styleSiteLocation.CustomImg}`}
              alt={siteCurrentLocation()?.name}
            />
            {/* overlay this section over image, so it is on the bottom of card-img-top */}
            <div class="overlay-content position-absolute bottom-0 w-100 p-3 text-white text-start" style="backgroun(0, 0, 0, 0.5);">
              <h5 class="cardd: rgba-title m-0">{siteCurrentLocation()?.name}</h5>
              {/* <p class="card-text m-0">Location Address and some other info</p> */}
            </div>
          </div>
          <div class="card-body">
            <div id="siteCarouselItemsInSiteByTag" class="my-2">
              <div class="container-fluid">
                <div class="d-flex flex-row flex-nowrap overflow-auto">
                  {itemsLocation().map((item) => (
                    <div class="col-sm-3">
                      <div class="card me-2">
                        <div class={`card-img-top overflow-hidden ${styleSiteLocation.CustomCardImageContainer}`}>
                          <img
                            src={item?.images?.default || 'https://via.placeholder.com/150'}
                            class={`img-fluid ${styleSiteLocation.CustomImg}`}
                            alt={item.name}
                          />
                        </div>
                        <div class="card-body">{item?.name}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Fallback if no site data is available */}
          {!loadingState() && itemsLocation()?.length == 0 && (
            <p>Something went wrong {`${loadingState()} - ${props?.params?.siteId} - ${props?.params?.locationId}`}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SiteLocation;
