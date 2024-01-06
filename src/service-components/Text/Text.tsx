import styled from "styled-components";
import {TextPropsType} from "../../service-types/types";


const StyledParagraph = styled.p<TextPropsType>((props) => ({
  color: props._color,
  fontSize: props.font_size,
  textAlign: props.centered === "true" ? "center" : "initial",
  maxWidth: props.mw,
  textDecoration: props.txtdecor,
  margin: props._margin,
  fontWeight: props.font_weight
}));

const StyledTitleH1 = styled.h1<TextPropsType>((props) => ({
  color: props._color,
  fontSize: props.font_size,
  textDecoration: props.txtdecor,
  textAlign: props.centered === "true" ? "center" : "initial",
  maxWidth: props.mw,
  margin: props._margin,
  fontWeight: props.font_weight
}));
const StyledTitleH2 = styled.h2<TextPropsType>((props) => ({
  color: props._color,
  fontSize: props.font_size,
  textDecoration: props.txtdecor,
  textAlign: props.centered === "true" ? "center" : "initial",
  maxWidth: props.mw,
  margin: props._margin,
  fontWeight: props.font_weight
}));

const StyledSpan = styled.span<TextPropsType>((props) => ({
  color: props._color,
  fontSize: props.font_size,
  textAlign: props.centered === "true" ? "center" : "initial",
  maxWidth: props.mw,
  textDecoration: props.txtdecor,
  margin: props._margin,
  display: props._display,
  fontWeight: props.font_weight
}));

function Text({ _color, txtdecor, onClickHandler, font_size, type = 'p', centered, children, mw, _margin, font_weight}: TextPropsType) {
  switch (type) {
    case "p":
      return (
        <StyledParagraph
          txtdecor={txtdecor}
          onDoubleClick={onClickHandler}
          font_weight={font_weight}
          centered={centered}
          font_size={font_size}
          _color={_color}
          mw={mw}
          _margin={_margin}
        >
          {children}
        </StyledParagraph>
      );
    case "h2":
      return (
        <StyledTitleH2
          txtdecor={txtdecor}
          onDoubleClick={onClickHandler}
          font_weight={font_weight}
          centered={centered}
          font_size={font_size}
          _color={_color}
          mw={mw}
          _margin={_margin}
        >
          {children}
        </StyledTitleH2>
      );
    case "h1":
      return (
        <StyledTitleH1
          txtdecor={txtdecor}
          onDoubleClick={onClickHandler}
          font_weight={font_weight}
          centered={centered}
          font_size={font_size}
          _color={_color}
          mw={mw}
          _margin={_margin}
        >
          {children}
        </StyledTitleH1>
      );
    case "span":
      return (
        <StyledSpan
          txtdecor={txtdecor}
          onDoubleClick={onClickHandler}
          font_weight={font_weight}
          centered={centered}
          font_size={font_size}
          _color={_color}
          mw={mw}
          _margin={_margin}
        >
          {children}
        </StyledSpan>
      );
    default:
      throw new Error(`Unknown ${type} property`);
  }
}

export default Text;
