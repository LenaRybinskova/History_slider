import {CategoryMockData, CategoryType, EventsMockData} from 'mockData/mockData';
import {Dispatch} from 'react';

const FETCH_CATEGORIES = 'FETCH_CATEGORIES_SUCCESS'
const FETCH_CATEGORY_BY_ID = 'FETCH_CATEGORY_BY_ID'

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
        case FETCH_CATEGORY_BY_ID: {

            return {
                ...state,
                eventsByIdCategories: {
                    ...state.eventsByIdCategories,
                    [action.payload.idCategory]: action.payload.events
                }
            };
        }
        default:
            return state;
    }
}


//AC
export const fetchAllCategoriesAC = (categories: CategoryType[]) => {
    return {
        type: FETCH_CATEGORIES,
        payload: categories
    } as const
}

export const fetchEventByCategoryIdAC = (idCategory: string, events: EventAPIType[]) => {
    return {
        type: FETCH_CATEGORY_BY_ID,
        payload: {
            idCategory,
            events
        }
    } as const
}


export type FetchCategories = ReturnType<typeof fetchAllCategoriesAC>
export type FetchEventByCategoryId = ReturnType<typeof fetchEventByCategoryIdAC>

type CategoriesActions = FetchEventByCategoryId | FetchCategories

//TC
export const fetchAllCategoriesTC = () => async (dispatch: Dispatch<CategoriesActions>) => {
    try {
        const categories = CategoryMockData;
        dispatch(fetchAllCategoriesAC(categories));
    } catch (error) {
    }
};

export const fetchEventByCategoryIdTC = (idCategory: string) => async (dispatch: Dispatch<CategoriesActions>) => {
    try {
        const events = EventsMockData.categories[idCategory as keyof typeof EventsMockData.categories];
        console.log('fetchEventByCategoryIdTC', events)
        dispatch(fetchEventByCategoryIdAC(idCategory, events));
    } catch (error) {
    }
};
