export interface FieldsType {
    fullWidth: boolean;
    childrens: {
        type: string;
        name: string;
        label: string;
        required: boolean;
        error: string;
        value: string;
        placeholder: string;
        maxLength: number;
    }[];
}