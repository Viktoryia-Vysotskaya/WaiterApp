import { Row, Col, Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { getTableById, editTableRequest, fetchTables } from "../../../redux/tablesRedux";
import { useState, useEffect } from "react";
import styles from './Table.module.scss';


const Table = () => {

    const { id } = useParams();
    const tables = useSelector((state) => state.tables);
    const tableData = useSelector((state) => getTableById(state, id));

    const [status, setStatus] = useState("Free");
    const [peopleAmount, setPeopleAmount] = useState(0);
    const [maxPeopleAmount, setMaxPeopleAmount] = useState(1);
    const [bill, setBill] = useState(0);
    const [tableNumber, setTableNumber] = useState("");

    useEffect(() => {
        if (tableData) {
            setTableNumber(tableData.tableNumber);
            setStatus(tableData.status);
            setPeopleAmount(tableData.peopleAmount);
            setMaxPeopleAmount(tableData.maxPeopleAmount);
            setBill(tableData.bill);
        }
    }, [tableData]);

    const dispatch = useDispatch();
    useEffect(() => dispatch(fetchTables()), [dispatch]);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const tableNumberExists = tables.some(
            (table) => table.tableNumber === tableNumber && table.id !== id
        );

        if (tableNumberExists) {
            alert(" This table number already exists ");
            return;
        }

        dispatch(
            editTableRequest({
                id,
                tableNumber,
                status,
                peopleAmount,
                maxPeopleAmount,
                bill
            })
        );
        navigate('/');
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

    const handleBillChange = (e) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value >= 0) {
            setBill(value);
        } else {
            setBill(0);
        }
    };

    const renderBillField = () => {
        if (status === "Busy") {
            return (
                <Form.Group as={Row} className={`mb-3 ${styles['form-group']}`}>
                    <Form.Label column sm={1}>
                        <strong> Bill: </strong>
                    </Form.Label>
                    <Col sm={2}>
                        <Row>
                            <Col sm={1} className={styles['money']}> $ </Col>
                            <Col sm={6}>
                                <Form.Control
                                    type="number"
                                    value={bill}
                                    onChange={handleBillChange}
                                    className={styles['form-control-bill']}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Form.Group>
            );
        }
        return null;
    };

    return (
        <>
            <h2 className={styles['title']}>Table {tableNumber}</h2>
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
                    <Form.Label as='legend' column sm={1}>
                        <strong> Status: </strong>
                    </Form.Label>
                    <Col sm={3}>
                        <Form.Select value={status} onChange={e => setStatus(e.target.value)} className={styles['form-control-select']}>
                            <option value='Busy'> Busy </option>
                            <option value='Free'> Free </option>
                            <option value='Cleaning'> Cleaning </option>
                            <option value='Reserved'> Reserved </option>
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className={`mb-3 ${styles['form-group']}`}>
                    <Form.Label column sm={1}>
                        <strong> People: </strong>
                    </Form.Label>
                    <Col sm={1}>
                        <Form.Control type='number'
                            value={peopleAmount}
                            onChange={handlePeopleAmountChange}
                            className={styles['form-control-people-one']}
                        />
                    </Col>
                    <Col sm={1} className={styles['slash']}> / </Col>
                    <Col sm={1}>
                        <Form.Control type='number'
                            value={maxPeopleAmount}
                            onChange={handleMaxPeopleAmountChange}
                            className={styles['form-control-people-two']}
                        />
                    </Col>
                </Form.Group>

                {renderBillField()}

                <Form.Group as={Row} className={`mb-3 ${styles['form-group']}`}>
                    <Col>
                        <Button type='submit' variant='primary' className={styles['submit-button']}> Update </Button>
                    </Col>
                </Form.Group>
            </Form>
        </>
    );
};

export default Table;