import { queryLink, addLink, updateLink,delLink } from '@/services/api';

export default {
	namespace: 'link',

	state: {
		linkList: [],
		total: 0,
	},

	effects: {
		*queryLink({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(queryLink, params);
			!!resolve && resolve(response); // 返回数据
			// console.log('response :', response)
			if (response.code === 0) {
				yield put({
					type: 'saveLinkList',
					payload: response.data.list,
				});
				yield put({
					type: 'saveLinkListTotal',
					payload: response.data.count,
				});
			} else {
				// 
			}
		},
		*addLink({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(addLink, params);
			!!resolve && resolve(response);
		},
		*updateLink({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(updateLink, params);
			!!resolve && resolve(response);
		},
		*delLink({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(delLink, params);
			!!resolve && resolve(response);
		},
	},

	reducers: {
		saveLinkList(state, { payload }) {
			return {
				...state,
				linkList: payload,
			};
		},
		saveLinkListTotal(state, { payload }) {
			return {
				...state,
				total: payload,
			};
		},
	},
};
