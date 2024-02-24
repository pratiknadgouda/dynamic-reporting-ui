import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import axios from "axios";
import userStore from "../store/userStore";
import { jwtDecode } from "jwt-decode";
import useAuth from "../utils/useAuth";

function LoginPage() {
  useAuth();
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const { login, loggedIn } = userStore((state) => state);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:6060/reports/v1/login", { email })
      .then((response) => {
        setResponseMessage("Login successful!");
        const token = response.data.data.access_token;
        const user = jwtDecode(token);
        login(user.sub, user.email, user.role, token);
      })
      .catch((error) => {
        setResponseMessage("Login failed. Please try again.");
        console.error("Login failed:", error);
      });
  };

  return (
    <>
      {loggedIn ? (
        navigate(-1)
      ) : (
        <div className="mt-5 h-100 d-flex justify-content-center align-items-center">
          <Form className="p-3 w-25 bg-light rounded" onSubmit={handleSubmit}>
            <Form.Group className="mb-3 p-2" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
            {responseMessage && <p>{responseMessage}</p>}
          </Form>
        </div>
      )}
    </>
  );
}

export default LoginPage;
