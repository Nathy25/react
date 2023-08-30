import { useEffect, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import Navbar from "../../components/Navbar";
import Events from "../../components/Events";
import useEventsData from "../../hooks/useEventsData";
import styles from './Home.module.css';

const Home = () => {
    const { events,isLoading, error, fetchEvents, page } = useEventsData();
    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef();

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleNavbarSearch = (term) => {
        //console.log(containerRef.current.getterSomething);
        setSearchTerm(term);
        fetchEvents(`&keyword=${term}`);
    };

    const handlePageClick = ({selected}) => {
        //console.log(term);
        fetchEvents(`&keyword=${searchTerm}&page=${selected}`)
    };

    const renderEvents = () => {
        if (isLoading) {
            return <div>Cargando resultados...+</div>
        }

        if (error) {
           return <div>Ha ocurrido un error</div>
        }

        return (
            <div>
                <Events searchTerm={searchTerm} events={events}/>
                <ReactPaginate
                 className={styles.pagination}
                 nextClassName={styles.next}
                 previousClassName={styles.previous}
                 pageClassName={styles.page}
                 activeClassName={styles.activePage}
                 disabledClassName={styles.disabledPage}
                 breakLabel="..."
                 nextLabel="next >"
                 onPageChange={handlePageClick}
                 pageRangeDisplayed={5}
                 pageCount={page.totalPages}
                 previousLabel="< previous"
                 renderOnZeroPageCount={null}
                />
            </div>
        );
    }

    return (
        <>
        <Navbar onSearch={handleNavbarSearch} ref={containerRef}/>
        {renderEvents()}
        {/*isLoading ? <div>Cargando resultados...+</div> : <Events searchTerm={searchTerm} events={events}/>*/}
        {/*!!error && <div>Ha ocurrido un error</div>*/}
        </>
    )
};

export default Home;