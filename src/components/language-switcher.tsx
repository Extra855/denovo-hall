"use client";

import {useLocale} from 'next-intl';
import {Link} from '@/i18n/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const otherLocale = locale === 'en' ? 'ar' : 'en';

  return (
    <Link
      href="/"
      locale={otherLocale}
      className="text-xs tracking-widest uppercase transition-colors duration-300 px-3 py-1.5 border border-current/20 rounded-sm hover:bg-current/10"
    >
      {locale === 'en' ? 'العربية' : 'English'}
    </Link>
  );
}
