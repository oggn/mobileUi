import type { AppProps } from 'next/app'
import { useState } from 'react'

//hooks
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { HydrationBoundary, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { JengaProvider } from '@/_ui/JengaProvider'

//libs
import '@/styles/globals.css'
import App from '@/libs/view/App'

//
export default function MyApp({ Component, pageProps }: AppProps) {
    const [client] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={client}>
            <HydrationBoundary state={pageProps.dehydratedState}>
                <SessionProvider session={pageProps.session} basePath="/api/auth">
                    <RecoilRoot>
                        <JengaProvider>
                            <App>
                                <Component {...pageProps} />
                            </App>
                        </JengaProvider>
                    </RecoilRoot>
                </SessionProvider>
            </HydrationBoundary>
        </QueryClientProvider>
    )
}
