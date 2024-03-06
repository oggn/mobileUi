/** @jsxImportSource @emotion/react */
import React, { ForwardedRef, InputHTMLAttributes, forwardRef, useId, useState } from 'react'
import { colors } from '../../libs/themes/colors'
import { Txt } from '../typography/Txt'
import { V } from '@/_ui'

//
interface CheckProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    checkSize?: number
    size?: number
    type?: 'checkbox' | 'radio'
    theme?: 'light' | 'dark'
    label?: {
        title: string
        titleColor?: string
        titleSize?: number
        titleWeight?: 'lighter' | 'normal' | 'medium' | 'bold'
        txt?: string
        txtColor?: string
        txtSize?: number
        txtOnClick?: any
    }
}

export const Checkbox = forwardRef(function Checkbox(props: CheckProps, ref: ForwardedRef<HTMLInputElement>) {
    const uid = useId()

    const { id = 'check', type = 'checkbox', disabled, theme = 'light', checkSize = 16, label } = props
    const [hover, setHover] = useState(false)

    const VARIANTS = {
        light: {
            defaultColor: '#e2e2e2',
            hoverColor: '#F2F2FF',
            disabledColor: '#c9c9c9',
            border: '#ccc',
            labelTitleColor: '#444',
            labelTxtColor: '#999',
        },
        dark: {
            defaultColor: '#333',
            hoverColor: '#444',
            disabledColor: '#111',
            border: '#333',
            labelTitleColor: '#ccc',
            labelTxtColor: '#aaa',
        },
    } as const

    return (
        <V.Row align="start" gap={3} width="auto">
            <label
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                css={{
                    ...CheckLabelTheme,
                    maxWidth: checkSize + 10,
                    maxHeight: checkSize + 10,
                    minWidth: checkSize + 10,
                    minHeight: checkSize + 10,
                    cursor: !disabled ? 'cursor' : 'default',
                }}
                htmlFor={id ?? uid}
            >
                <div
                    css={{
                        ...HBoxTheme,
                        backgroundColor: VARIANTS[theme].hoverColor,
                        transform: hover ? 'scale(1)' : 'scale(0)',
                    }}
                />
                <input
                    ref={ref}
                    type={type}
                    css={{
                        ...CheckTheme,
                        zIndex: 1,
                        width: checkSize,
                        minWidth: checkSize,
                        height: checkSize,
                        minHeight: checkSize,
                        backgroundColor: VARIANTS[theme].defaultColor,
                        '&:checked': { backgroundColor: colors.keyColor },
                        '&:disabled': {
                            backgroundColor: VARIANTS[theme].disabledColor,
                            border: `1px solid ${VARIANTS[theme].border}`,
                            cursor: 'default',
                        },
                    }}
                    id={id ?? uid}
                    {...props}
                />
            </label>

            {!!label && (
                <V.Column gap={4}>
                    <label
                        htmlFor={id ?? uid}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        css={{
                            ...labelTheme,
                            cursor: disabled ? 'default' : 'pointer',
                        }}
                    >
                        <Txt
                            weight={label.titleWeight ?? 'medium'}
                            size={label.titleSize ?? 14}
                            color={label.titleColor ?? VARIANTS[theme].labelTitleColor}
                        >
                            {label.title}
                        </Txt>
                    </label>

                    <Txt
                        size={label.txtSize ?? 12}
                        color={label.txtColor ?? VARIANTS[theme].labelTxtColor}
                        onClick={label.txtOnClick}
                    >
                        {label.txt}
                    </Txt>
                </V.Column>
            )}
        </V.Row>
    )
})

const labelTheme: any = {
    display: 'flex',
    flexDirection: 'column',
    rowGap: 3,
    userSelect: 'none',
    paddingTop: 2,
}

const CheckLabelTheme: any = {
    position: 'relative',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}

const HBoxTheme: any = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    transition: '0.3s ease-in-out',
    borderRadius: 100,
}

const CheckTheme: any = {
    zIndex: 1,
    border: '0px solid gainsboro',
    borderRadius: '5px !important',
    appearance: 'none',
    userSelect: 'none',
    transition: '0.2s ease-in-out',
    backgroundImage:
        "url('data:image/svg+xml,%3csvg viewBox=%220 0 16 16%22 fill=%22white%22 xmlns=%22http://www.w3.org/2000/svg%22%3e%3cpath d=%27M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z%27/%3e%3c/svg%3e')",

    '&:checked': {
        borderColor: 'transparent',
        backgroundSize: '100% 100%',
        backgroundPosition: '50%',
        backgroundRepeat: 'no-repeat',
        borderRadius: '5px',
    },

    '&:disabled': {
        borderColor: 'transparent',
        backgroundSize: '100% 100%',
        backgroundPosition: '50%',
        backgroundRepeat: 'no-repeat',
        borderRadius: '5px',
        cursor: 'default',
    },
}
