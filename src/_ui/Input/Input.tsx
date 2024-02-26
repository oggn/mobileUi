/** @jsxImportSource @emotion/react */
import React, { Children, HTMLAttributes, ReactElement, ReactNode, cloneElement, useId } from 'react'
import { Column } from '../flex/Column'
import { Txt } from '../typography/Txt'
import { TextField } from './TextField'
import { Textarea } from './Textarea'
import { PhoneNumberField } from './PhoneNumberField'
import { NumbericField } from './NumbericField'

interface InputProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactElement
    label?: ReactNode
    labelEdge?: string
    maxWidth?: number
}

export function Input({ label, labelEdge, maxWidth, ...props }: InputProps) {
    const useid = useId()

    const child = Children.only(props.children)
    const id = child.props.id ?? useid
    const error: boolean = child.props.error ?? false
    const errorMsg: string = child.props.errorMessage ?? undefined
    const tolTip: string = child.props.tolTip ?? undefined
    const theme: 'light' | 'dark' = child.props.theme ?? 'light'

    const VARIANTS = {
        light: { tolTip: '#999' },
        dark: { tolTip: '#888' },
    }

    return (
        <Column maxWidth={maxWidth} {...props}>
            {label && (
                <label
                    htmlFor={id}
                    css={{
                        color: error ? '#F25757' : '#8a8a8a',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: '0.75rem',
                        marginBottom: '4px',

                        '&:focus-within': { fontWeight: 500 },
                    }}
                >
                    {label}
                </label>
            )}

            {cloneElement(child, {
                id,
                ...child.props,
            })}

            {error && (
                <Txt color="#F25757" size={12} margin={{ top: 6 }}>
                    {errorMsg}
                </Txt>
            )}

            {!!tolTip && !error && (
                <Txt color={VARIANTS[theme].tolTip} size={13} margin={{ top: 6 }}>
                    {tolTip}
                </Txt>
            )}
        </Column>
    )
}

Input.TextField = TextField
Input.Textarea = Textarea
Input.PhoneNumberField = PhoneNumberField
Input.NumbericField = NumbericField
