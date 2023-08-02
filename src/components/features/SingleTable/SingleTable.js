import { Link } from "react-router-dom";
import { Card, Row, Col, Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTableRequest } from "../../../redux/tablesRedux";
import React, { useState } from 'react';
import styles from './SingleTable.module.scss';


const SingleTable = ({ id, status, peopleAmount, maxPeopleAmount, tableNumber, bill }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDelete = () => {
    dispatch(deleteTableRequest(id));
    handleCloseModal();
  };
  return (
    <div className={styles['tables']}>
      <Card className={styles['card']}>
        <Card.Body>
          <Row>
            <Col xs={6} md={2} className={styles['single-table']}>
              <Card.Title as='h2' className={styles['table-header']}>
                <span className={styles['title-one']}> Table </span>
                <span className={styles['title-two']}> {tableNumber} </span>
              </Card.Title>
            </Col>

            <Col xs={6} md={2} className={styles['single-table']}>
              <Card.Text as='p' className={styles['fw-bold']}>
                <span className={styles['status-one']}><strong> Status: </strong></span>
                <span className={styles['status-two']}> {status} </span>
              </Card.Text>
            </Col>

            <Col xs={6} md={3} className={styles['single-table']}>
              <Card.Text as='p' className={styles['fw-bold']}>
                <span className={styles['people-one']}> <strong> People Amount: </strong></span>
                <span className={styles['people-two']}> {peopleAmount} / {maxPeopleAmount} </span>
              </Card.Text>
            </Col>

            {status === "Busy" && (
              <Col xs={6} md={2} className={styles['single-table']}>
                <Card.Text as='p' className={styles['fw-bold']}>
                  <span className={styles['bill-one']}><strong> Bill: </strong></span>
                  <span className={styles['bill-two']}> ${bill} </span>
                </Card.Text>
              </Col>
            )}

            <Col xs={6}
              md={status === "Busy" ? 3 : 5}
              className="d-flex justify-content-end">
              <div>
                <Link to={"/table/" + id}>
                  <Button variant="primary" className={styles['show-more-button']}> Show more </Button>
                </Link>
                <Button
                  variant="danger"
                  onClick={handleShowModal}
                  className={styles['delete-button']}
                >
                  Delete
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card >

      <Modal show={showModal} onHide={handleCloseModal} className={styles['custom-modal']}>
        <Modal.Header closeButton>
          <Modal.Title className={styles['modal-title']}> Are you sure you want to do that? </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles['modal-body']}>
          <p>
            Are you absolutely certain you want to proceed with this action?
            <br />
            <br />
            Once completed, this table will be permanently erased from the app!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button id="cancel-button" variant="secondary" onClick={handleCloseModal} className={styles['cancel-button']}>
            Cancel
          </Button>
          <Button id="remove-button" variant="danger" onClick={handleDelete} className={styles['remove-button']}>
            Remove
          </Button>
        </Modal.Footer>
      </Modal>

    </div >
  )
};

export default SingleTable;