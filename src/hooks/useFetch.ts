import { useState } from "react";
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { EAction, ESlices, useFetchParameterType } from "../contexts/custom-query/types";

// custom query
import { useCustomQuery } from "../contexts/custom-query/customQueryContext";
import httpService from "../services/httpService";
import checkAuthorization from "../services/authService";

// dynamic import
const getMomentModule = () => import("moment");

export function useFetch({ url, sliceName, needAuth }: useFetchParameterType) {
   const [data, setData] = useState([]);
   const [error, setError] = useState("");
   const [loading, setLoading] = useState(true);

   const { mutation, select } = useCustomQuery();

   const fetchRequest = async () => {
      try {
         if (needAuth) await checkAuthorization();
         try {
            const httpResponse: any = await httpService.get(process.env.REACT_APP_BASE_URL + url);
            if (sliceName)
               mutation({
                  sliceName: sliceName,
                  data: httpResponse.data,
                  type: EAction.get,
                  url: "",
               });
            // dispatch and cache it in to the context (store)
            else {
               setLoading(false);
               setData(httpResponse.data);
               setError("");
            } // else: just return them
         } catch (error: any) {
            if (sliceName) mutation({ sliceName: sliceName, data: error.message, type: EAction.error, url: "" });
            else {
               setLoading(false);
               setData([]);
               setError(error.message);
            }
         }
      } catch (error: any) {
         setLoading(false);
         setData([]);
         setError(error.message);
      }
   };

   useEffect(() => {
      setLoading(true);
      if (sliceName) {
         const slice = select(sliceName);
         if (slice.lastFetchTime) {
            (async function () {
               const moment: any = await getMomentModule();
               const timeDiff = moment().diff(slice.lastFetchTime, "minutes");
               const doFetch = slice.data.length === 0 || timeDiff > 1;
               if (doFetch) fetchRequest();
            })();
         } else fetchRequest();
      } else fetchRequest();
   }, [url, sliceName]);

   return { data, loading, error };
}
