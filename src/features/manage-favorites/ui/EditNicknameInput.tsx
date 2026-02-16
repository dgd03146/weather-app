import { useState, useRef, useEffect } from 'react'

const MAX_NICKNAME_LENGTH = 20

interface EditNicknameInputProps {
  value: string
  onSave: (name: string) => void
  onCancel: () => void
}

export function EditNicknameInput({ value, onSave, onCancel }: EditNicknameInputProps) {
  const [draft, setDraft] = useState(value)
  const inputRef = useRef<HTMLInputElement>(null)
  const submittedRef = useRef(false)

  useEffect(() => {
    inputRef.current?.select()
  }, [])

  function handleSubmit() {
    if (submittedRef.current) return
    submittedRef.current = true
    const trimmed = draft.trim()
    if (trimmed) onSave(trimmed)
    else onCancel()
  }

  return (
    <input
      ref={inputRef}
      type="text"
      name="nickname"
      aria-label="닉네임 편집"
      value={draft}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={handleSubmit}
      onKeyDown={(e) => {
        e.stopPropagation()
        if (e.key === 'Enter') handleSubmit()
        if (e.key === 'Escape') onCancel()
      }}
      onClick={(e) => e.preventDefault()}
      className="w-full rounded-lg bg-white/10 px-2 py-1 text-center text-sm text-white outline-none ring-1 ring-violet-500/50 focus:ring-violet-500"
      maxLength={MAX_NICKNAME_LENGTH}
    />
  )
}
