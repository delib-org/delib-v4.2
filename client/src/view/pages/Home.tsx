import logo from "../img/logo-192px.png";
import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from 'react-redux'
import axios from 'axios';


const Home = () => {
  const dispatch = useDispatch()

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      if (credentialResponse) {
        const { credential } = credentialResponse;
        if (credential) {
          console.log(credential);
          const {data} = await axios.post('/users/login',{credential});

          console.log(data)
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
