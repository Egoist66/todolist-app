import {PureComponent, ReactNode} from "react";
import ErrorPic from "../../assets/error.gif";
import {ErrorMessage} from "./ErrorMessage";

interface ErorBoundaryProps {
    onTryhandler?: () => void;
    error: boolean | null | string;
    children: ReactNode;
}

interface ErrorBoundaryState {
    appError: boolean
}

class ErrorBoundary extends PureComponent<ErorBoundaryProps, ErrorBoundaryState> {
    static defaultProps = {
        error: null
    };

    state: Readonly<ErrorBoundaryState> = {
        appError: false
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({
            appError: true
        })

        console.log({error, errorInfo})
    }

    render(): ReactNode {
        if (this.props.error === 'failed' || this.state.appError) {
            return (
                <div>
                    <img
                        style={{
                            display: "block",
                            margin: "0 auto",
                        }}
                        src={ErrorPic}
                        alt="error"
                    />

                    {!this.state.appError ?  <ErrorMessage
                        onTryHandler={this.props.onTryhandler}
                        errorText={<p style={{color: '#F44336'}}>Something went wrong...<br/></p>}
                    /> : null}
                </div>
            );
        }

        return this.props.children;
    }
}


export default ErrorBoundary;
