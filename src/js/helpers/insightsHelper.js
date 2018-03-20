/**
 * insightsHelper.js
 * Created by Kevin Li 3/20/18
 */

import Axios, { CancelToken } from 'axios';

export const fetchAuditMarkdown = (fileName) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            method: 'get',
            url: fileName,
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};
