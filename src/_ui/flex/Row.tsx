/** @jsxImportSource @emotion/react */
import React, { ForwardedRef, HTMLAttributes, ReactNode, forwardRef } from 'react';
import { SpaceTheme, SpaceType } from '../_themes/space';
import { FlexTheme, FlexType } from '../_themes/flex';
import { ViewportTypes } from '../_themes/viewport';
import { ScrollTheme, ScrollType } from '../_themes/scroll';
import { BorderTheme, BorderType } from '../_themes/border';
import { ShadowTheme, ShadowType } from '../_themes/boxShadow';
import { CursorTheme, CursorType } from '../_themes/cursor';

interface Props
  extends HTMLAttributes<HTMLElement>,
    ViewportTypes,
    FlexType,
    SpaceType,
    BorderType,
    ShadowType,
    ScrollType,
    CursorType {
  children?: ReactNode;
  borderRadius?: number | string;
  backgroundColor?: string;
  transitionTime?: number;
}

export const Row = forwardRef<HTMLDivElement, Props>((props, ref: ForwardedRef<HTMLDivElement>) => {
  const { zIndex, width = '100%', minWidth, maxWidth } = props;
  const { height, minHeight, maxHeight } = props;
  const { flex, direction = 'horizontal', align = 'stretch', crossAlign } = props;
  const { wrap, gap, crossGap } = props;
  const { padding, margin } = props;
  const { border, borderRadius } = props;
  const { backgroundColor, shadow } = props;
  const { cursor, transitionTime, scroll } = props;

  const viewT = { width, height, minWidth, maxWidth, minHeight, maxHeight };
  const FlexT = FlexTheme({ flex, direction, align, crossAlign, wrap, gap, crossGap });
  const spaceT = SpaceTheme({ padding, margin });
  const scrollT = ScrollTheme({ scroll });
  const borderT = BorderTheme({ border });
  const shadowT = ShadowTheme({ shadow });
  const cursorT = CursorTheme({ cursor, onClick: props.onClick });

  return (
    <div
      ref={ref}
      css={{
        ...viewT,
        ...FlexT,
        ...spaceT,
        ...scrollT,
        ...borderT,
        ...shadowT,
        ...cursorT,
        zIndex,
        position: 'relative',
        backgroundColor,
        borderRadius,
        transition: `${transitionTime}s ease-in-out`,
      }}
      {...props}
    >
      {props.children}
    </div>
  );
});
