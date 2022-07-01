import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getConsultation } from "../../../../control/db/consutationsDB";
import styles from "./ask.module.scss";

const ConsultationAsk = () => {
  const { consultationId } = useParams();
  const [name, setName] = useState<string>("");
  useEffect(() => {
    try {
      if (consultationId) {
        getConsultation(consultationId)
          .then(({ consultation }) => {
            if (consultation) {
              setName(consultation.name);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    } catch (error) {}
  }, [consultationId]);
  return (
    <div className="page">
      <div className="wrapper">
        <div className={styles.ask}>
          <p>ניסתם להצטרף להתייעצות</p>
          <h1>{name}</h1>
          <p>זאת התייעצות סגורה</p>
          <p>לחצו כאן כדי לבקש להצטרף לקבוצה</p>
          <div className="btns">
            <button>בקשת הצטרפות</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationAsk;
