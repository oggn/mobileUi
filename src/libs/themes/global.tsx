import { ReactNode } from 'react'
import { JengaProvider } from '@/_ui/JengaProvider'
import { Global, css } from '@emotion/react'

//
//
export default function GlobalThemes({ children }: { children?: ReactNode }): JSX.Element {
    return (
        <>
            <Global
                styles={css`
                    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100..900&display=swap');

                    * {
                        box-sizing: border-box;
                        text-decoration: none;
                        list-style: none;
                        margin: 0;
                        padding: 0;
                        font-family: 'Noto Sans KR', sans-serif;
                        user-select: auto;
                        -webkit-touch-callout: none;
                    }

                    html {
                        width: 100%;
                        height: 100%;
                        -webkit-text-size-adjust: 100%;
                    }

                    body {
                        display: block;
                        margin: 0;
                        width: 100%;
                        height: 100%;
                        text-rendering: optimizeLegibility;
                        overflow-x: hidden;
                        overflow-y: auto;
                        -webkit-text-size-adjust: 100%;
                        font-family: 'Noto Sans KR', sans-serif;
                        font-optical-sizing: auto;
                    }

                    @supports (padding: max(0px)) {
                        body {
                            padding-top: env(safe-area-inset-top);
                            padding-bottom: env(safe-area-inset-bottom);
                            padding-left: env(safe-area-inset-left);
                            padding-right: env(safe-area-inset-right);
                        }
                    }

                    @supports (-webkit-touch-callout: none) {
                        html,
                        body #layout {
                            min-height: -webkit-fill-available;
                        }
                    }

                    strong,
                    h1,
                    h2,
                    h3,
                    h4,
                    h5,
                    h6,
                    p {
                        margin: 0;
                        padding: 0;
                        transition: 0.3s ease-in-out;
                    }

                    a {
                        text-decoration: none;
                        color: #444444;
                        cursor: pointer;
                        white-space: nowrap;
                        transition: 0.3s ease-in-out;
                    }

                    ul,
                    li {
                        list-style: none;
                        padding: 0;
                        margin: 0;
                    }

                    button {
                        background-color: transparent;
                        outline: none;
                        border: none;
                        cursor: pointer;
                        font-size: 1rem;
                        width: auto;
                        transition: all 0.3s ease-in-out;
                    }

                    svg,
                    img,
                    picture {
                        transition: all 0.3s ease-in-out;
                    }

                    /* Custom Scrollbar Styles */
                    ::-webkit-scrollbar {
                        width: 8px;
                        height: 6px;
                    }
                    ::-webkit-scrollbar-track {
                        background-color: transparent;
                    }
                    ::-webkit-scrollbar-thumb {
                        background-color: #999;
                        border-radius: 100px;
                    }
                    ::-webkit-scrollbar-thumb:hover {
                        background: #e2e2e2;
                    }

                    /* Input Styles */
                    input,
                    textarea,
                    select {
                        border: none;
                        outline: none;
                        text-decoration: none;
                        background-color: transparent;
                        resize: none;
                    }

                    input[type='checkbox'],
                    input[type='radio'] {
                        cursor: pointer;
                    }

                    select {
                        -webkit-appearance: none;
                        appearance: none;
                        cursor: pointer;
                    }

                    select::-ms-expand {
                        display: none;
                    }

                    input::-webkit-search-decoration,
                    input::-webkit-search-cancel-button,
                    input::-webkit-search-results-button,
                    input::-webkit-search-results-decoration {
                        display: none;
                    }

                    .react-datepicker-wrapper {
                        width: 100%;
                    }
                `}
            />

            <JengaProvider>{children}</JengaProvider>
        </>
    )
}
