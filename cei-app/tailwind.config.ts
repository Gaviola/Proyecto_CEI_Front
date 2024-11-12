import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(avatar|button|dropdown|dropdown-menu|dropdown-trigger|button|ripple|spinner|menu|divider|popover|modal|table|pagination|input|date-input|checkbox|chip|select|select-item|card).js"
  ],
  theme: {
    extend: {
      screens: {
        xl: "1281px",
        md: "769px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primaryGreen: {
          100: "#B6E17F",
          500: "#84BC3C"
        },
        background: {
          100: "#FEF7FF",
          200: "#E2D7ED"
        }
      }
    },
  },
  plugins: [nextui({
    themes:{
      light: {
        colors: {
          primary:"#84BC3C"
        }
      },
      dark: {
        colors: {
          primary:"#84BC3C",
        }
      }
    }
  })],
};
export default config;
