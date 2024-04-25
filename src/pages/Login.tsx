import { Input } from "@components/Form";
import { Heading } from "@components/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { actAuthLogin } from "@store/auth/authSlice";
import { useAppDispatch } from "@store/hooks";
import { signInSchema, signInType } from "@validations/signInSchema";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";

const Login = () => {
  const [searchParams] = useSearchParams(); // could use a toaster instead but was practicing with the URL
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signInType>({
    mode: "onBlur",
    resolver: zodResolver(signInSchema),
  });

  const submitForm: SubmitHandler<signInType> = async (data) => {
    dispatch(actAuthLogin(data))
      .unwrap()
      .then(() => navigate("/"));
  };
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
              error={errors.email?.message as string}
            />
            <Input
              type="password"
              name="password"
              label="Password"
              register={register}
              error={errors.password?.message as string}
            />
            <Button variant="info" type="submit" style={{ color: "white" }}>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
