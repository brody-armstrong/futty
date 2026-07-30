import { positionIcons } from './icons'

export const POSITION_STYLES = {
  GK: { bg: 'bg-card-yellow', text: 'text-ink' },
  DEF: { bg: 'bg-pitch', text: 'text-chalk' },
  MID: { bg: 'bg-floodlight', text: 'text-ink' },
  FWD: { bg: 'bg-card-red', text: 'text-chalk' },
}

const PositionBadge = ({ position, className = '' }) => {
  const style = POSITION_STYLES[position] || { bg: 'bg-ink-muted', text: 'text-chalk' }
  const Icon = positionIcons[position]
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold ${style.bg} ${style.text} ${className}`}>
      {Icon && <Icon size={13} />}
      {position}
    </span>
  )
}

export default PositionBadge
