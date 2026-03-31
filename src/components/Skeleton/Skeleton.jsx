import styles from './Skeleton.module.css'

// Bloco base reutilizável com shimmer
export function SkeletonBlock({ width = '100%', height = '16px', radius = '4px', style = {} }) {
  return (
    <div
      className={styles.block}
      style={{ width, height, borderRadius: radius, ...style }}
    />
  )
}

// Skeleton do SearchBar
function SkeletonSearchBar() {
  return (
    <div className={styles.searchBar}>
      <SkeletonBlock height="40px" radius="4px" />
    </div>
  )
}

// Skeleton do FilterPanel — pills + select
function SkeletonFilterPanel() {
  return (
    <div className={styles.filterPanel}>
      <div className={styles.pills}>
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonBlock
            key={i}
            width={`${52 + (i % 3) * 14}px`}
            height="28px"
            radius="999px"
          />
        ))}
      </div>
      <SkeletonBlock width="180px" height="36px" radius="4px" />
    </div>
  )
}

// Skeleton de um card individual
function SkeletonCard() {
  return (
    <div className={styles.card} style={{ position: 'relative' }}>
      {/* barra de tipo no topo */}
      <SkeletonBlock height="4px" radius="0" />

      {/* shiny toggle — canto superior direito, fora do fluxo */}
      <div style={{ position: 'absolute', top: '10px', right: '8px' }}>
        <SkeletonBlock width="22px" height="22px" radius="4px" />
      </div>

      <div className={styles.cardInner}>
        {/* número */}
        <SkeletonBlock width="40px" height="10px" radius="3px" style={{ margin: '0 auto 10px' }} />
        {/* sprite */}
        <SkeletonBlock width="110px" height="110px" radius="50%" style={{ margin: '0 auto 12px' }} />
        {/* nome */}
        <SkeletonBlock width="80%" height="10px" radius="3px" style={{ margin: '0 auto 10px' }} />
        {/* badges de tipo */}
        <div className={styles.typeBadges}>
          <SkeletonBlock width="56px" height="18px" radius="3px" />
          <SkeletonBlock width="56px" height="18px" radius="3px" />
        </div>
        {/* barra de hp */}
        <SkeletonBlock height="3px" radius="999px" style={{ marginTop: '10px' }} />
      </div>
    </div>
  )
}

// Skeleton completo da página — SearchBar + FilterPanel + Grid
export default function PageSkeleton({ cardCount = 50 }) {
  return (
    <div className={styles.page}>
      <SkeletonSearchBar />
      <SkeletonFilterPanel />

      {/* Meta row — contador + size buttons */}
      <div className={styles.meta}>
        <SkeletonBlock width="160px" height="12px" radius="3px" />
        <div className={styles.sizeBtns}>
          <SkeletonBlock width="36px" height="28px" radius="4px" />
          <SkeletonBlock width="36px" height="28px" radius="4px" />
          <SkeletonBlock width="36px" height="28px" radius="4px" />
        </div>
      </div>

      {/* Grid de cards fantasma */}
      <div className={styles.grid}>
        {Array.from({ length: cardCount }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  )
}