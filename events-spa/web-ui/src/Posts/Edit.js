import { Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { create_post, fetch_posts, get_post } from '../api';

export default function PostsEdit() {
  let history = useHistory();

  const ogpost = get_post(posts, id);

  let [post, setPost] = useState(ogpost);

  function update(field, ev) {
    let new = Object.assign({}, post);
    update[field] = ev.target.value;
    setPost(update);
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

  return (
    <Row>
      <Col>
        <h2>New Post</h2>
        <Form onSubmit={submit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="textarea"
                          onChange={(ev) => update("name", ev)}
                          value={post.name} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <Form.Control as="textarea"
                          onChange={(ev) => update("date", ev)}
                          value={post.date} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea"
                          onChange={(ev) => update("description", ev)}
                          value={post.description} />
          </Form.Group>
          <Button variant="primary" type="submit">
            update
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
