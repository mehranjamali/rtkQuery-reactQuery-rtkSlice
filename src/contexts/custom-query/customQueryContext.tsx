import { createContext, useContext, useEffect, useReducer } from "react";
import { stateType } from "../../store/types";
import { initialGlobalState } from "./customStore";
import httpService from "../../services/httpService";
import checkAuthorization from "../../services/authService";
import {
   globalStateType,
   CustomQueryContextType,
   actionType,
   useMutationParameterType,
   EAction,
   ESlices,
   CustomQueryProviderPropsType,
} from "./types";

// Context
const CustomQueryContext = createContext({} as CustomQueryContextType);

// Reducer
const reducer = (state: globalStateType, action: actionType): globalStateType => {
   const slice = ESlices[action.sliceName];
   switch (action.type) {
      case EAction.get:
         return {
            ...state,
            [slice]: { data: action.data, error: "", loading: false, lastFetchTime: Date.now() },
         };
      case EAction.post:
         let newAddedData: any = state[slice].data;
         newAddedData.unshift(action.data);
         return { ...state, [slice]: { ...state[slice], loading: false, data: newAddedData } };
      case EAction.put:
         const newEditedData = [...state[slice].data];
         const editIndex = newEditedData.findIndex((x) => x.id === action.data.id);
         newEditedData[editIndex] = action.data;
         return { ...state, [slice]: { ...state[slice], loading: false, data: newEditedData } };
      case EAction.delete:
         const newDeletedData = state[slice].data.filter((x) => x.id !== action.data);
         return { ...state, [slice]: { ...state[slice], loading: false, data: newDeletedData } };
      case EAction.error:
         alert(action.data);
         return state;
      // return { ...state, [slice]: { ...state[slice], error: action.data, loading: false } };
      default:
         return state;
   }
};

// Provider
export default function CustomQueryProvider({ children }: CustomQueryProviderPropsType) {
   const [globalState, dispatch] = useReducer(reducer, initialGlobalState);
   // select
   const select: CustomQueryContextType["select"] = (sliceName: ESlices) => {
      return globalState[sliceName];
   };

   // useMutation
   const useMutation = async (params: useMutationParameterType) => {
      switch (params.type) {
         case EAction.get:
            dispatch({ ...params });
            break;
         case EAction.post:
         case EAction.put:
         case EAction.delete:
            try {
               if (params.needAuth) await checkAuthorization();
               try {
                  const mutationResponse = await httpService.request({
                     baseURL: process.env.REACT_APP_BASE_URL,
                     method: params.type,
                     url: params.url,
                     data: params.data,
                  });
                  const data = params.type === EAction.delete ? params.data : mutationResponse.data;
                  dispatch({ sliceName: params.sliceName, type: params.type, data: data });
               } catch (error: any) {
                  dispatch({ type: EAction.error, sliceName: params.sliceName, data: error.message });
               }
            } catch (error) {
               console.log("need needAuthorization");
            }
            break;
         case EAction.error:
            dispatch({ sliceName: params.sliceName, type: params.type, data: params.data });
            break;
         default:
            break;
      }
   };

   useEffect(() => {
      console.log(globalState);
   });

   return (
      <CustomQueryContext.Provider value={{ mutation: useMutation, select: select }}>
         {children}
      </CustomQueryContext.Provider>
   );
}

export const useCustomQuery = () => useContext(CustomQueryContext);
