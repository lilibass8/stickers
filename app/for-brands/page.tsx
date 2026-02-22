'use client'

import { useState } from 'react'

const packages = [
    {
        id: 'starter',
        name: 'الباقة الأساسية',
        emoji: '🚀',
        price: 'تبدأ من 15 ر.ع',
        features: ['50 ستيكر مخصص', 'تصميم احترافي', 'شعار العلامة التجارية', 'تسليم خلال 7 أيام'],
        color: 'from-blue-500 to-velora-primary',
    },
    {
        id: 'business',
        name: 'باقة الأعمال',
        emoji: '💼',
        price: 'تبدأ من 30 ر.ع',
        features: ['200 ستيكر مخصص', '3 تصاميم مختلفة', 'هوية بصرية كاملة', 'تسليم خلال 5 أيام', 'تعديلات غير محدودة'],
        color: 'from-velora-primary to-velora-secondary',
        popular: true,
    },
    {
        id: 'enterprise',
        name: 'باقة المؤسسات',
        emoji: '🏢',
        price: 'سعر خاص',
        features: ['500+ ستيكر', 'تصاميم غير محدودة', 'مدير حساب مخصص', 'تسليم أولوي', 'دعم مستمر'],
        color: 'from-velora-accent to-orange-500',
    },
]

export default function ForBrandsPage() {
    const [selectedPackage, setSelectedPackage] = useState('')
    const [form, setForm] = useState({ brandName: '', contact: '', phone: '', requirements: '' })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const pkgName = packages.find(p => p.id === selectedPackage)?.name || 'غير محدد'
        const msg = encodeURIComponent(
            `🏢 طلب خدمة للشركات/العلامات التجارية\n\nاسم العلامة التجارية: ${form.brandName}\nاسم التواصل: ${form.contact}\nرقم الهاتف: ${form.phone}\nالباقة المطلوبة: ${pkgName}\nالمتطلبات: ${form.requirements}`
        )
        window.open(`https://wa.me/96893588845?text=${msg}`, '_blank')
        setSubmitted(true)
    }

    return (
        <div className="fade-in min-h-screen">
            {/* Hero */}
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-velora-primary to-velora-secondary py-20 px-4">
                <div className="absolute inset-0">
                    <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-velora-primary/20 blur-3xl animate-pulse" />
                    <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-velora-accent/20 blur-3xl animate-pulse" />
                </div>
                <div className="relative mx-auto max-w-3xl text-center">
                    <div className="mb-4 text-6xl">🏢</div>
                    <h1 className="mb-4 text-4xl font-bold text-white drop-shadow-2xl md:text-5xl lg:text-6xl">
                        For Brands
                    </h1>
                    <p className="text-lg font-medium text-white/90 drop-shadow-lg md:text-xl">
                        حلول ستيكرات احترافية لعلامتك التجارية — نبني هويتك البصرية معك
                    </p>
                </div>
            </div>

            {/* Why Us */}
            <div className="bg-gray-50 dark:bg-gray-900 py-12 px-4">
                <div className="mx-auto max-w-4xl">
                    <h2 className="mb-8 text-center text-2xl font-bold text-gray-800 dark:text-gray-100">لماذا تختار فيلورا لعلامتك؟</h2>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {[
                            { emoji: '🎯', title: 'دقة عالية', desc: 'تصاميم تعكس هويتك بدقة' },
                            { emoji: '⚡', title: 'تسليم سريع', desc: 'لا نأخر على مواعيدك' },
                            { emoji: '✨', title: 'جودة فاخرة', desc: 'مواد ممتازة ودائمة' },
                            { emoji: '💬', title: 'دعم مستمر', desc: 'معك في كل خطوة' },
                        ].map(item => (
                            <div key={item.title} className="rounded-xl bg-white dark:bg-gray-800 p-5 text-center shadow-md">
                                <div className="mb-2 text-3xl">{item.emoji}</div>
                                <div className="font-bold text-gray-800 dark:text-gray-100 text-sm">{item.title}</div>
                                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">{item.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Packages */}
            <div className="py-12 px-4">
                <div className="mx-auto max-w-4xl">
                    <h2 className="mb-8 text-center text-2xl font-bold text-gray-800 dark:text-gray-100">باقاتنا للشركات</h2>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                        {packages.map(pkg => (
                            <div
                                key={pkg.id}
                                onClick={() => setSelectedPackage(pkg.id)}
                                className={`relative cursor-pointer rounded-2xl border-2 p-6 transition-all ${selectedPackage === pkg.id
                                        ? 'border-velora-primary shadow-xl scale-105'
                                        : 'border-gray-100 dark:border-gray-700 hover:border-velora-primary/50'
                                    } bg-white dark:bg-gray-800`}
                            >
                                {pkg.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-velora-primary to-velora-secondary px-4 py-1 text-xs font-bold text-white">
                                        الأكثر طلباً ⭐
                                    </div>
                                )}
                                <div className={`mb-3 inline-flex rounded-xl bg-gradient-to-r ${pkg.color} p-3 text-2xl`}>
                                    {pkg.emoji}
                                </div>
                                <h3 className="mb-1 text-lg font-bold text-gray-800 dark:text-gray-100">{pkg.name}</h3>
                                <p className="mb-4 text-sm font-semibold text-velora-primary">{pkg.price}</p>
                                <ul className="space-y-2">
                                    {pkg.features.map(f => (
                                        <li key={f} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                            <span className="text-green-500">✓</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact Form */}
            <div className="mx-auto max-w-2xl px-4 pb-14">
                {submitted ? (
                    <div className="rounded-2xl bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 p-10 text-center shadow-lg">
                        <div className="mb-3 text-5xl">🎉</div>
                        <h2 className="mb-2 text-2xl font-bold text-green-700 dark:text-green-300">تم استلام طلبك!</h2>
                        <p className="text-gray-600 dark:text-gray-300">سيتواصل معك فريق المبيعات خلال <span className="font-bold text-green-600">24 ساعة</span></p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-xl">
                        <h2 className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-100 text-center">تواصل معنا</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">اسم العلامة التجارية *</label>
                                <input
                                    required
                                    value={form.brandName}
                                    onChange={e => setForm({ ...form, brandName: e.target.value })}
                                    placeholder="اسم شركتك"
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-800 dark:text-gray-100 focus:border-velora-primary focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">اسم المسؤول *</label>
                                <input
                                    required
                                    value={form.contact}
                                    onChange={e => setForm({ ...form, contact: e.target.value })}
                                    placeholder="اسمك الكريم"
                                    className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-800 dark:text-gray-100 focus:border-velora-primary focus:outline-none"
                                />
                            </div>
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

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">متطلباتك</label>
                            <textarea
                                value={form.requirements}
                                onChange={e => setForm({ ...form, requirements: e.target.value })}
                                rows={3}
                                placeholder="أخبرنا أكثر عن متطلباتك..."
                                className="w-full rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3 text-gray-800 dark:text-gray-100 focus:border-velora-primary focus:outline-none resize-none"
                            />
                        </div>

                        {/* Delivery Estimate */}
                        <div className="rounded-xl bg-blue-50 dark:bg-blue-900/20 p-4 flex items-start gap-3">
                            <span className="text-2xl">⏱️</span>
                            <div>
                                <p className="font-semibold text-blue-700 dark:text-blue-300 text-sm">الوقت المتوقع للتسليم</p>
                                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                                    طلبات الشركات تُنجز خلال <strong>5 إلى 14 يوم عمل</strong> حسب الكمية والتصميم
                                </p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-gradient-to-r from-gray-800 to-velora-primary py-3.5 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl"
                        >
                            🏢 التواصل عبر واتساب
                        </button>
                    </form>
                )}
            </div>
        </div>
    )
}
