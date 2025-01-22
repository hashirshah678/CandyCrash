import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {mmkvStorage} from './localStorage';
import {initialLevelData} from '../utils/data';

type LevelState = {
  id: number;
  unlocked: boolean;
  completed: boolean;
  highScore: number;
};

type LevelStore = {
  levels: LevelState[];
  unlockLevel: (id: number) => void;
  completeLevel: (id: number, collectedCandies: number) => void;
};

export const useLevelStore = create<LevelStore>()(
  persist(
    (set) => ({
      levels: initialLevelData,
      unlockLevel: (id: number) => {
        set(state => {
          const updatedLevel = state.levels.map(level =>
            level.id === id ? {...level, unlocked: true} : level,
          );
          return {...state, levels: updatedLevel};
        });
      },
      completeLevel: (id: number, collectedCandies: number) => {
        set(state => {
          const updatedLevel = state.levels.map(level =>
            level.id === id
              ? {...level, completed: true, highScore: Math.max(level.highScore, collectedCandies)}
              : level,
          );
          return {...state, levels: updatedLevel};
        });
      },
    }),
    {
      name: 'level-storage',
      storage: createJSONStorage(() => mmkvStorage),
    },
  ),
);
