import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <select
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      value={i18n.language}
    >
      <option value="en">English</option>
<<<<<<< HEAD
      <option value="vi">Vietnamese</option>
=======
      <option value="vi">Tiếng Việt</option>
>>>>>>> 3fd30cc8a5683af940d62d4b1b41ce5ccd11fc34
    </select>
  );
};

export default LanguageSwitcher;
