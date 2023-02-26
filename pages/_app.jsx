import { useState, useEffect } from 'react'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppProvider from 'components/_app'

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
	const [queryClient] = useState(() => new QueryClient())
	const layout = Component.layout || ((page) => page)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			window.fbAsyncInit = function () {
				FB.init({
					xfbml: true,
					version: 'v10.0'
				})
			}
		}
	}, [])

	return (
		<>
			<Head>
				<title>Sweets G Bakeshop</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="" />
				<link rel="icon" type="image/png" size="96x96" href="favicon.svg" />
			</Head>

			<div className="fb-customerchat" attribution="biz_inbox" page_id="100090256728980" />

			<SessionProvider session={session}>
				<QueryClientProvider client={queryClient}>
					<Hydrate state={pageProps.dehydratedState}>
						<AppProvider active={true} authentication={Component.authentication}>
							{layout(<Component {...pageProps} />)}
						</AppProvider>
					</Hydrate>
				</QueryClientProvider>
			</SessionProvider>
		</>
	)
}

export default App
