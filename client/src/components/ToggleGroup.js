import React from "react";
import { useTranslation } from "react-i18next";
import { MdWbSunny } from "react-icons/md";
import { AiOutlineSun } from "react-icons/ai";
import { useTheme } from "./ThemeProvider";
import { motion } from "framer-motion";

function ToggleGroup() {
    const langs = [
        { code: "en", name: "EN" },
        { code: "vi", name: "VI" },
    ];
    const { setTheme, theme } = useTheme();
    const { t, i18n } = useTranslation();

    const handleThemeToggle = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
    };

    return (
        <div className="fixed z-50 flex flex-col items-center p-4 transform -translate-y-1/2 border rounded-md left-10 top-1/2 bg-slate-50 dark:bg-neutral-900 dark:text-slate-300 dark:border-neutral-600">
            <div
                onClick={handleThemeToggle}
                className="!h-[60px] w-16 relative justify-center border-b  dark:border-neutral-800 outline-none p-2  shadow-lg cursor-pointer flex items-center"
            >
                {/* Main Icon */}
                <motion.div
                    key={`icon-${theme}`} // Thêm prefix để key unique
                    initial={{ scale: 1, rotate: 0 }}
                    animate={{
                        scale: [1, 1.5, 1],
                        rotate: [0, 360],
                    }}
                    transition={{ duration: 0.6 }}
                >
                    {theme === "light" ? (
                        <MdWbSunny
                            size={40}
                            className="text-yellow-500 dark:text-yellow-500"
                        />
                    ) : (
                        <AiOutlineSun
                            size={40}
                            className="text-yellow-500 dark:text-yellow-500"
                        />
                    )}
                </motion.div>

                {/* Background Effect */}
                <motion.div
                    key={`bg-${theme}`} // Key riêng cho background
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{
                        scale: [0, 100, 0], // Thay đổi scale giới hạn
                        opacity: [1, 0], // Thêm fade out
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: 0, // Không lặp lại animation
                    }}
                    className="w-[40px] absolute z-[-1] h-[40px] rounded-full dark:bg-slate-300/50 bg-neutral-800/50"
                />
            </div>

            <select
                value={i18n.language}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
                className="!h-[40px] w-16 outline-none rounded-md p-2 hidden md:block bg-transparent shadow-lg text-sm cursor-pointer dark:border-neutral-600"
            >
                {langs.map((lang) => (
                    <option
                        key={lang.code}
                        value={lang.code}
                        className="dark:bg-neutral-900 dark:text-slate-300"
                    >
                        {lang.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default ToggleGroup;
