import { queryProjectNotice,queryProject, delProject, updateProject, addProject,getProjectDetail } from '@/services/api';

export default {
	namespace: 'project',

	state: {
    notice: [],
		projectList: [],
		total: 0,
		projectDetail: {
			title: '',
			state: '',
			content: '',
			_id: '',
		},
	},

	effects: {
    *fetchNotice(_, { call, put }) {
      const response = yield call(queryProjectNotice);
      yield put({
        type: 'saveNotice',
        payload: Array.isArray(response) ? response : [],
      });
    },
		*queryProject({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(queryProject, params);
			!!resolve && resolve(response); // 返回数据
			// console.log('response :', response)
			if (response.code === 0) {
				yield put({
					type: 'saveProjectList',
					payload: response.data.list,
				});
				yield put({
					type: 'saveProjectListTotal',
					payload: response.data.count,
				});
			}
		},
		*delProject({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(delProject, params);
			!!resolve && resolve(response);
		},
		*addProject({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(addProject, params);
			!!resolve && resolve(response);
		},
		*updateProject({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(updateProject, params);
			!!resolve && resolve(response);
		},
		*getProjectDetail({ payload }, { call, put }) {
			const { resolve, params } = payload;
			const response = yield call(getProjectDetail, params);
			!!resolve && resolve(response);
			if (response.code === 0) {
				yield put({
					type: 'saveProjectDetail',
					payload: response.data,
				});
			}
		},
	},

	reducers: {
    saveNotice(state, action) {
      return {
        ...state,
        notice: action.payload,
      };
    },
		saveProjectList(state, { payload }) {
			return {
				...state,
				projectList: payload,
			};
		},
		saveProjectListTotal(state, { payload }) {
			return {
				...state,
				total: payload,
			};
		},
		saveProjectDetail(state, { payload }) {
			return {
				...state,
				projectDetail: payload,
			};
		},
	},
};
