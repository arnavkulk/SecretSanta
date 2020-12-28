import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import Link from "next/link";
import { login, googleSignIn } from "../scripts/auth";
import { useRouter } from "next/router";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { currentUser } = useAuth();

  if (currentUser !== null) {
    router.push("/");
  }

  async function handleSubmit(e: any, type: string) {
    if (e) e.preventDefault();

    try {
      setError("");
      setLoading(true);
      if (type === "google") {
        await googleSignIn();
      } else {
        await login(emailRef.current?.value, passwordRef.current?.value);
      }
      router.push("/");
    } catch (error) {
      console.log(error);
      if (error.code === "auth/email-already-exists") {
        setError("A user with this email already exists");
      } else if (error.code === "auth/invalid-email") {
        setError("Invalid email");
      } else if (error.code === "auth/wrong-password") {
        setError("Incorrect password");
      } else if (error.code === "auth/user-not-found") {
        setError("No user with this email");
      } else {
        setError("Failed to log in");
      }
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={(e) => handleSubmit(e, "email")}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link href="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link href="/signup">Sign Up</Link>
      </div>
    </>
  );
}
