/** @jsxImportSource @emotion/react */
import React, { ForwardedRef, HTMLAttributes, ReactNode, forwardRef } from 'react';
import { SpaceTheme, SpaceType } from '../../_themes/space';
import { FlexTheme, FlexType } from '../../_themes/flex';
import { ViewportTypes } from '../../_themes/viewport';
import { ScrollTheme, ScrollType } from '../../_themes/scroll';
import { BorderTheme, BorderType } from '../../_themes/border';
import { ShadowTheme, ShadowType } from '../../_themes/boxShadow';
import { CursorTheme, CursorType } from '../../_themes/cursor';

interface Props
  extends HTMLAttributes<HTMLFormElement>,
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

const Form = forwardRef((props: Props, ref: ForwardedRef<HTMLFormElement>) => {
  const {
    zIndex,
    width,
    minWidth,
    maxWidth,
    height,
    minHeight,
    maxHeight,
    backgroundColor,
    borderRadius,
    transitionTime,
    flex,
    direction,
    align,
    crossAlign,
    wrap,
    gap,
    crossGap,
    basis,
    grow,
    shrink,
    padding,
    margin,
    scroll,
    border,
    shadow,
    cursor,
    ...rest
  } = props;

  const FlexT = FlexTheme({
    flex,
    direction: direction ?? 'vertical',
    align: align ?? 'start',
    crossAlign,
    wrap,
    gap,
    crossGap,
    basis,
    grow,
    shrink,
  });

  const spaceT = SpaceTheme({ padding, margin });
  const scrollT = ScrollTheme({ scroll });
  const borderT = BorderTheme({ border: border });
  const shadowT = ShadowTheme({ shadow: shadow });
  const cursorT = CursorTheme({ cursor: cursor, onClick: rest.onClick });

  return (
    <form
      ref={ref}
      css={{
        zIndex: zIndex,
        width: width ?? '100%',
        minWidth: minWidth,
        maxWidth: maxWidth,
        height: height,
        minHeight: minHeight,
        maxHeight: maxHeight,

        position: 'relative',
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        transition: `${transitionTime ?? 0}s ease-in-out`,

        ...FlexT,
        ...spaceT,
        ...scrollT,
        ...borderT,
        ...shadowT,
        ...cursorT,
      }}
      {...rest}
    >
      {rest.children}
    </form>
  );
});

export { Form };
