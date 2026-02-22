'use client'

import { useState } from 'react'

export default function SpecialOrdersPage() {
    const [form, setForm] = useState({
        name: '',
        phone: '',
        description: '',
        quantity: '',
        size: '',
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const msg = encodeURIComponent(
            `🌟 طلب خاص جديد 🌟\n\nالاسم: ${form.name}\nالهاتف: ${form.phone}\nالوصف: ${form.description}\nالكمية: ${form.quantity}\nالمقاس: ${form.size}`
        )
        window.open(`https://wa.me/96893588845?text=${msg}`, '_blank')
        setSubmitted(true)
    }

    return (
        <div className="fade-in min-h-screen">
            {/* Hero */}
            <div className="relative overflow-hidden bg-gradient-to-br from-velora-primary via-velora-secondary to-velora-accent py-16 px-4">
                <div className="absolute inset-0">
                    <div className="absolute left-0 top-0 h-48 w-48 rounded-full bg-velora-teal/20 blur-3xl animate-pulse" />
                    <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-velora-orange/20 blur-3xl animate-pulse" />
                </div>
                <div className="relative mx-auto max-w-3xl text-center">
                    <div className="mb-4 text-6xl">✨</div>
                    <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-2xl md:text-5xl">
                        طلبات خاصة
                    </h1>
                    <p className="text-lg font-medium text-white/90 drop-shadow-lg">
                        هل تريد تصميماً مميزاً بأفكارك الخاصة؟ نحن هنا لتحقيق رؤيتك!
                    </p>
                </div>
            </div>

            {/* Form */}
            <div className="mx-auto max-w-2xl px-4 py-14">
                {submitted ? (
                    <div className="rounded-2xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 p-10 text-center shadow-lg">
                        <div className="mb-3 text-5xl">🎉</div>
                        <h2 className="mb-2 text-2xl font-bold text-green-700 dark:text-green-300">تم إرسال طلبك!</h2>
                        <p className="text-gray-600 dark:text-gray-300">سنتواصل معك قريباً عبر واتساب. الوقت المتوقع للرد: <span className="font-bold text-velora-primary">24 ساعة</span></p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-xl">
                        <h2 className="mb-6 text-xl font-bold text-gray-800 dark:text-gray-100 text-center">أخبرنا عن طلبك</h2>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">الاسم الكريم *</label>
                            <input
                                required
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="اسمك الكريم"
                                className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-800 dark:text-gray-100 focus:border-velora-primary focus:outline-none focus:ring-2 focus:ring-velora-primary/20"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">رقم الواتساب *</label>
                            <input
                                required
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="968XXXXXXXX"
                                className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-800 dark:text-gray-100 focus:border-velora-primary focus:outline-none focus:ring-2 focus:ring-velora-primary/20"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">وصف الطلب *</label>
                            <textarea
                                required
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={4}
                                placeholder="اشرح لنا ما تريد بالتفصيل..."
                                className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-800 dark:text-gray-100 focus:border-velora-primary focus:outline-none focus:ring-2 focus:ring-velora-primary/20 resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">الكمية</label>
                                <input
                                    name="quantity"
                                    value={form.quantity}
                                    onChange={handleChange}
                                    placeholder="مثال: 50 ستيكر"
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-800 dark:text-gray-100 focus:border-velora-primary focus:outline-none focus:ring-2 focus:ring-velora-primary/20"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">المقاس المطلوب</label>
                                <select
                                    name="size"
                                    value={form.size}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-800 dark:text-gray-100 focus:border-velora-primary focus:outline-none focus:ring-2 focus:ring-velora-primary/20"
                                >
                                    <option value="">اختر المقاس</option>
                                    <option value="صغير 3×3">صغير 3×3 بوصة</option>
                                    <option value="متوسط 5×5">متوسط 5×5 بوصة</option>
                                    <option value="كبير 6×4">كبير 6×4 بوصة</option>
                                    <option value="مخصص">مقاس مخصص</option>
                                </select>
                            </div>
                        </div>

                        {/* Delivery Estimate */}
                        <div className="rounded-xl bg-velora-primary/10 dark:bg-velora-primary/20 p-4 flex items-start gap-3">
                            <span className="text-2xl">⏱️</span>
                            <div>
                                <p className="font-semibold text-velora-primary dark:text-velora-secondary text-sm">الوقت المتوقع للتسليم</p>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                                    عادةً من <strong>3 إلى 7 أيام عمل</strong> بعد تأكيد الطلب والتصميم النهائي
                                </p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-gradient-to-r from-velora-primary to-velora-secondary py-3.5 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
                        >
                            📩 إرسال الطلب عبر واتساب
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}
