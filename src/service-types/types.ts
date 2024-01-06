import React, {ReactNode} from "react";

export type StyledServiceWrapperType = {
    _justify?: 'space-between' | 'space-evenly' | 'space-around' | 'flex-start' |
    'center' | 'flex-end',
    align_center? : string,
    gap?: string

}

export type WrapperChildren = {
    children: ReactNode,
    _justify?: 'space-between' | 'space-evenly' | 'space-around' | 'flex-start' |
        'center' | 'flex-end',
    align_center?:string,
    gap?: string

}

export type TextPropsType = {
    _color?: string;
    txtdecor?: string;
    font_size?: string;
    type?: 'p' | 'h2' | 'h1' | 'span',
    children?: ReactNode;
    centered?: string;
    mw?: string;
    _margin?: string,
    font_weight?: number
    _display? : 'inline-block' | 'block'
    onClickHandler?: () => void
};

export type ButtonProps = {
    width?: string,
    text?: string,
    height?: string,
    type?: string,
    as?: string,
    href?: string,
    disabled?: boolean,
    onClickHandler?: (arg?: any) => void

}
