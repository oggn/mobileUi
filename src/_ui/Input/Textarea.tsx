/** @jsxImportSource @emotion/react */
import React, { ForwardedRef, TextareaHTMLAttributes, forwardRef, useCallback, useEffect, useState } from 'react'
import { GlobalInputTheme } from '../_themes/input'
import { ScrollType } from '../_themes/scroll'
import { TxtTab } from '../tab/TxtTab'
import { TxtSpan } from '../typography/TxtSpan'
import { V } from '@/_ui'
import { VARIANTS } from './VARIANTS'

interface Props extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>, ScrollType {
    theme?: 'light' | 'dark'
    autoRaise?: boolean
    error?: boolean
    errorMessage?: boolean | string
    tolTip?: string
    textCountActive?: boolean
    tab?: {
        onClick?: any
        name: string
        size?: number
        color?: string
        disabled?: boolean
    }
}

const Textarea = forwardRef((props: Props, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const { value, disabled, autoRaise, scroll } = props
    const { theme = 'light', tab, rows = 1, textCountActive, error } = props

    const [isFocused, setIsFocused] = useState(false)
    const handleFocus = useCallback(() => setIsFocused(true), [isFocused])
    const handleBlur = useCallback(() => setIsFocused(false), [isFocused])

    //
    // themes
    const { THEMES: THEME_VARIANTS, generateUUID } = VARIANTS({
        error,
        disabled,
        isFocused,
    })

    //
    // rasize
    useEffect(() => {
        const handleRasie = () => {
            if (value && value !== '' && ref && 'current' in ref && ref.current) {
                ref.current.style.height = 'auto'
                ref.current.style.height = ref.current.scrollHeight + 'px'
            } else if (ref && 'current' in ref && ref.current) {
                ref.current.style.height = 'auto'
            }
        }

        if (autoRaise) handleRasie()
    }, [value, ref, autoRaise])

    return (
        <V.Column gap={6}>
            <V.Row
                align="end"
                minHeight={50}
                border={{
                    solid: 1,
                    position: 'all',
                    color: THEME_VARIANTS?.[theme].solidColor,
                }}
                borderRadius={14}
                backgroundColor={disabled ? THEME_VARIANTS?.[theme].disabledColor : THEME_VARIANTS?.[theme].activeColor}
                transitionTime={0.5}
            >
                <textarea
                    ref={ref}
                    id={generateUUID()}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    rows={rows}
                    css={{
                        ...(GlobalInputTheme() as any),

                        width: '100%',
                        height: '100%',
                        color: THEME_VARIANTS?.[theme].color,
                        padding: '13px',
                        fontSize: '0.938rem',
                        outline: 'none',
                        border: 'none',
                        backgroundColor: 'transparent',
                        resize: 'none',
                        overflow: rows >= 2 ? 'auto' : 'visible',
                        '::placeholder': { color: THEME_VARIANTS?.[theme].placeholder },
                        '::-webkit-scrollbar': {
                            display: scroll?.bar ?? rows >= 2 ? 'flex' : 'none' ?? 'none',
                            width: '4px',
                            height: '4px',
                        },
                        '::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
                        '::-webkit-scrollbar-thumb': {
                            backgroundColor: '#cccccc',
                            borderRadius: '100px',
                        },
                        '::-webkit-scrollbar-thumb:hover': { background: '#e2e2e2' },
                        '::-webkit-scrollbar-button:start:decrement, ::-webkit-scrollbar-button:end:increment': {
                            width: 0,
                            height: 0,
                            backgroundColor: 'transparent',
                        },
                    }}
                    {...props}
                />

                {!!tab && (
                    <TxtTab
                        color={tab.color ?? '#4788f4'}
                        size={tab.size ?? 14}
                        onClick={() => {
                            if (tab.onClick) {
                                tab.onClick()
                            } else return
                        }}
                        padding={{ vertical: 10, right: 10, left: 6 }}
                        css={{ whiteSpace: 'nowrap', minHeight: 48 }}
                        disabled={tab.disabled}
                        onMouseEnter={!tab.disabled ? (handleFocus as any) : null}
                        onMouseLeave={!tab.disabled ? (handleBlur as any) : null}
                    >
                        {tab.name ?? '확인'}
                    </TxtTab>
                )}
            </V.Row>

            {textCountActive && (
                <TxtSpan color="#999" size={12}>
                    {typeof props.value === 'string' ? props.value.length : 0}
                    {'/' + props.maxLength}
                </TxtSpan>
            )}
        </V.Column>
    )
})

export { Textarea }
