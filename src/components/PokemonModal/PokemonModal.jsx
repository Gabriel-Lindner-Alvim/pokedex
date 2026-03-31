import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Ruler, Weight, Zap, Shield, Heart, Wind, Sparkles } from 'lucide-react'
import { usePokemonDetail } from '../../hooks/usePokemon'
import { getTypeColor } from '../../utils/typeColors'
import styles from './PokemonModal.module.css'

const STAT_ICONS = {
  hp:               <Heart size={12} />,
  attack:           <Zap size={12} />,
  defense:          <Shield size={12} />,
  'special-attack':  <Zap size={12} />,
  'special-defense': <Shield size={12} />,
  speed:            <Wind size={12} />,
}

const STAT_LABELS = {
  hp:               'HP',
  attack:           'ATK',
  defense:          'DEF',
  'special-attack':  'SpATK',
  'special-defense': 'SpDEF',
  speed:            'VEL',
}

export default function PokemonModal({ name, onClose }) {
  const { data: pokemon, isLoading } = usePokemonDetail(name)
  const [isShiny, setIsShiny] = useState(false)

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Reseta shiny ao trocar de pokémon
  useEffect(() => {
    setIsShiny(false)
  }, [name])

  const types         = pokemon?.types.map(t => t.type.name) ?? []
  const primary       = types[0]
  const secondary     = types[1]
  const primaryColor  = getTypeColor(primary)
  const secondaryColor = getTypeColor(secondary ?? primary)

  const borderGradient = secondary
    ? `linear-gradient(90deg, ${primaryColor} 50%, ${secondaryColor} 50%)`
    : primaryColor

  // Sprite troca conforme isShiny
  const sprite = isShiny
    ? (pokemon?.sprites.other['official-artwork'].front_shiny
        ?? pokemon?.sprites.front_shiny)
    : (pokemon?.sprites.other['official-artwork'].front_default
        ?? pokemon?.sprites.front_default)

  const formattedId = pokemon ? String(pokemon.id).padStart(3, '0') : '---'

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={styles.modal}
          onClick={e => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.85, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 40 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {isLoading ? (
            <div className={styles.loading}>
              <div className={styles.pokeball} />
            </div>
          ) : pokemon ? (
            <>
              <div className={styles.typeBorder} style={{ background: borderGradient }} />

              {/* Botões no topo direito */}
              <div className={styles.topActions}>
                <button
                  className={`${styles.shinyBtn} ${isShiny ? styles.shinyActive : ''}`}
                  onClick={() => setIsShiny(prev => !prev)}
                  title={isShiny ? 'Ver normal' : 'Ver shiny'}
                >
                  <Sparkles size={13} />
                  <span>{isShiny ? 'SHINY' : 'NORMAL'}</span>
                </button>
                <button className={styles.closeBtn} onClick={onClose}>
                  <X size={16} />
                </button>
              </div>

              <div className={styles.header}>
                <motion.img
                  key={isShiny ? 'shiny' : 'normal'}
                  className={styles.sprite}
                  src={sprite}
                  alt={pokemon.name}
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3, type: 'spring' }}
                />
                <div className={styles.headerInfo}>
                  <span className={styles.number}>#{formattedId}</span>
                  <h2 className={styles.name}>{pokemon.name}</h2>
                  <div className={styles.types}>
                    {types.map(type => (
                      <span key={type} className={`${styles.typeBadge} type-${type}`}>
                        {type}
                      </span>
                    ))}
                  </div>
                  <div className={styles.measurements}>
                    <span className={styles.measure}>
                      <Ruler size={12} /> {pokemon.height * 10} cm
                    </span>
                    <span className={styles.measure}>
                      <Weight size={12} /> {(pokemon.weight / 10).toFixed(1)} kg
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>HABILIDADES</h3>
                <div className={styles.abilities}>
                  {pokemon.abilities.map(({ ability, is_hidden }) => (
                    <span
                      key={ability.name}
                      className={`${styles.ability} ${is_hidden ? styles.abilityHidden : ''}`}
                    >
                      {ability.name}
                      {is_hidden && <em> (oculta)</em>}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>ATRIBUTOS</h3>
                <div className={styles.stats}>
                  {pokemon.stats.map(({ stat, base_stat }) => (
                    <div key={stat.name} className={styles.statRow}>
                      <span className={styles.statIcon}>{STAT_ICONS[stat.name]}</span>
                      <span className={styles.statLabel}>{STAT_LABELS[stat.name] ?? stat.name}</span>
                      <span className={styles.statValue}>{base_stat}</span>
                      <div className={styles.statBar}>
                        <motion.div
                          className={styles.statFill}
                          style={{ background: primaryColor }}
                          initial={{ width: 0 }}
                          animate={{ width: `${(base_stat / 255) * 100}%` }}
                          transition={{ duration: 0.6, delay: 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}