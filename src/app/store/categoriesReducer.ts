import {CategoryMockData, CategoryType, EventsMockData} from '../../mockData/mockData';
import {Dispatch} from 'react';

const FETCH_CATEGORIES = 'FETCH_CATEGORIES_SUCCESS'

export type EventAPIType = {
    id: string,
    year: string,
    description: string,
    categoryId: string
}

export const initialState = {
    categories: [] as CategoryType[],
    eventsByIdCategories: {} as { [key: string]: EventAPIType }
};


type InitialStateType = typeof initialState;

export const categoriesReducer = (state: InitialStateType = initialState, action: CategoriesActions) => {
    switch (action.type) {
        case FETCH_CATEGORIES: {
            const categories = action.payload;
            return {
                ...state,
                categories: action.payload,
                eventsByIdCategories: {
                    ...state.eventsByIdCategories,
                    ...categories.reduce((acc, category) => {
                        acc[category.id] = [];
                        return acc;
                    }, {} as { [key: string]: any })
                }
            };
        }
        default:
            return state;
    }
}

export const fetchCategoriesAC = (categories: CategoryType[]) => {
    return {
        type: FETCH_CATEGORIES,
        payload:categories
    } as const
}

export type FetchCategories = ReturnType<typeof fetchCategoriesAC>

type CategoriesActions = | FetchCategories


export const fetchAllCategoriesTC = () => async (dispatch: Dispatch<CategoriesActions>) => {
    try {
        const categories = CategoryMockData;
        dispatch(fetchCategoriesAC(categories));
    } catch (error) {
    }
};

export const fetchCategoryTC = (idCategory:string) => async (dispatch: Dispatch<CategoriesActions>) => {
    try {
        if (idCategory in EventsMockData.categories) {

            const events = EventsMockData.categories[idCategory as keyof typeof EventsMockData.categories];
            dispatch(fetchCategoriesAC(events));
        }
    } catch (error) {
    }
};