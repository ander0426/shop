import React, { useEffect, useState } from 'react'
import { useForm } from '../hooks/useForm';
import { useNavigate } from "react-router-dom";


export interface ReqResListado {
    products: Array<Product>;
}

type Product = {
    name: string;
    price: number;
    amount: number;
    id: number;
}
    
    export const AddProduct = () => {
        let navigate = useNavigate();

        const [products, setProducts] = useState<ReqResListado>()

        useEffect(() => {
            setProducts(JSON.parse(localStorage.getItem('Products') || '{}'));
        }, [])
        
        
        const [values, handleInputChange, reset] = useForm(
            {
                name: "",
                price: 0,
                amount: 0
            }
        );
        const { name, price, amount } = values

    const handleSubmit = (e: any) => {
        e.preventDefault();
        
        
        const idProduct =  products.products.length + 1;
        const newProduct = {
            name: name,
            price: price,
            amount: amount,
            id: idProduct
        }
        products.products.push(newProduct);
        console.log(products);
        localStorage.setItem("Products", JSON.stringify(products))
        navigate("/");
    }
    
    return (
        <div className='card'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        name='name'
                        type="text"
                        className="form-control"
                        aria-describedby="name"
                        value={name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                        name='price'
                        min="0"
                        type="number"
                        className="form-control"
                        aria-describedby="name"
                        value={price}
                        onChange={handleInputChange}
                         />
                </div>
                <div className="mb-3">
                    <label className="form-label">Amount</label>
                    <input
                        name='amount'
                        type="number"
                        className="form-control"
                        aria-describedby="name"
                        min="0"
                        value={amount}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}
