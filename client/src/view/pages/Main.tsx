import { useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { getUserConsultations } from "../../control/db/consutationsDB";
import { createConsultations } from "../../control/slices/consultationsSlice";
import { getUser } from "../../control/db/userDB";
import {
  useIsLogged,
  useAppDispatch
} from "../../control/hooks";
import { setLogin } from "../../control/slices/userSlice";
import { UserSchema } from "../../model/userModelC";


const Main = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logged = useIsLogged();
 
 

   useEffect(() => {
    if (!logged) {
      getUser()
        .then((userDB: any) => {
          const { value } = UserSchema.validate(userDB);

          if (value) {
            dispatch(setLogin(value));
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.error(err);
          navigate("/");
        });
    } else {
      //get user consultations
    
      getUserConsultations().then((consultationsDB) => {
        if (consultationsDB) {
          dispatch(createConsultations(consultationsDB));
         
        }
      })
      .catch(err=>{
      
        console.error(err);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logged]);
  return (
    <div className="page">
      <Link to='/consultations'><h1>התייעצויות</h1></Link>
      <Outlet />
    </div>
  );
};

export default Main;
