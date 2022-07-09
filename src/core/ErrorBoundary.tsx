import { Alert } from "antd";
import React from "react";

interface IState {
    hasError?: boolean;
}

export class ErrorBoundary extends React.Component {
    public state: IState = {};

    constructor(props: any) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error: any, info: any) {
        // Display fallback UI
        this.setState({ hasError: true });
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <Alert
                message="Error!!!"
                showIcon
                description="Something went wrong. Try reloading/refreshing the application. Sorry for the inconvenience"
                type="error"
            />
        }
        return (this.props as any).children;
    }
}
