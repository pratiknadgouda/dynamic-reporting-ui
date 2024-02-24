import React from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

const PatientsView = () => {

    const handelSubmit =async () => {
        const token = sessionStorage.getItem("token");
        try {
          const res = await  axios.post(
            `http://localhost:6060/reports/v1/generate-document?templateId=1`,undefined,
            { headers: { Authorization: `Bearer ` + token ,
            "Content-Type": 'application/json' },
            responseType:"blob"},
            
          );
          console.log(res.headers)
          const blob = new Blob([res.data],{type: 'application/pdf'});
          const url = window.URL.createObjectURL(blob)
          const link= document.createElement('a');
          link.href= url;
          link.download = 'report.pdf';
          link.click();
        } catch (error) {
          console.error("failed:", error);
        }
      };
  return (
    <div className="d-flex justify-content-center">
      <div className="mt-2 m-5">
      <Button variant="secondary" size="sm" onClick={() => handelSubmit()}>
        Dowload Report
      </Button>{" "}
      </div>
    </div>
  );
};

export default PatientsView;
