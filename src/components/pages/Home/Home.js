import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTables, getAllTables } from '../../../redux/tablesRedux';
import SingleTable from "../../features/SingleTable/SingleTable";
import { Link } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import Loader from '../../features/Loader/Loader';
import styles from './Home.module.scss';

const Home = () => {

    const dispatch = useDispatch();
    const tables = useSelector(getAllTables);
    const isLoading = useSelector((state) => state.loading);

    useEffect(() => {
        dispatch(fetchTables());
    }, [dispatch]);

    const sortedTables = tables.sort((a, b) => a.tableNumber - b.tableNumber);

    return (
        <>
            <Row>
                <Col className={styles['home-container']}>
                    <h1 className={styles['home-title']}> All tables </h1>
                    <Button variant='primary' as={Link} to={'/table/add'} className={`mb-3 ${styles['add-table-button']}`}> Add table </Button>
                </Col>
            </Row>
            {isLoading ? (
                <Loader />
            ) : (
                sortedTables.map((table) => <SingleTable key={table.id} {...table} />)
            )}
        </>
    );
};
export default Home;
