// Store
// -- ESlice
export enum ESlices {
   posts = "posts",
   books = "books",
   cars = "cars",
}

// -- stateType
export type stateType<D> = {
   data: D;
   loading: boolean;
   lastFetch: any; //good for caching
   error: string;
};

// -- globalStateType
export type globalStateType = {
   [key in ESlices]: stateType<postType[] | []>;
};

// Context
// -- EAction
export enum EAction {
   get = "get",
   post = "post",
   put = "put",
   delete = "delete",
   error = "error",
}

// -- useMutationType
export type useMutationParameterType = {
   sliceName: ESlices;
   url: string;
   type: EAction;
   data: any;
   needAuth?: boolean;
};

// -- actionType
export type actionType = { sliceName: ESlices; type: EAction; data: any };

// -- CustomQueryContextType
export type CustomQueryContextType = {
   mutation: (action: useMutationParameterType) => any;
   select: (sliceName: ESlices) => any;
};

// Props type
export type CustomQueryProviderPropsType = {
   children: any;
};

// api service parameter type
export type apiCallType = {
   url: string;
   method: EAction;
   data?: any;
   needAuth?: boolean;
};

// post
export type postType = {
   id?: number;
   title: string;
   userId: number;
   body: string;
};

export type useFetchParameterType = {
   sliceName?: ESlices;
   url: string;
   needAuth?: boolean;
};
