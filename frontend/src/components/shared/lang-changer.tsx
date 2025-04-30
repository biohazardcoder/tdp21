import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";

export const LangChanger = () => {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language || "en");

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
    setLang(value);
  };

  useEffect(() => {
    setLang(i18n.language);
  }, [i18n.language]);

  return (
    <Select  onValueChange={handleChange} value={lang} >
      <SelectTrigger className="w-[120px]" >
        <SelectValue placeholder={"Language"} />
      </SelectTrigger>
      <SelectContent className="px-2">
        <div className="flex items-center">
          <img src="/en.svg" alt="logo"  className="w-5 h-3"/>
          <SelectItem  className="cursor-pointer" value="en">English</SelectItem>
        </div>
        <Separator/>
        <div className="flex items-center">
          <img src="/ru.svg" alt="logo"  className="w-5 h-3"/>
          <SelectItem  className="cursor-pointer" value="ru">Russian</SelectItem>
        </div>     
        <Separator/>
        <div className="flex items-center">
          <img src="/uz.png" alt="logo"  className="w-5 h-3"/>
          <SelectItem  className="cursor-pointer" value="uz">Uzbek</SelectItem>
        </div>        
         </SelectContent>
    </Select>
  );
};
