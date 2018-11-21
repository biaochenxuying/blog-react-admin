import { queryUser, addUser, updateUser,delUser } from '@/services/api';

export default {
	namespace: 'otherUser',

	state: {
		userList: [],
		total: 0,
	},

	effects: {
		*queryUser({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(queryUser, params);
			!!resolve && resolve(response); // 返回数据
			// console.log('response :', response)
			if (response.code === 0) {
				yield put({
					type: 'saveUserList',
					payload: response.data.list,
				});
				yield put({
					type: 'saveUserListTotal',
					payload: response.data.count,
				});
			} else {
				// 
			}
		},
		*addUser({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(addUser, params);
			!!resolve && resolve(response);
		},
		*updateUser({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(updateUser, params);
			!!resolve && resolve(response);
		},
		*delUser({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(delUser, params);
			!!resolve && resolve(response);
		},
	},

	reducers: {
		saveUserList(state, { payload }) {
			return {
				...state,
				userList: payload,
			};
		},
		saveUserListTotal(state, { payload }) {
			return {
				...state,
				total: payload,
			};
		},
	},
};
