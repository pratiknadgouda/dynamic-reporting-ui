import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import TemplateWindow from "./TemplateModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DoctorsView = () => {
  const [patientsData, setPatientsData] = React.useState([]);
  const navigate = useNavigate();
  const fetchPatients = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const { data } = await axios.get(
        "http://localhost:6060/reports/v1/userDetails/",
        { headers: { Authorization: `Bearer ` + token } }
      );
      setPatientsData(data.data.patients);
    } catch (error) {
      console.error("failed:", error);
    }
  };

  React.useEffect(() => {
    fetchPatients();
  }, []);

  const [modalShow, setModalShow] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState();
  
  return (
    <div className="px-5 py-5">
      <h3 className="d-flex align-left">{"Patients List"}</h3>

      <Table striped bordered hover size="sm">
        <thead>
          <tr className=" text-center">
            <th className=" w-25">Name</th>
            <th className="w-25">Email Id</th>
            <th className="w-25">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patientsData.map((item) => {
            return (
              <tr>
                <td>{item.user.name}</td>
                <td>{item.user.emailId}</td>
                <td className="d-flex justify-content-around ">
                  {
                    <>
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => navigate(`/generate-report/${item.id}`)}
                      >
                        Update Report
                      </Button>{" "}
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={()=>{setModalShow(true);setSelectedId(item.id)}}
                      >
                        View Report
                      </Button>{" "}
                    </>
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <TemplateWindow show={modalShow} onHide={() => setModalShow(false)}  id={selectedId}/>
    </div>
  );
};

export default DoctorsView;
