export function kg({ data, id, lang }?: {
    data?: any[];
    id?: string;
    lang?: string;
}): KidGolden;
declare class KidGolden {
    constructor(id?: string, data?: any[], lang?: string);
    id: string;
    data: any[];
    done: boolean;
    lang: string;
    labels: {};
    prepared: any[];
    output: string;
    ready: boolean;
    process(): boolean;
    render(): string;
}
export {};
