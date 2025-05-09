import {configureStore} from '@reduxjs/toolkit'
import counterReducer from "./feature"
import orderReducer from './orderfeature'
const store = configureStore({
    reducer:{
        counter:counterReducer,
        order:orderReducer,
    }
})

export default store;