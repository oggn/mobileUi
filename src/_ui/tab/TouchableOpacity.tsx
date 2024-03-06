/** @jsxImportSource @emotion/react */

import React, { HTMLAttributes, ReactNode } from 'react'
import { CursorTheme, CursorType } from '../_themes/cursor'
import { SpaceTheme, SpaceType } from '../_themes/space'
import { ViewportTypes } from '../_themes/viewport'
import { FlexTheme, FlexType } from '../_themes/flex'
import Link from 'next/link'
import { BorderTheme, BorderType } from '../_themes/border'

interface Props
    extends Omit<HTMLAttributes<HTMLDivElement | HTMLLIElement | HTMLSpanElement | HTMLAnchorElement>, 'color'>,
        ViewportTypes,
        FlexType,
        BorderType,
        SpaceType,
        CursorType {
    as?: 'div' | 'li' | 'span' | 'a'
    children: ReactNode
    txtSize?: number
    txtColor?: string
    disabledColor?: string
    touchOpacity?: number
    backgroundColor?: string
    borderRadius?: number
    href?: any
    opacity?: number
}

export function TouchableOpacity(props: Props) {
    const { as = 'div', cursor, txtColor = '#4788f4', txtSize = 14 } = props
    const { disabledColor, touchOpacity, backgroundColor, borderRadius } = props
    const { padding, margin } = props
    const { width, minWidth, maxWidth } = props
    const { height, minHeight, maxHeight } = props
    const { flex, direction = 'horizontal', align = 'center', crossAlign } = props
    const { wrap, gap, crossGap, border, opacity } = props

    const spaceT = SpaceTheme({ padding, margin }) as any
    const borderT = BorderTheme({ border })
    const cursorT = CursorTheme({ cursor, onClick: props.onClick }) as any
    const viewT = { width, height, minWidth, maxWidth, minHeight, maxHeight }
    const FlexT = FlexTheme({
        flex,
        direction,
        align,
        crossAlign,
        wrap,
        gap,
        crossGap,
    })

    return (
        <>
            {as === 'div' && (
                <div
                    css={{
                        position: 'relative',
                        whiteSpace: 'nowrap',
                        fontSize: txtSize ? `${txtSize / 16}rem` : '0.938rem',
                        color: txtColor,
                        transition: '0.1s ease-in-out',
                        backgroundColor,
                        borderRadius: borderRadius,
                        opacity,
                        ...viewT,
                        ...FlexT,
                        ...spaceT,
                        ...borderT,
                        ...cursorT,

                        '&:disabled': { color: disabledColor ?? '#ccc', cursor: 'default' },
                        '&:active': { opacity: touchOpacity ?? 0.7 },
                    }}
                    {...props}
                >
                    {props.children}
                </div>
            )}

            {as === 'li' && (
                <li
                    css={{
                        position: 'relative',
                        whiteSpace: 'nowrap',
                        fontSize: txtSize ? `${txtSize / 16}rem` : '0.938rem',
                        color: txtColor,
                        transition: '0.1s ease-in-out',
                        backgroundColor,
                        borderRadius: borderRadius,
                        opacity,
                        ...viewT,
                        ...FlexT,
                        ...spaceT,
                        ...borderT,
                        ...cursorT,

                        '&:disabled': { color: disabledColor ?? '#ccc', cursor: 'default' },
                        '&:active': { opacity: touchOpacity ?? 0.7 },
                    }}
                    {...props}
                >
                    {props.children}
                </li>
            )}

            {as === 'span' && (
                <span
                    css={{
                        position: 'relative',
                        whiteSpace: 'nowrap',
                        fontSize: txtSize ? `${txtSize / 16}rem` : '0.938rem',
                        color: txtColor,
                        transition: '0.1s ease-in-out',
                        backgroundColor,
                        borderRadius: borderRadius,
                        opacity,
                        ...viewT,
                        ...FlexT,
                        ...spaceT,
                        ...borderT,
                        ...cursorT,

                        '&:disabled': { color: disabledColor ?? '#ccc', cursor: 'default' },
                        '&:active': { opacity: touchOpacity ?? 0.7 },
                    }}
                    {...props}
                >
                    {props.children}
                </span>
            )}

            {as === 'a' && (
                <Link
                    href={props.href}
                    css={{
                        position: 'relative',
                        whiteSpace: 'nowrap',
                        fontSize: txtSize ? `${txtSize / 16}rem` : '0.938rem',
                        color: txtColor,
                        transition: '0.1s ease-in-out',
                        backgroundColor,
                        borderRadius: borderRadius,
                        opacity,
                        ...viewT,
                        ...FlexT,
                        ...spaceT,
                        ...borderT,
                        ...cursorT,

                        '&:disabled': { color: disabledColor ?? '#ccc', cursor: 'default' },
                        '&:active': { opacity: touchOpacity ?? 0.7 },
                    }}
                    {...props}
                >
                    {props.children}
                </Link>
            )}
        </>
    )
}
