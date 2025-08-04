import React from 'react';

const NoLeaguePrompt = () => {
  return (
    <div className="no-league-container">
      <div className="prompt-content">
        <h2>Join a League to Get Started!</h2>
        <p>Create your own league or join an existing one to start competing.</p>

        <div className="action-buttons">
          <button className="btn-primary">Create League</button>
          <button className="btn-secondary">Join League</button>
        </div>
      </div>
    </div>
  );
};

export default NoLeaguePrompt;
