import React from "react";
import { Link } from "react-router-dom";

const NewConsultation = () => {

    function handleAddConsultation(ev:any){
        ev.preventDefault();
        try {
            const name = ev.target.name.value;
            const description = ev.target.description.value;
            
        } catch (error) {
            console.error(error)
        }
    }
  return (
    <div className="page">
      <div className="wrapper">
        <h1>הוספת התייעצות חדשה</h1>
        <form onClick={handleAddConsultation}>
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
      </div>
    </div>
  );
};

export default NewConsultation;
