'use client'

import { MMArmenU } from '@/constants/font';
import Form from './Form';
import styles from './styles.module.sass'
import Container from '@/components/components/container';

interface Props {
    orders: ORDER[];
    ordersArmenianKeyword: ORDER[];
};

const Orders = ({
    orders,
    ordersArmenianKeyword
}: Readonly<Props>) => {

    return (
        <section id='orders' className={MMArmenU.className}>

         <Container className='container'>
         <h2 className={styles.title}>Հետադարձ կապ</h2>
            <Form
                orders={orders}
                ordersArmenianKeyword={ordersArmenianKeyword}
                classNameProperty='large'
            />
         </Container>
        </section>
    )
};

export default Orders;