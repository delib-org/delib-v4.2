// get consultations
import { Link } from "react-router-dom";

const Consultations = () => {
  return (
    <div>
      <Link to="/consultations/new-consultation">
        <div className="btn">הוספת התוועצות</div>
      </Link>
    </div>
  );
};

export default Consultations;
