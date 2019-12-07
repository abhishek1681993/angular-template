export interface PopupConfig {
    title: string;
    info?: string;
    component: any;
    actions: Array<PopupButton>;
    hasFooterLegend?: boolean;
    footerLegendString?: string;
    data?: any;
}

export enum ActionType {
    Submit,
    Cancel,
    Custom
}

export interface PopupButton {
    name: string;
    action: ActionType;
    command?: Function;
    id?: string;
    css: string;
    disabled?: boolean;
}

export enum Size {
    small,
    medium,
    large,
    extraLarge,
    extraExtraLarge
}
