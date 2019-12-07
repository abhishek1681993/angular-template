export interface AlertConfig {
    type: AlertType;
    title: string;
    message: string;
    subMessage?: string;
    apiMessage?: string;
    details?: string;
    command?: Function;
    data?: any;
}

export enum AlertType {
    Confirm,
    Error,
    Info,
    Warning,
    SessionExpired,
    Preview
}
