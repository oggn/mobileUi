import React, { ReactNode } from 'react'
import { NextRouter, useRouter } from 'next/router'

// Components
import Header from './Header'
import BottomNaviTabBar from './BottomNaviTabBar'

//
export default function App({ children }: { children: ReactNode }): JSX.Element {
    const router: NextRouter = useRouter()

    const errPath = router.pathname === '/404'
    const noneView = router.pathname === '/form-fields'

    return (
        <div id="layout">
            {!errPath && <Header />}
            <main>{children}</main>
            {!(errPath || noneView) && <BottomNaviTabBar />}
        </div>
    )
}
