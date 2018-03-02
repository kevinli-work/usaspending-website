/**
 * explorerHelper.js
 * Created by Kevin Li 8/16/17
 */

import Axios, { CancelToken } from 'axios';

import kGlobalConstants from 'GlobalConstants';

import { response } from './_explorerTest';

export const fetchBreakdown = (params) => {
    const source = CancelToken.source();
    return {
        // promise: Axios.request({
        //     url: 'v2/spending/',
        //     baseURL: kGlobalConstants.API,
        //     method: 'post',
        //     data: params,
        //     cancelToken: source.token
        // }),
        promise: Promise.resolve({
            data: response
        }),
        cancel() {
            source.cancel();
        }
    };
};
