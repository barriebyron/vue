import axios from 'axios'
import { coins } from '@cosmjs/launchpad'

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
			const client = rootGetters['cosmos/client']
			const account = rootGetters['cosmos/account']
			const from_address = account.address

			const msg = [
				{
					typeUrl: '/cosmos.bank.v1beta1.MsgSend',
					value: {
						amount: coins(parseInt(amount), denom),
						fromAddress: from_address,
						toAddress: to_address
					}
				}
			]
			const fee = {
				amount: [{ amount: '1', denom }],
				gas: '200000'
			}

			return await client.signAndBroadcast(from_address, msg, fee, memo)
		},
		async bankBalancesGet({ commit, rootGetters }) {
			const { API } = rootGetters['cosmos/appEnv']
			const { address } = rootGetters['cosmos/account']
			const url = `${API}/cosmos/bank/v1beta1/balances/${address}`
			const value = await (await axios.get(url)).data.balances
			commit('set', { key: 'bankBalances', value })
		}
	}
}
