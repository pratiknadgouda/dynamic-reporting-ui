import React from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { Formik } from "formik";

const GenerateReportForm = () => {
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
  const handleFormSubmit = (values, { setSubmitting }) => {
    setSubmitting(true);
    // TODO API CALLS
    console.log("submitted!");
    setSubmitting(false);
  };
  return (
    <Container className="mt-4 p-2">
      <h1 className="mb-4">Generate Report</h1>
      <Formik
        initialValues={{
          patientId: "",
          name: "",
          age: "",
          gender: "",
          dob: "",
          medications: "",
          orderingDoctor: "",
        }}
        onSubmit={handleFormSubmit}
        validate={validateValues}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="patientId">
                  <Form.Label>Patient ID</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter patient ID"
                    name="patientId"
                    value={values.patientId}
                    onChange={handleChange}
                    isInvalid={!!errors.patientId}
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
                    placeholder="Enter patient name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
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
                    placeholder="Enter patient age"
                    name="age"
                    value={values.age}
                    onChange={handleChange}
                    isInvalid={!!errors.age}
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
                  >
                    <option value="">Select Gender</option>
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
                    placeholder="Enter patient DOB"
                    name="dob"
                    value={values.dob}
                    onChange={handleChange}
                    isInvalid={!!errors.dob}
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
                    placeholder="Enter doctor name"
                    name="orderingDoctor"
                    value={values.orderingDoctor}
                    onChange={handleChange}
                    isInvalid={!!errors.orderingDoctor}
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
                placeholder="Enter prescribed medications"
                name="medications"
                value={values.medications}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="text-end">
              <Button className="mt-4" type="submit">
                Generate Report
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default GenerateReportForm;
