/** @jsxImportSource @emotion/react */
import React, { ReactNode, useCallback, useEffect, useRef, HTMLAttributes } from 'react'
import { BlurLayer } from '../display/BlurLayer'
import { Container } from '../flex/view/Container'
import { Absolute } from '../flex/position/Absolute'
import { IconTab } from '../tab/IconTab'

interface Props extends HTMLAttributes<HTMLElement> {
    children: ReactNode
    theme?: 'light' | 'dark'
    open: boolean
    onCancel: () => void
    modalSize?: number
}

export function Modal(props: Props) {
    const { theme = 'light', modalSize = 560, open, onCancel } = props
    const ref = useRef<HTMLDivElement>(null)

    const THEME_VARIANT = {
        light: { bg: '#fff', cancelColor: '#ccc' },
        dark: { bg: '#222', cancelColor: '#555' },
    }

    // 외부 모달 닫기
    const clickModalOutside = useCallback(
        (event: MouseEvent) => {
            if (open && ref.current && !ref.current.contains(event.target as Node)) onCancel()
        },
        [open, onCancel],
    )

    useEffect(() => {
        if (open) document.body.style.overflowY = 'hidden'
        else document.body.style.overflowY = 'auto'

        document.addEventListener('mousedown', clickModalOutside)
        return () => document.removeEventListener('mousedown', clickModalOutside)
    }, [open])

    return (
        <>
            {open && <BlurLayer />}

            <div css={{ ...Themes.wrap, top: open ? 0 : '150%', transition: '0.25s ease-in-out' }}>
                <Container
                    maxWidth={modalSize}
                    minWidth={320}
                    padding={{ horizontal: 18, top: 26, bottom: 16 }}
                    borderRadius={20}
                    backgroundColor={THEME_VARIANT[theme].bg}
                    ref={ref}
                    {...props}
                >
                    {props.children}

                    <Absolute position={{ top: 4, right: 4 }}>
                        <IconTab onClick={onCancel}>
                            <CancelIcon fill={THEME_VARIANT[theme].cancelColor} />
                        </IconTab>
                    </Absolute>
                </Container>
            </div>
        </>
    )
}

// ----------------------------------
// -------------- Icon --------------
// ----------------------------------
function CancelIcon({ fill = '#ccc' }: { fill?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 26 26">
            <path
                id="xIcon"
                d="M26.334,7.95a13,13,0,1,0,0,18.384,13,13,0,0,0,0-18.384M19.761,21.286l-2.619-2.619-2.621,2.621A1.079,1.079,0,0,1,13,19.761l2.621-2.621L13,14.525A1.079,1.079,0,0,1,14.526,13l2.616,2.617L19.758,13a1.076,1.076,0,0,1,1.522,1.522l-2.616,2.616,2.621,2.619-.23.23.23-.23a1.079,1.079,0,0,1-1.526,1.526"
                transform="translate(-4.141 -4.142)"
                fill={fill}
            />
        </svg>
    )
}

const Themes = {
    wrap: {
        width: '100%',
        height: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        zIndex: 9999,
    },
} as any
