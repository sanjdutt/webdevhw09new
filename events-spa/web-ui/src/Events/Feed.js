import { Nav, Row, Col, Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

function Event({event}) {
	return (
		<Col>
			<Card>
				<Card.Text>
					<br />
					&emsp;<b>{event.name}</b>
					<br />
					<br />
					&emsp;<i>{event.date}</i>
					<br />
					<br />
					&emsp;{event.description}
					<br />
					<br />
					&emsp;Posted by: 
					<br />
					<br />
				</Card.Text>
			</Card>
		</Col>
	);
}

function Feed({events, session}) {

	let cards = events.map((event) => (
			<Event event={event} key={event.id} />
	));

	function EventsOrMsg({session}) {
		if (session) {
			return (<Row>{cards}</Row>);
		} else {
			return (<h3>Please sign in or register to view your events.</h3>);
		}
	}

	function NewEventButton({session}) {
		if (session) {
			return (
				<div className="col" align="right">
					<Nav.Item>
						<NavLink to="/new" exact className="nav-link">
							New Event
						</NavLink>
					</Nav.Item>
				</div>
			);
		} else {
			return null;
		}
	}

	return (
		<div>
			<Row>
				<Col>
					<h1><b>Events Feed</b></h1>
				</Col>
				<NewEventButton session={session} />
			</Row>
			<EventsOrMsg session={session} />
		</div>
	);
}

export default connect(({events, session}) => ({events, session}))(Feed);

