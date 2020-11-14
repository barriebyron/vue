import axios from 'axios'
// import { coins } from '@cosmjs/launchpad'
import { signTx, createBroadcastTx } from '@tendermint/sig'

export default {
	state: {
		bankBalances: []
	},
	getters: {},
	mutations: {
		set(state, { key, value }) {
			state[key] = value
		}
	},
	actions: {
		async tokenSend({ rootGetters }, { amount, denom, to_address, memo = '' }) {
			const { API } = rootGetters['cosmos/appEnv']
			const client = rootGetters['cosmos/client']
			const chainId = rootGetters['cosmos/chainId']
			const account = rootGetters['cosmos/account']
			const wallet = rootGetters['cosmos/wallet']
			const from_address = account.address

			const msg = [
				{
					type: 'cosmos-sdk/MsgSend',
					value: {
						amount: [
							{
								amount,
								denom
							}
						],
						from_address,
						to_address
					}
				}
			]
			const fee = {
				amount: [{ amount: '0', denom }],
				gas: '200000'
			}
			// console.log(account)
			// const signMeta = {
			// 	account_number: account.account_number,
			// 	chain_id: chainId,
			// 	sequence: (parseInt(account.sequence) + 1).toString()
			// }
			// const walletSet = {
			// 	address: from_address,
			// 	privateKey: Uint8Array.from(wallet.privkey),
			// 	publicKey: Uint8Array.from(wallet.pubkey)
			// }

			// const txSigned = signTx({ fee, memo, msg }, signMeta, walletSet)
			// const txBroadcast = createBroadcastTx(txSigned, 'sync')

			// console.log(JSON.stringify(txBroadcast))

			// await axios.post(`${API}/txs`, {
			// 	headers: {
			// 		'Content-Type': 'application/json'
			// 	},
			// 	body: JSON.stringify(txBroadcast)
			// })

			const accounts = await client.signer.getAccounts()

			return await client.signAndBroadcast(from_address, msg, fee, memo)
		},
		async bankBalancesGet({ commit, rootGetters }) {
			const { API } = rootGetters['cosmos/appEnv']
			const { address } = rootGetters['cosmos/account']
			// const url = `${API}/bank/balances/${address}`
			const url = `${API}/cosmos/bank/v1beta1/balances/${address}`
			const value = await (await axios.get(url)).data.balances
			commit('set', { key: 'bankBalances', value })
		}
	}
}
