import { Search, X } from 'lucide-react'
import styles from './SearchBar.module.css'

export default function SearchBar({ value, onChange }) {
  return (
    <div className={styles.wrapper}>
      <Search size={16} className={styles.icon} />
      <input
        className={styles.input}
        type="text"
        placeholder="Buscar pokémon..."
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {value && (
        <button className={styles.clear} onClick={() => onChange('')}>
          <X size={14} />
        </button>
      )}
    </div>
  )
}