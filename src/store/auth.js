import axios from 'axios'
<<<<<<< HEAD
import { makeCosmoshubPath } from '@cosmjs/launchpad'
import { SigningStargateClient } from '@cosmjs/stargate'
import { DirectSecp256k1Wallet } from '@cosmjs/proto-signing'
=======
import {
	Secp256k1HdWallet,
	SigningCosmosClient,
	makeCosmoshubPath
} from '@cosmjs/launchpad'
>>>>>>> develop

export default {
	state: {
		account: {},
<<<<<<< HEAD
		client: null,
		wallet: null
	},
	getters: {
		client: state => state.client,
		account: state => state.account,
		wallet: state => state.wallet
=======
		client: null
	},
	getters: {
		client: state => state.client,
		account: state => state.account
>>>>>>> develop
	},
	mutations: {
		set(state, { key, value }) {
			state[key] = value
		}
	},
	actions: {
		async accountSignInTry({ dispatch }) {
			const mnemonic = localStorage.getItem('mnemonic')
			if (mnemonic) {
				await dispatch('accountSignIn', { mnemonic })
			}
		},
		async accountSignIn({ commit, dispatch, rootGetters }, { mnemonic }) {
			const { API, ADDR_PREFIX, RPC } = rootGetters['cosmos/appEnv']

			const wallet = await DirectSecp256k1Wallet.fromMnemonic(
				mnemonic,
				makeCosmoshubPath(0),
				ADDR_PREFIX
			)
			commit('set', { key: 'wallet', value: wallet })
			localStorage.setItem('mnemonic', mnemonic)
			const [{ address }] = await wallet.getAccounts()
			const url = `${API}/cosmos/auth/v1beta1/accounts/${address}`
			const acc = (await axios.get(url)).data.account
			commit('set', { key: 'account', value: acc })
			const client = await SigningStargateClient.connectWithWallet(
				RPC,
				wallet,
				{}
			)
			commit('set', { key: 'client', value: client })
			try {
				await dispatch('bankBalancesGet')
			} catch {
				console.log('Error in getting a bank balance.')
			}
		},
		async accountSignOut() {
			localStorage.removeItem('mnemonic')
			window.location.reload()
		}
	}
}
