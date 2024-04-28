import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

const Seller = () => {
    return (
        <div>
             <h1 className="mt-4 mb-4">Seller</h1>
            <Tabs defaultActiveKey="dashboard" id="seller-tabs" className="mb-3">
                <Tab eventKey="dashboard" title="Dashboard">
                    <h2>Dashboard</h2> 

                </Tab>
                <Tab eventKey="orders" title="Orders">
                    <h2>Orders</h2>
                   
                </Tab>
                <Tab eventKey="products" title="Products">
                    <h2>Products</h2>
                  
                </Tab>

            </Tabs>
        </div>
    );
};

export default Seller;