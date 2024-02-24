import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';


const TemplateWindow = (props) => {
    const templates = [{
        id: "1",
        template: "template1"
    }, {
        id: "2",
        template: "template2"
    }, {
        id: "3",
        template: "template3"
    }, {
        id: "4",
        template: "template4"
    }]
    const [selectedTemplate, setselectedTemplate] = React.useState("0");
    const handleSelectChange = (e) => {
        setselectedTemplate(e.target.value);
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
                    <option value="0">Please Select Template</option>
                    {templates.map(item => {
                        return (
                            <option value={item.id}>{item.template}</option>
                        )
                    })}
                </Form.Select>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Cancel
                </Button>
                <Button variant="primary" disabled={selectedTemplate === "0" ? true : false}>Submit</Button>
            </Modal.Footer>
        </Modal >
    );
}
export default TemplateWindow