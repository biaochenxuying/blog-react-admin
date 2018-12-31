import {
  queryArticle,
  delArticle,
  updateArticle,
  addArticle,
  getArticleDetail,
  changeComment,
  changeThirdComment,
} from '@/services/api';

export default {
  namespace: 'article',

  state: {
    articleList: [],
    total: 0,
    articleDetail: {
      _id: '',
      author: 'biaochenxuying',
      category: [],
      comments: [],
      create_time: '',
      desc: '',
      id: 16,
      img_url: '',
      keyword: [],
      like_users: [],
      meta: { views: 0, likes: 0, comments: 0 },
      origin: 0,
      state: 1,
      tags: [],
      title: '',
      update_time: '',
    },
  },

  effects: {
    *queryArticle({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(queryArticle, params);
      !!resolve && resolve(response); // 返回数据
      // console.log('response :', response)
      if (response.code === 0) {
        yield put({
          type: 'saveArticleList',
          payload: response.data.list,
        });
        yield put({
          type: 'saveArticleListTotal',
          payload: response.data.count,
        });
      }
    },
    *delArticle({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(delArticle, params);
      !!resolve && resolve(response);
    },
    *addArticle({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(addArticle, params);
      !!resolve && resolve(response);
    },
    *updateArticle({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(updateArticle, params);
      !!resolve && resolve(response);
    },
    *getArticleDetail({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(getArticleDetail, params);
      !!resolve && resolve(response);
      // console.log('response :', response)
      if (response.code === 0) {
        yield put({
          type: 'saveArticleDetail',
          payload: response.data,
        });
      }
    },
    *changeComment({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(changeComment, params);
      !!resolve && resolve(response);
    },
    *changeThirdComment({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(changeThirdComment, params);
      !!resolve && resolve(response);
    },
  },

  reducers: {
    saveArticleList(state, { payload }) {
      return {
        ...state,
        articleList: payload,
      };
    },
    saveArticleListTotal(state, { payload }) {
      return {
        ...state,
        total: payload,
      };
    },
    saveArticleDetail(state, { payload }) {
      return {
        ...state,
        articleDetail: payload,
      };
    },
  },
};
