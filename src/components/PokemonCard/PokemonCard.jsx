
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion'
import { getTypeColor } from '../../utils/typeColors'
import styles from './PokemonCard.module.css'

export default function PokemonCard({ pokemon, onClick }) {

  const types = pokemon.types.map(t => t.type.name)
  const primaryColor   = getTypeColor(types[0])
  const secondaryColor = getTypeColor(types[1] ?? types[0]) // fallback pro mesmo se single-type

  const formattedId = String(pokemon.id).padStart(3, '0')
  const sprite = pokemon.sprites.other['official-artwork'].front_default
    ?? pokemon.sprites.front_default

  // Gradiente: se dual-type, metade/metade. Se single, cor sólida.
  const borderGradient = types[1]
    ? `linear-gradient(90deg, ${primaryColor} 50%, ${secondaryColor} 50%)`
    : primaryColor

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
      {/* Barra superior dual-type */}
      <div className={styles.typeBorder} style={{ background: borderGradient }} />

      <span className={styles.number}>#{formattedId}</span>
      <img
        className={styles.sprite}
        src={sprite}
        alt={pokemon.name}
        loading="lazy"
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