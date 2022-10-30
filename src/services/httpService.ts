import axios from "axios";
// import showToast from "../../utiles/toast";

axios.interceptors.response.use(undefined, (error: any) => {
   const expectedError = error.response && error.response.status >= 400 && error.response.status <= 500;
   if (!expectedError) {
      //   showToast("مشکلی در سرور رخ داده است");
      console.log("we have an error in the server!");
   }
   return Promise.reject(error);
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {
   get: axios.get,
   post: axios.post,
   put: axios.put,
   delete: axios.delete,
   request: axios.request,
};
