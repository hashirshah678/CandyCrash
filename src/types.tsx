type Level = (number | null)[][];

export interface GameLevels {
    [key: string]: {
        grid: Level;
        pass: number;
        time: number;
    };
}
