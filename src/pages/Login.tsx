import { Input } from "@components/Form";
import { Heading } from "@components/shared";
import { useLogin } from "@hooks/useLogin";
import { Alert, Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { Navigate } from "react-router-dom";

const Login = () => {
  const {
    submitForm,
    register,
    handleSubmit,
    formErrors,
    error,
    loading,
    accessToken,
    searchParams,
  } = useLogin();

  if (accessToken) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Heading title="User Login" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParams.get("message") && (
            <Alert variant="success">
              Your account was created, please login.
            </Alert>
          )}

          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              name="email"
              label="Email Address"
              register={register}
              error={formErrors.email?.message as string}
            />
            <Input
              type="password"
              name="password"
              label="Password"
              register={register}
              error={formErrors.password?.message as string}
            />
            <Button variant="info" type="submit" style={{ color: "white" }}>
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm" /> Loading...
                </>
              ) : (
                "Login"
              )}
            </Button>
            {error && <p className="text-danger mt-2">{error}</p>}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
