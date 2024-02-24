import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from "axios";

const TemplateWindow = (props) => {
const {id}= props    
    const [templates, setTemplates] = React.useState([{
            id: "0",
            templateName: "Please Select Template"
        }]);

    const fetchTemplates =async () => {
        const token = sessionStorage.getItem("token");
        try {
          const { data } = await  axios.get(
            "http://localhost:6060/reports/v1/userDetails/reportTemplates/",
            { headers: { Authorization: `Bearer ` + token } }
          );
          console.log("data tmp", data)
          setTemplates([{
            id: "0",
            templateName: "Please Select Template"
        },...data.data]);
        } catch (error) {
          console.error("failed:", error);
        }
      };

      React.useEffect(() => {
        fetchTemplates();
      }, []);

      
    const [selectedTemplate, setselectedTemplate] = React.useState("0");
    const handleSelectChange = (e) => {
        setselectedTemplate(e.target.value);
    };

    const handelSubmit =async (props) => {
        const token = sessionStorage.getItem("token");
        try {
          const res = await  axios.post(
            `http://localhost:6060/reports/v1/generate-document?templateId=${selectedTemplate}&id=${id}`,undefined,
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
          props()
        } catch (error) {
          console.error("failed:", error);
          props()
        }
      };
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            backdrop="static"
            keyboard={false}
            backdropClassName=''
        >
            <Modal.Header closeButton>
                <Modal.Title>View Report</Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <Form.Select aria-label="Default select example" onChange={handleSelectChange}>
                    {templates.map((item) => {
                        return (
                            <option value={item.id}>{item.templateName}</option>
                        )
                    })}
                </Form.Select>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Cancel
                </Button>
                <Button variant="primary" disabled={selectedTemplate === "0" ? true : false} onClick={()=>handelSubmit(props.onHide)}>Submit</Button>
            </Modal.Footer>
        </Modal >
    );
}
export default TemplateWindow