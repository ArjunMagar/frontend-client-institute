import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Status } from "../global/types";
import { AppDispatch } from "../store";
import API from "@/lib/http";
import { ICart, ICartItem, ICartState } from "./cartSlice.types";

const initialState: ICartState = {
    items: [],
    status: Status.Loading
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setStatus(state: ICartState, action: PayloadAction<Status>) {
            state.status = action.payload
        },
        resetStatus(state: ICartState) {
            state.status = Status.Loading
        },
        setItems(state: ICartState, action: PayloadAction<ICartItem[]>) {
            state.items = action.payload
        },
        addItem(state: ICartState, action: PayloadAction<ICartItem>) {
            state.items.push(action.payload)
        },
        removeItem(state: ICartState, action: PayloadAction<string>) {
            const index = state.items.findIndex((item) => item.cartId === action.payload)
            if (index !== -1) {
                state.items.splice(index, 1)
            }
        },
        removeItems(state: ICartState) {
            state.items = []
        }
    }
})

export const { setStatus, resetStatus, setItems, addItem, removeItem, removeItems } = cartSlice.actions
export default cartSlice.reducer

export function fetchCarts(token: string) {
    return async function fetchCartsThunk(dispatch: AppDispatch) {
        try {
            const response = await API.get('/student/cart', {
                headers: {
                    Authorization: `${token}`
                }
            })
            if (response.status === 200) {
                dispatch(setStatus(Status.Success))
                dispatch(setItems(response.data.data))
                dispatch(resetStatus())
            } else {
                dispatch(setStatus(Status.Error))
            }
            console.log(response, "Check data...")
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.Error))
        }

    }
}
export function addCart(token: string, data: ICart) {
    return async function addCartThunk(dispatch: AppDispatch) {
        try {
            const response = await API.post('/student/cart', data, {
                headers: {
                    Authorization: `${token}`
                },
            })
            if (response.status === 201) {
                dispatch(setStatus(Status.Success))
                dispatch(addItem(response.data.data[0]))
            } else {
                dispatch(setStatus(Status.Error))
            }
            console.log(response.data.data[0], "arjun kumar pun")
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.Error))
        }
    }
}
export function deleteCart(token: string, id: string) {
    return async function deleteCartThunk(dispatch: AppDispatch) {
        try {
            const response = await API.delete('/student/cart/' + id, {
                headers: {
                    Authorization: `${token}`,
                },
            })
            if (response.status === 200) {
                dispatch(setStatus(Status.Success))
                dispatch(removeItem(id))
            } else {
                dispatch(setStatus(Status.Error))
            }
            console.log(response, "data........")
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.Error))
        }
    }
}

export function deleteCarts(token: string) {
    return async function deleteCartsThunk(dispatch: AppDispatch) {
        try {
            const response = await API.delete('/student/cart/', {
                headers: {
                    Authorization: `${token}`,
                },
            })
            if (response.status === 200) {
                dispatch(setStatus(Status.Success))
                dispatch(removeItems())
                dispatch(resetStatus())
            } else {
                dispatch(setStatus(Status.Error))
            }
            console.log(response, "data........")
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.Error))
        }
    }
}
