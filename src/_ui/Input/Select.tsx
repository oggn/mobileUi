/** @jsxImportSource @emotion/react */
import React, { ReactElement, SelectHTMLAttributes, forwardRef, useCallback, useState } from 'react'
import { Option } from './Option'
import { GlobalInputTheme } from '../_themes/input'
import { Txt } from '../typography/Txt'
import { P, V } from '@/_ui'
import { VARIANTS } from './VARIANTS'

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

    const { THEMES: THEME_VARIANTS, SIZES: SIZE_VARIANTS, generateUUID } = VARIANTS({ error, disabled, isFocused })

    const inputT = GlobalInputTheme() as any

    return (
        <V.Column>
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

            <V.Row
                width={SIZE_VARIANTS[as].width}
                maxWidth={width}
                align="center"
                gap={6}
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
                <select
                    ref={ref}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    id={generateUUID()}
                    {...rest}
                    css={{
                        ...themes.select,
                        ...inputT,
                        width: SIZE_VARIANTS[as].width,
                        color: THEME_VARIANTS[theme].color,
                        fontSize: SIZE_VARIANTS[as].txtSize,
                        padding: SIZE_VARIANTS[as].padding,
                        paddingRight: as === 'l' ? 10 : 8,
                        borderRadius: SIZE_VARIANTS[as].br,
                        '::placeholder': { color: THEME_VARIANTS[theme].placeholder },
                    }}
                >
                    {options?.map((item, index) => renderItem(item, index)).flat()}
                </select>

                <P.Absolute position={{ right: 8 }}>
                    <SelectIcon size={SIZE_VARIANTS[as].selectSize} fill={THEME_VARIANTS[theme].selectFill} />
                </P.Absolute>
            </V.Row>

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
        </V.Column>
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
            <svg width={size} viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 10L0.00481023 0.249999L12.9952 0.25L6.5 10Z" fill={fill} />
            </svg>
        </div>
    )
}
