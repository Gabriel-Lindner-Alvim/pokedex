import { ChevronLeft, ChevronRight } from 'lucide-react'
import styles from './Pagination.module.css'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  // Gera array de páginas visíveis com reticências
  const getPages = () => {
    const pages = []

    if (totalPages <= 7) {
      // Poucos pages — mostra todos
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      // Sempre mostra primeira e última
      // No meio mostra currentPage ± 2 e usa '...' para o resto
      pages.push(1)
      if (currentPage > 4) pages.push('...')

      const start = Math.max(2, currentPage - 2)
      const end   = Math.min(totalPages - 1, currentPage + 2)
      for (let i = start; i <= end; i++) pages.push(i)

      if (currentPage < totalPages - 3) pages.push('...')
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <nav className={styles.nav}>
      {/* Botão anterior */}
      <button
        className={styles.arrow}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft size={16} />
      </button>

      {/* Números de página */}
      {getPages().map((page, i) =>
        page === '...'
          ? <span key={`dots-${i}`} className={styles.dots}>...</span>
          : <button
              key={page}
              className={`${styles.page} ${currentPage === page ? styles.pageActive : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
      )}

      {/* Botão próximo */}
      <button
        className={styles.arrow}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  )
}