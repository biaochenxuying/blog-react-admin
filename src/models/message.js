import { queryMessage, delMessage, getMessageDetail, addReplyMessage } from '@/services/api';

export default {
  namespace: 'message',

  state: {
    messageList: [],
    total: 0,
    messageDetail: {
      avatar: 'user',
      content: '.....留言',
      reply_list: [],
      create_time: '2018-11-04T12:05:10.761Z',
      email: '13800138000',
      id: 15,
      introduce: 'introduce',
      name: '虚影',
      phone: '1380013800',
      state: 0,
      update_time: '2018-11-04T12:05:10.761Z',
      user_id: '5bd9a84c2758be723f5ef2cb',
      __v: 0,
      _id: '5bdee076bc454f49bba03ab0',
    },
  },

  effects: {
    *queryMessage({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(queryMessage, params);
      !!resolve && resolve(response); // 返回数据
      // console.log('response :', response)
      if (response.code === 0) {
        yield put({
          type: 'saveMessageList',
          payload: response.data.list,
        });
        yield put({
          type: 'saveMessageListTotal',
          payload: response.data.count,
        });
      }
    },
    *delMessage({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(delMessage, params);
      !!resolve && resolve(response);
    },
    *addReplyMessage({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(addReplyMessage, params);
      !!resolve && resolve(response);
    },
    *getMessageDetail({ payload }, { call, put }) {
      const { resolve, params } = payload;
      const response = yield call(getMessageDetail, params);
      !!resolve && resolve(response);
      // console.log('response :', response)
      if (response.code === 0) {
        yield put({
          type: 'saveMessageDetail',
          payload: response.data,
        });
      }
    },
  },

  reducers: {
    saveMessageList(state, { payload }) {
      return {
        ...state,
        messageList: payload,
      };
    },
    saveMessageListTotal(state, { payload }) {
      return {
        ...state,
        total: payload,
      };
    },
    saveMessageDetail(state, { payload }) {
      return {
        ...state,
        messageDetail: payload,
      };
    },
  },
};
