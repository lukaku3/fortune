import React from 'react';
import { Button, ListGroup, Table } from 'react-bootstrap';

const MyListGroup = () => {
    return true;
    return (
        <ListGroup as="ol" numbered>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                    <div className="fw-bold">Subheading</div>
                    Cras justo odio
                </div>
            </ListGroup.Item>
        </ListGroup>
    )
}

export default MyListGroup;
