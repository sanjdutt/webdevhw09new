import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { edit_invite, fetch_invites } from '../api';


export default function InvitesEdit() {
  let history = useHistory();


  const oginvite = get_comment(invites, id);

  let [invite, setInvite] = useState(oginvite);

  function submit(ev) {
    ev.preventDefault();
    console.log(ev);
    console.log(respone);
    edit_invite(response).then((resp) => {
      if (resp["errors"]) {
        console.log("errors", resp.errors);
      }
      else {
        history.push("/");
        fetch_invites();
      }
    });
  }


  function updateInvite(ev) {
    let p1 = Object.assign({}, invite);
    p1["response"] = ev.target.value;
    setInvitet(p1);
  }

  return (
    <Row>
      <Col>
       <h2>RSVP</h2>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>RSVP</Form.Label>
            <Form.Control as="textarea"
                          onChange={updateInvite}
                          value={invite.response} />
          </Form.Group>
          <Button variant="primary" type="submit">
            send rsvp!
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
