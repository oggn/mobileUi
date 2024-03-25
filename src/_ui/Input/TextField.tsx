/** @jsxImportSource @emotion/react */
import React, { ForwardedRef, InputHTMLAttributes, ReactNode, forwardRef, useCallback, useState } from 'react'
import { GlobalInputTheme } from '../_themes/input'
import { TxtTab } from '../tab/TxtTab'
import { V } from '@/_ui'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    as?: 's' | 'm' | 'l'
    theme?: 'light' | 'dark'
    width?: number | string
    error?: boolean
    errorMessage?: string
    tolTip?: boolean | string
    inputSize?: number
    tab?: {
        onClick?: any
        name: string
        size?: number
        color?: string
        disabled?: boolean
    }
    handleFocus?: () => void
    handleBlur?: () => void
    THEME_VARIANTS?: {
        light: { [key: string]: string }
        dark: { [key: string]: string }
    }
    SIZE_VARIANTS?: {
        s: { [key: string]: string }
        m: { [key: string]: string }
        l: { [key: string]: string }
    }
}

const TextField = forwardRef((props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const { theme = 'light', as = 'l', width = '100%' } = props
    const { disabled, tab, handleFocus, handleBlur, THEME_VARIANTS, SIZE_VARIANTS } = props
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
                width={SIZE_VARIANTS?.[as].width as 'auto' | '100%'}
                maxWidth={width}
                align="center"
                minHeight={SIZE_VARIANTS?.[as].height}
                maxHeight={SIZE_VARIANTS?.[as].height}
                border={{
                    solid: 1,
                    position: 'all',
                    color: THEME_VARIANTS?.[theme].solidColor,
                }}
                borderRadius={SIZE_VARIANTS?.[as].br}
                backgroundColor={disabled ? THEME_VARIANTS?.[theme].disabledColor : THEME_VARIANTS?.[theme].activeColor}
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
                        width: SIZE_VARIANTS?.[as].width,
                        height: '100%',
                        color: THEME_VARIANTS?.[theme].color,
                        fontSize: SIZE_VARIANTS?.[as].txtSize,
                        padding: SIZE_VARIANTS?.[as].padding,
                        outline: 'none',
                        border: 'none',
                        resize: 'none',
                        backgroundColor: 'transparent',
                        borderRadius: SIZE_VARIANTS?.[as].br,
                        '::placeholder': { color: THEME_VARIANTS?.[theme].placeholder },
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
        </V.Column>
    )
})

export { TextField }
