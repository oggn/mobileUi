/** @jsxImportSource @emotion/react */
import React, { ForwardedRef, HTMLAttributes, ReactNode, forwardRef } from 'react';
import { ViewportTypes } from '../_themes/viewport';
import { SpaceTheme, SpaceType } from '../_themes/space';
import { FlexTheme, FlexType } from '../_themes/flex';
import { ScrollTheme, ScrollType } from '../_themes/scroll';
import { BorderType, BorderTheme } from '../_themes/border';

interface ItemsProps
  extends HTMLAttributes<HTMLUListElement>,
    Omit<ViewportTypes, 'position'>,
    FlexType,
    SpaceType,
    BorderType,
    ScrollType {
  children: ReactNode;
  backgroundColor?: string;
  borderRadius?: number | string;
}

interface ItemProps
  extends HTMLAttributes<HTMLLIElement>,
    Omit<ViewportTypes, 'position'>,
    FlexType,
    SpaceType,
    BorderType,
    ScrollType {
  children: ReactNode;
  backgroundColor?: string;
  borderRadius?: number | string;
}

// -----------------------------------
// -------------- Items --------------
// -----------------------------------
export const Items = forwardRef<HTMLUListElement, ItemsProps>(
  (props, ref?: ForwardedRef<HTMLUListElement>) => {
    return (
      <ul
        ref={ref}
        css={[
          {
            zIndex: props.zIndex,
            width: props.width ?? '100%',
            minWidth: props.minWidth,
            maxWidth: props.maxWidth,
            height: props.height,
            minHeight: props.minHeight,
            maxHeight: props.maxHeight,
            backgroundColor: props.backgroundColor,
            borderRadius: props.borderRadius,
          },
          FlexTheme({
            flex: props.flex,
            direction: props.direction ?? 'vertical',
            align: props.align
              ? props.align
              : props.direction === 'horizontal'
                ? 'stretch'
                : 'start',
            crossAlign: props.crossAlign,
            wrap: props.wrap ?? 'nowrap',
            gap: props.gap ?? 0,
            crossGap: props.crossGap ?? 0,
          }),
          SpaceTheme({ padding: props.padding ?? { all: 0 }, margin: props.margin ?? { all: 0 } }),
          BorderTheme({ border: props.border }),
          ScrollTheme({ scroll: props.scroll }),
        ]}
        {...props}
      >
        {props.children}
      </ul>
    );
  },
);

// ----------------------------------
// -------------- Item --------------
// ----------------------------------
export const Item = forwardRef<HTMLLIElement, ItemProps>(
  (props, ref?: ForwardedRef<HTMLLIElement>) => {
    return (
      <li
        ref={ref}
        css={[
          {
            zIndex: props.zIndex,
            width: props.width ?? '100%',
            minWidth: props.minWidth,
            maxWidth: props.maxWidth,
            height: props.height,
            minHeight: props.minHeight,
            maxHeight: props.maxHeight,
            backgroundColor: props.backgroundColor,
            borderRadius: props.borderRadius,
            cursor: props.onClick && 'pointer',
            userSelect: props.onClick && 'none',
          },
          FlexTheme({
            flex: props.flex,
            direction: props.direction ?? 'vertical',
            align: props.align
              ? props.align
              : props.direction === 'horizontal'
                ? 'stretch'
                : 'start',
            crossAlign: props.crossAlign,
            wrap: props.wrap ?? 'nowrap',
            gap: props.gap ?? 0,
            crossGap: props.crossGap ?? 0,
          }),
          SpaceTheme({ padding: props.padding ?? { all: 0 }, margin: props.margin ?? { all: 0 } }),
          BorderTheme({ border: props.border }),
          ScrollTheme({ scroll: props.scroll }),
        ]}
        {...props}
      >
        {props.children}
      </li>
    );
  },
);
