import { Component, createEffect, createSignal, JSXElement, onMount } from 'solid-js';
import { render } from 'solid-js/web';

import NavigationKiosk from '../../modules/navigation-kiosk/NavigationKiosk';
import SiteCollections from '../../modules/site-collections/SiteCollections';
import Site from '../../modules/site/Site';
import { ApolloProvider, useApollo } from '../../providers/apollo/Apollo';
import { AuthProvider, useAuth } from '../../providers/auth/Auth';
import { SiteProvider, useSite } from '../../providers/siteProvider/Site.provider';
import kioskStyle from './Kiosk.module.css';

const root = document.getElementById('root');

const pages = {
  landing: 'landing',
  site: 'site',
  siteCollection: 'siteCollection',
  item: 'item',
  basket: 'basket',
  activeOrder: 'activeOrder',
  collection: 'collection',
} as const;
export type Page = (typeof pages)[keyof typeof pages];

const pageParameterSchema = {
  landing: ['siteId', 'otp'],
  site: ['siteId', 'otp'],
  siteCollection: ['siteId', 'collectionId', 'otp'],
  item: ['siteId', 'menuId', 'itemId', 'otp'],
  basket: ['siteId', 'otp'],
  activeOrder: ['otp', 'orderId'],
  collection: ['siteId', 'collectionId', 'otp'],
} as const;

export type AllAvailableAttributes = (typeof pageParameterSchema)[Page][number];

export type HandleNavigateFunc = <T extends Partial<Record<AllAvailableAttributes, unknown>>>(page: Page, newParams?: T) => void;

export type GoToSplash = () => void;
export type GoToMenu = () => void;
export type ClearHistory = () => void;
export type GoBack = () => void;

export type NavigationFuncs = {
  goToSplash: GoToSplash;
  goToMenu: GoToMenu;
  clearHistory: ClearHistory;
  onNavigate: HandleNavigateFunc;
  goBack: GoBack;
};

const Kiosk: Component = (): JSXElement => {
  // Create a signal to manage the current page state
  const { authState } = useAuth();
  const [currentPage, setCurrentPage] = createSignal<Page>('site');

  const [pageParams, setPageParams] = createSignal<Record<AllAvailableAttributes, string>>({} as any);

  const client = useApollo();
  const useId = authState().user?.id;
  const { siteData, setSiteData, fetchtSiteData } = useSite();

  const [historyStack, setHistoryStack] = createSignal<Array<{ page: Page; params: Record<AllAvailableAttributes, string> }>>([]);

  const extractPageFromUrl = () => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.replace('#', ''));
    const page = (params.get('page') as Page) || 'site'; // Default to 'dashboard'

    setCurrentPage(page);

    // Get allowed parameters for this page
    const allowedParams = new Set<AllAvailableAttributes>(pageParameterSchema[page] || []);

    // Extract only allowed parameters
    const extractedParams: Record<string, string> = {};
    params.forEach((value, key) => {
      if (allowedParams.has(key as AllAvailableAttributes)) {
        extractedParams[key] = value;
      }
    });

    setPageParams(extractedParams);
  };

  onMount(() => {
    extractPageFromUrl(); // Initialize state from URL

    // Sync state with URL when hash changes
    window.addEventListener('hashchange', extractPageFromUrl);

    // Cleanup listener on unmount
    return () => window.removeEventListener('hashchange', extractPageFromUrl);
  });

  // Synchronize the URL hash with the currentPage state
  createEffect(() => {
    const page = currentPage();
    const params = new URLSearchParams();

    params.set('page', page);

    // Add only parameters that are allowed for this page
    Object.entries(pageParams()).forEach(([key, value]) => {
      if ((pageParameterSchema[page] as any).includes(key)) {
        params.set(key, value);
      }
    });

    window.location.hash = `#${params.toString()}`;

    fetchtSiteData(pageParams().siteId).catch();
  });

  // Handle navigation by setting both page and orgId
  const handleNavigate: HandleNavigateFunc = (page: Page, newParams, pushHistory = true) => {
    if (pushHistory) {
      // Save the current page and its parameters before navigating.
      setHistoryStack([...historyStack(), { page: currentPage(), params: pageParams() }]);
    }
    setCurrentPage(page);

    // Get allowed parameters for the new page
    const allowedParams = new Set<AllAvailableAttributes>(pageParameterSchema[page] || []);

    // Create a new params object with only allowed keys
    const filteredParams: Record<AllAvailableAttributes, any> = {} as any;
    if (!newParams) {
      newParams = {} as any;
    }

    Object.entries(newParams).forEach(([key, value]) => {
      // OTP SKIP DO NOT RE-ADD THE OTP ON RENDERED PAGES
      if (key == 'otp') {
        return;
      }

      if (value !== null && allowedParams.has(key as AllAvailableAttributes)) {
        filteredParams[key] = value;
      }
    });

    // Update the state for each allowed param
    setPageParams(filteredParams);
  };

  const clearHistory: ClearHistory = () => {
    setHistoryStack([]);
  };

  const goToSplash: GoToSplash = () => {};
  const goToMenu: GoToMenu = () => {
    handleNavigate('landing', { siteId: pageParams().siteId });
  };

  const goBack = () => {
    const stack = historyStack();
    if (stack.length > 0) {
      const last = stack[stack.length - 1];
      setHistoryStack(stack.slice(0, stack.length - 1));
      setCurrentPage(last.page);
      setPageParams(last.params);
    }
  };

  const navigate: NavigationFuncs = {
    goBack,
    goToMenu,
    goToSplash,
    clearHistory,
    onNavigate: handleNavigate,
  };

  const renderPage = () => {
    switch (currentPage()) {
      case 'landing':
      case 'site':
      default:
        return <Site navigate={navigate} currentPage={currentPage()} params={{ siteId: pageParams().siteId }} />;

      case 'siteCollection':
        return (
          <SiteCollections
            navigate={navigate}
            currentPage={currentPage()}
            params={{ siteId: pageParams().siteId, collectionId: pageParams().collectionId }}
          />
        );
    }
  };

  return (
    <div class={`d-flex ${kioskStyle.Home}`} style="min-height: 100vh;">
      {/* Navigation menu */}

      <nav class="navbar navbar-expand navbar-light">
        <NavigationKiosk navigate={navigate} currentPage={currentPage()} />
      </nav>

      {/* Main content */}
      <div class="flex-grow-1 p-3">{renderPage()}</div>
    </div>
  );
};

if (root) {
  render(
    () => (
      <AuthProvider>
        <ApolloProvider>
          <SiteProvider>
            <Kiosk />
          </SiteProvider>
        </ApolloProvider>
      </AuthProvider>
    ),
    root,
  );
}

export default Kiosk;
