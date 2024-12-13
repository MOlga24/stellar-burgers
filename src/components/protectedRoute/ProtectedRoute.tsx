/* eslint-disable */
import { RootState } from "@store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
type ProtectedRouteProps={children:React.ReactElement}
export const ProtectedRoute = ({children}:ProtectedRouteProps) => {

   // const { user } = useSelector((store: RootState) => store.user);
  // if( (!user)){ // если пользователя в хранилище нет, то делаем редирект
  //   return       (<> <Navigate replace to='/sign-in'/> <Outlet /></>)
  // }
    return children;
};
