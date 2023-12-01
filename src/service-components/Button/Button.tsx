import styled from "styled-components";
import {ButtonProps} from "../../service-types/types";

const StyledButton = styled.button<ButtonProps>`
  
  background-color: #8952f7;
  width: ${props => props.width || 'auto'};
  height: ${props => props.height || 'auto'};
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 10px;
  font-size: 17px;
  border-radius: 7px;
  transition: 0.3s all ease;
  box-shadow: 2px 2px 2px 1px #7a579d;

  &:hover {
    background-color: #6d41c6;
    transition: 0.3s all ease;

  }
  &:active {
    box-shadow: none;
    transition: 0.3s all ease;
  }
`

function Button({height, disabled, onClickHandler, width, text, type = 'button', as, href, ...props} : ButtonProps){

  return (
    <StyledButton
      onClick={onClickHandler}
      {...props} 
      disabled={disabled} 
      href={href} 
      as={as} 
      type={type} 
      height={height} 
      width={width}>  
      
      {text}
    </StyledButton>
  )
}

export default  Button