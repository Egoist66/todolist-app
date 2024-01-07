import {FC, ReactNode} from "react";
import {Button} from "@material-ui/core";

type ErrorMessageProps = {
  onTryHandler?: () => void;
  errorText: string | ReactNode;
};

export const ErrorMessage: FC<ErrorMessageProps> = ({errorText, onTryHandler}) => {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>
        {errorText}
      </h2>
      <div style={{ textAlign: "center" }}>
        <Button variant={'outlined'} style={{ marginTop: 10 }} className="button button__main">
          <div onClick={onTryHandler} className="inner">
            Try again
          </div>
        </Button>
      </div>
    </>
  );
};
