import {createGlobalStyle} from 'styled-components';
import {colors} from './stylesVar';

const GlobalStyle = createGlobalStyle`

  :root {
      --color-primary: #5d5fef;
      --color-secondary: #ef5da8;
      --color-light-blue: #3877ee;
      --color-background:  #fff;
      --color-text: #42567a;

      --font-family: "PT Sans", sans-serif;
      --second-family: "Bebas Neue", sans-serif;
  }
  
  *{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
  }
  
  body {
      max-width: 1920px;
      margin: 0 auto; 
/*      width: 100%;*/
      background-color: ${colors.background};
  }
`;

export default GlobalStyle;