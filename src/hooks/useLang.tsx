import { useState, useEffect } from "react";
import Language from "../interfaces/lang";
import en from "../interfaces/languages/en";
import { getLocales } from "expo-localization";
import es from "../interfaces/languages/es";

export default function useLang(): Language {
    const [lang, setlang] = useState<Language>(en)

    useEffect(() => {
        let localLang = getLocales()[0].languageCode
        if (localLang === "es") { setlang(es) }
    }, [])
    return lang
}