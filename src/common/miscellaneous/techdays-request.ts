export interface IBunkerJSRequest extends Express.Request {
    techdays: {
        user_id: string;
        type: number;
    };
}
