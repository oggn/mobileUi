/** @jsxImportSource @emotion/react */
import React, {
    ChangeEvent,
    ForwardedRef,
    InputHTMLAttributes,
    forwardRef,
    useCallback,
    useEffect,
    useState,
} from 'react'
import { GlobalInputTheme } from '../_themes/input'
import { V } from '../flex/V'

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    as?: 's' | 'm' | 'l'
    theme?: 'light' | 'dark'
    width?: number | string
    error?: boolean
    tolTip?: boolean | string

    inputSize?: number
}

const PhoneNumberField = forwardRef(
    (
        {
            theme = 'light',
            as = 'l',
            width = '100%',
            error,
            disabled,
            value: externalValue,
            onChange: externalOnChange,
            tolTip,
            ...props
        }: Props,
        ref: ForwardedRef<HTMLInputElement>,
    ) => {
        const [isFocused, setIsFocused] = useState(false)
        const handleFocus = useCallback(() => setIsFocused(true), [isFocused])
        const handleBlur = useCallback(() => setIsFocused(false), [isFocused])

        const [internalValue, setInternalValue] = useState<string>(String(externalValue) || '')

        // 외부에서 전달된 value 값이 변경되면, 내부 state도 업데이트합니다.
        useEffect(() => {
            if (externalValue) {
                setInternalValue(String(externalValue))
            }
        }, [externalValue])

        const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
            const inputVal = e.target.value.trim().replace(/[^0-9]/g, '')
            let formattedVal = inputVal
            if (inputVal.length === 9) {
                formattedVal = inputVal.replace(/(\d{2})(\d{3})(\d{4})/, '$1-$2-$3')
            } else if (inputVal.length === 10) {
                formattedVal = inputVal.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3')
            } else if (inputVal.length === 11) {
                formattedVal = inputVal.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
            }

            setInternalValue(formattedVal)

            if (externalOnChange) {
                const newEvent = {
                    ...e,
                    target: {
                        ...e.target,
                        value: formattedVal,
                    },
                } as ChangeEvent<HTMLInputElement>
                externalOnChange(newEvent)
            }
        }

        const THEME_VARIANTS = {
            light: {
                solidColor: !error && isFocused ? '#1889F1' : '#e2e2e2' && error ? '#FF6767' : '#e2e2e2',
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
            m: { width: '100%', txtSize: '0.875em', height: 44, padding: '10px 11px', br: 12 },
            l: { width: '100%', txtSize: '0.938em', height: 50, padding: 13, br: 14 },
        } as const

        const inputT = GlobalInputTheme() as any

        return (
            <V.Column gap={6}>
                <V.Row
                    width={SIZE_VARIANTS[as].width}
                    maxWidth={width}
                    align="center"
                    minHeight={SIZE_VARIANTS[as].height}
                    maxHeight={SIZE_VARIANTS[as].height}
                    border={{ solid: 1, position: 'all', color: THEME_VARIANTS[theme].solidColor }}
                    borderRadius={SIZE_VARIANTS[as].br}
                    backgroundColor={disabled ? THEME_VARIANTS[theme].disabledColor : THEME_VARIANTS[theme].activeColor}
                    transitionTime={0.5}
                >
                    <input
                        ref={ref}
                        type="text"
                        autoComplete="off"
                        maxLength={13}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        value={internalValue}
                        onChange={handleInputChange}
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
                </V.Row>
            </V.Column>
        )
    },
)

export { PhoneNumberField }
