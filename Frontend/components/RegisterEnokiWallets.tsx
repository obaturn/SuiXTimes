"use client";
import { useSuiClientContext } from '@mysten/dapp-kit'
import { useEffect } from 'react'
import { isEnokiNetwork, registerEnokiWallets } from '@mysten/enoki'

const RegisterEnokiWallets = () => {
	const { client, network } = useSuiClientContext()
	useEffect(() => {
		if (!isEnokiNetwork(network)) return
		const { unregister } = registerEnokiWallets({
		          client: client as any,
			network,
			apiKey: process.env.NEXT_PUBLIC_ENOKI_API_KEY!,
			providers: {
				google: {
					clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
					redirectUrl: `${window.location.origin}/auth/callback`
				},
			},
		})

		return unregister
	}, [client, network])

	return null
}

export default RegisterEnokiWallets