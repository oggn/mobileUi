/** @jsxImportSource @emotion/react */
import React, { ForwardedRef, HTMLAttributes, ReactNode, forwardRef, useEffect, useState } from 'react'
import { SpaceTheme, SpaceType } from '../../_themes/space'
import { FlexTheme, FlexType } from '../../_themes/flex'
import { ViewportTypes } from '../../_themes/viewport'
import { ScrollTheme, ScrollType } from '../../_themes/scroll'
import { BorderTheme, BorderType } from '../../_themes/border'
import { ShadowTheme, ShadowType } from '../../_themes/boxShadow'
import { CursorTheme, CursorType } from '../../_themes/cursor'

interface Props
    extends HTMLAttributes<HTMLLIElement>,
        ViewportTypes,
        FlexType,
        SpaceType,
        BorderType,
        ShadowType,
        ScrollType,
        CursorType {
    children?: ReactNode
    borderRadius?: number | string
    backgroundColor?: string
    transitionTime?: number
    txtSize?: number
    txtColor?: string
    lineHeight?: number
    txtAlign?: 'start' | 'end' | 'center'
    txtWeight?: 'lighter' | 'normal' | 'medium' | 'bold'
    whiteSpace?: 'normal' | 'nowrap' | 'pre' | 'pre-wrap' | 'pre-line'
    underline?: boolean
    ellipsis?: { ellipsis?: boolean; line?: number; width?: number }
}

const Item = forwardRef((props: Props, ref: ForwardedRef<HTMLLIElement>) => {
    const FlexT = FlexTheme({
        flex: props.flex,
        direction: props.direction ?? 'vertical',
        align: props.align ?? 'start',
        crossAlign: props.crossAlign,
        wrap: props.wrap,
        gap: props.gap,
        crossGap: props.crossGap,
        basis: props.basis,
        grow: props.grow,
        shrink: props.shrink,
    })
    const spaceT = SpaceTheme({ padding: props.padding, margin: props.margin })
    const scrollT = ScrollTheme({ scroll: props.scroll })
    const borderT = BorderTheme({ border: props.border })
    const shadowT = ShadowTheme({ shadow: props.shadow })
    const cursorT = CursorTheme({ cursor: props.cursor, onClick: props.onClick })
    const { ellipsis = { ellipsis: false } } = props

    const [os, setOs] = useState<'window' | 'mac'>('window')

    useEffect(() => {
        if (/Macintosh|iPhone|iPad|iPod/.test(navigator.userAgent)) setOs('mac')
        else if (/Windows|Android/.test(navigator.userAgent)) setOs('window')
        else setOs('window')
    }, [os])

    const TYPOGRAPH_WEIGHT = {
        lighter: { fontWeight: os === 'window' ? '300' : '400' },
        normal: { fontWeight: 400 },
        medium: { fontWeight: os === 'window' ? '500' : '600' },
        bold: { fontWeight: os === 'window' ? '600' : '700' },
    } as const

    const ellipsisT = {
        maxWidth: ellipsis.width ?? 'auto',
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: ellipsis.line,
    } as any

    return (
        <li
            ref={ref}
            css={{
                zIndex: props.zIndex,
                width: props.width ?? '100%',
                minWidth: props.minWidth,
                maxWidth: props.maxWidth,
                height: props.height,
                minHeight: props.minHeight,
                maxHeight: props.maxHeight,

                position: 'relative',
                backgroundColor: props.backgroundColor,
                borderRadius: props.borderRadius,
                transition: `${props.transitionTime ?? 0}s ease-in-out`,
                fontWeight: TYPOGRAPH_WEIGHT[props.txtWeight ?? 'normal'].fontWeight,
                fontSize: props.txtSize && `${props.txtSize / 16}rem`,
                whiteSpace: ellipsis.ellipsis ? 'normal' : props.whiteSpace,
                color: props.txtColor ?? '#444',
                lineHeight: props.lineHeight,
                textAlign: props.txtAlign ?? 'start',
                textDecoration: props.underline && 'underline',
                ...cursorT,
                ...(!ellipsis.ellipsis && spaceT),
                ...(ellipsis.ellipsis && ellipsisT),

                ...FlexT,
                ...spaceT,
                ...scrollT,
                ...borderT,
                ...shadowT,
                ...cursorT,
            }}
            {...props}
        >
            {props.children}
        </li>
    )
})

export { Item }
