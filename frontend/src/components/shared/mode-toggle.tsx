import { Moon, Sun } from "lucide-react"

import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { useTheme } from "../providers/theme-provider"
import { useTranslation } from "react-i18next"
import { Separator } from "../ui/separator"

export function ModeToggle() {
  const { setTheme } = useTheme()
  const {t} = useTranslation()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")} className="cursor-pointer">
          {t("light")}
        </DropdownMenuItem>
        <Separator/>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="cursor-pointer">
          {t("dark")}
        </DropdownMenuItem>
        <Separator/>
        <DropdownMenuItem onClick={() => setTheme("system")} className="cursor-pointer">
          {t("system")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
