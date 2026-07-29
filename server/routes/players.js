import { Router } from 'express'
import db from '../db.js'

const VALID_POSITIONS = ['GK', 'DEF', 'MID', 'FWD']

const selectPlayers = db.prepare(`
  SELECT id, web_name, first_name, second_name, position, team_name
  FROM players
  WHERE (:position IS NULL OR position = :position)
    AND (:team IS NULL OR team_name = :team)
    AND is_active = 1
`)

const selectPlayerExists = db.prepare('SELECT 1 FROM players WHERE id = ? AND is_active = 1')

const selectPlayerPoints = db.prepare(`
  SELECT COALESCE(SUM(points_awarded), 0) AS total_points
  FROM scoring_events
  WHERE player_id = :playerId
    AND (:fromGameweek IS NULL OR gameweek >= :fromGameweek)
    AND (:toGameweek IS NULL OR gameweek <= :toGameweek)
`)

// LEFT JOIN from players, not scoring_events, so a player with zero events
// still gets a 0 row instead of being silently missing from the response.
// The gameweek range has to live in the ON clause, not a WHERE clause -
// filtering after a LEFT JOIN would drop the very players with no matching
// events that the LEFT JOIN exists to keep.
const selectAllPlayerPoints = db.prepare(`
  SELECT p.id AS player_id, COALESCE(SUM(se.points_awarded), 0) AS total_points
  FROM players p
  LEFT JOIN scoring_events se
    ON se.player_id = p.id
    AND (:fromGameweek IS NULL OR se.gameweek >= :fromGameweek)
    AND (:toGameweek IS NULL OR se.gameweek <= :toGameweek)
  WHERE p.is_active = 1
  GROUP BY p.id
`)

const router = Router()

router.get('/players', (req, res) => {
  const { position, team } = req.query

  if (position !== undefined && !VALID_POSITIONS.includes(position)) {
    return res.status(400).json({ error: `position must be one of ${VALID_POSITIONS.join(', ')}` })
  }

  const players = selectPlayers.all({
    position: position ?? null,
    team: team ?? null
  })
  res.json(players)
})

router.get('/players/points', (req, res) => {
  const { from, to } = req.query
  const fromGameweek = from !== undefined ? Number(from) : null
  const toGameweek = to !== undefined ? Number(to) : null

  if (from !== undefined && !Number.isInteger(fromGameweek)) {
    return res.status(400).json({ error: 'from must be an integer' })
  }

  if (to !== undefined && !Number.isInteger(toGameweek)) {
    return res.status(400).json({ error: 'to must be an integer' })
  }

  const points = selectAllPlayerPoints.all({ fromGameweek, toGameweek })
  res.json(points)
})

router.get('/players/:id/points', (req, res) => {
  const playerId = Number(req.params.id)

  if (!Number.isInteger(playerId) || playerId <= 0) {
    return res.status(400).json({ error: 'id must be a positive integer' })
  }

  if (!selectPlayerExists.get(playerId)) {
    return res.status(404).json({ error: `player ${playerId} not found` })
  }

  const { from, to } = req.query
  const fromGameweek = from !== undefined ? Number(from) : null
  const toGameweek = to !== undefined ? Number(to) : null

  if (from !== undefined && !Number.isInteger(fromGameweek)) {
    return res.status(400).json({ error: 'from must be an integer' })
  }

  if (to !== undefined && !Number.isInteger(toGameweek)) {
    return res.status(400).json({ error: 'to must be an integer' })
  }

  const { total_points } = selectPlayerPoints.get({
    playerId,
    fromGameweek,
    toGameweek
  })

  res.json({ player_id: playerId, from: fromGameweek, to: toGameweek, total_points })
})

export default router
