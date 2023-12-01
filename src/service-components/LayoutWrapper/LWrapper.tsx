import styled from "styled-components";
import {ReactNode} from "react";

const StyledLWrapper = styled.div`
  display: grid;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 30px;
  grid-template-areas: 
  "header header"
  "aside main";
  grid-template-rows: 1fr;
  grid-template-columns: 2fr 10fr;
  grid-gap: 10px;


`

type LWrapperPropsType = {
    children: ReactNode
}

export function LWrapper({children}: LWrapperPropsType) {

    return (

        <StyledLWrapper>
            {children}
        </StyledLWrapper>

    )
}