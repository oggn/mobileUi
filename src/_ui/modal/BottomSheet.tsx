/** @jsxImportSource @emotion/react */
import React, { HTMLAttributes, useCallback, useEffect, useRef, useState } from 'react'
import { Interpolation, Theme } from '@emotion/react'
import { MQ } from '@/libs/themes'
import { BlurLayer, V, TouchableOpacity, P } from '../index'

// --------------------------------------------
// -------------- Type Interface --------------
// --------------------------------------------
interface BottomSheetProps extends HTMLAttributes<HTMLElement> {
    children: React.ReactNode
    open: boolean
    onCancel: () => void
    theme?: 'light' | 'dark'
    zIndex?: number
}

// -----------------------------------------
// -------------- BottomSheet --------------
// -----------------------------------------
export function BottomSheet({ children, open, onCancel, theme = 'light', zIndex, ...props }: BottomSheetProps) {
    const ref = useRef<HTMLDivElement>(null)
    const viewRef = useRef<HTMLDivElement>(null)
    const [startY, setStartY] = useState(0)
    const [currentY, setCurrentY] = useState(0)

    const THEME_VARIANT = {
        light: { bg: '#fff', bar: '#e0e0e0' },
        dark: { bg: '#222', bar: '#3f3f3f' },
    }

    const handleTouchStart = (event: React.TouchEvent) => {
        const touch = event.touches[0]
        setStartY(touch.clientY)
        setCurrentY(touch.clientY)
    }

    const handleTouchMove = (event: React.TouchEvent) => {
        const touch = event.touches[0]
        setCurrentY(touch.clientY)
    }

    const handleTouchEnd = () => {
        const distance = currentY - startY

        if (distance > 80) onCancel()

        setCurrentY(0)
        setStartY(0)
    }

    //
    // 외부클릭
    const clickModalOutside = useCallback(
        (event: MouseEvent) => {
            if (open && ref.current && !ref.current.contains(event.target as Node)) onCancel()
        },
        [open, onCancel],
    )

    useEffect(() => {
        if (open) {
            const scrollY = window.scrollY

            document.body.style.position = 'fixed'
            document.body.style.top = `-${scrollY}px`
            document.body.style.overflowY = 'hidden'
        } else {
            const scrollY = document.body.style.top
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.overflowY = 'auto'

            window.scrollTo(0, parseInt(scrollY || '0') * -1)
        }
    }, [open])

    useEffect(() => {
        document.addEventListener('mousedown', clickModalOutside)
        return () => document.removeEventListener('mousedown', clickModalOutside)
    }, [clickModalOutside, open])

    return (
        <>
            {open && <BlurLayer zIndex={zIndex ? zIndex - 1 : 9998} />}

            <P.Fixed
                zIndex={zIndex ?? 9999}
                width="100%"
                height="100%"
                position={{
                    top: open ? 0 : ('120%' as any),
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}
                transitionTime={0.3}
            >
                <V.Container
                    padding={{ top: 70 }}
                    height="100%"
                    align="center"
                    crossAlign="center"
                    css={{
                        [MQ[1]]: {
                            paddingTop: 'calc(env(safe-area-inset-top) + 10px)',
                        },
                    }}
                >
                    <V.Column
                        ref={ref}
                        maxWidth={560}
                        height="100%"
                        backgroundColor={THEME_VARIANT[theme].bg}
                        css={[BoxTheme(open)]}
                        {...props}
                    >
                        <V.Container
                            padding={{ all: 10 }}
                            align="center"
                            crossAlign="center"
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            <TouchableOpacity
                                maxWidth={50}
                                minWidth={50}
                                minHeight={6}
                                maxHeight={6}
                                onClick={onCancel}
                                borderRadius={1000}
                                backgroundColor={THEME_VARIANT[theme].bar}
                            >
                                {''}
                            </TouchableOpacity>
                        </V.Container>

                        <V.Column
                            ref={viewRef}
                            height="100%"
                            scroll={{ type: 'auto', bar: true }}
                            css={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
                        >
                            {children}
                        </V.Column>
                    </V.Column>
                </V.Container>
            </P.Fixed>
        </>
    )
}

// ------------------------------------
// -------------- Styles --------------
// ------------------------------------
function BoxTheme(isActive?: boolean): Interpolation<Theme> {
    return {
        opacity: isActive ? '1' : '0',
        borderRadius: '22px 22px 0 0',
        boxShadow: '0 3px 30px rgba(0,0,0,0.1)',
        transition: '0.25s ease-in-out',
        paddingTop: 'env(safe-area-inset-top)',

        '&:webkit-scrollbar': {
            display: 'none',
        },

        [MQ[1]]: {
            maxWidth: '100%',
        },
    }
}
