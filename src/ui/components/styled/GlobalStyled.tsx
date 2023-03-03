import { useEffect, useState } from 'react';
import { createGlobalStyle } from 'styled-components';

interface IGlobalStyle {
    main: string;
    contraryMain: string;
    mainColorA2: string;
    scroll: string;
    scrollHover: string;
}

const GlobalStyle = createGlobalStyle<IGlobalStyle>`
    :root {
      --component_bg: white;
      --shadow: 0 1px 4px rgb(0 0 0 / 12%), 0 1px 6px rgb(0 0 0 / 24%);
      --border_shadow_lg: rgba(0, 0, 0, 0.388);
      --border_shadow_sm: rgba(0, 0, 0, 0.177);

      /*--------------------custome--------------------*/

      ${(themes) => `
            --scroll: ${themes.scroll};
            --scroll_hover: ${themes.scrollHover}; 
            --main_color: ${themes.main};
            --contrary_main_color: ${themes.contraryMain};
            --main_color_a2: ${themes.mainColorA2};      
      `}
      /* --scroll: rgb(8, 125, 202);
      --scroll_hover: rgb(7, 99, 160); */

      /* --main_color: rgb(0, 136, 255);
      --contrary_main_color: rgb(0, 82, 153);
      --main_color_a2: rgba(0, 136, 255, 0.145); */

      /*--------------------default--------------------*/
      --stroke_color: rgb(8, 26, 58);
      --stroke_disabled: #b1b1b191;
      --border_color: #C5C5C5;
    }
`;

const appColors: { [key: string]: IGlobalStyle } = {
    "a": {
        main: "rgb(0, 136, 255)",
        contraryMain: "rgb(0, 82, 153)",
        mainColorA2: "rgba(0, 136, 255, 0.145)",
        scroll: "rgb(8, 125, 202)",
        scrollHover: "rgb(7, 99, 160)"
    },
    "b": {
        main: "rgb(19, 155, 30)",
        contraryMain: "rgb(15, 119, 24)",
        mainColorA2: "rgba(19, 155, 30, 0.145)",
        scroll: "rgb(17, 140, 28)",
        scrollHover: "rgb(16, 125, 25)"
    },
}

const DynamicGlobalStyle = () => {

    const [colors, setColors] = useState<IGlobalStyle>(appColors.a)

    useEffect(() => {
        const timer = setTimeout(() => {
            setColors(appColors.b)
            console.log('"aaaaaaaaaaaaaaaaa"', "aaaaaaaaaaaaaaaaa")
        }, 1000);
        return () => clearTimeout(timer);
      }, []);

    return (<GlobalStyle {...colors} />)
}

export default DynamicGlobalStyle;

