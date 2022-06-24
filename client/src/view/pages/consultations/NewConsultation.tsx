import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { setConsultation } from "../../../control/slices/consultationsSlice";
import { useAppDispatch } from "../../../control/hooks";
import { ConsultationValidation } from "../../../model/consultationModelC";

const NewConsultation = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  async function handleAddConsultation(ev: any) {
    ev.preventDefault();
    try {
      const name = ev.target.elements.name.value;
      const description = ev.target.elements.description.value;
      setLoading(true);
      const { data } = await axios.post("/cosultations/add-consultation", {
        consultation: {
          name,
          description,
        },
      });
      const { consultation } = data;
      const { value, error } = ConsultationValidation.validate(consultation);
      if (value) {
        dispatch(setConsultation(value));
      } else {
        throw error;
      }
      setLoading(false);
      navigate("/consultations");
    } catch (error) {
      console.error(error);
      navigate("/consultations");
    }
  }
  return (
    <div className="page">
      <div className="wrapper">
        <h1>הוספת התייעצות חדשה</h1>
        {!loading ? (
          <form onSubmit={handleAddConsultation}>
            <label>הגדרות כלליות</label>
            <input type="text" name="name" placeholder="נושא ההתיעצות" />
            <textarea name="description" placeholder="תיאור ההתיעצות" />
            <div className="btns">
              <button type="submit">הוספה</button>
              <Link to="/consultations">
                <div className="btn btn--cancel">ביטול</div>
              </Link>
            </div>
          </form>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default NewConsultation;
