со старта компоненты мы получаем массив с названиеям ии ИД категорий и формируем заготовку для стора с ключами, дальеш
подтягивается 3 категория. Дальше категории подтягиваются и стаются в стор уже по клику по Поинту на кольце или
кнопками=стрелками.

# History_slider

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

Сделана версия десктоп и адаптив(320px).

### Комментарии к проекту:

Со старта Приложения ( при мониторвании app) идет загрузка мок данных и их сохранение в Сторе.
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

