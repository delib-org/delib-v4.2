import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { getUserConsultations } from "../../control/db/consutationsDB";
import { createConsultations } from "../../control/slices/consultationsSlice";
import { getUser } from "../../control/db/userDB";
import {
  useIsLogged,
  useAppDispatch,
  useAppSelector,
} from "../../control/hooks";
import { setLogin } from "../../control/slices/userSlice";
import { UserSchema } from "../../model/userModelC";
import Spinner from "../components/Spinner";

const Main = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logged = useIsLogged();
  const consultations = useAppSelector(
    (state) => state.consultations.consultations
  );
  const [waiting, setWaiting] = useState<boolean>(false);

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
      setWaiting(true);
      getUserConsultations().then((consultationsDB) => {
        if (consultationsDB) {
          dispatch(createConsultations(consultationsDB));
          setWaiting(false);
        }
      })
      .catch(err=>{
        setWaiting(false);
        console.error(err);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logged]);
  return (
    <div>
      <h2>Consultations</h2>
      <ul>
        <Link to={`/`}>
          <li>main page</li>
        </Link>
        {!waiting?consultations.map((consultation) => (
          <Link key={consultation._id} to={`/consultations/${consultation._id}`}>
            <li>{consultation.name}</li>
          </Link>
        )):<Spinner />}
      </ul>
      <Outlet />
    </div>
  );
};

export default Main;
