import { useTranslation } from 'react-i18next';

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);

    };

    return (
        <div style={{ display: 'inline-block', margin: '0 10px' }}>
            <button onClick={() => changeLanguage('en')} disabled={i18n.resolvedLanguage === 'en'}>EN</button>
            <button onClick={() => changeLanguage('he')} disabled={i18n.resolvedLanguage === 'he'}>HE</button>
        </div>
    );
};
