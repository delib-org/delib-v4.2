import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../model/store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useIsLogged() {
 
  const user = useAppSelector((state) => state.user.user);
  try {
    if (user && user.sub.length > 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}

// export function useIsMember():Role{
//   try {
    
//   } catch (error) {
//     console.error(error);
//     return Role.NONE;
//   }
// }