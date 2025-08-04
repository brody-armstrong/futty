import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Pitch from './Pitch';

const Lineup = ({ players }) => {
  const [lineup, setLineup] = useState(players);

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(lineup);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setLineup(items);
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="lineup">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Pitch>
              {lineup.map((player, index) => (
                <Draggable key={player.id} draggableId={player.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-2 bg-white rounded shadow"
                    >
                      {player.name}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Pitch>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Lineup;
