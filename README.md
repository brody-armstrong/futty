# Futty - Fantasy Soccer Web Application

A modern, responsive fantasy soccer web application built with React and JavaScript. Experience the thrill of managing your own fantasy soccer team with draft-style gameplay, comprehensive player statistics, and competitive leagues.

## 🚀 Features

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

## 🏗️ Architecture

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

## 🛠️ Installation & Setup

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

## 📁 Project Structure

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

## 🎯 Key Features by Page

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

## 🔧 Development

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

## 🚀 Future Enhancements

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Premier League for inspiration
- React and Vite communities
- Tailwind CSS for the beautiful styling system
- Lucide React for the icon library

---

**Futty** - Where fantasy meets football! ⚽ 