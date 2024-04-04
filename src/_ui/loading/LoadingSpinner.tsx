/** @jsxImportSource @emotion/react */
import { keyframes } from '@emotion/react'
import { ForwardedRef, HTMLAttributes, forwardRef, memo } from 'react'

// --------------------------------------------
// -------------- Type Interface --------------
// --------------------------------------------
interface Props extends HTMLAttributes<HTMLDivElement> {
    children?: never[]
    size?: number
    storkeSize?: number
    variant?: 'light' | 'dark'
}

// --------------------------------------------
// -------------- LoadingSpinner --------------
// --------------------------------------------
const LoadingSpinnerUi = forwardRef(
    ({ size = 40, storkeSize = 3, variant = 'light', ...props }: Props, ref?: ForwardedRef<HTMLDivElement>) => {
        const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

        const VARIANTS = {
            light: { color: '#ccc' },
            dark: { color: '#999' },
        }

        return (
            <div
                ref={ref}
                css={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
                {...props}
            >
                <div
                    css={{
                        width: `${size}px`,
                        minWidth: `${size}px`,
                        height: `${size}px`,
                        minHeight: `${size}px`,
                        border: `${storkeSize}px solid ${VARIANTS[variant].color}`,
                        borderBottomColor: 'transparent',
                        borderRadius: '50%',
                        display: 'inline-block',
                        boxSizing: 'border-box',
                        animation: `${rotation} 1s linear infinite`,
                    }}
                />
            </div>
        )
    },
)
export const LoadingSpinner = memo(LoadingSpinnerUi)
