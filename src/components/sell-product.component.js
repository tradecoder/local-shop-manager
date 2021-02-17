import React, {useState, useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'jquery/dist/jquery';
import '../App.css';

const username = localStorage.getItem('username');
const userid = localStorage.getItem('userid');
const productId = window.location.href.split('/').reverse()[0];

export default function Sell(){
    const [product, setProduct] =  useState({});
    const [unitPrice, setUnitPrice] =  useState(0);
    const [quantity, setQuantity] = useState(0);
    const totalPrice = unitPrice*quantity;

    function onChangeQuantity(e){
        setQuantity(e.target.value)
    }
    function onChangeUnitPrice(e){
        setUnitPrice(e.target.value)
    }

    useEffect(()=>{
        axios.get(`http://localhost:5000/status/${productId}/${username}/${userid}`)
        .then(d=>setProduct(d.data))
        .catch(err=>window.alert(err))
    })

    function onSubmitSellNow(e){
        e.preventDefault();
        
        const salesHistory = {            
            quantity,        
            totalPrice
        }

        axios.put(`http://localhost:5000/sell/${productId}/${username}/${userid}`, salesHistory)
        .then(res=>window.alert(res.data))        
        .catch(err=>window.alert(err))
    }

    return(
        <div className="body-part">
            <div className="bg-silver p-3">
                <p className="text-24">Product Details:  {product.productId}-{product.productName}, <br/>
                Current Stock: {product.stock}</p>
            </div>
            <div>
                <form onSubmit={onSubmitSellNow}>
                    <h1>Sell Now</h1>
                    <div className="form-group">
                        <label>Quantity: </label>
                        <input type="number" className="form-control" onChange={onChangeQuantity} required/>
                    </div>
                    <div className="form-group">
                        <label>Unit Price: </label>
                        <input type="number" className="form-control" onChange={onChangeUnitPrice} required/>
                    </div>
                    
                    <div className="form-group">
                        <label>Total price / Sell value: </label>
                        <input type="number" className="form-control" value={totalPrice} disabled/>
                    </div>
                    <div>
                        <button className="btn btn-primary">Sell {quantity} now</button>
                    </div>
                </form>
            </div>            
        </div>
    );
}