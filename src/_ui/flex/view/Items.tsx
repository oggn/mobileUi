/** @jsxImportSource @emotion/react */
import React, { ForwardedRef, HTMLAttributes, ReactNode, forwardRef } from 'react'
import { SpaceTheme, SpaceType } from '../../_themes/space'
import { FlexTheme, FlexType } from '../../_themes/flex'
import { ViewportTypes } from '../../_themes/viewport'
import { ScrollTheme, ScrollType } from '../../_themes/scroll'
import { BorderTheme, BorderType } from '../../_themes/border'
import { ShadowTheme, ShadowType } from '../../_themes/boxShadow'
import { CursorTheme, CursorType } from '../../_themes/cursor'

interface Props
    extends HTMLAttributes<HTMLUListElement | HTMLOListElement>,
        ViewportTypes,
        FlexType,
        SpaceType,
        BorderType,
        ShadowType,
        ScrollType,
        CursorType {
    as?: 'ul' | 'ol'
    children?: ReactNode
    borderRadius?: number | string
    backgroundColor?: string
    transitionTime?: number
}

const Items = forwardRef((props: Props, ref: ForwardedRef<HTMLUListElement | HTMLOListElement>) => {
    const { as = 'ul' } = props
    const FlexT = FlexTheme({
        flex: props.flex,
        direction: props.direction ?? 'vertical',
        align: props.align,
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

    const theme = {
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

        ...FlexT,
        ...spaceT,
        ...scrollT,
        ...borderT,
        ...shadowT,
        ...cursorT,
    } as any

    if (as === 'ul')
        return (
            <ul ref={ref} css={theme} {...props}>
                {props.children}
            </ul>
        )

    if (as === 'ol')
        return (
            <ol ref={ref as HTMLOListElement | any} css={theme} {...props}>
                {props.children}
            </ol>
        )
})

export { Items }
