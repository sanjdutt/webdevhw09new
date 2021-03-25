import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { create_comment, fetch_comments } from '../api';


export default function CommentsNew() {
  let history = useHistory();
  let [comment, setComment] = useState({});

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
        fetch_comments();
      }
    });
  }


  function updateComment(ev) {
    let p1 = Object.assign({}, post);
    p1["body"] = ev.target.value;
    setPost(p1);
  }

  return (
    <Row>
      <Col>
        <h2>New Comment</h2>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>New Comment</Form.Label>
            <Form.Control type="file"
            <Form.Control as="textarea"
                          onChange={updateComment}
                          value={comment.body} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Comment!
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
