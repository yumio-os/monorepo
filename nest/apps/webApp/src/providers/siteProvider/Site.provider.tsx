import { Accessor, createContext, createSignal, Setter, useContext } from 'solid-js';

import { useApollo } from '../apollo/Apollo';
import { OpOneSiteQuery, OpOneSiteQueryVariables, OpOneSiteTagsQuery, OpSiteQuery } from '../apollo/gql';
import { opOneSite } from '../apollo/queries/site';

type OpSiteTagElement = OpOneSiteTagsQuery['opSiteTags'][number];

interface SiteContextProps {
  // ----- site
  siteData: Accessor<OpSiteQuery['opSite'] | null>;
  setSiteData: Setter<OpSiteQuery['opSite'] | null>;
  fetchtSiteData: (siteId: string, forceRefresh?: boolean) => Promise<void>;
  // ---- tag in site
  siteCurrentTag: Accessor<OpSiteTagElement>;
  setSiteCurrentTag: Setter<OpSiteTagElement>;
  // ---- menu tag in site
  // ---- location in site
}

const SiteContext = createContext<SiteContextProps>();

const expireWindow = 60 * 60 * 15;

export const SiteProvider = (props) => {
  const [siteData, setSiteData] = createSignal<OpSiteQuery['opSite'] | null>(null);
  const [siteDataTs, setSiteDataTs] = createSignal<number>(0);

  const [siteCurrentTag, setSiteCurrentTag] = createSignal<OpSiteTagElement>(null);
  // const [siteCurrentMenuTag, setSiteCurrentMenuTag] = createSignal<OpSiteTagElement | null>(null);

  const client = useApollo();

  // TODO add GQL subscription to get

  const fetchtSiteData = async (siteId: string, forceRefresh = false) => {
    const noSite = !siteData();
    const expired = forceRefresh || siteDataTs() < Date.now();
    const siteChanged = siteData()?.id != +siteId;

    if (noSite || expired || siteChanged) {
      return await client
        .query<OpOneSiteQuery, OpOneSiteQueryVariables>({
          query: opOneSite,
          variables: {
            siteId: Number(siteId),
          },
        })
        .then((resp) => {
          setSiteData(resp?.data?.opSite);
          setSiteDataTs(Date.now() + expireWindow);
        })
        .catch((_) => null);
    }
  };

  return (
    <SiteContext.Provider value={{ siteData, setSiteData, fetchtSiteData, siteCurrentTag, setSiteCurrentTag }}>
      {props.children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};
