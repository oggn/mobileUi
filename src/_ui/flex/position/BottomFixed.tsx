import React, { ReactNode } from 'react'
import { Fixed } from './Fixed'

interface Props {
    children: ReactNode
    height?: number
    zIndex?: number
    padding?: {
        all?: number | string
        horizontal?: number | string
        vertical?: number | string
        top?: number | string
        bottom?: number | string
        left?: number | string
        right?: number | string
    }
    backgroundColor?: string
}

export function BottomFixed(props: Props) {
    const p_all = props.padding?.all
    const p_V = props.padding?.vertical
    const p_H = props.padding?.horizontal
    const p_T = props.padding?.top
    const p_B = props.padding?.bottom
    const p_L = props.padding?.left
    const p_R = props.padding?.right

    return (
        <div
            css={{
                width: '100%',
                maxHeight: props.height,
                minHeight: props.height,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: '0.3s ease-in-out',
            }}
        >
            <Fixed
                zIndex={props.zIndex ?? 9000}
                minHeight={props.height ?? 60}
                maxHeight={props.height ?? 60}
                height="100%"
                position={{ bottom: 0, left: 0, right: 0 }}
                align="center"
                transitionTime={0.3}
                backgroundColor={props.backgroundColor}
            >
                <div
                    css={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: 'max(0px, env(safe-area-inset-top))',
                        paddingBottom: 'max(0px, env(safe-area-inset-bottom))',
                        paddingInlineStart: 'max(0px, env(safe-area-inset-left))',
                        paddingInlineEnd: 'max(0px, env(safe-area-inset-right))',
                    }}
                >
                    <div
                        css={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingTop: (p_all && p_all) || (p_V && p_V) || (p_T && p_T),
                            paddingBottom: (p_all && p_all) || (p_V && p_V) || (p_B && p_B),
                            paddingLeft: (p_all && p_all) || (p_H && p_H) || (p_L && p_L),
                            paddingRight: (p_all && p_all) || (p_H && p_H) || (p_R && p_R),
                        }}
                    >
                        {props.children}
                    </div>
                </div>
            </Fixed>
        </div>
    )
}
