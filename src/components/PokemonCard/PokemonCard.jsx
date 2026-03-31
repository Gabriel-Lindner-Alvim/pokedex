import { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { getTypeColor } from '../../utils/typeColors'
import styles from './PokemonCard.module.css'

export default function PokemonCard({ pokemon, onClick }) {
  const [isShiny, setIsShiny] = useState(false)

  const types          = pokemon.types.map(t => t.type.name)
  const primaryColor   = getTypeColor(types[0])
  const secondaryColor = getTypeColor(types[1] ?? types[0])

  const formattedId = String(pokemon.id).padStart(3, '0')

  // Troca entre artwork normal e shiny
  const sprite = isShiny
    ? (pokemon.sprites.other['official-artwork'].front_shiny
        ?? pokemon.sprites.front_shiny)
    : (pokemon.sprites.other['official-artwork'].front_default
        ?? pokemon.sprites.front_default)

  const borderGradient = types[1]
    ? `linear-gradient(90deg, ${primaryColor} 50%, ${secondaryColor} 50%)`
    : primaryColor

  const toggleShiny = (e) => {
    e.stopPropagation() // impede abrir o modal
    setIsShiny(prev => !prev)
  }

  return (
    <motion.div
      className={styles.card}
      style={{ '--type-color': primaryColor }}
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.typeBorder} style={{ background: borderGradient }} />

      {/* Botão shiny — canto superior direito */}
      <button
        className={`${styles.shinyBtn} ${isShiny ? styles.shinyActive : ''}`}
        onClick={toggleShiny}
        title={isShiny ? 'Ver normal' : 'Ver shiny'}
      >
        <Sparkles size={10} />
      </button>

      <span className={styles.number}>#{formattedId}</span>

      <motion.img
        key={isShiny ? 'shiny' : 'normal'} // key diferente força re-animação
        className={styles.sprite}
        src={sprite}
        alt={pokemon.name}
        loading="lazy"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
      />

      <h3 className={styles.name}>{pokemon.name}</h3>

      <div className={styles.types}>
        {pokemon.types.map(({ type }) => (
          <span key={type.name} className={`${styles.typeBadge} type-${type.name}`}>
            {type.name}
          </span>
        ))}
      </div>

      <div className={styles.hpBar}>
        <div
          className={styles.hpFill}
          style={{ width: `${(pokemon.stats[0].base_stat / 255) * 100}%` }}
        />
      </div>
    </motion.div>
  )
}