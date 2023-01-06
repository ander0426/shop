import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { RootState } from "../store/store";
import { useDispatch } from 'react-redux/es/exports';
import { clearCart } from '../actions/cart';
import { useNavigate } from "react-router-dom";
import { Item, Product, ReqResListado } from '../interfaces/products';


export const Cart = () => {
    let navigate = useNavigate();
    const [total, setTotal] = useState<number>()
    const [inventory, setInventory] = useState<ReqResListado>()
    const dispatch = useDispatch()
    const { cart }: any = useSelector((state: RootState) => state.cart)


    const CalculateTotal = (items: any) => {
        let total = 0
        const itemsCart = items.map((product: Item) => {
            total = product.total + total
        })
        return total;
    }
    useEffect(() => {
        setInventory(JSON.parse(localStorage.getItem('Products') || '{}'))
    }, [])

    useEffect(() => {
        setTotal(CalculateTotal(cart))
    }, [cart])

    const handleClearCart = () => {
        dispatch(clearCart())
    }

    const buyCart = () => {
        if (inventory) {
            const items = inventory.products.map((product: Product) => {
                cart.map((productCart: Item) => {
                    if (product.id === productCart.id) {
                        product.amount = product.amount - productCart.quantity;
                    }
                })
                return product;
            })

            localStorage.setItem("Products", JSON.stringify({products: items}))
            dispatch(clearCart())
            navigate("/");
        }


    }


    return (
        <div>
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">name</th>
                        <th scope="col">price</th>
                        <th scope="col">quantity</th>
                        <th scope="col">total</th>
                    </tr>
                </thead>
                <tbody>
                    {cart && cart.map((product: Item, index: number) =>
                        <tr key={"product-" + index}>
                            <th scope="row">{product.id}</th>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{product.total}</td>
                        </tr>
                    )
                    }

                </tbody>
            </table>
            <h3>Total: {total}</h3>
            <button
                type="button"
                className="btn btn-success"
                onClick={buyCart}
            >
                Buy
            </button>
            <button
                type="button"
                className="btn btn-warning text-white ms-2"
                onClick={() => handleClearCart()}
            >
                Clear your cart
            </button>
        </div>
    )
}
