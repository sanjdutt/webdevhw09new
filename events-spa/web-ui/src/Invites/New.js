import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { create_invite, fetch_invites } from '../api';

export default function InvitesNew() {
  let history = useHistory();
  let [invite, setInvite] = useState({});

  function submit(ev) {
    ev.preventDefault();
    console.log(ev);
    console.log(comment);
    create_post(comment).then((resp) => {
      if (resp["errors"]) {
        console.log("errors", resp.errors);
      }
      else {
        history.push("/");
        fetch_invites();
      }
    });
  }

  function update(ev) {
    let p1 = Object.assign({}, post);
    p1["email"] = ev.target.value;
    setInvitet(p1);
  }

  return (
    <Row>
      <Col>
       <h2>New Invite</h2>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>New Invite</Form.Label>
            <Form.Control as="textarea"
                          onChange={updateInvite}
                          value={invite.email} />
          </Form.Group>
          <Button variant="primary" type="submit">
            send invite!
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
