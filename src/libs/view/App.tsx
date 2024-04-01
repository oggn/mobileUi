import React, { ReactNode } from 'react'
import { NextRouter, useRouter } from 'next/router'

// Components
import Header from './Header'
import BottomNaviTabBar from './BottomNaviTabBar'
import { css } from '@emotion/react'

//
export default function App({ children }: { children: ReactNode }): JSX.Element {
    const router: NextRouter = useRouter()

    const errPath = router.pathname === '/404'
    const noneView = router.pathname === '/form-fields'

    return (
        <div id="layout" css={themes.layout}>
            {!errPath && <Header />}
            <main css={themes.main}>{children}</main>
            {!(errPath || noneView) && <BottomNaviTabBar />}
        </div>
    )
}

//
//
const themes = {
    layout: css`
        position: relative;
        width: 100%;
        height: 100%;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1 auto;
    `,

    main: css`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        flex: 1;
    `,
}
