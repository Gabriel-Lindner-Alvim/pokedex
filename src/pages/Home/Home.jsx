import { useState, useMemo, useEffect } from 'react'
import { usePokemonList } from '../../hooks/usePokemon'
import { motion, AnimatePresence } from 'framer-motion'
import PokemonCard from '../../components/PokemonCard/PokemonCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import FilterPanel from '../../components/FilterPanel/FilterPanel'
import Pagination from '../../components/Pagination/Pagination'
import styles from './Home.module.css'
import PokemonModal from '../../components/PokemonModal/PokemonModal'

export default function Home() {
  const [searchTerm, setSearchTerm]     = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [sortBy, setSortBy]             = useState('id')
  const [currentPage, setCurrentPage]   = useState(1)
  const [pageSize, setPageSize]         = useState(40)
  const [sortDir, setSortDir] = useState('desc')
  const [selectedPokemon, setSelectedPokemon] = useState(null)

  const { data: pokemons, isLoading, isError } = usePokemonList(1025)

  // Lista filtrada e ordenada (ainda sem paginar)
  const filteredPokemons = useMemo(() => {
    if (!pokemons) return []

    return pokemons
      .filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter(p =>
        selectedType === 'all'
          ? true
          : p.types.some(t => t.type.name === selectedType)
      )
      .sort((a, b) => {
        let result = 0
        if (sortBy === 'id')    return a.id - b.id
        if (sortBy === 'name')  return a.name.localeCompare(b.name)
        if (sortBy === 'hp')    return b.stats[0].base_stat - a.stats[0].base_stat
        if (sortBy === 'atk')   return b.stats[1].base_stat - a.stats[1].base_stat
        if (sortBy === 'def')   return b.stats[2].base_stat - a.stats[2].base_stat
        if (sortBy === 'spatk') return b.stats[3].base_stat - a.stats[3].base_stat
        if (sortBy === 'spdef') return b.stats[4].base_stat - a.stats[4].base_stat
        if (sortBy === 'spd')   return b.stats[5].base_stat - a.stats[5].base_stat
        return sortDir === 'desc' ? -result : result
      })
  }, [pokemons, searchTerm, selectedType, sortBy, sortDir])

  // Volta para página 1 sempre que filtro/busca/pageSize mudar
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedType, sortBy, pageSize])

  // Fatia da página atual
  const totalPages = Math.ceil(filteredPokemons.length / pageSize)
  const start = (currentPage - 1) * pageSize
  const paginatedPokemons = filteredPokemons.slice(start, start + pageSize)

  if (isLoading) return <LoadingScreen />
  if (isError)   return <ErrorScreen />

  return (
    <main className={styles.main}>
      <div className={styles.controls}>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <FilterPanel
          selectedType={selectedType} onTypeChange={setSelectedType}
          sortBy={sortBy}             onSortChange={setSortBy}
          sortDir={sortDir}           onSortDirChange={setSortDir}
        />
      </div>

      <div className={styles.meta}>
        <p className={styles.count}>
          {filteredPokemons.length} pokémon{filteredPokemons.length !== 1 ? 's' : ''} encontrado{filteredPokemons.length !== 1 ? 's' : ''}
        </p>

        {/* Seletor de quantidade por página */}
        <div className={styles.pageSizeWrap}>
          {[40, 120, 360].map(size => (
            <button
              key={size}
              className={`${styles.sizeBtn} ${pageSize === size ? styles.sizeBtnActive : ''}`}
              onClick={() => setPageSize(size)}
            >
              {size}
            </button>
          ))}
          <span className={styles.pageSizeLabel}>por página</span>
        </div>
      </div>

      <motion.div className={styles.grid} layout>
        <AnimatePresence>
          {paginatedPokemons.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} onClick={() => setSelectedPokemon(pokemon.name)} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      {selectedPokemon && (
        <PokemonModal
          name={selectedPokemon}
          onClose={() => setSelectedPokemon(null)}
        />
)}

      {filteredPokemons.length === 0 && (
        <div className={styles.empty}>
          <p className={styles.emptyText}>Nenhum pokémon encontrado</p>
          <p className={styles.emptyHint}>Tente outro nome ou tipo</p>
        </div>
      )}

      {/* Paginação — só aparece se houver mais de uma página */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </main>
  )
}

function LoadingScreen() {
  return (
    <div className={styles.centered}>
      <div className={styles.pokeball} />
      <p className={styles.loadingText}>Carregando pokémons...</p>
    </div>
  )
}

function ErrorScreen() {
  return (
    <div className={styles.centered}>
      <p className={styles.errorText}>Erro ao carregar. Verifique sua conexão.</p>
    </div>
  )
}