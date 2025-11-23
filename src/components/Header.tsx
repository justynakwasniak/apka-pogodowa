import React from "react";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="d-flex justify-content-between align-items-center p-3 border-bottom">
      <h1 className="mb-0">Weather App</h1>
      <div>
        <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => changeLanguage('pl')} aria-label="Zmień język na polski">PL</button>
        <button className="btn btn-outline-secondary btn-sm" onClick={() => changeLanguage('en')} aria-label="Change language to English">EN</button>
      </div>
    </header>
  );
};

export default Header;
