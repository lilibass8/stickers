export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-200">
            فيلورا
          </p>
          <p className="mb-4">عبّر عن نفسك. التصق بالأسلوب.</p>
          <p className="text-sm">© {new Date().getFullYear()} فيلورا. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}
