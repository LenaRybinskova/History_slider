import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {categoriesReducer} from './categoriesReducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';


const rootReducer = combineReducers({
    categories: categoriesReducer,
})


export const store = configureStore({
    reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// @ts-ignore
window.store = store