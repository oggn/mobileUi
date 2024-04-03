import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { css } from '@emotion/react' // Assuming you're using Emotion for CSS-in-JS
import { ToastSnackBar } from './feedback/ToastSnackBar'

interface ToastProps {
    theme?: 'light' | 'dark'
    status?: 'success' | 'failed'
    id: string
    title: string
    description?: string
    countdown: number // Added to track the countdown for each toast
}

const ToastContext = createContext({
    addToast: ({ theme, status, title, description }: Omit<ToastProps, 'id'>) => {},
    toasts: [] as ToastProps[],
})

export const useJenga = () => useContext(ToastContext)

export function JengaProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastProps[]>([])

    useEffect(() => {
        const interval = setInterval(() => {
            setToasts(
                (currentToasts) =>
                    currentToasts
                        .map((toast) => ({
                            ...toast,
                            countdown: toast.countdown > 0 ? toast.countdown - 1 : 0,
                        }))
                        .filter((toast) => toast.countdown > 0), // Remove toast when countdown reaches 0
            )
        }, 1000) // Update countdown every second

        return () => clearInterval(interval)
    }, [])

    const addToast = ({ theme, status, title, description }: Omit<ToastProps, 'id'>) => {
        const newToast = {
            id: Math.random().toString(36).substr(2, 9),
            theme,
            status,
            title,
            description,
            countdown: 3, // Initialize countdown for each toast
        }
        setToasts((prevToasts) => [...prevToasts, newToast])
    }

    return (
        <ToastContext.Provider value={{ addToast, toasts }}>
            {children}
            {toasts.length > 0 && (
                <div css={toastTheme}>
                    <div css={css({ maxWidth: '100%' })}>
                        {toasts.map((toast) => (
                            <div key={toast.id}>
                                <ToastSnackBar
                                    status={toast.status}
                                    id={toast.id}
                                    title={toast.title}
                                    description={toast.description}
                                    theme={toast.theme}
                                    closeTime={toast.countdown}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    )
}

const toastTheme = css({
    position: 'fixed',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '32px 16px',
    zIndex: 10000,
    transition: '0.3s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
})
