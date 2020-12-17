import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { signup } from "../scripts/auth";
import { addUser, User } from "../scripts/db";
export default function Signup() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const desireRef = useRef<HTMLInputElement>(null);
  const dislikeRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      const user = await signup(
        emailRef.current?.value,
        passwordRef.current?.value
      );
      if (!user.user) {
        setError("Failed to create an account");
        return;
      }
      const data: User = {
        email: emailRef.current?.value,
        name: nameRef.current?.value,
        desire: desireRef.current?.value,
        dislike: dislikeRef.current?.value,
        userType: "user",
        personDesire: "",
        personDislike: "",
        person: "",
      };
      await addUser(user.user.uid, data);
      history.push("/SecretSanta/");
    } catch (error) {
      if (error === "") setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Form.Group id="want">
              <Form.Label>What you want</Form.Label>
              <Form.Control type="text" ref={desireRef} required />
            </Form.Group>
            <Form.Group id="dontwant">
              <Form.Label>What you don't Want</Form.Label>
              <Form.Control type="text" ref={dislikeRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/SecretSanta/login">Log In</Link>
      </div>
    </>
  );
}
