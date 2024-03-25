/** @jsxImportSource @emotion/react */
import React, { memo } from 'react'

export const BlurLayer = memo(() => {
    return (
        <div
            css={{
                zIndex: 9900,
                display: 'flex',
                flex: 1,
                width: '100%',
                height: '100%',
                minHeight: '100vh',
                backgroundColor: 'rgba(0,0,0,0.35)',
                position: 'fixed',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                paddingTop: `max(0px, env(safe-area-inset-top))`,
                paddingBottom: `max(0px, env(safe-area-inset-bottom))`,
                paddingLeft: `max(0px, env(safe-area-inset-left))`,
                paddingRight: `max(0px, env(safe-area-inset-right))`,
            }}
        />
    )
})
