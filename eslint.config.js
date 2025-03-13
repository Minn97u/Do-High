import babelParser from "@babel/eslint-parser";
import js from "@eslint/js";
import react from "eslint-plugin-react";

export default [
  js.configs.recommended, // 기본적인 JS 규칙
  {
    plugins: {
      react,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: babelParser, // JSX 지원을 위한 Babel 파서 사용
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"], // JSX 변환을 위해 React 프리셋 추가
        },
      },
      globals: {
        window: "readonly",
        document: "readonly",
        localStorage: "readonly",
        console: "readonly",
        process: "readonly",
        module: "readonly",
        alert: "readonly",
        setTimeout: "readonly",
        clearTimeout: "readonly",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // React 17+에서는 필요 없음
      "no-console": "off", // console 사용 가능하도록 변경
      "no-unused-vars": "warn", // 사용되지 않는 변수는 경고만 표시 (오류 아님)
      "no-undef": "warn", // 정의되지 않은 변수 경고만 표시
      "import/order": "off", // import 순서 규칙 비활성화 (필요하면 다시 활성화 가능)
      "no-useless-catch": "off", // 불필요한 try/catch 경고 제거
    },
  },
];
