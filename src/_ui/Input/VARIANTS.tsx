type props = {
    error?: boolean | string
    disabled?: boolean | string
    isFocused?: boolean
}

export function VARIANTS({ error, disabled, isFocused }: props) {
    const THEMES = {
        light: {
            label: '#8a8a8a',
            tolTip: '#999',
            solidColor: !error && isFocused ? '#b9d0e4' : '#e2e2e2' && error ? '#FF6767' : '#e2e2e2',
            color: disabled ? '#898989' : '#555',
            placeholder: '#ccc',
            activeColor: !error && isFocused ? '#f8f9fc' : '#fff',
            edgeColor: '#999',
            disabledColor: '#f5f5f5',
            selectFill: '#d2d2d2',
        },
        dark: {
            label: '#7a7a7a',
            tolTip: '#888',
            solidColor: !error && isFocused ? '#777' : '#444' && error ? '#FF6767' : '#444',
            color: disabled ? '#888' : '#bbb',
            placeholder: '#777',
            activeColor: !error && isFocused ? '#222' : 'transparent',
            edgeColor: '#888',
            disabledColor: '#101010',
            selectFill: '#555',
        },
    } as const

    const SIZES = {
        s: {
            width: 'auto',
            txtSize: '0.813em',
            height: 38,
            padding: 8,
            br: 11,
            selectSize: 8,
        },
        m: {
            width: '100%',
            txtSize: '0.875em',
            height: 44,
            padding: '10px 11px',
            br: 12,
            selectSize: 8,
        },
        l: {
            width: '100%',
            txtSize: '0.938em',
            height: 50,
            padding: 13,
            br: 14,
            selectSize: 12,
        },
    } as const

    const generateUUID = () => {
        let dt = new Date().getTime()
        const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (dt + Math.random() * 16) % 16 | 0
            dt = Math.floor(dt / 16)
            return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
        })
        return uuid
    }

    return { THEMES, SIZES, generateUUID }
}
