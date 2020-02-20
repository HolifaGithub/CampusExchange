const promiseApi=(func)=>{
    return function (params = {}) {
        return new Promise<any>((resolve, reject) => {
            const args = Object.assign(params, {
                success: (res) => {
                    resolve(res);
                },
                fail: (error) => {
                    reject(error);
                }
            });
            func(args);
        });
    };
};
export default promiseApi