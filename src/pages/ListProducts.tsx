import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux/es/exports';
import { addCart } from '../actions/cart';
export interface ReqResListado {
    products: Array<Product>;
}

type Product = {
    name: string;
    price: number;
    amount: number;
    id: number;
}

type Input = {
    quantity: number;
}
export const ListProducts = () => {
    const dispatch = useDispatch();
    const [Products, setProducts] = useState<ReqResListado>();
    const [inputs, setInputs] = useState<Array<Input>>();


    const getData = async (nombre: string) => {
        await fetch(nombre + ".json")
            .then(response => {
                return response.json();
            })
            .then(data => {
                localStorage.setItem("Products", JSON.stringify(data))
                setProducts({ ...data })
            })
    }

    const getProductos = () => {
        return JSON.parse(localStorage.getItem('Products') || '{}')
    }

    const addToCart = (id: number, quantity: number, name: string, price: number) => {
        console.log("add_" + id + "quantity: " + quantity);
        dispatch(addCart(
            {
                id: id,
                name: name,
                quantity: quantity,
                price: price,
                total: price * quantity,
            }
        ))
    }

   


    const handleInputChange = (event: React.SyntheticEvent, index: number) => {
        let target = event.target as HTMLInputElement;
        if (inputs) {
            const newData = inputs.map((d, i) => {
                if (index === i) {
                    d = {
                        quantity: Number(target.value)
                    }
                }

                return d;
            });

            setInputs([...newData]);
        };
    }


    useEffect(() => {
        if (localStorage.getItem('Products')) {
            setProducts(getProductos())

        } else {
            getData("products")
        }
    }, [])
    useEffect(() => {
        if (Products) {
            let inputs: Array<Input> = []
            Products.products.map((product) => {
                inputs.push({
                    quantity: 0
                })
            })
            setInputs(inputs)
        }
    }, [Products])
    return (
        <div>
            <div className="card">
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">name</th>
                        <th scope="col">price</th>
                        <th scope="col">amount</th>
                        <th scope="col">quantiy</th>
                        <th scope="col">action</th>
                    </tr>
                </thead>
                <tbody>
                    {Products && Products.products.map((product, index) =>
                        product.amount > 0 && <tr key={"product-" + index}>
                            <th scope="row">{product.id}</th>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.amount}</td>
                            <td>
                                <div className="input-group-sm mb-3">
                                    <input
                                        name={"product-" + product.id}
                                        type="number"
                                        className="form-control w-25"
                                        aria-label="Quantity"
                                        aria-describedby="basic-addon1"
                                        min="0" max={product.amount}
                                        onChange={e => handleInputChange(e, index)}
                                        value={inputs ? inputs[index].quantity : '0'} />
                                </div>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => addToCart(product.id, inputs ? inputs[index].quantity : 1, product.name, product.price)}
                                >
                                    Add to cart
                                </button>
                            </td>
                        </tr>
                    )
                    }

                </tbody>
            </table>
           
        </div>
       
        </div>
        
    )
}
