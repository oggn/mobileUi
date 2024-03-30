import type { AppProps } from 'next/app'
import { useState } from 'react'

//hooks
import { SessionProvider } from 'next-auth/react'
import { RecoilRoot } from 'recoil'
import { dehydrate, Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { JengaProvider } from '@/_ui/JengaProvider'

//libs
import App from '@/libs/view/App'
import GlobalThemes from '@/libs/themes/global'

//
export default function MyApp({ Component, pageProps }: AppProps) {
    const [client] = useState(() => new QueryClient())
    const dehydratedState = dehydrate(client)

    return (
        <QueryClientProvider client={client}>
            <Hydrate state={dehydratedState}>
                <SessionProvider session={pageProps.session} basePath="/api/auth">
                    <RecoilRoot>
                        <GlobalThemes>
                            <JengaProvider>
                                <App>
                                    <Component {...pageProps} />
                                </App>
                            </JengaProvider>
                        </GlobalThemes>
                    </RecoilRoot>
                </SessionProvider>
            </Hydrate>
        </QueryClientProvider>
    )
}
