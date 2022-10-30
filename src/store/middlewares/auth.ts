import { actionType } from "./../types";
import checkAuthorization from "../../services/authService";

const authMiddleware = () => (next: any) => async (action: actionType<any>) => {
   if (action.payload?.needAuthorization) {
      try {
         await checkAuthorization();
         next(action);
      } catch (error: any) {
         console.log(error.message);
      }
   } else next(action);
};

export default authMiddleware;
