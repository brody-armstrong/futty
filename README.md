# Futty - Fantasy Soccer Web Application

A modern, responsive fantasy soccer web application built with React and JavaScript. Experience the thrill of managing your own fantasy soccer team with draft-style gameplay, comprehensive player statistics, and competitive leagues.

##  Features

### Core Game Mechanics
- **Team Formation**: 9 starters + 5 bench players
- **Draft System**: Snake draft with timezone management
- **Scoring System**: Comprehensive point calculation for all positions
- **League Management**: Create and join leagues with customizable settings

### User Experience
- **Responsive Design**: Mobile-first approach with beautiful UI
- **Real-time Updates**: Live scores and statistics
- **Player Search**: Advanced filtering and search capabilities
- **Team Management**: Drag-and-drop lineup setting

### Technical Features
- **Modern Stack**: React 18, Vite, Tailwind CSS
- **State Management**: Context API for global state
- **Routing**: React Router for seamless navigation
- **Icons**: Lucide React for consistent iconography

##  Architecture

### Tab Navigation Structure
```
┌─────────────────────────────────────────────────────────┐
│                    App Content                          │
├─────────┬─────────┬─────────┬─────────┬─────────────────┤
│  Home   │ Player  │  Teams  │ Leagues │ Account         │
│         │ Search  │         │         │                 │
└─────────┴─────────┴─────────┴─────────┴─────────────────┘
```

### Scoring System
**Goalkeepers:**
- Goals: +6, Assists: +3, Clean Sheet: +4, Save: +1, Penalty Save: +5
- Yellow Card: -1, Red Card: -3, Own Goal: -2

**Defenders:**
- Goals: +6, Assists: +3, Clean Sheet: +4, Tackle: +0.5, Interception: +0.5
- Yellow Card: -1, Red Card: -3, Own Goal: -2

**Midfielders:**
- Goals: +5, Assists: +3, Key Pass: +0.5, Tackle: +0.5, Interception: +0.5
- Yellow Card: -1, Red Card: -3, Own Goal: -2

**Attackers:**
- Goals: +4, Assists: +3, Shot on Target: +0.5, Key Pass: +0.5
- Yellow Card: -1, Red Card: -3, Own Goal: -2

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository:
```bash
git clone <repository-url>
cd futty-fantasy-soccer
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production
```bash
npm run build
```

## 🔌 Backend API (dev)

A local Express + SQLite API backs real player data. It's a separate process from
the Vite dev server and needs to be started independently.

```bash
npm run server          # starts the API on http://localhost:3001
npm run seed:stats [N]  # generates N matchdays of player_stats (default 10)
npm run score:calculate [gameweek]  # derives scoring_events from player_stats
                                     # (all gameweeks if omitted)
```

The SQLite file (`db/futty.sqlite3`) and its migration live under `db/`. On first
run, `npm run server` creates the DB, applies `db/migrations/0001_...sql`, and
seeds `players` from `public/players.json` automatically - `seed:stats` and
`score:calculate` are separate steps because raw stats and derived points are
different concerns (see `db/migrations/0001_...sql` for the full schema
rationale).

`src/contexts/PlayerContext.jsx` fetches player identities from this API (see
`VITE_API_URL` in `.env`, defaults to `http://localhost:3001`) and falls back to
hardcoded mock data if the API isn't running.

**Endpoints so far:**

- `GET /api/players?position=&team=` - player identities, both filters optional
  (omit both for the full list).
- `GET /api/players/:id/points?from=&to=` - a player's total fantasy points
  (`SUM` of `scoring_events.points_awarded`), optionally scoped to a gameweek
  range. Returns `total_points: 0` (never `null`) for a player with no scoring
  events yet, or a range that excludes all of them.

**Not built yet:** a team/league-points endpoint. `LeagueContext.jsx`'s
`leagues`/`userTeams` are still mock-only React state with no backing tables -
see the schema-design discussion in this repo's history for what's needed
(`teams`, a roster/lineup join, and a gameweek dimension on lineups) before
that endpoint can exist.

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Navigation.jsx  # Bottom navigation bar
├── contexts/           # React Context providers
│   ├── AuthContext.jsx # User authentication state
│   ├── LeagueContext.jsx # League and team management
│   └── PlayerContext.jsx # Player data and statistics
├── pages/              # Main application pages
│   ├── Home.jsx        # Dashboard and news feed
│   ├── PlayerSearch.jsx # Player search and filtering
│   ├── Teams.jsx       # Team management and lineup
│   ├── Leagues.jsx     # League management and standings
│   └── Account.jsx     # User profile and settings
├── App.jsx             # Main application component
├── main.jsx            # Application entry point
└── index.css           # Global styles and Tailwind CSS
```

## Key Features by Page

### Home Tab
- Dashboard with current matchday scores
- Personalized news feed
- Quick actions for team management
- Upcoming fixtures display

### Player Search Tab
- Advanced search and filtering
- Player cards with detailed statistics
- Position-based color coding
- Form and availability indicators

### Teams Tab
- Team overview and statistics
- Starting lineup management (9 players)
- Bench management (5 players)
- Formation visualization
- Performance tracking

### Leagues Tab
- League creation and joining
- Draft management with "Enter Draft" button
- Current matchday view
- League standings and statistics

### Account Tab
- User profile management
- Achievement system
- Notification preferences
- Privacy and app settings

## Development

### Adding New Features
1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Update context providers as needed
4. Add routing in `App.jsx`

### Styling
- Uses Tailwind CSS for styling
- Custom CSS classes defined in `src/index.css`
- Responsive design with mobile-first approach

### State Management
- Uses React Context API for global state
- Separate contexts for different domains (Auth, League, Player)
- Local state for component-specific data

## Why I Built This

I'm a massive football (soccer) fan, but I also enjoy playing NFL fantasy football with friends every year. Fantasy Premier League is the dominant soccer fantasy format, but works nothing like it. With soccer's popularity in the US growing fast off the back of the World Cup, I saw an opening: bring the NFL-style fantasy format — drafted rosters, position-weighted scoring — to soccer, instead of sticking to FPL's traditional points system. Futty Fantasy is my attempt at that, built on a data model that separates raw stats from scoring logic so the rules can keep evolving as I refine the format.

## Future Enhancements

### Phase 2 Features
- Real-time data integration
- WebSocket connections for live updates
- Advanced draft system with timers
- Trade system between users

### Phase 3 Features
- Multi-league support
- Advanced analytics and statistics
- Push notifications
- Social features (chat, comments)

### Phase 4 Features
- Top 5 European leagues integration
- Premium features and monetization
- Mobile app development
- API for third-party integrations

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Premier League for inspiration
- React and Vite communities
- Tailwind CSS for the beautiful styling system
- Lucide React for the icon library

---

**Futty** - Where fantasy meets football! ⚽ 
