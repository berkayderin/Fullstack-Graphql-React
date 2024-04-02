import './index.css'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

import App from './App.jsx'
import { NextUIProvider } from '@nextui-org/react'
import ReactDOM from 'react-dom/client'

const client = new ApolloClient({
	uri: 'http://localhost:5000/',
	cache: new InMemoryCache()
})

ReactDOM.createRoot(document.getElementById('root')).render(
	<ApolloProvider client={client}>
		<NextUIProvider>
			<App />
		</NextUIProvider>
	</ApolloProvider>
)
