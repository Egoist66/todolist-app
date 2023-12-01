
type ButtonProps = {
    _bg?: string
    text: string
    onClickHandler: () => void
}

export const Button = ({_bg, text, onClickHandler}: ButtonProps) => {

    return (
        <button onClick={onClickHandler} style={{backgroundColor: _bg}}>{text}</button>
    )
}