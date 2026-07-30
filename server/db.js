import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Database from 'better-sqlite3'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = process.env.DB_PATH || path.join(__dirname, '..', 'db', 'futty.sqlite3')
const MIGRATION_PATH = path.join(__dirname, '..', 'db', 'migrations', '0001_create_players_stats_scoring.sql')
const PLAYERS_JSON_PATH = path.join(__dirname, '..', 'public', 'players.json')

const POSITION_MAP = {
  Goalkeeper: 'GK',
  Defender: 'DEF',
  Midfielder: 'MID',
  Forward: 'FWD'
}

const isNewDb = !fs.existsSync(DB_PATH)
const db = new Database(DB_PATH)
db.pragma('foreign_keys = ON')

if (isNewDb) {
  console.log('No existing DB found — running migration + seed')
  db.exec(fs.readFileSync(MIGRATION_PATH, 'utf8'))
  seedPlayers()
} else {
  console.log('Existing DB found at', DB_PATH, '— skipping migration')
}

function seedPlayers() {
  const rawPlayers = JSON.parse(fs.readFileSync(PLAYERS_JSON_PATH, 'utf8'))

  const insert = db.prepare(`
    INSERT INTO players (source_player_id, player_code, first_name, second_name, web_name, position, team_name)
    VALUES (@source_player_id, @player_code, @first_name, @second_name, @web_name, @position, @team_name)
  `)

  const insertAll = db.transaction((players) => {
    for (const player of players) insert.run(player)
  })

  insertAll(rawPlayers.map((player) => ({
    source_player_id: player.player_id,
    player_code: player.player_code,
    first_name: player.first_name,
    second_name: player.second_name,
    web_name: player.web_name,
    position: POSITION_MAP[player.position] || 'MID',
    team_name: player.team_name
  })))
}

export default db
