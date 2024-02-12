/** @jsxImportSource @emotion/react */
import React, {
  Children,
  ForwardedRef,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  forwardRef,
} from 'react';
import { Interpolation, Theme } from '@emotion/react';
import Link from 'next/link';
import { Column, Row, TxtSpan, Container } from '../index';
import { MQ } from '@/libs/themes';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  design?: 'default' | 'shape';
  maxWidth?: number;
}

interface MenuProps extends HTMLAttributes<HTMLLinkElement> {
  children: ReactElement;
  href: string;
  label?: string;
}

interface BottomTabNavigatorComponent
  extends React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>> {
  Tab: React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<HTMLAnchorElement>>;
}

const Tab = forwardRef<HTMLAnchorElement, MenuProps>(({ children, href, label, ...props }, ref) => {
  const child = Children.only(children);

  return (
    <Link ref={ref} href={href} passHref>
      <Column
        padding={{ all: 8 }}
        gap={3}
        align="center"
        crossAlign="center"
        borderRadius={14}
        css={{
          '&:hover': { backgroundColor: '#f8f9fc' },
          [MQ[3]]: {
            maxWidth: '60px',
            minWidth: '60px',
            '&:hover': { backgroundColor: 'transparent' },
          },
        }}
      >
        <Container
          width="auto"
          maxHeight={28}
          minHeight={28}
          align="center"
          crossAlign="center"
          css={{ [MQ[3]]: { maxHeight: '23px', minHeight: '23px' } }}
        >
          {child}
        </Container>
        <TxtSpan size={13} css={{ [MQ[3]]: { fontSize: '0.68rem' } }} {...props}>
          {label}
        </TxtSpan>
      </Column>
    </Link>
  );
});

const BottomTabNavigatorBase: React.ForwardRefRenderFunction<HTMLDivElement, Props> = (
  { children, design = 'default', maxWidth = 600 },
  ref,
) => {
  let childrenArray = React.Children.toArray(children);

  childrenArray = childrenArray.filter((child) => true);

  if (childrenArray.length < 7) {
    return (
      <Container ref={ref} height="100%" css={[ContainerTheme(design)]}>
        <Row align="center" crossAlign="center" css={[RowTheme(design)]}>
          <nav css={[NavTheme(design, maxWidth)]}>{childrenArray}</nav>
        </Row>
      </Container>
    );
  }

  return null;
};

const BottomTabNavigator = forwardRef(BottomTabNavigatorBase) as BottomTabNavigatorComponent;
BottomTabNavigator.Tab = Tab;

export { BottomTabNavigator };

// ------------------------------------
// -------------- Styles --------------
// ------------------------------------
function ContainerTheme(design: 'default' | 'shape'): Interpolation<Theme> {
  if (design === 'default') {
    return {
      paddingBottom: 'calc(env(safe-area-inset-bottom) + 75px)',
      [MQ[2]]: { paddingBottom: 'calc(env(safe-area-inset-bottom) + 66.67px)' },
    };
  }

  if (design === 'shape') {
    return {
      paddingBottom: 'calc(env(safe-area-inset-bottom) + 114.33px)',
      [MQ[2]]: { paddingBottom: 'calc(env(safe-area-inset-bottom) + 86px)' },
    };
  }
}

function RowTheme(design: 'default' | 'shape'): Interpolation<Theme> {
  const viewThemes = (): Interpolation<Theme> => {
    return { zIndex: '8999', position: 'fixed', bottom: '0', left: '0', right: '0' };
  };

  if (design === 'default') {
    return {
      ...(viewThemes() as object),
      paddingTop: 'env(safe-area-inset-top)',
      paddingBottom: 'env(safe-area-inset-bottom)',
      borderTop: '1px solid #f0f0f0',
      backgroundColor: '#ffffff',
    };
  }

  if (design === 'shape') {
    return {
      ...(viewThemes() as object),
      paddingTop: 'env(safe-area-inset-top)',
      paddingBottom: 'calc(env(safe-area-inset-bottom) + 40px)',
      paddingLeft: 'calc(env(safe-area-inset-left) + 14px)',
      paddingRight: 'calc(env(safe-area-inset-right) + 14px)',

      [MQ[2]]: { paddingBottom: 'calc(env(safe-area-inset-bottom) + 10px)' },
    };
  }
}

function NavTheme(design: 'default' | 'shape', maxWidth?: number): Interpolation<Theme> {
  const viewThemes = (): Interpolation<Theme> => {
    return {
      maxWidth: `${maxWidth}px`,
      width: '100%',
      height: '100%',
      zIndex: '8999',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: '0.3s ease-in-out',
      padding: '4px 10px',
    };
  };

  if (design === 'default') {
    return { ...(viewThemes() as object) };
  }

  if (design === 'shape') {
    return {
      ...(viewThemes() as object),
      boxShadow: '0 2px 26px rgba(0,0,0,0.08)',
      borderRadius: '10000px',
      backgroundColor: '#ffffff',
    };
  }
}
