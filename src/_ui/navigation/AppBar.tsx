/** @jsxImportSource @emotion/react */
import React, { ForwardedRef, ReactNode, forwardRef, useEffect, useState } from 'react'

interface Props {
    children: ReactNode
    serviceName: string
    theme?: 'light' | 'dark'
    width?: number
    backgroundColor?: string
}

export const AppBar = forwardRef(
    (
        { children, serviceName, theme = 'light', width, backgroundColor, ...props }: Props,
        ref?: ForwardedRef<HTMLDivElement>,
    ) => {
        const [isActive, setIsActive] = useState<boolean>(false)

        useEffect(() => {
            window.addEventListener('scroll', () => {
                if (window.scrollY >= 100) setIsActive(true)
                else setIsActive(false)
            })
        }, [])

        // VARIANTS
        const TYPE_VARIANTS = {
            light: { color: '#e2e2e2', backgroundColor: '#ffffff' },
            dark: { color: '#191919', backgroundColor: '#151515' },
        }

        return (
            <div
                css={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    height: 60,
                    minHeight: 60,
                    maxHeight: 60,
                }}
            >
                <header
                    ref={ref}
                    css={{
                        zIndex: 1000,
                        width: '100%',
                        height: '100%',
                        minHeight: 60,
                        maxHeight: 60,
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: 'env(safe-area-inset-top)',
                        paddingRight: 'env(safe-area-inset-right)',
                        paddingLeft: 'env(safe-area-inset-left)',
                        backgroundColor: backgroundColor ?? TYPE_VARIANTS[theme].backgroundColor,
                        borderBottom: isActive ? `1px solid ${TYPE_VARIANTS[theme].color}` : '',
                    }}
                    {...props}
                >
                    <ServiceName>{serviceName}</ServiceName>
                    <nav
                        css={{
                            width: '100%',
                            maxWidth: width,
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        {children}
                    </nav>
                </header>
            </div>
        )
    },
)

// 서비스명
function ServiceName({ children }: { children: ReactNode }) {
    return (
        <strong
            aria-hidden="true"
            css={{
                width: '0px',
                height: '0px',
                clip: 'rect(0 0 0 0)',
                clipPath: 'inset(50%)',
                position: 'absolute',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
            }}
        >
            {children}
        </strong>
    )
}
