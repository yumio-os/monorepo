import { Component, createEffect, createSignal } from 'solid-js';

import { HandleNavigateFunc } from '../../pages/kiosk/Kiosk';
import { useApollo } from '../../providers/apollo/Apollo';
import { useAuth } from '../../providers/auth/Auth';
import stylesNavigationKiosk from './NavigationKiosk.module.css';

const NavigationKiosk: Component<{
  onNavigate: HandleNavigateFunc;
  currentPage: string;
}> = (props) => {
  const { authState, setAuthState } = useAuth();

  const client = useApollo();
  const assessorId = authState().user?.id;

  const [orgsCnt, setOrgsCnt] = createSignal<number | null>(null);
  const [membersCnt, setMembersCnt] = createSignal<number | null>(null);

  // todo reload periodically / when neccessary
  createEffect(() => {
    // membersOrgCount().finally();
    // orgCount().finally();
  });

  function isElement(element) {
    return element == props.currentPage ? stylesNavigationKiosk.mndLinkActive : stylesNavigationKiosk.mndLink;
  }

  return (
    <>
      {authState().isAuthenticated && (
        <>
          <ul class="nav nav-pills flex-column m-0 p-0" style="height: 100%; display: flex;">
            <li class={`nav-item`}>
              <a class="nav-link link-dark position-relative">
                <i class="bi bi-cart fs-4"></i>
                <span class="position-absolute bottom-0 start-85 translate-middle badge rounded-pill bg-secondary">1</span>
              </a>
            </li>
            {/* <li class={`nav-item`}>
              <a class="nav-link link-dark">
                <i class="bi bi-box-arrow-right fs-4"></i>
              </a>
            </li>
            <li class={`nav-item`}>
              <a class="nav-link link-dark">
                <i class="bi bi-box-arrow-in-right fs-4"></i>
              </a>
            </li> */}
            <li class="mt-auto"></li>
          </ul>
        </>
      )}
    </>
  );
};

export default NavigationKiosk;
