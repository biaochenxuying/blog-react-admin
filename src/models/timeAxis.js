import { queryTimeAxis, delTimeAxis, updateTimeAxis, addTimeAxis,getTimeAxisDetail } from '@/services/api';

export default {
	namespace: 'timeAxis',

	state: {
		timeAxisList: [],
		total: 0,
		timeAxisDetail: {
			title: '',
			state: '',
			content: '',
			_id: '',
		},
	},

	effects: {
		*queryTimeAxis({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(queryTimeAxis, params);
			!!resolve && resolve(response); // 返回数据
			// console.log('response :', response)
			if (response.code === 0) {
				yield put({
					type: 'saveTimeAxisList',
					payload: response.data.list,
				});
				yield put({
					type: 'saveTimeAxisListTotal',
					payload: response.data.count,
				});
			}
		},
		*delTimeAxis({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(delTimeAxis, params);
			!!resolve && resolve(response);
		},
		*addTimeAxis({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(addTimeAxis, params);
			!!resolve && resolve(response);
		},
		*updateTimeAxis({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(updateTimeAxis, params);
			!!resolve && resolve(response);
		},
		*getTimeAxisDetail({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(getTimeAxisDetail, params);
			!!resolve && resolve(response);
			console.log('response :', response)
			if (response.code === 0) {
				yield put({
					type: 'saveTimeAxisDetail',
					payload: response.data,
				});
			}
		},
	},

	reducers: {
		saveTimeAxisList(state, { payload }) {
			return {
				...state,
				timeAxisList: payload,
			};
		},
		saveTimeAxisListTotal(state, { payload }) {
			return {
				...state,
				total: payload,
			};
		},
		saveTimeAxisDetail(state, { payload }) {
			return {
				...state,
				timeAxisDetail: payload,
			};
		},
	},
};
