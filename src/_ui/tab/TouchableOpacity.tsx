/** @jsxImportSource @emotion/react */

import React, { HTMLAttributes, ReactNode } from 'react';
import { CursorTheme, CursorType } from '../_themes/cursor';
import { SpaceTheme, SpaceType } from '../_themes/space';
import { ViewportTypes } from '../_themes/viewport';
import { FlexTheme, FlexType } from '../_themes/flex';

interface Props
  extends Omit<HTMLAttributes<HTMLDivElement | HTMLLIElement | HTMLSpanElement>, 'color'>,
    ViewportTypes,
    FlexType,
    SpaceType,
    CursorType {
  as?: 'div' | 'li' | 'span';
  children: ReactNode;
  size?: number;
  color?: string;
  disabledColor?: string;
  touchOpacity?: number;
  backgroundColor?: string;
  borderRadius?: number;
}

export function TouchableOpacity(props: Props) {
  const { as = 'div', cursor, color = '#4788f4', size = 14 } = props;
  const { disabledColor, touchOpacity, backgroundColor, borderRadius } = props;
  const { padding, margin } = props;
  const { width, minWidth, maxWidth } = props;
  const { height, minHeight, maxHeight } = props;
  const { flex, direction = 'horizontal', align = 'center', crossAlign } = props;
  const { wrap, gap, crossGap } = props;

  const spaceT = SpaceTheme({ padding, margin }) as any;
  const cursorT = CursorTheme({ cursor, onClick: props.onClick }) as any;
  const viewT = { width, height, minWidth, maxWidth, minHeight, maxHeight };
  const FlexT = FlexTheme({
    flex,
    direction,
    align,
    crossAlign,
    wrap,
    gap,
    crossGap,
  });

  return (
    <>
      {as === 'div' && (
        <div
          css={{
            whiteSpace: 'nowrap',
            fontSize: size ? `${size / 16}rem` : '0.938rem',
            color,
            transition: '0.1s ease-in-out',
            backgroundColor,
            borderRadius: borderRadius,
            ...viewT,
            ...FlexT,
            ...spaceT,
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
            whiteSpace: 'nowrap',
            fontSize: size ? `${size / 16}rem` : '0.938rem',
            color,
            transition: '0.1s ease-in-out',
            backgroundColor,
            borderRadius: borderRadius,
            ...viewT,
            ...FlexT,
            ...spaceT,
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
            whiteSpace: 'nowrap',
            fontSize: size ? `${size / 16}rem` : '0.938rem',
            color,
            transition: '0.1s ease-in-out',
            backgroundColor,
            borderRadius: borderRadius,
            ...viewT,
            ...FlexT,
            ...spaceT,
            ...cursorT,

            '&:disabled': { color: disabledColor ?? '#ccc', cursor: 'default' },
            '&:active': { opacity: touchOpacity ?? 0.7 },
          }}
          {...props}
        >
          {props.children}
        </span>
      )}
    </>
  );
}
