export interface ITechDaysRequest extends Express.Request {
    techdays: {
        user_id: string;
        type: number;
    };
}
