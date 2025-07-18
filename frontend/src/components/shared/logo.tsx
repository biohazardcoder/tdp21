import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

export const Logo = () => {
    const {t} = useTranslation()
  return (
    <Link to={"/"} className="flex items-center gap-1">
        {/* <img src="/logo.jpg" className="w-6 h-6" alt="logo" /> */}
        <h1 className="font-semibold">{t("title")}</h1>
    </Link>
  )
}
