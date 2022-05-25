import { Global, css } from '@emotion/react';

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        html,
        body {
          font-family: Roboto, Oxygen, sans-serif;
        }
      `}
    />
  );
}
