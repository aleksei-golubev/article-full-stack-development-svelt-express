export interface Controller {
    [key: string]: {
        [key: string]: (req: any) => any;
    };
}