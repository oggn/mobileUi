import React, { ReactNode, Suspense } from 'react';
import { NextRouter, useRouter } from 'next/router';
import Header from './Header';
import BottomNaviTabBar from './BottomNaviTabBar';

// Components

// Types
type LayoutProps = {
  children: ReactNode;
};

export default function App({ children }: LayoutProps): JSX.Element {
  const router: NextRouter = useRouter();

  const errPath = router.pathname === '/404';
  const noneView = router.pathname === '/form-fields';

  return (
    <div id="layout">
      {!errPath && <Header />}
      <main>{children}</main>
      {!(errPath || noneView) && <BottomNaviTabBar />}
    </div>
  );
}
