import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { cartReducer } from '../reducers/cartReducer'

const composeEnhancers = (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;

const reducers = combineReducers({
    cart: cartReducer,
})

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware( thunk )
    )
    )

export type RootState = ReturnType<typeof store.getState>; // Here we export the store's state