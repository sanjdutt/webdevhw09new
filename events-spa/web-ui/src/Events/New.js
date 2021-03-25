import { Row, Col, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { create_event } from '../api';

function NewEvent() {
	let history = useHistory();
	const [event, setEvent] = useState({
		name: "", 
		date: "", 
		description: ""
	});

	function update(field, ev) {
		let newEvent = Object.assign({}, event);
		newEvent[field] = ev.target.value;
		setEvent(newEvent);
	}

	function onSubmit(ev) {
		ev.preventDefault();

		create_event(event).then(() => {
			history.push("/");
		});
	}

	return (
		<Row>
			<Col>
				<br />
				<h1><b>New Event</b></h1>
				<Form onSubmit={onSubmit}>
					<Form.Group>
						<Form.Label>Event Title</Form.Label>
						<Form.Control type="text"
													onChange={(ev) => update("name", ev)}
													value={event.name || ""} />
					</Form.Group>
					<Form.Group>
						<Form.Label>Date</Form.Label>
						<Form.Control type="date-time"
													onChange={(ev) => update("date", ev)}
													value={event.date || ""} />
					</Form.Group>
					<Form.Group>
						<Form.Label>Description</Form.Label>
						<textarea className="form-control"
													onChange={(ev) => update("description", ev)}
													value={event.description || ""} />
					</Form.Group>
					<br />
					<Button variant="primary"
									type="submit">
						Save
					</Button>
				</Form>
			</Col>
		</Row>
	);
}

function state2props() {
	return {};
}

export default connect(state2props)(NewEvent);

