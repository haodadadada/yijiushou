const actions = {
	pushAddress({commit}, community) {
		commit('PUSHADDRESS', community);
	},
	clearAddress({commit}) {
		commit('CLEARADDRESS');
	},
	keepAddress({commit}, oldCommunity) {
		commit('KEEPADDRESS', oldCommunity);
	},
}

const mutations = {
	PUSHADDRESS(state, community) {
		state.community = community;
	},
	CLEARADDRESS(state) {
		state.community = '';
	},
	KEEPADDRESS(state, oldCommunity) {
		state.oldCommunity = oldCommunity;
	},
	CLEARKEEPADDRESS(state) {
		state.oldCommunity = '';
	}
}

const state = {
	community: '',
	oldCommunity:'',
}

const getter = {
	
}

export default {
	actions,
	mutations,
	state,
	getter
}