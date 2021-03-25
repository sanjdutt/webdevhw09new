import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { create_post, fetch_posts } from '../api';

export default function PostsNew() {
  let history = useHistory();
  let [post, setPost] = useState({});

  function submit(ev) {
    ev.preventDefault();
    console.log(ev);
    console.log(post);
    create_post(post).then((resp) => {
      if (resp["errors"]) {
        console.log("errors", resp.errors);
      }
      else {
        history.push("/");
        fetch_posts();
      }
    });
  }

  function updateName(ev) {
    let p1 = Object.assign({}, post);
    p1["name"] = ev.target.files[0];
    setPost(p1);
  }

  function updateDate(ev) {
    let p1 = Object.assign({}, post);
    p1["date"] = ev.target.value;
    setPost(p1);
  }

  function updateDescription(ev) {
    let p1 = Object.assign({}, post);
    p1["description"] = ev.target.value;
    setPost(p1);
  }

  return (
    <Row>
      <Col>
        <h2>New Post</h2>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="textarea"
                          onChange={updateName}
                          value={post.name} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control as="textarea"
                          onChange={updateDate}
                          value={post.date} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea"
                          onChange={updateDescription}
                          value={post.description} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Post!
          </Button>
        </Form>
      </Col>
    </Row>
  );
}


