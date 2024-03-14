/** @jsxImportSource @emotion/react */
import React, { ForwardedRef, InputHTMLAttributes, ReactNode, forwardRef, useCallback, useState } from 'react'
import { GlobalInputTheme } from '../_themes/input'
import { TxtSpan } from '../typography/TxtSpan'
import { TxtTab } from '../tab/TxtTab'
import { V } from '@/_ui'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    as?: 's' | 'm' | 'l'
    theme?: 'light' | 'dark'
    width?: number | string
    error?: boolean
    errorMessage?: string
    tolTip?: boolean | string
    edge?: ReactNode
    inputSize?: number
    tab?: {
        onClick?: any
        name: string
        size?: number
        color?: string
        disabled?: boolean
    }
}

const TextField = forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const { theme = 'light', as = 'l', width = '100%' } = props
    const { error, edge, disabled, tab } = props

    const [isFocused, setIsFocused] = useState(false)
    const handleFocus = useCallback(() => setIsFocused(true), [isFocused])
    const handleBlur = useCallback(() => setIsFocused(false), [isFocused])

    const THEME_VARIANTS = {
        light: {
            solidColor: !error && isFocused ? '#b9d0e4' : '#e2e2e2' && error ? '#FF6767' : '#e2e2e2',
            color: disabled ? '#797979' : '#555',
            placeholder: '#ccc',
            activeColor: !error && isFocused ? '#f8f9fc' : '#fff',
            edgeColor: '#999',
            disabledColor: '#f4f4f4',
        },
        dark: {
            solidColor: !error && isFocused ? '#777' : '#444' && error ? '#FF6767' : '#444',
            color: disabled ? '#888' : '#bbb',
            placeholder: '#777',
            activeColor: !error && isFocused ? '#222' : 'transparent',
            edgeColor: '#888',
            disabledColor: '#101010',
        },
    } as const

    const SIZE_VARIANTS = {
        s: { width: 'auto', txtSize: '0.813em', height: 38, padding: 8, br: 10 },
        m: {
            width: '100%',
            txtSize: '0.875em',
            height: 44,
            padding: '10px 11px',
            br: 12,
        },
        l: { width: '100%', txtSize: '0.938em', height: 50, padding: 13, br: 14 },
    } as const

    const inputT = GlobalInputTheme() as any

    //
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (props.type === 'number') {
            let { value } = event.target

            const newValue = value.replace(/[^0-9]/g, '')

            if (props.maxLength && newValue.length > props.maxLength) {
                event.target.value = newValue.slice(0, props.maxLength)
            } else event.target.value = newValue
        }

        props.onChange?.(event)
    }

    return (
        <V.Column gap={6}>
            <V.Row
                width={SIZE_VARIANTS[as].width}
                maxWidth={width}
                align="center"
                minHeight={SIZE_VARIANTS[as].height}
                maxHeight={SIZE_VARIANTS[as].height}
                border={{
                    solid: 1,
                    position: 'all',
                    color: THEME_VARIANTS[theme].solidColor,
                }}
                borderRadius={SIZE_VARIANTS[as].br}
                backgroundColor={disabled ? THEME_VARIANTS[theme].disabledColor : THEME_VARIANTS[theme].activeColor}
                transitionTime={0.5}
            >
                <input
                    ref={ref}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onInput={handleInput}
                    {...props}
                    css={{
                        ...inputT,
                        width: SIZE_VARIANTS[as].width,
                        height: '100%',
                        color: THEME_VARIANTS[theme].color,
                        fontSize: SIZE_VARIANTS[as].txtSize,
                        padding: SIZE_VARIANTS[as].padding,
                        outline: 'none',
                        border: 'none',
                        resize: 'none',
                        backgroundColor: 'transparent',
                        borderRadius: SIZE_VARIANTS[as].br,
                        '::placeholder': { color: THEME_VARIANTS[theme].placeholder },
                    }}
                />

                {!!tab && (
                    <TxtTab
                        color={tab.color ?? '#4788f4'}
                        size={tab.size ?? 14}
                        onMouseEnter={!tab.disabled ? (handleFocus as any) : null}
                        onMouseLeave={!tab.disabled ? (handleBlur as any) : null}
                        onClick={() => {
                            if (tab.onClick) {
                                tab.onClick()
                            } else return
                        }}
                        padding={{ vertical: 10, right: 10, left: 6 }}
                        css={{ whiteSpace: 'nowrap' }}
                        disabled={tab.disabled}
                    >
                        {tab.name ?? '확인'}
                    </TxtTab>
                )}
            </V.Row>

            {!!edge && (
                <TxtSpan padding={{ right: 10 }} color={THEME_VARIANTS[theme].edgeColor}>
                    {edge}
                </TxtSpan>
            )}
        </V.Column>
    )
})

export { TextField }
