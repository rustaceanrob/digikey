import { useState, useEffect } from "react";
import Language from "../interfaces/lang";
import en from "../interfaces/languages/en";
import { useLocales } from "expo-localization";
import es from "../interfaces/languages/es";

export default function useLang(): Language {
    const [lang, setlang] = useState<Language>(en)
    const locales = useLocales()

    useEffect(() => {
        let localLang = locales[0].languageCode
        if (localLang === "es") { setlang(es) }
    }, [])
    return lang
}