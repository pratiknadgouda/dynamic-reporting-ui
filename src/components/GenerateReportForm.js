import React from "react";
import { Form, Container, Button, Row, Col, Table } from "react-bootstrap";
import { Formik } from "formik";
import axios from "axios";
import ReportCard from "./ReportCard";
import userStore from "../store/userStore";
import { useParams } from "react-router-dom";

const GenerateReportForm = () => {
  const params = useParams()
  const {id:id}=params;
  const [baseReportData, setBaseReportData] = React.useState();
  const token = userStore((state) => state.token);
  if(!baseReportData){
  axios
    .get(`http://localhost:6060/reports/v1/userDetails/reportData/?id=${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      const baseData = JSON.parse(response.data.data.jsonReport);
      console.log(baseData)
      setBaseReportData(baseData);
    });
  }

  const [dataClone, setDataClone] = React.useState();

  const validateValues = (values) => {
    const errors = {};
    if (!values.patientId) {
      errors.patientId = "Patient ID is required";
    }
    if (!values.name) {
      errors.name = "Name is required";
    }
    if (!values.age) {
      errors.age = "Age is required";
    }
    if (!values.gender) {
      errors.gender = "Gender is required";
    }
    if (!values.dob) {
      errors.dob = "Date of Birth is required";
    }
    if (!values.orderingDoctor) {
      errors.orderingDoctor = "Ordering doctor name is required";
    }
    return errors;
  };

  const handleFormSubmit = (event) => {
    const templateId = 1;
    event.preventDefault();
    console.log(dataClone);
    axios
      .post(
        `http://localhost:6060/reports/v1/generate-document?templateId=${templateId}&id=${id}`,
        {patient_info: baseReportData?.patient_info, test_types: dataClone},{ responseType: 'blob', headers: { Authorization: `Bearer ${token}` }}
      )
      .then((response) => {
        const blob = new Blob([response.data], {type: response.headers['Content-Type']});
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download='resportsBasic.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
    // setSubmitting(false);
  };

  const handleReset = () => {
    setDataClone(baseReportData?.test_types);
  };
  React.useEffect(()=>{
    if(baseReportData?.test_types.length > 0){
      setDataClone(baseReportData?.test_types);
    }
  }, [baseReportData?.test_types])

  return (
    <div className="mt-4 h-100 d-flex justify-content-center align-items-center">
      <Container className="p-4 bg-light">
        <h1 className="mb-4">Generate Report</h1>
        <Formik
          initialValues={{
            patientId: baseReportData?.patient_info?.patient_id,
            name: baseReportData?.patient_info?.name,
            age: baseReportData?.patient_info?.age_sex,
            gender: baseReportData?.patient_info?.age_sex,
            dob: baseReportData?.patient_info?.dob,
            medications: baseReportData?.patient_info?.medications,
            orderingDoctor: baseReportData?.patient_info?.ordering_dr,
          }}
          onSubmit={handleFormSubmit}
          validate={validateValues}
        >
          {({ values, errors, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <div className="patientInfo">
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group controlId="patientId">
                      <Form.Label>Patient ID</Form.Label>
                      <Form.Control
                        type="text"
                        name="patientId"
                        placeholder={baseReportData?.patient_info?.patient_id}
                        value={values.patientId}
                        onChange={handleChange}
                        isInvalid={!!errors.patientId}
                        disabled
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.patientId}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder={baseReportData?.patient_info?.name}
                        value={values.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                        disabled
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="age">
                      <Form.Label>Age</Form.Label>
                      <Form.Control
                        type="text"
                        name="age"
                        placeholder={baseReportData?.patient_info?.age_sex}
                        value={values.age}
                        onChange={handleChange}
                        isInvalid={!!errors.age}
                        disabled
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.age}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group controlId="gender">
                      <Form.Label>Gender</Form.Label>
                      <Form.Select
                        name="gender"
                        value={values.gender}
                        onChange={handleChange}
                        isInvalid={!!errors.gender}
                        disabled
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.gender}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="dob">
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="text"
                        name="dob"
                        placeholder={baseReportData?.patient_info?.dob}
                        value={values.dob}
                        onChange={handleChange}
                        isInvalid={!!errors.dob}
                        disabled
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.dob}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="orderingDoctor">
                      <Form.Label>Ordering Doctor</Form.Label>
                      <Form.Control
                        type="text"
                        name="orderingDoctor"
                        placeholder={baseReportData?.patient_info?.ordering_dr}
                        value={values.orderingDoctor}
                        onChange={handleChange}
                        isInvalid={!!errors.orderingDoctor}
                        disabled
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.orderingDoctor}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group controlId="medications">
                  <Form.Label>Medications</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="medications"
                    placeholder={baseReportData?.patient_info?.medications}
                    value={values.medications}
                    onChange={handleChange}
                    disabled
                  />
                </Form.Group>
              </div>
              <div className="dataCards mt-4">
                <ReportCard data={dataClone} setData={setDataClone} />
              </div>

              <div className="text-end">
                <Button className="mt-4 me-2" onClick={handleReset}>
                  Reset Report
                </Button>
                <Button className="mt-4" type="submit" onClick={handleFormSubmit}>
                  Generate Report
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default GenerateReportForm;
