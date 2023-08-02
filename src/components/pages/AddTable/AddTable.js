import { Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addTableRequest } from "../../../redux/tablesRedux";
import { useState } from "react";
import styles from './AddTable.module.scss';


const AddTable = () => {
    const [status, setStatus] = useState("Free");
    const [peopleAmount, setPeopleAmount] = useState(0);
    const [maxPeopleAmount, setMaxPeopleAmount] = useState(1);
    const [tableNumber, setTableNumber] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const tables = useSelector((state) => state.tables);


    const handleSubmit = (e) => {
        e.preventDefault();

        const tableNumberExists = tables.some(
            (table) => table.tableNumber === tableNumber
        );

        if (tableNumberExists) {
            alert("This table number already exists");
            return;
        }
        dispatch(
            addTableRequest({
                tableNumber,
                status,
                peopleAmount,
                maxPeopleAmount,
                bill: 0,
            })
        );
        navigate("/");
    };

    const handlePeopleAmountChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 0 && value <= maxPeopleAmount) {
            setPeopleAmount(value);
        }
    };

    const handleMaxPeopleAmountChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 1 && value >= peopleAmount) {
            setMaxPeopleAmount(value);
        }
    };

    return (
        <>
            <h2 className={styles['title']}> Add Table </h2>
            <Form onSubmit={handleSubmit} className={styles['table-form']}>

                <Form.Group as={Row} className={`mb-3 ${styles['form-group']}`}>
                    <Form.Label column sm={2}>
                        <strong> Table Number: </strong>
                    </Form.Label>
                    <Col sm={2}>
                        <Form.Control
                            type="text"
                            value={tableNumber}
                            required
                            onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, "");
                                setTableNumber(value);
                            }}
                            className={styles['form-control-title']}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className={`mb-3 ${styles['form-group']}`}>
                    <Form.Label as="legend" column sm={1}>
                        <strong>Status:</strong>
                    </Form.Label>
                    <Col sm={3}>
                        <Form.Select value={status} onChange={(e) => setStatus(e.target.value)} className={styles['form-control-select']}>
                            <option value="Busy"> Busy </option>
                            <option value="Free"> Free </option>
                            <option value="Cleaning"> Cleaning </option>
                            <option value="Reserved"> Reserved </option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className={`mb-3 ${styles['form-group']}`}>
                    <Form.Label column sm={1}>
                        <strong> People: </strong>
                    </Form.Label>
                    <Col sm={1}>
                        <Form.Control
                            type="number"
                            value={peopleAmount}
                            onChange={handlePeopleAmountChange}
                            className={styles['form-control-people-one']}
                        />
                    </Col>
                    <Col sm={1} className={styles['slash']}> / </Col>
                    <Col sm={1}>
                        <Form.Control
                            type="number"
                            value={maxPeopleAmount}
                            onChange={handleMaxPeopleAmountChange}
                            className={styles['form-control-people-two']}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className={`mb-3 ${styles['form-group']}`}>
                    <Col>
                        <Button type="submit" variant="primary" className={styles['submit-button']}>
                            Add
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    );
};

export default AddTable;