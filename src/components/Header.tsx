import React, { useEffect, useState } from 'react'
import { RootState } from "../store/store";
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { Link } from "react-router-dom";
import { Item } from '../interfaces/products';



export const Header = () => {
    const { cart }: any = useSelector((state: RootState) => state.cart)
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Shop</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/add">Add Product</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <button className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                Cart
                            </button>
                            <ul className="dropdown-menu">
                                {cart.length > 0 && cart.map((item: Item, index: number) =>
                                    <ol className="list-group">
                                        <li className="list-group-item d-flex justify-content-between align-items-start" key={"index-" + index}>
                                            <div className="ms-2 me-auto">
                                                <div className="fw-bold">{item.name}</div>
                                                <span>Quantity:{item.quantity}</span>
                                            </div>
                                        </li>
                                    </ol>
                                )}
                                <li>
                                    <Link to="/cart">Go to Cart</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
