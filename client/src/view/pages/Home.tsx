import logo from "../img/logo-192px.png";

const Home = () => {
  return (
    <div className="page home">
      <div className="home__title">
        <h1>דליב</h1>
        <h2>יוצרים הסכמות</h2>
        <img src={logo} alt="דליב - מגיעים להסכמות" />
        <div className="btns">
          <div className="btn">התחברות</div>
        </div>
        <p>
          דל44יב, היא מערכת ליצירת הסכמות מבית{" "}
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
