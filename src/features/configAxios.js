import { toast } from "react-toastify";
import { api } from "features/api";




api.defaults.headers.post["Content-Type"] = 'application/json'


api.interceptors.response(null, error => {
    const expectedErrors =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500


    if (!expectedErrors) {
        console.log(error);
        toast.error("مشکلی از سمت سرور پیش آمده است", {
            style: {
                fontFamily: "bYekan"
            }
        })
    }

    return Promise.reject(error)


})