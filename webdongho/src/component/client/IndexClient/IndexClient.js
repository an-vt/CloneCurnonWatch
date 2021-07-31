import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Banner from '../Banner/Banner';
import CategoryCard from '../CategoryCard/CategoryCard';
import ProductBestSeller from '../ProductBestSeller/ProductBestSeller';
import Caipaign from '../Caipaign/Caipaign';
import OurProduct from '../OurProduct/OurProduct';
import Story from '../Story/Story';

IndexClient.propTypes = {

};

function IndexClient(props) {
    let [productList, setProductList] = useState([])

    useEffect(() => {
        console.log('9999')
        async function getListProduct() {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "search": "",
                "page": "1",
                "limit": "4"
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            try {
                let response = await fetch("http://localhost:4000/api/product/search", requestOptions)
                if (response.ok) {
                    let results = await response.json()
                    console.log(results)
                    const { data } = results
                    console.log(data)
                    setProductList(data)
                }
            } catch (error) {
                console.log('Fetch products error ', error)
            }
        }

        getListProduct();
    }, []);

    return (
        <>
            <Banner />
            <CategoryCard />
            <ProductBestSeller products={productList} />
            <Caipaign />
            <OurProduct />
            <Story />
        </>
    );
}

export default IndexClient;