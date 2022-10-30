import httpService from "../../services/httpService";
import { apiCallBegan } from "../apiAction";

const apiMiddleware =
   ({ dispatch, getState }: any) =>
   (next: any) =>
   async (action: any) => {
      if (action.type !== apiCallBegan.type) return next(action);
      const { url, method, onStart, onSuccess, onError, data } = action.payload;
      next(action);
      if (onStart) dispatch({ type: onStart });
      try {
         const response = await httpService.request({
            baseURL: process.env.REACT_APP_BASE_URL,
            url,
            method,
            data,
         });
         if (method === "DELETE") dispatch({ type: onSuccess, payload: { data: response.data, id: data.id } });
         else dispatch({ type: onSuccess, payload: response.data });
      } catch ({ message }) {
         dispatch({ type: onError, payload: message });
      }
   };

export default apiMiddleware;
