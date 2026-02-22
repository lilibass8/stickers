'use client'

import { useState, useRef, useCallback } from 'react'

type UploadStatus = 'idle' | 'uploading' | 'done' | 'sent'

export default function UploadMyDesignPage() {
    const [files, setFiles] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>([])
    const [dragOver, setDragOver] = useState(false)
    const [status, setStatus] = useState<UploadStatus>('idle')
    const [form, setForm] = useState({ name: '', phone: '', notes: '', quantity: '', size: '' })
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Calculate estimated delivery
    const getDeliveryDays = () => {
        const qty = parseInt(form.quantity) || 0
        if (qty <= 50) return '3–5 أيام عمل'
        if (qty <= 200) return '5–7 أيام عمل'
        return '7–14 يوم عمل'
    }

    const handleFiles = (newFiles: FileList | null) => {
        if (!newFiles) return
        const arr = Array.from(newFiles).filter(f => f.type.startsWith('image/'))
        if (arr.length === 0) return
        setFiles(prev => [...prev, ...arr])
        arr.forEach(file => {
            const reader = new FileReader()
            reader.onload = (e) => {
                setPreviews(prev => [...prev, e.target?.result as string])
            }
            reader.readAsDataURL(file)
        })
    }

    const removeFile = (idx: number) => {
        setFiles(prev => prev.filter((_, i) => i !== idx))
        setPreviews(prev => prev.filter((_, i) => i !== idx))
    }

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setDragOver(false)
        handleFiles(e.dataTransfer.files)
    }, [])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (files.length === 0) return
        setStatus('uploading')

        // Simulate upload then send WhatsApp message
        setTimeout(() => {
            setStatus('done')
            const delivery = getDeliveryDays()
            const msg = encodeURIComponent(
                `📸 طلب ستيكر من صور العميل\n\nالاسم: ${form.name}\nالهاتف: ${form.phone}\nعدد الصور: ${files.length} صورة\nالكمية: ${form.quantity || 'غير محددة'}\nالمقاس: ${form.size || 'غير محدد'}\nملاحظات: ${form.notes || 'لا يوجد'}\n\n⏱️ الوقت المتوقع للتسليم: ${delivery}\n\n✅ يرجى إرفاق الصور في هذه المحادثة`
            )
            window.open(`https://wa.me/96893588845?text=${msg}`, '_blank')
            setStatus('sent')
        }, 1500)
    }

    return (
        <div className="fade-in min-h-screen">
            {/* Hero */}
            <div className="relative overflow-hidden bg-gradient-to-br from-teal-500 via-velora-primary to-velora-secondary py-16 px-4">
                <div className="absolute inset-0">
                    <div className="absolute left-0 top-0 h-48 w-48 rounded-full bg-teal-400/20 blur-3xl animate-pulse" />
                    <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-velora-secondary/20 blur-3xl animate-pulse" />
                </div>
                <div className="relative mx-auto max-w-3xl text-center">
                    <div className="mb-4 text-6xl">📸</div>
                    <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-2xl md:text-5xl">
                        حمّل صورك
                    </h1>
                    <p className="text-lg font-medium text-white/90 drop-shadow-lg">
                        ارفع صورك وسنحولها إلى ستيكرات مميزة — تستلم التصميم قبل الطباعة!
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-2xl px-4 py-12">
                {status === 'sent' ? (
                    <div className="space-y-6">
                        <div className="rounded-2xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 p-10 text-center shadow-lg">
                            <div className="mb-3 text-5xl">🎉</div>
                            <h2 className="mb-2 text-2xl font-bold text-green-700 dark:text-green-300">تم إرسال طلبك!</h2>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                يرجى إرفاق الصور في محادثة الواتساب التي فتحت للتو
                            </p>

                            {/* Delivery Info */}
                            <div className="rounded-xl bg-white dark:bg-gray-800 border border-green-100 dark:border-green-800 p-5">
                                <div className="flex items-center justify-center gap-3 mb-3">
                                    <span className="text-3xl">⏱️</span>
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">تفاصيل طلبك</h3>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">الوقت المتوقع للتسليم:</span>
                                        <span className="font-bold text-velora-primary">{getDeliveryDays()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">مراجعة التصميم:</span>
                                        <span className="font-bold text-gray-800 dark:text-gray-100">قبل الطباعة بـ 24 ساعة</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500 dark:text-gray-400">التعديلات:</span>
                                        <span className="font-bold text-gray-800 dark:text-gray-100">مجانية حتى رضاك</span>
                                    </div>
                                </div>
                            </div>

                            {/* Steps */}
                            <div className="mt-4 flex justify-center gap-6 text-xs text-gray-500 dark:text-gray-400">
                                {['ترسل الصور', 'نصمم لك', 'تراجع وتوافق', 'نطبع ونسلم'].map((step, i) => (
                                    <div key={step} className="text-center">
                                        <div className="mx-auto mb-1 h-7 w-7 rounded-full bg-velora-primary/10 flex items-center justify-center font-bold text-velora-primary">
                                            {i + 1}
                                        </div>
                                        {step}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Upload Zone */}
                        <div
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all ${dragOver
                                    ? 'border-velora-primary bg-velora-primary/10 scale-[1.01]'
                                    : 'border-gray-200 dark:border-gray-600 hover:border-velora-primary/60 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                                }`}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={e => handleFiles(e.target.files)}
                            />
                            <div className="mb-3 text-5xl">📁</div>
                            <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                                اسحب صورك هنا أو اضغط للاختيار
                            </p>
                            <p className="mt-1 text-sm text-gray-400">يدعم: JPG, PNG, WEBP — يمكنك رفع أكثر من صورة</p>
                        </div>

                        {/* Previews */}
                        {previews.length > 0 && (
                            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                                {previews.map((src, i) => (
                                    <div key={i} className="group relative rounded-xl overflow-hidden shadow-md aspect-square">
                                        <img src={src} alt="" className="h-full w-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={(e) => { e.stopPropagation(); removeFile(i) }}
                                            className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex items-center justify-center rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-600 aspect-square text-gray-400 hover:border-velora-primary hover:text-velora-primary transition-colors"
                                >
                                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            </div>
                        )}

                        {/* Form */}
                        <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl space-y-4">
                            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">بياناتك</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">الاسم *</label>
                                    <input
                                        required
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        placeholder="اسمك"
                                        className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-800 dark:text-gray-100 focus:border-velora-primary focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">رقم الواتساب *</label>
                                    <input
                                        required
                                        value={form.phone}
                                        onChange={e => setForm({ ...form, phone: e.target.value })}
                                        placeholder="968XXXXXXXX"
                                        className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-800 dark:text-gray-100 focus:border-velora-primary focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">الكمية</label>
                                    <input
                                        value={form.quantity}
                                        onChange={e => setForm({ ...form, quantity: e.target.value })}
                                        placeholder="مثال: 100"
                                        type="number"
                                        min="1"
                                        className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-800 dark:text-gray-100 focus:border-velora-primary focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">المقاس</label>
                                    <select
                                        value={form.size}
                                        onChange={e => setForm({ ...form, size: e.target.value })}
                                        className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-800 dark:text-gray-100 focus:border-velora-primary focus:outline-none"
                                    >
                                        <option value="">اختر المقاس</option>
                                        <option>صغير 3×3 بوصة</option>
                                        <option>متوسط 5×5 بوصة</option>
                                        <option>كبير 6×4 بوصة</option>
                                        <option>مقاس مخصص</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">ملاحظات إضافية</label>
                                <textarea
                                    value={form.notes}
                                    onChange={e => setForm({ ...form, notes: e.target.value })}
                                    rows={3}
                                    placeholder="أي تفاصيل خاصة بالتصميم..."
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-800 dark:text-gray-100 focus:border-velora-primary focus:outline-none resize-none"
                                />
                            </div>

                            {/* Live Delivery Estimate */}
                            {form.quantity && (
                                <div className="rounded-xl bg-teal-50 dark:bg-teal-900/20 p-4 flex items-start gap-3">
                                    <span className="text-2xl">⏱️</span>
                                    <div>
                                        <p className="font-semibold text-teal-700 dark:text-teal-300 text-sm">الوقت المتوقع للتسليم</p>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                                            بناءً على كميتك ({form.quantity} قطعة):{' '}
                                            <strong className="text-teal-700 dark:text-teal-300">{getDeliveryDays()}</strong>
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">ستتلقى التصميم للمراجعة قبل الطباعة</p>
                                    </div>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={files.length === 0 || status === 'uploading'}
                                className="w-full rounded-xl bg-gradient-to-r from-teal-500 to-velora-primary py-3.5 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'uploading' ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                        </svg>
                                        جاري الإرسال...
                                    </span>
                                ) : (
                                    `📸 إرسال ${files.length > 0 ? `(${files.length} صورة)` : 'الطلب'} عبر واتساب`
                                )}
                            </button>

                            {files.length === 0 && (
                                <p className="text-center text-sm text-red-400">⚠️ يرجى رفع صورة واحدة على الأقل</p>
                            )}
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
