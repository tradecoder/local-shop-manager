import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'jquery/dist/jquery';
import '../App.css';

import axios from 'axios';
const username = localStorage.getItem('username');
const userid = localStorage.getItem('userid');


export default function ViewStock(){
    const [product, setProduct]= useState({});
    const [productId, setProductId] = useState("");

    function onChangeProductId(e){
        setProductId(e.target.value);
    }

  
    return(
        <div>
          
        </div>
    );
}