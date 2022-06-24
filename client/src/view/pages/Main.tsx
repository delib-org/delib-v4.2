import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import { getUser } from "../../control/get";
import { useIsLogged, useAppDispatch } from "../../control/hooks";
import { setLogin } from "../../control/slices/userSlice";
import { UserSchema } from "../../model/userModelC";

const decisions = [
  { id: "45354", name: "decision 1" },
  { id: "5345", name: "decision 2" },
  { id: "453gdfg54", name: "decision 3" },
  { id: "4534654", name: "decision 4" },
];

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
          }
        })
        .catch((err) => {
          console.error(err);
          navigate("/");
        });
    } else {

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
        {decisions.map((decision) => (
          <Link key={decision.id} to={`/decisions/${decision.id}`}>
            <li>{decision.name}</li>
          </Link>
        ))}
      </ul>
      <Outlet />
    </div>
  );
};

export default Main;
