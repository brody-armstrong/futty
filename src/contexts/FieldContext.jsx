import { createContext, useContext, useState } from 'react';

const FieldContext = createContext();

export const useField = () => {
    const context = useContext(FieldContext);
    if (!context) {
        throw new Error('useField must be used within a FieldProvider');
    }
    return context;
}

export const FieldProvider = ({ children }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [formation, setFormation] = useState({ DEF: 3, MID: 3, ATT: 2 });
    const [fieldPositions, setFieldPositions] = useState({
        GK: [{ playerId: '1', x: 50, y: 10 }],
        DEF: [{ playerId: '2', x: 20, y: 30 }, { playerId: '3', x: 50, y: 30 }, { playerId: '4', x: 80, y: 30 }],
        MID: [{ playerId: '5', x: 20, y: 50 }, { playerId: '6', x: 50, y: 50 }, { playerId: '7', x: 80, y: 50 }],
        ATT: [{ playerId: '8', x: 30, y: 70 }, { playerId: '9', x: 70, y: 70 }]
    });

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    }

    const movePlayer = (playerId, newPosition) => {
        const newFieldPositions = { ...fieldPositions };

        // Find the player and update their position
        for (const zone in newFieldPositions) {
            const playerIndex = newFieldPositions[zone].findIndex(p => p.playerId === playerId);
            if (playerIndex !== -1) {
                newFieldPositions[zone][playerIndex] = { ...newFieldPositions[zone][playerIndex], ...newPosition };
                break;
            }
        }

        if (validateFormation(newFieldPositions)) {
            setFieldPositions(newFieldPositions);
        } else {
            // Snap back to original position
            // (implementation needed)
            console.log("Invalid formation");
        }
    }

    const validateFormation = (newPositions) => {
        const counts = {};
        for (const zone in newPositions) {
            counts[zone] = newPositions[zone].length;
        }

        // Check minimum requirements
        if (counts.GK < 1 || counts.DEF < 3 || counts.MID < 3 || counts.ATT < 1) {
            return false;
        }

        // Check total players
        if (Object.values(counts).reduce((a, b) => a + b, 0) !== 9) {
            return false;
        }

        return true;
    }

    const resetToDefaultFormation = () => {
        // Logic to reset formation
    }

    const value = {
        isEditMode,
        formation,
        fieldPositions,
        toggleEditMode,
        movePlayer,
        validateFormation,
        resetToDefaultFormation
    };

    return (
        <FieldContext.Provider value={value}>
            {children}
        </FieldContext.Provider>
    )
}
