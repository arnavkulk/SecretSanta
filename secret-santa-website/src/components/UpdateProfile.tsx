import React, { useRef, useState, useEffect } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { updateUserInfo, User, getUser } from "../scripts/db";

export default function UpdateProfile() {
  const nameRef = useRef<HTMLInputElement>(null);
  const desireRef = useRef<HTMLInputElement>(null);
  const dislikeRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState<User>({
    name: "",
    desire: "",
    email: "",
    dislike: "",
    personDesire: "",
    personDislike: "",
  });

  useEffect(() => {
    if (currentUser) {
      getUser(currentUser.uid).then((user) => {
        setUserData(user.data() as User);
      });
    }
  }, [currentUser, userData]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!currentUser) {
        setError("Failed to update info");
        return;
      }
      setError("");
      setLoading(true);
      const data: User = {
        name: nameRef.current?.value,
        desire: desireRef.current?.value,
        dislike: dislikeRef.current?.value,
      };
      await updateUserInfo(currentUser.uid, data);
      history.push("/");
    } catch (error) {
      if (error === "") setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Info</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                ref={nameRef}
                defaultValue={userData.name}
                required
              />
            </Form.Group>
            <Form.Group id="want">
              <Form.Label>What you want</Form.Label>
              <Form.Control
                type="text"
                ref={desireRef}
                defaultValue={userData.desire}
                required
              />
            </Form.Group>
            <Form.Group id="dontwant">
              <Form.Label>What you don't Want</Form.Label>
              <Form.Control
                type="text"
                ref={dislikeRef}
                defaultValue={userData.dislike}
                required
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
}
