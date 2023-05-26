export function wrapFn(fn: (req: any) => any): (_req: any, _res: any) => void {
    return async (_req, _res) => {
        let result: any = await fn(_req);
        
        if (!result) _res.sendStatus(404);
        _res.send(result);
    }
}