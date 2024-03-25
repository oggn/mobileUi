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
    extends HTMLAttributes<HTMLDivElement>,
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
}

const Row = forwardRef((props: Props, ref: ForwardedRef<HTMLDivElement>) => {
    const FlexT = FlexTheme({
        flex: props.flex,
        direction: props.direction ?? 'horizontal',
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

    return (
        <div
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
        </div>
    )
})

export { Row }
