import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "../img/logo-192px.png";
import { GoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "../../control/hooks";
import axios from "axios";

//store
import { setLogin } from "../../control/slices/userSlice";
import { useIsLogged } from "../../control/hooks";

//cont
import { getUser } from "../../control/get";
import { UserSchema } from "../../model/userModelC";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logged = useIsLogged();

  useEffect(() => {
    console.log(logged)
    if (!logged) {
      getUser()
        .then((userDB: any) => {
          const { value, error } = UserSchema.validate(userDB);
          if (error) console.error(error);
          if (value) {
            dispatch(setLogin(value));
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [logged]);

  useEffect(() => {
    if (logged) {
      navigate("/consultations");
    }
  }, [logged, navigate]);
  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      if (credentialResponse) {
        const { credential } = credentialResponse;
        if (credential) {
          const { data } = await axios.post("/users/login", { credential });
          if (!data) throw new Error("mising data on axios");
          const { user, error } = data;
          if (error) throw error;
          if (!user) throw new Error("no user in data");
          const { value } = UserSchema.validate(user);
          if (value) {
            dispatch(setLogin(value));
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page home">
      <div className="home__title">
        <h1>דליב</h1>
        <h2>יוצרים הסכמות</h2>
        <img src={logo} alt="דליב - מגיעים להסכמות" />
        <div className="btns">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => {
              console.log("Login Failed");
            }}
          />
        </div>
        <p>
          דליב, היא מערכת ליצירת הסכמות מבית{" "}
          <a href="http://delib.org" target="_block">
            {" "}
            המכון לדמוקרטיה דיונית
          </a>
        </p>
      </div>
    </div>
  );
};

export default Home;
