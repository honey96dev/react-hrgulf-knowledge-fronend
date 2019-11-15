import i18n from "i18next";
import Backend from "i18next-xhr-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import {initReactI18next} from "react-i18next";

import en from "./i18n/en";
import ar from "./i18n/ar";

const fallbackLng = ["en"];
const availableLanguages = ["en", "ar"];

i18n
  // .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng,
    debug: true,
    whitelist: availableLanguages,

    resources: {
      en: {
        translation: en
      },
      ar: {
        translation: ar
      },
    },

    interpolation: {
      escapeValue: false
    },
  });

// i18n.changeLanguage("ar");

export default i18n;