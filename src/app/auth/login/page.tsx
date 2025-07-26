"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";
import Login from "./Login";

const UserLogin = () => {
  const { data: session } = useSession();
  const router = useRouter();

  console.log("UserLogin session", session);

  useEffect(() => {
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  if (session) return null;

  return (
    <Container fluid className="p-0">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card">
            <Login />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default UserLogin;
