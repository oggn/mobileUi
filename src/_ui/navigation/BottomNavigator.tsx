/** @jsxImportSource @emotion/react */
import React, { Children, HTMLAttributes, ReactElement, ReactNode, forwardRef } from 'react'
import { Interpolation, Theme } from '@emotion/react'
import Link from 'next/link'
import { V, TxtSpan, P, TouchableOpacity } from '../index'
import { MQ } from '@/libs/themes'

interface Props extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    design?: 'default' | 'shape'
    maxWidth?: number
}

interface MenuProps extends HTMLAttributes<HTMLLinkElement> {
    children: ReactElement
    href: string
    label?: string
}

interface BottomTabNavigatorComponent
    extends React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLDivElement>> {
    Tab: React.ForwardRefExoticComponent<MenuProps & React.RefAttributes<HTMLAnchorElement>>
}

const Tab = forwardRef<HTMLAnchorElement, MenuProps>(({ children, href, label, ...props }, ref) => {
    const child = Children.only(children)

    return (
        <Link ref={ref} href={href} passHref>
            <TouchableOpacity
                padding={{ all: 8 }}
                gap={3}
                direction="vertical"
                align="center"
                crossAlign="center"
                borderRadius={14}
                css={{ [MQ[3]]: { maxWidth: '60px', minWidth: '60px' } }}
            >
                <V.Container
                    width="auto"
                    maxHeight={28}
                    minHeight={28}
                    align="center"
                    crossAlign="center"
                    css={{ [MQ[3]]: { maxHeight: '23px', minHeight: '23px' } }}
                >
                    {child}
                </V.Container>
                <TxtSpan size={13} css={{ [MQ[3]]: { fontSize: '0.68rem' } }} {...props}>
                    {label}
                </TxtSpan>
            </TouchableOpacity>
        </Link>
    )
})

const BottomTabNavigatorBase: React.ForwardRefRenderFunction<HTMLDivElement, Props> = (
    { children, design = 'default', maxWidth = 600 },
    ref,
) => {
    let childrenArray = React.Children.toArray(children)

    childrenArray = childrenArray.filter((child) => true)

    if (childrenArray.length < 7) {
        return (
            <P.BottomFixed height={design === 'shape' ? 100 : 70}>
                {design === 'shape' && (
                    <V.Container align="center" padding={{ horizontal: 10 }} ref={ref}>
                        <nav css={[NavTheme(design, maxWidth)]}>{childrenArray}</nav>
                    </V.Container>
                )}

                {design === 'default' && (
                    <V.Container
                        align="center"
                        backgroundColor="#Fff"
                        border={{ solid: 1, position: 'top', color: '#eee' }}
                        ref={ref}
                    >
                        <nav css={[NavTheme(design, maxWidth)]}>{childrenArray}</nav>
                    </V.Container>
                )}
            </P.BottomFixed>
        )
    }

    return null
}

const BottomNavigator = forwardRef(BottomTabNavigatorBase) as BottomTabNavigatorComponent
BottomNavigator.Tab = Tab

export { BottomNavigator }

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
        }
    }

    if (design === 'default') {
        return { ...(viewThemes() as object) }
    }

    if (design === 'shape') {
        return {
            ...(viewThemes() as object),
            boxShadow: '0 2px 26px rgba(0,0,0,0.08)',
            borderRadius: '10000px',
            backgroundColor: '#ffffff',
        }
    }
}
