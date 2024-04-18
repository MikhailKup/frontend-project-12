/* eslint-disable react/function-component-definition */
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react'
import i18next from 'i18next'
import * as filter from 'leo-profanity'
import React from 'react'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { Provider } from 'react-redux'
import { io } from 'socket.io-client'
import App from './components/App'
import resources from './locales/index'
import { channelsApi, defaultChannelId } from './services/channelsApi'
import store from './services/index'
import { messagesApi } from './services/messagesApi'
import { setActiveChannelId } from './slices/ui'

import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/App.scss'
import './index.css'

const init = async () => {
	const i18n = i18next.createInstance()
	await i18n.use(initReactI18next).init({
		resources,
		fallbackLng: ['ru', 'en'],
	})
	const { dispatch } = store

	const socket = io()

	socket.on('newMessage', msg => {
		dispatch(
			messagesApi.util.updateQueryData('getMessages', undefined, draft => {
				draft.push(msg)
			})
		)
	})
	socket.on('newChannel', chn => {
		dispatch(
			channelsApi.util.updateQueryData('getChannels', undefined, draft => {
				draft.push(chn)
			})
		)
	})
	socket.on('renameChannel', chn => {
		dispatch(
			channelsApi.util.updateQueryData('getChannels', undefined, draft => {
				const idx = draft.findIndex(c => c.id === chn.id)
				/* eslint-disable no-param-reassign */
				draft[idx] = chn
			})
		)
	})
	socket.on('removeChannel', chn => {
		dispatch(
			channelsApi.util.updateQueryData('getChannels', undefined, draft => {
				const idx = draft.findIndex(c => c.id === chn.id)
				draft.splice(idx, 1)
			})
		)
		if (store.getState().ui.activeChannelId === chn.id) {
			dispatch(setActiveChannelId({ id: String(defaultChannelId) }))
		}
	})

	filter.add(filter.getDictionary('ru'))

	const rollbarConfig = {
		accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
		environment: 'production',
	}

	return (
		<React.StrictMode>
			<RollbarProvider config={rollbarConfig}>
				<ErrorBoundary>
					<Provider store={store}>
						<I18nextProvider i18n={i18n}>
							<App />
						</I18nextProvider>
					</Provider>
				</ErrorBoundary>
			</RollbarProvider>
		</React.StrictMode>
	)
}

export default init
