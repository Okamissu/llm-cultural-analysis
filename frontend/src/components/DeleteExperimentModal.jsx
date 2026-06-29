import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function DeleteExperimentModal({
  open,
  loading,
  onClose,
  onDelete,
}) {
  const { t } = useTranslation()

  const [password, setPassword] = useState('')

  if (!open) return null

  function handleDelete() {
    onDelete(password)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 className="text-xl font-bold">{t('history.delete')}</h2>

        <p className="mt-2 text-sm text-slate-500">
          {t('history.deleteDescription')}
        </p>

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('history.password')}
          className="mt-6 w-full rounded-lg border px-4 py-3 outline-none focus:border-slate-900"
        />

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border px-4 py-2 hover:bg-slate-100"
          >
            {t('common.cancel')}
          </button>

          <button
            onClick={handleDelete}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? t('common.loading') : t('history.delete')}
          </button>
        </div>
      </div>
    </div>
  )
}
