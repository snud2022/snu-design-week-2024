import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`


@tailwind base;
@tailwind components;
@tailwind utilities;
@import url('https://use.typekit.net/drm0xbi.css');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    width: 100%;
    height: 100%; 
}

a {
  color: inherit;
  text-decoration: none;
}


*,*::after, *::before {
    box-sizing: border-box;
  }

  @font-face {
  
  font-family: 'Noto Sans KR', sans-serif;
  unicode-range: U+AC00-D7A3;

}
@font-face {
  
  font-family: articulat-cf, sans-serif ;
         unicode-range: U+AC00-D7A3;
         unicode-range: U+26;

}


* {
  box-sizing: border-box;
  font-weight: 400;
  font-style: normal;
  font-family: articulat-cf,  'Noto Sans KR';
}


.articulat {
  font-family: articulat-cf, sans-serif !important;

}

@media (prefers-color-scheme: dark) {
  html {
    color-scheme: dark;
  }
  body {
    color: white;
    background: black;
  }
}

.cut-topright {
  clip-path: polygon(0 0, 88% 0, 100% 100%, 0 100%);
}

.align-center-top {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}

.align-center-left {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
}


.mytext-1 {
  font-size: 0.9rem;
  line-height: 1.5rem;
  letter-spacing: -0.2px;
}
.mytext-2 {
  font-size: 0.95rem;
  line-height: 1.5rem;
  letter-spacing: -0.2px;
}


`;

export default GlobalStyle;