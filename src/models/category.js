import { queryCategory, addCategory, delCategory } from '@/services/api';

export default {
	namespace: 'category',

	state: {
		categoryList: [],
		total: 0,
	},

	effects: {
		*queryCategory({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(queryCategory, params);
			!!resolve && resolve(response); // 返回数据
			// console.log('response :', response)
			if (response.code === 0) {
				yield put({
					type: 'saveCategoryList',
					payload: response.data.list,
				});
				yield put({
					type: 'saveCategoryListTotal',
					payload: response.data.count,
				});
			} else {
				// 
			}
		},
		*addCategory({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(addCategory, params);
			!!resolve && resolve(response);
		},
		*delCategory({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(delCategory, params);
			!!resolve && resolve(response);
		},
	},

	reducers: {
		saveCategoryList(state, { payload }) {
			return {
				...state,
				categoryList: payload,
			};
		},
		saveCategoryListTotal(state, { payload }) {
			return {
				...state,
				total: payload,
			};
		},
	},
};
