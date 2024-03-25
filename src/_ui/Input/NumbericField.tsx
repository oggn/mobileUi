/** @jsxImportSource @emotion/react */
import React, {
    ChangeEvent,
    ForwardedRef,
    InputHTMLAttributes,
    ReactNode,
    forwardRef,
    useEffect,
    useState,
} from 'react'
import { GlobalInputTheme } from '../_themes/input'
import { TxtSpan } from '../typography/TxtSpan'
import { V } from '@/_ui'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'onChange'> {
    as?: 's' | 'm' | 'l'
    theme?: 'light' | 'dark'
    width?: number | string
    error?: boolean
    edge?: ReactNode
    inputSize?: number
    value: string | number
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
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

const NumbericField = forwardRef(
    (
        { theme = 'light', as = 'l', width = '100%', error, edge, disabled, value, onChange, ...props }: Props,
        ref: ForwardedRef<HTMLInputElement>,
    ) => {
        const { handleFocus, handleBlur, THEME_VARIANTS, SIZE_VARIANTS } = props

        const [displayValue, setDisplayValue] = useState<string>('')

        useEffect(() => {
            const formattedValue =
                typeof value === 'number'
                    ? value.toLocaleString()
                    : value === ''
                      ? ''
                      : /^\d*\.?\d*$/.test(value.toString())
                        ? parseFloat(value.toString()).toLocaleString()
                        : '0'
            setDisplayValue(formattedValue)
        }, [value])

        const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
            const rawValue = e.target.value.replace(/,/g, '')

            if (rawValue === '') {
                setDisplayValue('')
                onChange?.({ ...e, target: { ...e.target, value: '' } })
            } else if (/^\d*\.?\d*$/.test(rawValue)) {
                setDisplayValue(rawValue.replace(/\B(?=(\d{3})+(?!\d))/g, ','))
                onChange?.({ ...e, target: { ...e.target, value: rawValue } })
            } else {
                setDisplayValue('')
                onChange?.({ ...e, target: { ...e.target, value: '0' } })
            }
        }

        const inputT = GlobalInputTheme() as any

        return (
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
                    value={displayValue}
                    onChange={handleInputChange}
                    autoComplete="off"
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

                {!!edge && (
                    <TxtSpan padding={{ right: 10 }} color={THEME_VARIANTS?.[theme].edgeColor}>
                        {edge}
                    </TxtSpan>
                )}
            </V.Row>
        )
    },
)

export { NumbericField }
