import { mockApiReponse } from './mockData';

export const fetchBreakdown = () => ({
    promise: new Promise((resolve) => {
        process.nextTick(() => {
            resolve({
                data: mockApiReponse
            });
        });
    }),
    cancel: jest.fn()
});

export const fetchCurrentQuarter = () => ({
    promise: new Promise((resolve) => {
        process.nextTick(() => {
            resolve({
                data: {
                    quarter: '2'
                }
            });
        });
    }),
    cancel: jest.fn()
});
