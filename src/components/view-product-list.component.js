import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'jquery/dist/jquery';
import '../App.css';

import axios from 'axios';
const username = localStorage.getItem('username');
const userid = localStorage.getItem('userid');

export default function ViewProductList(){
    const [productList, setProductList] = useState([]);


    useEffect(()=>{
        axios.get(`http://localhost:5000/view-product-list/${username}/${userid}`)
        .then(d=>setProductList(d.data))        
        .catch(err=>window.alert(err))
    })

    const list =  productList.map((e,i)=>{
        return(
       
            <tr>
                <td>{e.productId}</td>
                <td>{e.productName}</td>                
                <td>{e.stock}</td>
                <td><a href={`/buy/${e.productId}`}>Buy</a></td>
                <td><a href={`/sell/${e.productId}`}>Sell</a></td>
            </tr>         
        );
    });

    
    return(
        <div className="body-part">
            <div>
                <h1>Product List</h1>
            </div>
            <table className="table table-striped">
                <thead>
                    <th>Product ID </th>
                    <th>Product Name </th>
                    <th>Stock Position </th>
                    <th>Buy</th>
                    <th>Sell</th>
                </thead>
                <tbody>
                    {list}
                </tbody>
            </table>
        </div>
    );
}