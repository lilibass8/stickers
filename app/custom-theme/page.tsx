'use client'

import { useState } from 'react'

const themes = [
    { id: 'floral', name: 'ورود وزهور', emoji: '🌸', desc: 'تصاميم أنثوية ناعمة بألوان الوردي والبنفسجي' },
    { id: 'galaxy', name: 'كوني / غالاكسي', emoji: '🌌', desc: 'ألوان الكون من بنفسجي وأزرق داكن مع نجوم لامعة' },
    { id: 'pastel', name: 'باستيل ناعم', emoji: '🎨', desc: 'ألوان هادئة ومريحة للعين بأسلوب عصري' },
    { id: 'retro', name: 'ريترو / قديم', emoji: '📻', desc: 'تصاميم كلاسيكية بألوان دافئة وأسلوب عتيق' },
    { id: 'minimalist', name: 'بسيط / مينيمال', emoji: '⬜', desc: 'تصاميم نظيفة وأنيقة بخطوط بسيطة' },
    { id: 'custom', name: 'ثيم خاص بي', emoji: '💡', desc: 'صِف الثيم الذي تحلم به وسنصممه لك' },
]

export default function CustomThemePage() {
    const [selectedTheme, setSelectedTheme] = useState('')
    const [form, setForm] = useState({ name: '', phone: '', colors: '', notes: '' })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const themeName = themes.find(t => t.id === selectedTheme)?.name || selectedTheme
        const msg = encodeURIComponent(
            `🎨 طلب ثيم مخصص 🎨\n\nالاسم: ${form.name}\nالهاتف: ${form.phone}\nالثيم المختار: ${themeName}\nالألوان المفضلة: ${form.colors}\nملاحظات إضافية: ${form.notes}`
        )
        window.open(`https://wa.me/96893588845?text=${msg}`, '_blank')
        setSubmitted(true)
    }

    return (
        <div className="fade-in min-h-screen">
            {/* Hero */}
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-500 via-velora-primary to-velora-accent py-16 px-4">
                <div className="absolute inset-0">
                    <div className="absolute left-0 top-0 h-48 w-48 rounded-full bg-pink-400/20 blur-3xl animate-pulse" />
                    <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-purple-400/20 blur-3xl animate-pulse" />
                </div>
                <div className="relative mx-auto max-w-3xl text-center">
                    <div className="mb-4 text-6xl">🎨</div>
                    <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-2xl md:text-5xl">
                        ثيم مخصص
                    </h1>
                    <p className="text-lg font-medium text-white/90 drop-shadow-lg">
                        اختر الثيم الذي يعبّر عن شخصيتك وسنصنع لك ستيكرات من عالمك
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-3xl px-4 py-12">
                {submitted ? (
                    <div className="rounded-2xl bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700 p-10 text-center shadow-lg">
                        <div className="mb-3 text-5xl">🎉</div>
                        <h2 className="mb-2 text-2xl font-bold text-purple-700 dark:text-purple-300">تم إرسال طلبك!</h2>
                        <p className="text-gray-600 dark:text-gray-300">سيتواصل معك فريقنا الإبداعي خلال <span className="font-bold text-purple-600">24 ساعة</span></p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Theme Selection */}
                        <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl">
                            <h2 className="mb-5 text-lg font-bold text-gray-800 dark:text-gray-100">اختر الثيم الأقرب لك</h2>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {themes.map((theme) => (
                                    <button
                                        key={theme.id}
                                        type="button"
                                        onClick={() => setSelectedTheme(theme.id)}
                                        className={`rounded-xl border-2 p-4 text-right transition-all ${selectedTheme === theme.id
                                                ? 'border-velora-primary bg-velora-primary/10 shadow-md'
                                                : 'border-gray-100 dark:border-gray-700 hover:border-velora-primary/40'
                                            }`}
                                    >
                                        <div className="mb-1 text-2xl">{theme.emoji}</div>
                                        <div className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{theme.name}</div>
                                        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 leading-snug">{theme.desc}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="rounded-2xl bg-white dark:bg-gray-800 p-6 shadow-xl space-y-4">
                            <h2 className="mb-2 text-lg font-bold text-gray-800 dark:text-gray-100">أكمل بياناتك</h2>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">الاسم *</label>
                                    <input
                                        required
                                        value={form.name}
                                        onChange={e => setForm({ ...form, name: e.target.value })}
                                        placeholder="اسمك"
                                        className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-800 dark:text-gray-100 focus:border-velora-primary focus:outline-none focus:ring-2 focus:ring-velora-primary/20"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">رقم الواتساب *</label>
                                    <input
                                        required
                                        value={form.phone}
                                        onChange={e => setForm({ ...form, phone: e.target.value })}
                                        placeholder="968XXXXXXXX"
                                        className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-800 dark:text-gray-100 focus:border-velora-primary focus:outline-none focus:ring-2 focus:ring-velora-primary/20"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">الألوان المفضلة</label>
                                <input
                                    value={form.colors}
                                    onChange={e => setForm({ ...form, colors: e.target.value })}
                                    placeholder="مثال: وردي، بنفسجي، ذهبي..."
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-800 dark:text-gray-100 focus:border-velora-primary focus:outline-none focus:ring-2 focus:ring-velora-primary/20"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">ملاحظات إضافية</label>
                                <textarea
                                    value={form.notes}
                                    onChange={e => setForm({ ...form, notes: e.target.value })}
                                    rows={3}
                                    placeholder="أي تفاصيل إضافية تريد إضافتها..."
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-800 dark:text-gray-100 focus:border-velora-primary focus:outline-none focus:ring-2 focus:ring-velora-primary/20 resize-none"
                                />
                            </div>

                            {/* Delivery Estimate */}
                            <div className="rounded-xl bg-purple-50 dark:bg-purple-900/20 p-4 flex items-start gap-3">
                                <span className="text-2xl">⏱️</span>
                                <div>
                                    <p className="font-semibold text-purple-700 dark:text-purple-300 text-sm">الوقت المتوقع للتسليم</p>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                                        التصاميم ذات الثيم المخصص تأخذ من <strong>5 إلى 10 أيام عمل</strong>
                                    </p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-xl bg-gradient-to-r from-purple-500 to-velora-primary py-3.5 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                            >
                                🎨 إرسال طلب الثيم عبر واتساب
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
