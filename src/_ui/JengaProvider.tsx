/** @jsxImportSource @emotion/react */
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { ToastSnackBar } from './feedback/ToastSnackBar'

interface ToastProps {
    theme?: 'light' | 'dark'
    status?: 'success' | 'failed'
    id: string
    title: string
    description?: string
}

const ToastContext = createContext({
    addToast: ({ theme, status, title, description }: Omit<ToastProps, 'id'>) => {},
    toasts: [] as ToastProps[],
})

export const useJenga = () => useContext(ToastContext)

export function JengaProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastProps[]>([])

    const addToast = ({ theme, status, title, description }: Omit<ToastProps, 'id'>) => {
        const newToast = {
            id: Math.random().toString(36).substr(2, 9),
            theme,
            status,
            title,
            description,
        }
        setToasts((prevToasts) => [...prevToasts, newToast])
    }

    useEffect(() => {
        if (toasts.length > 0) {
            const timer = setTimeout(() => {
                setToasts((prevToasts) => prevToasts.slice(1))
            }, 3500)
            return () => clearTimeout(timer)
        }
    }, [toasts])

    return (
        <ToastContext.Provider value={{ addToast, toasts }}>
            {children}

            {toasts.length > 0 && (
                <div css={{ ...toastTheme }}>
                    <div css={{ maxWidth: '100%' }}>
                        {toasts.map((toast) => (
                            <ToastSnackBar
                                status={toast.status}
                                id={toast.id}
                                title={toast.title}
                                description={toast.description}
                                theme={toast.theme}
                            />
                        ))}
                    </div>
                </div>
            )}
        </ToastContext.Provider>
    )
}

const toastTheme = {
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    padding: '32px 16px',
    zIndex: 10000,
    transition: '0.3s ease-in-out',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
} as any
