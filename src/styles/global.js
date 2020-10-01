import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400;700&display=swap');

    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body {
        background-color: #d6e0f0;
        -webkit-font-smoothing: antialiased;
    }

    body, input, button {
        font: 14px Montserrat, sans-serif;
    }

    #root {
        max-width: 90vw;
        margin: 0 auto;
        padding: 0 20px 50px;
    }

    button {
        cursor: pointer;
    }
`
