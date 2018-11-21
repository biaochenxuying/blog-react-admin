import { queryTag, addTag, delTag } from '@/services/api';

export default {
	namespace: 'tag',

	state: {
		tagList: [],
		total: 0,
	},

	effects: {
		*queryTag({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(queryTag, params);
			!!resolve && resolve(response); // 返回数据
			// console.log('response :', response)
			if (response.code === 0) {
				yield put({
					type: 'saveTagList',
					payload: response.data.list,
				});
				yield put({
					type: 'saveTagListTotal',
					payload: response.data.count,
				});
			} else {
				// 
			}
		},
		*addTag({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(addTag, params);
			!!resolve && resolve(response);
		},
		*delTag({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(delTag, params);
			!!resolve && resolve(response);
		},
	},

	reducers: {
		saveTagList(state, { payload }) {
			return {
				...state,
				tagList: payload,
			};
		},
		saveTagListTotal(state, { payload }) {
			return {
				...state,
				total: payload,
			};
		},
	},
};
