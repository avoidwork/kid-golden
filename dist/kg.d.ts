export function kg({ data, id, lang }?: {
    data?: any[];
    id?: string;
    lang?: string;
}): KidGolden;
declare class KidGolden {
    constructor(data: any, id: any, lang: any);
    id: any;
    data: any;
    done: boolean;
    lang: any;
    labels: {};
    prepared: any[];
    output: string;
    ready: boolean;
    process(): boolean;
    render(): string;
}
export {};
