/** @jsxImportSource @emotion/react */
import React, { FormHTMLAttributes, ForwardedRef, ReactNode, forwardRef } from 'react';
import { SpaceTheme, SpaceType } from '../_themes/space';
import { FlexTheme, FlexType } from '../_themes/flex';
import { ViewportTypes } from '../_themes/viewport';
import { ScrollTheme, ScrollType } from '../_themes/scroll';
import { BorderTheme, BorderType } from '../_themes/border';
import { ShadowTheme, ShadowType } from '../_themes/boxShadow';
import { CursorTheme, CursorType } from '../_themes/cursor';

interface Props
  extends FormHTMLAttributes<HTMLElement>,
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

export const Form = forwardRef<HTMLFormElement, Props>(
  (props, ref: ForwardedRef<HTMLFormElement>) => {
    const { zIndex, width = '100%', minWidth, maxWidth } = props;
    const { height, minHeight, maxHeight } = props;
    const { flex, direction = 'vertical', align, crossAlign } = props;
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
    const cursorT = CursorTheme({ cursor });

    return (
      <form
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
      </form>
    );
  },
);
