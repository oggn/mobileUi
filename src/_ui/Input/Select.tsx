/** @jsxImportSource @emotion/react */
import React, { ReactElement, SelectHTMLAttributes, forwardRef, useCallback, useState } from 'react'
import { Option } from './Option'
import { Column } from '../flex/view/Column'
import { Row } from '../flex/view/Row'
import { GlobalInputTheme } from '../_themes/input'
import { Txt } from '../typography/Txt'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
    as?: 's' | 'm' | 'l'
    theme?: 'light' | 'dark'
    renderItem: (item: any, index?: number) => ReactElement
    options: any[]
    width?: number
    label?: string
    error?: boolean
    errorMessage?: boolean | string
    tolTip?: string
}

const SelectComponent = forwardRef<HTMLSelectElement, Props>((props: Props, ref) => {
    const { options, renderItem, ...rest } = props
    const { theme = 'light', as = 'l', width = '100%' } = props
    const { error, errorMessage, tolTip, disabled, label } = props

    const [isFocused, setIsFocused] = useState(false)
    const handleFocus = useCallback(() => setIsFocused(true), [isFocused])
    const handleBlur = useCallback(() => setIsFocused(false), [isFocused])

    const THEME_VARIANTS = {
        light: {
            solidColor: !error && isFocused ? '#1889F1' : '#e2e2e2' && error ? '#FF6767' : '#e2e2e2',
            color: disabled ? '#797979' : '#555',
            placeholder: '#ccc',
            activeColor: !error && isFocused ? '#f8f9fc' : '#fff',
            edgeColor: '#999',
            disabledColor: '#f4f4f4',
            selectFill: '#ddd',
            tolTip: '#999',
        },
        dark: {
            solidColor: !error && isFocused ? '#777' : '#444' && error ? '#FF6767' : '#444',
            color: disabled ? '#888' : '#bbb',
            placeholder: '#777',
            activeColor: !error && isFocused ? '#222' : 'transparent',
            edgeColor: '#888',
            disabledColor: '#101010',
            selectFill: '#555',
            tolTip: '#888',
        },
    } as const

    const SIZE_VARIANTS = {
        s: { width: 'auto', txtSize: '0.813em', height: 38, padding: 8, br: 10, selectSize: 8 },
        m: {
            width: '100%',
            txtSize: '0.875em',
            height: 44,
            padding: '10px 11px',
            br: 12,
            selectSize: 8,
        },
        l: { width: '100%', txtSize: '0.938em', height: 50, padding: 13, br: 14, selectSize: 12 },
    } as const

    const inputT = GlobalInputTheme() as any

    return (
        <Column>
            {label && (
                <label
                    css={{
                        ...themes.label,
                        color: error ? '#F25757' : '#8a8a8a',
                    }}
                >
                    {label}
                </label>
            )}

            <Row
                width={SIZE_VARIANTS[as].width}
                maxWidth={width}
                align="center"
                gap={6}
                minHeight={SIZE_VARIANTS[as].height}
                maxHeight={SIZE_VARIANTS[as].height}
                border={{ solid: 1, position: 'all', color: THEME_VARIANTS[theme].solidColor }}
                borderRadius={SIZE_VARIANTS[as].br}
                backgroundColor={disabled ? THEME_VARIANTS[theme].disabledColor : THEME_VARIANTS[theme].activeColor}
                padding={{ right: as === 'l' ? 10 : 8 }}
                transitionTime={0.5}
            >
                <select
                    ref={ref}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...rest}
                    css={{
                        ...themes.select,
                        ...inputT,
                        width: SIZE_VARIANTS[as].width,
                        color: THEME_VARIANTS[theme].color,
                        fontSize: SIZE_VARIANTS[as].txtSize,
                        padding: SIZE_VARIANTS[as].padding,
                        borderRadius: SIZE_VARIANTS[as].br,
                        '::placeholder': { color: THEME_VARIANTS[theme].placeholder },
                    }}
                >
                    {options?.map((item, index) => renderItem(item, index)).flat()}
                </select>

                <SelectIcon size={SIZE_VARIANTS[as].selectSize} fill={THEME_VARIANTS[theme].selectFill} />
            </Row>

            {error && (
                <Txt color="#F25757" size={12} margin={{ top: 6 }}>
                    {errorMessage}
                </Txt>
            )}

            {!!tolTip && !error && (
                <Txt color={THEME_VARIANTS[theme].tolTip} size={13} margin={{ top: 6 }}>
                    {tolTip}
                </Txt>
            )}
        </Column>
    )
})

interface SelectWithOption extends React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLSelectElement>> {
    Option: typeof Option
}

const Select = SelectComponent as SelectWithOption
Select.Option = Option

export { Select }

// themes
const themes = {
    label: {
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        fontSize: '0.75rem',
        marginBottom: '4px',
        '&:focus-within': { fontWeight: 500 },
    },
    select: {
        height: '100%',
        outline: 'none',
        border: 'none',
        font: 'inherit',
        WebkitBoxSizing: 'border-box',
        MozBoxSizing: 'border-box',
        boxSizing: 'border-box',
        appearance: 'none',
        WebkitAppearance: 'none',
        MozAppearance: 'none',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'transparent !important',
        cursor: 'pointer',
    },
} as any

const SelectIcon = ({ fill, size }: { fill: string; size: number }) => {
    return (
        <div css={{ display: 'flex', alignItems: 'center' }}>
            <svg width={size} viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 10L0.00481023 0.249999L12.9952 0.25L6.5 10Z" fill={fill} />
            </svg>
        </div>
    )
}
