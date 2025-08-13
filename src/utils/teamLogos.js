// Team logo mapping utility
export const getTeamLogo = (teamName) => {
  if (!teamName) return null
  
  // Map team names to logo file names
  const teamLogoMap = {
    'Arsenal': '/logos/Arsenal.png',
    'Aston Villa': '/logos/Aston Villa.png',
    'Villa': '/logos/Aston Villa.png',
    'Bournemouth': '/logos/Bournemouth.png',
    'AFC Bournemouth': '/logos/Bournemouth.png',
    'Burnley': '/logos/Burnley.png',
    'Burnley FC': '/logos/Burnley.png',
    'Chelsea': '/logos/Chelsea.png',
    'Chelsea FC': '/logos/Chelsea.png',
    'Crystal Palace': '/logos/Crystal Palace.png',
    'Palace': '/logos/Crystal Palace.png',
    'Brighton': '/logos/Brighton & Hove Albion.png',
    'Brighton & Hove Albion': '/logos/Brighton & Hove Albion.png',
    'Brighton & Hove': '/logos/Brighton & Hove Albion.png',
    'Brentford': '/logos/Brentford.png',
    'Brentford FC': '/logos/Brentford.png',
    'Everton': '/logos/Everton.png',
    'Everton FC': '/logos/Everton.png',
    'Fulham': '/logos/Fulham.png',
    'Fulham FC': '/logos/Fulham.png',
    'Leeds': '/logos/Leeds United F.C..png',
    'Leeds United': '/logos/Leeds United F.C..png',
    'Leeds United F.C.': '/logos/Leeds United F.C..png',
    'Leeds United FC': '/logos/Leeds United F.C..png',
    'Liverpool': '/logos/Liverpool.png',
    'Liverpool FC': '/logos/Liverpool.png',
    'LFC': '/logos/Liverpool.png',
    'Manchester City': '/logos/Manchester City.png',
    'Man City': '/logos/Manchester City.png',
    'Man City FC': '/logos/Manchester City.png',
    'Manchester City FC': '/logos/Manchester City.png',
    'MCFC': '/logos/Manchester City.png',
    'Manchester United': '/logos/Manchester United.png',
    'Man Utd': '/logos/Manchester United.png',
    'Man United': '/logos/Manchester United.png',
    'Manchester United FC': '/logos/Manchester United.png',
    'MUFC': '/logos/Manchester United.png',
    'Newcastle': '/logos/Newcastle United.png',
    'Newcastle United': '/logos/Newcastle United.png',
    'Newcastle United FC': '/logos/Newcastle United.png',
    'Newcastle FC': '/logos/Newcastle United.png',
    'NUFC': '/logos/Newcastle United.png',
    'Nottingham Forest': '/logos/Nottingham Forest.png',
    "Nott'm Forest": '/logos/Nottingham Forest.png',
    'Forest': '/logos/Nottingham Forest.png',
    'NFFC': '/logos/Nottingham Forest.png',
    'Sunderland': '/logos/Sunderland.png',
    'Sunderland AFC': '/logos/Sunderland.png',
    'SAFC': '/logos/Sunderland.png',
    'Tottenham': '/logos/Tottenham Hotspur.png',
    'Tottenham Hotspur': '/logos/Tottenham Hotspur.png',
    'Tottenham Hotspur FC': '/logos/Tottenham Hotspur.png',
    'Spurs': '/logos/Tottenham Hotspur.png',
    'THFC': '/logos/Tottenham Hotspur.png',
    'West Ham': '/logos/West Ham United.png',
    'West Ham United': '/logos/West Ham United.png',
    'West Ham United FC': '/logos/West Ham United.png',
    'WHUFC': '/logos/West Ham United.png',
    'Wolves': '/logos/Wolverhampton Wanderers.png',
    'Wolverhampton': '/logos/Wolverhampton Wanderers.png',
    'Wolverhampton Wanderers': '/logos/Wolverhampton Wanderers.png',
    'Wolverhampton Wanderers FC': '/logos/Wolverhampton Wanderers.png',
    'WWFC': '/logos/Wolverhampton Wanderers.png',
    'Premier League': '/logos/Premier League.png'
  }
  
  // Try exact match first
  if (teamLogoMap[teamName]) {
    return teamLogoMap[teamName]
  }
  
  // Try case-insensitive match
  const teamKey = Object.keys(teamLogoMap).find(
    key => key.toLowerCase() === teamName.toLowerCase()
  )
  
  if (teamKey) {
    return teamLogoMap[teamKey]
  }
  
  // Fallback for partial matches
  const partialMatch = Object.keys(teamLogoMap).find(
    key => key.toLowerCase().includes(teamName.toLowerCase()) || 
           teamName.toLowerCase().includes(key.toLowerCase())
  )
  
  if (partialMatch) {
    return teamLogoMap[partialMatch]
  }
  
  return null
}

// Get team display name (for consistency)
export const getTeamDisplayName = (teamName) => {
  const displayNames = {
    'Man City': 'Manchester City',
    'Man Utd': 'Manchester United',
    'Man United': 'Manchester United',
    "Nott'm Forest": 'Nottingham Forest',
    'Forest': 'Nottingham Forest',
    'Spurs': 'Tottenham Hotspur',
    'Villa': 'Aston Villa',
    'Palace': 'Crystal Palace',
    'Brighton & Hove': 'Brighton & Hove Albion',
    'Brighton': 'Brighton & Hove Albion',
    'West Ham United': 'West Ham',
    'Wolverhampton': 'Wolves',
    'Wolverhampton Wanderers': 'Wolves',
    'AFC Bournemouth': 'Bournemouth',
    'Newcastle': 'Newcastle United',
    'Leeds': 'Leeds United'
  }
  
  return displayNames[teamName] || teamName
} 