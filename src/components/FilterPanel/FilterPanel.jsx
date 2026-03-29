import styles from './FilterPanel.module.css'
import { ArrowUp, ArrowDown } from 'lucide-react'

const TYPES = [
  'all', 'fire', 'water', 'grass', 'electric',
  'psychic', 'ice', 'fighting', 'poison',
  'ground', 'flying', 'bug', 'rock',
  'ghost', 'normal', 'dragon', 'steel', 'dark', 'fairy'
]

const SORT_OPTIONS = [
  { value: 'id',   label: 'Número Pokedéx'   },
  { value: 'name', label: 'Nome'   },
  { value: 'hp',   label: 'HP'     },
  { value: 'atk',  label: 'Ataque' },
  { value: 'def',      label: 'Defesa'},
  { value: 'spatk',      label: 'Ataque Especial'},
  { value: 'spdef',      label: 'Defesa Especial'},
  { value: 'spd',      label: 'Velocidade'},
]

export default function FilterPanel({
  selectedType, onTypeChange,
  sortBy, onSortChange,

}) {

  return (
    <div className={styles.panel}>
      <div className={styles.typeScroll}>
        {TYPES.map(type => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`
              ${styles.pill}
              ${type !== 'all' ? `type-${type}` : ''}
              ${selectedType === type ? styles.pillActive : styles.pillInactive}
            `}
          >
            {type === 'all' ? 'Todos' : type}
          </button>
        ))}
      </div>

      <div className={styles.controls}>
        <select
          className={styles.select}
          value={sortBy}
          onChange={e => onSortChange(e.target.value)}
        >
          {SORT_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>
              Ordenar por: {opt.label}
            </option>
          ))}
        </select>


      </div>
    </div>
  )
}