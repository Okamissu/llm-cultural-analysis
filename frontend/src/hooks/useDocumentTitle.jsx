import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function useDocumentTitle(titleKey) {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.title = t(titleKey)
  }, [titleKey, t, i18n.language])
}
