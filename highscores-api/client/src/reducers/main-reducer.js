import up from '../images/up.png'
import {levels} from '../js/maps.js';
import space from '../images/space.jpg';
import Player from '../components/Player.jsx';

let initState = {
    grid : levels[0],
    level : levels[0],
    myPosition: null,
    pointing : up,
    username:'',
    time:0,
    modalShow : false,
    hasFetched:false
}

export const mainReducer = (state = initState, action) => {
    
    switch(action.type) {
        case "MOVE":
        let {movement, pointTo} = action
        let updatedGrid = [...state.grid]
        let endPosition = state.myPosition+movement;
        updatedGrid[endPosition] = updatedGrid[state.myPosition];
        updatedGrid[state.myPosition] = space

         return {
            ...state,
            grid : updatedGrid, 
            myPosition: endPosition, 
            pointing: pointTo

         }
        case "SAVE_TIME":
        let {currentPosition, clockTile, currentTime} = action
        let newGrid = [...state.grid]
        newGrid[clockTile] = Player
        newGrid[currentPosition] = space
        let newTime = currentTime -5500
         return {
            ...state,
            grid : newGrid,
            myPosition: newGrid.indexOf(Player),
            time: newTime
         }
        case "TELEPORT":

        let randomIndx = Math.floor(Math.random()*(state.grid.length))
        updatedGrid = [...state.grid]
        updatedGrid[state.myPosition] = space
        while(state.grid[randomIndx] !== space ){
            randomIndx = Math.floor(Math.random()*(state.grid.length))
        }
        updatedGrid[randomIndx] = Player
         return {
            ...state,
            grid : updatedGrid,
            myPosition : randomIndx
         }
        case "START_GAME":
            return {
                ...state,
                myPosition : state.grid.indexOf(Player)

            }
        case "LEVEL_UP":
        let currentLevel = levels.indexOf(state.level)
        let nextLevel = levels[currentLevel+1]
         return {
                ...state,
                grid:nextLevel,
                level:nextLevel,
                myPosition: nextLevel.indexOf(Player),
                hasFetched:false
         }
        case "BEAT_GAME":
        return {
            ...state,
            modalShow: true
        }
        default:
        return state;
    }
}
