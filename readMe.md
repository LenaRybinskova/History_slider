
# History_slider
https://lenarybinskova.github.io/History_slider/

## Запустить проект:

   ```
   npm install
   ```

   ```
   npm run dev
   ```

### Использовались библиотеки:

Согласно тестового задания:

- React
- Styled-components
- Swiper
- Gsap

- React - Redux (добавила для организации хранения мок данных)
- Webpack сборщик


### Комментарии к проекту:

Со старта Приложения ( при мониторвании App) идет загрузка мок данных и их сохранение в Сторе.
сначала получаем такие данные:

   ```
   export const CategoryMockData = [
    {id: '1111111', description: 'Литература'},
    {id: '2222222', description: 'Кино'},
    {id: '3333333', description: 'Театр'},
    {id: '4444444', description: 'Наука'},
    {id: '5555555', description: 'Искусство'},
    {id: '6666666', description: 'Музыка'}]
    
    export type CategoryType = {
    id: string,
    description: string,
}

   ```

В Стор они сохраняются в таком формате:

  ```
  export type EventAPIType = {
    id: string,
    year: string,
    description: string,
    categoryId: string
}

export const initialState = {
    categories: [] as CategoryType[],                            // [{id: '2222222', description: 'Кино'}, ..]
    eventsByIdCategories: {} as { [key: string]: EventAPIType }  // "3333333":[{},{}..]
 
};
  ```

Все дочерние компоненты App мемоизированны (кроме TimePeriod), чтобы избежать ререндеров из-за частого изм лок стейта с датами периода.

