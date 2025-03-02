import { Component, createEffect, createSignal, onMount } from 'solid-js';

import { NavigationFuncs } from '../../pages/kiosk/Kiosk';
import { useApollo } from '../../providers/apollo/Apollo';
import {
  OpItemsInSiteForCollectionQuery,
  OpItemsInSiteForCollectionQueryVariables,
  OpTagQuery,
  OpTagQueryVariables,
} from '../../providers/apollo/gql';
import { opItemsInSiteForCollection } from '../../providers/apollo/queries/itens-site-collections';
import { OpTag } from '../../providers/apollo/queries/tag';
import { useSite } from '../../providers/siteProvider/Site.provider';
import stylesSiteCollections from './SiteCollections.module.css';

interface SiteCollectionsProfilesProps {
  navigate: NavigationFuncs;
  currentPage: string;
  params: {
    siteId: string;
    collectionId: string;
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

const SiteCollections: Component<SiteCollectionsProfilesProps> = (props) => {
  const [itemsCollection, setItemsCollection] = createSignal<OpItemsInSiteForCollectionQuery['opItemsInSiteForCollection']['items']>([]);
  const [errorSiteState, setErrorSiteState] = createSignal<any>(null);
  const [loadingState, setLoadingState] = createSignal(false);

  const [collectionId, setCollectionId] = createSignal<string | null>(null); //

  const [pagination, setPagination] = createSignal<Pagination>({
    page: 1,
    size: 50,
    totalCount: 0,
  });

  const { siteData, siteCurrentTag, setSiteCurrentTag } = useSite();

  const client = useApollo();

  const loadData = async () => {
    if (props?.params?.siteId && props?.params?.collectionId) {
      if (props?.params?.collectionId == collectionId()) {
        return;
      }

      setCollectionId(props?.params?.collectionId);
      if (loadingState() == true) {
        return;
      }

      setLoadingState(true);
      setErrorSiteState(null);

      await Promise.allSettled([
        // pull tag
        (async () => {
          const tagSet = !!(siteCurrentTag()?.id || 0);
          const tagChanged = siteCurrentTag()?.id != Number(props?.params?.collectionId);
          const okProp = !!props?.params?.collectionId;

          if (okProp && (!tagSet || tagChanged)) {
            await client
              .query<OpTagQuery, OpTagQueryVariables>({
                query: OpTag,
                variables: {
                  tagId: Number(props.params?.collectionId),
                },
              })
              .then((resp) => {
                setSiteCurrentTag(resp?.data?.opTag);
              })
              .catch((_) => {
                return null;
              });
          }
        })(),

        // ITEMS IN TAG/CATEGORY
        (async () => {
          await client
            .query<OpItemsInSiteForCollectionQuery, OpItemsInSiteForCollectionQueryVariables>({
              query: opItemsInSiteForCollection,
              variables: {
                siteId: Number(props?.params?.siteId),
                tagId: Number(props.params?.collectionId),
                pagination: paginationSanitized(pagination()),
              },
            })
            .then((resp) => {
              setPagination(resp?.data?.opItemsInSiteForCollection?.pagination);
              setItemsCollection(resp?.data?.opItemsInSiteForCollection?.items || []);
            })
            .catch((_) => setErrorSiteState(_));
        })(),
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
      <div class={`d-flex justify-content-center align-items-center ${stylesSiteCollections.Site} px-5 py-2`}>
        {loadingState() && <p>Loading site tag data...</p>}
        {errorSiteState() && <p>Error: {errorSiteState()}</p>}
        {/* Check if siteData exists */}
        {/* <div>test {`${itemsCollection().length}`}</div> */}

        <div class="card text-center container-fluid p-0">
          <div class={`card-img-top overflow-hidden position-relative ${stylesSiteCollections.CustomImgContainer}`}>
            <img
              src={siteCurrentTag()?.images?.default || 'https://via.placeholder.com/150'}
              class={`img-fluid ${stylesSiteCollections.CustomImg}`}
              alt={siteCurrentTag()?.name}
            />
            {/* overlay this section over image, so it is on the bottom of card-img-top */}
            <div class="overlay-content position-absolute bottom-0 w-100 p-3 text-white text-start" style="backgroun(0, 0, 0, 0.5);">
              <h5 class="cardd: rgba-title m-0">TAG {siteCurrentTag()?.name}</h5>
              {/* <p class="card-text m-0">Location Address and some other info</p> */}
            </div>
          </div>
          <div class="card-body">
            <div id="siteCarouselItemsInSiteByTag" class="my-2">
              <div class="container-fluid">
                <div class="d-flex flex-row flex-nowrap overflow-auto">
                  {itemsCollection().map((item) => (
                    <div class="col-sm-3">
                      <div class="card me-2">
                        <div class={`card-img-top overflow-hidden ${stylesSiteCollections.CustomCardImageContainer}`}>
                          <img
                            src={item?.images?.default || 'https://via.placeholder.com/150'}
                            class={`img-fluid ${stylesSiteCollections.CustomImg}`}
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
          {!loadingState() && itemsCollection()?.length == 0 && (
            <p>Something went wrong {`${loadingState()} - ${props?.params?.siteId} - ${props?.params?.collectionId}`}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SiteCollections;
