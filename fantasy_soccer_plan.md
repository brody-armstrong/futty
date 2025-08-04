# Fantasy Soccer App Development Plan

## Project Overview
**App Name**: [Futty]  
**Platform**: iOS (Swift/SwiftUI) Can start with web based application
**Target**: Fantasy soccer app with draft-style gameplay, multi-league support, and integrated news/fixtures

## Core Features & Architecture

### 1. User Authentication & Account Management
- **Sign Up/Login**: Email, Apple ID, Google OAuth
- **User Profile**: Avatar, favorite teams, statistics
- **Settings**: Notifications, privacy, app preferences
- **Account Management**: Password reset, data export/deletion

### 2. Data Layer & Backend Requirements
- **Data Sources**: 
  - Web scraping Premier League website for statistics
  - Historical data for player projections and rankings
  - Real-time match data (Phase 2 implementation)
  - News feeds and player updates
- **Season Structure**: August-May timeline
- **Multiple Fixtures**: Handle teams playing multiple times per matchweek
- **Database Schema**:
  - Users, Teams, Leagues, Players, Matches, Statistics
  - Draft history, transactions, scoring history
  - Matchweek management with flexible fixture handling
- **Future Expansion**: Top 5 European leagues (England, Spain, Italy, Germany, France)
- **Backend Services**: User management, league management, scoring engine

### 3. Core Game Mechanics

#### Team Formation (14 Players Total)
**Starting XI (9 Players):**
- 1 Goalkeeper
- 3 Defenders  
- 3 Midfielders
- 2 Attackers

**Bench (5 Players):**
- Any position combination
- Automatic substitution for injured/suspended players
- Manual lineup changes between matchdays

#### Draft System
- Snake draft format (similar to NFL fantasy)
- Draft order randomization
- Pick timer implementation
- Auto-draft backup system
- **Timezone Management**: Draft time set by league creator's timezone
- **Draft Interface**: Accessible through "Enter Draft" button in Leagues tab

#### Scoring System (Enhanced)
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

### 4. UI/UX Architecture

#### Tab Navigation Structure
```
┌─────────────────────────────────────────────────────────┐
│                    App Content                          │
├─────────┬─────────┬─────────┬─────────┬─────────────────┤
│  Home   │ Player  │  Teams  │ Leagues │ Account         │
│         │ Search  │         │         │                 │
└─────────┴─────────┴─────────┴─────────┴─────────────────┘
```

#### Home Tab
- **Dashboard**: Current matchday scores, team performance
- **News Feed**: Personalized based on owned players and favorite teams
- **Quick Actions**: Set lineup, check waiver wire, view standings
- **Team Switcher**: Toggle between multiple teams if in multiple leagues

#### Player Search Tab
- **Search & Filter**: Position, team, availability status
- **Player Cards**: Stats, recent form, injury status, upcoming fixtures
- **Waiver Wire**: Available players, claim priority system
- **Trade Center**: Propose/manage trades with other users

#### Teams Tab
- **My Team**: Current roster, starting lineup (9) + bench (5)
- **Lineup Setting**: Drag-and-drop interface
- **Team Stats**: Performance metrics, season history
- **Roster Management**: Add/drop players, injury replacements

#### Leagues Tab
- **League Management**: Create/join leagues, league settings
- **Draft Entry**: "Enter Draft" button when draft is active (opens new screen)
- **Standings**: League tables, head-to-head records
- **Matchday View**: Current week's matchups and scores

#### Account Tab
- **Settings**: Notifications, privacy, app preferences
- **Profile**: Statistics, achievements, account info

### 5. Technical Implementation Plan

#### Phase 1: MVP (Months 1-3)
- User authentication and basic profile
- Single league support (Premier League only)
- Basic team creation and lineup management (9 starters + 5 bench)
- Simple scoring system with post-match updates
- Core UI with all 5 tabs (Home, Player Search, Teams, Leagues, Account)
- Web scraping infrastructure for Premier League data

#### Phase 2: Core Features (Months 4-6)
- Draft system implementation with timezone management
- Enhanced scoring with detailed statistics
- League creation and management
- Basic news integration
- Real-time score updates infrastructure
- Multiple fixtures per matchweek handling

#### Phase 3: Enhanced Features (Months 7-9)
- Multi-league support
- Advanced statistics and analytics
- Push notifications
- Trade system
- Waiver wire functionality

#### Phase 4: Advanced Features (Months 10-12)
- Top 5 European leagues integration
- Inter-league team creation capabilities
- Promotion/relegation system
- Comprehensive news integration
- Social features (chat, comments)
- Premium features and monetization

### 6. Data Models (Swift)

```swift
// Core Models
struct User {
    let id: UUID
    let username: String
    let email: String
    let favoriteTeams: [String]
    let createdAt: Date
}

struct FantasyTeam {
    let id: UUID
    let name: String
    let ownerID: UUID
    let leagueID: UUID
    let roster: [Player]
    let totalPoints: Int
}

struct League {
    let id: UUID
    let name: String
    let creatorID: UUID
    let settings: LeagueSettings
    let teams: [FantasyTeam]
    let draftDate: Date?
}

struct Player {
    let id: UUID
    let name: String
    let position: Position
    let realTeam: String
    let stats: PlayerStats
    let isInjured: Bool
}
```

### 7. API Requirements
- **Player Data**: Real-time statistics, injury reports, suspensions
- **Match Data**: Live scores, fixtures, results
- **News API**: Player news, transfer rumors, team updates
- **League Data**: Standings, team information

### 8. Monetization Strategy
- **Freemium Model**: Basic leagues free, premium features paid
- **Premium Features**: 
  - Unlimited leagues
  - Advanced statistics
  - Priority customer support
  - Early access to new features
- **In-app Purchases**: League customization, premium themes

### 9. Testing Strategy
- **Unit Tests**: Core game logic, scoring calculations
- **Integration Tests**: API connections, data synchronization
- **UI Tests**: User flows, navigation, form submission
- **Beta Testing**: Closed beta with soccer fans

### 10. Launch Strategy
- **Soft Launch**: Limited regions, gather feedback
- **Marketing**: Soccer communities, social media, influencer partnerships
- **App Store Optimization**: Keywords, screenshots, descriptions
- **Community Building**: Discord/Reddit communities, user engagement

### 11. Critical Technical Challenges

#### Data Acquisition Strategy
**Web Scraping Premier League:**
- **Tools**: SwiftSoup for HTML parsing, URLSession for requests
- **Rate Limiting**: Implement delays between requests (2-3 seconds)
- **Data Points**: Goals, assists, passes, tackles, clean sheets, cards, minutes played
- **Update Frequency**: Post-match initially, real-time in Phase 2
- **Backup Plans**: Multiple data sources, cached fallbacks

#### Multiple Fixtures Per Matchweek
**Challenge**: Teams playing twice in one matchweek
**Solutions**:
- Aggregate points from all fixtures within the matchweek
- Clear communication to users about fixture schedules
- Automatic lineup locks before first fixture of the week
- Bonus points for players who play multiple times

#### Real-Time Data Architecture
**Phase 1 (Post-Match)**:
- Scheduled data updates every 2 hours post-match
- Push notifications for score updates
- Manual refresh capability

**Phase 2 (Real-Time)**:
- WebSocket connections for live updates
- Server-sent events for score streaming
- Efficient data diffing to minimize bandwidth

#### Season Timeline Management
**August-May Considerations**:
- Handle international breaks (no scoring weeks)
- Manage transfer windows and player availability
- Account for postponed matches
- Season-long statistics tracking

#### Draft System Architecture
```swift
// Draft State Management
class DraftManager: ObservableObject {
    @Published var currentPick: Int = 1
    @Published var pickTimer: TimeInterval = 120 // 2 minutes
    @Published var draftOrder: [UUID] = []
    @Published var availablePlayers: [Player] = []
    
    func makePick(player: Player, for teamId: UUID) {
        // Handle pick logic, validate selection
        // Update available players
        // Advance to next pick
    }
}
```

#### Lineup Management with Bench
```swift
struct TeamLineup {
    var starters: [Position: Player] = [:]
    var bench: [Player] = []
    
    func isValid() -> Bool {
        // Validate 9 starters in correct positions
        // Validate bench size (5 players max)
        return starters.count == 9 && bench.count <= 5
    }
}
```

## Risk Mitigation
- **Data Reliability**: Multiple data sources, fallback systems
- **User Engagement**: Regular feature updates, community features
- **Technical Debt**: Code reviews, refactoring sprints
- **Market Competition**: Unique features, superior UX