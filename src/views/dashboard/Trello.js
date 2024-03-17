import React, { useState, useEffect } from 'react';
import Board from 'react-trello';


const data = {
  "lanes": [
    {
      "id": "PLANNED",
      "title": "Planned Tasks",
      "label": "20/70",
      "style": {"width": 280},
      "cards": [
        {
          "id": "Milk",
          "title": "Buy milk",
          "label": "15 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "2 Gallons of milk at the Deli store"
        },
        {
          "id": "Plan2",
          "title": "Dispose Garbage",
          "label": "10 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Sort out recyclable and waste as needed"
        },
        {
          "id": "Plan3",
          "title": "Write Blog",
          "label": "30 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Can AI make memes?"
        },
        {
          "id": "Plan4",
          "title": "Pay Rent",
          "label": "5 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Transfer to bank account"
        }
      ]
    },
    {
      "id": "WIP",
      "title": "Work In Progress",
      "label": "10/20",
      "style": {"width": 280},
      "cards": [
        {
          "id": "Wip1",
          "title": "Clean House",
          "label": "30 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Soap wash and polish floor. Polish windows and doors. Scrap all broken glasses"
        }
      ]
    },
    {
      "id": "BLOCKED",
      "title": "Blocked",
      "label": "0/0",
      "style": {"width": 280},
      "cards": []
    },
    {
      "id": "COMPLETED",
      "title": "Completed",
      "style": {"width": 280},
      "label": "2/5",
      "cards": [
        {
          "id": "Completed1",
          "title": "Practice Meditation",
          "label": "15 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Use Headspace app"
        },
        {
          "id": "Completed2",
          "title": "Maintain Daily Journal",
          "label": "15 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Use Spreadsheet for now"
        }
      ]
    },
    {
      "id": "REPEAT",
      "title": "Repeat",
      "style": {"width": 280},
      "label": "1/1",
      "cards": [
        {
          "id": "Repeat1",
          "title": "Morning Jog",
          "label": "30 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Track using fitbit"
        }
      ]
    },
    {
      "id": "ARCHIVED",
      "title": "Archived",
      "style": {"width": 280},
      "label": "1/1",
      "cards": [
        {
          "id": "Archived1",
          "title": "Go Trekking",
          "label": "300 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Completed 10km on cycle"
        }
      ]
    },
    {
      "id": "ARCHIVED2",
      "title": "Archived2",
      "style": {"width": 280},
      "label": "1/1",
      "cards": [
        {
          "id": "Archived1",
          "title": "Go Trekking",
          "label": "300 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Completed 10km on cycle"
        }
      ]
    },
    {
      "id": "ARCHIVED3",
      "title": "Archived3",
      "style": {"width": 280},
      "label": "1/1",
      "cards": [
        {
          "id": "Archived1",
          "title": "Go Trekking",
          "label": "300 mins",
          "cardStyle": { "width": 270, "maxWidth": 270, "margin": "auto", "marginBottom": 5 },
          "description": "Completed 10km on cycle"
        }
      ]
    }
  ]
};

const handleDragStart = (cardId, laneId) => {
  console.log('drag started');
  console.log(`cardId: ${cardId}`);
  console.log(`laneId: ${laneId}`);
};

const handleDragEnd = (cardId, sourceLaneId, targetLaneId) => {
  console.log('drag ended');
  console.log(`cardId: ${cardId}`);
  console.log(`sourceLaneId: ${sourceLaneId}`);
  console.log(`targetLaneId: ${targetLaneId}`);
};

const Trello = () => {
  const [boardData, setBoardData] = useState({ lanes: [] });
  const [eventBus, setEventBus] = useState(null);

  useEffect(() => {
    const getBoard = async () => {
      const response = await Promise.resolve(data);
      setBoardData(response);
    };

    getBoard();
  }, []);

  const completeCard = () => {
    eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'COMPLETED',
      card: {
        id: 'Milk',
        title: 'Buy Milk',
        label: '15 mins',
        description: 'Use Headspace app',
      },
    });
    eventBus.publish({
      type: 'REMOVE_CARD',
      laneId: 'PLANNED',
      cardId: 'Milk',
    });
  };

  const addCard = () => {
    eventBus.publish({
      type: 'ADD_CARD',
      laneId: 'BLOCKED',
      card: {
        id: 'Ec2Error',
        title: 'EC2 Instance Down',
        label: '30 mins',
        description: 'Main EC2 instance down',
      },
    });
  };

  const shouldReceiveNewData = (nextData) => {
    console.log('New card has been added');
    console.log(nextData);
  };

  const handleCardAdd = (card, laneId) => {
    console.log(`New card added to lane ${laneId}`);
    console.dir(card);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h3 className='primary'>Trello Demo</h3>
      </div>
      <div className='$blue'>
        <Board
          style={{backgroundColor: '#f3f4f7'}}
          editable
          onCardAdd={handleCardAdd}
          canAddLanes={true}
          editLaneTitle={true}
          collapsibleLanes={true}
          onLaneAdd={function noRefCheck(){}}
          data={boardData}
          draggable
          onDataChange={shouldReceiveNewData}
          eventBusHandle={(eventBus) => setEventBus(eventBus)}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
        />
      </div>
    </div>
  );
};

export default Trello;
