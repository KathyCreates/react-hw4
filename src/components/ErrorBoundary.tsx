import React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
  onReset?: () => void;
};

type ErrorBoundaryState = {
  error: Error | null;
};

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, info);
  }

  private handleReset = () => {
    this.setState({ error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.error) {
      return (
        <div className="card error">
          <p>
            <strong>Помилка:</strong> {this.state.error.message}
          </p>
          <button onClick={this.handleReset}>Спробувати ще раз</button>
        </div>
      );
    }

    return this.props.children;
  }
}
