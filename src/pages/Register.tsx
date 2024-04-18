import { Input } from "@components/Form";
import { Heading } from "@components/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signUpTypes } from "@validations/signUpSchema";
import { Button, Col, Form, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<signUpTypes>({
    mode: "onBlur",
    resolver: zodResolver(signUpSchema),
  });

  const submitForm: SubmitHandler<signUpTypes> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Heading title="Register" />
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              label="First name"
              name="firstName"
              register={register}
              error={errors.firstName?.message as string}
            />

            <Input
              label="Last name"
              name="lastName"
              register={register}
              error={errors.lastName?.message as string}
            />

            <Input
              label="Email address"
              name="email"
              register={register}
              error={errors.email?.message as string}
            />

            <Input
              label="Password"
              name="password"
              register={register}
              error={errors.password?.message as string}
            />

            <Input
              label="Confirm Password"
              name="confirmPassword"
              register={register}
              error={errors.confirmPassword?.message as string}
            />

            <Button variant="info" type="submit" style={{ color: "white" }}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default Register;
