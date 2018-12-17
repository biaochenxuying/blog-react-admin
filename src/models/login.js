import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLogin, getFakeCaptcha, loginAdmin } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
    namespace: 'login',

    state: {
        status: undefined,
    },

    effects: {
        *loginAdmin({ payload }, { call, put }) {
            const response = yield call(loginAdmin, payload);
            if(!response){
                return
            }
            if (response.code === 0) {
                response.currentAuthority = response.data.name || 'admin';
                response.status = 'ok';
                response.type = 'account';
                yield put({
                    type: 'changeLoginStatus',
                    payload: response,
                });
            }

            // Login successfully
            if (response.code === 0) {
                reloadAuthorized();
                const urlParams = new URL(window.location.href);
                const params = getPageQuery();
                console.log('params :', params);
                let { redirect } = params;
                if (redirect) {
                    const redirectUrlParams = new URL(redirect);
                    if (redirectUrlParams.origin === urlParams.origin) {
                        redirect = redirect.substr(urlParams.origin.length);
                        if (redirect.startsWith('/#')) {
                            redirect = redirect.substr(2);
                        }
                    } else {
                        window.location.href = redirect;
                        return;
                    }
                }
                console.log('redirect :', redirect);

                yield put(routerRedux.replace(redirect || '/dashboard/workplace'));
            }
        },

        *login({ payload }, { call, put }) {
            const response = yield call(fakeAccountLogin, payload);
            console.log('response :', response);
            yield put({
                type: 'changeLoginStatus',
                payload: response,
            });
            // Login successfully
            if (response.status === 'ok') {
                reloadAuthorized();
                const urlParams = new URL(window.location.href);
                const params = getPageQuery();
                let { redirect } = params;
                console.log('redirect :', redirect);
                if (redirect) {
                    const redirectUrlParams = new URL(redirect);
                    if (redirectUrlParams.origin === urlParams.origin) {
                        redirect = redirect.substr(urlParams.origin.length);
                        if (redirect.startsWith('/#')) {
                            redirect = redirect.substr(2);
                        }
                    } else {
                        window.location.href = redirect;
                        return;
                    }
                }
                console.log('redirect :', redirect);
                yield put(routerRedux.replace(redirect || '/'));
            }
        },

        *getCaptcha({ payload }, { call }) {
            yield call(getFakeCaptcha, payload);
        },

        *logout(_, { put }) {
            yield put({
                type: 'changeLoginStatus',
                payload: {
                    status: false,
                    currentAuthority: 'guest',
                },
            });
            reloadAuthorized();
            yield put(
                routerRedux.push({
                    pathname: '/user/login',
                    search: stringify({
                        redirect: window.location.href,
                    }),
                })
            );
        },
    },

    reducers: {
        changeLoginStatus(state, { payload }) {
            setAuthority(payload.currentAuthority);
            return {
                ...state,
                status: payload.status,
                type: payload.type,
            };
        },
    },
};