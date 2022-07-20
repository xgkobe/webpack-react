import React, { Component } from 'react';
import './index.less';

// TODO
// 只是开发环境用，提示显示在界面上，防止 QA 测试时，页面白屏捕获不到错误。
// 生产环境上报错误并友好提示用户

export default class ErrorBoundary extends Component {
  state = {
    error: {},
    errorInfo: { componentStack: null },
    hasError: false,
  };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // eslint-disable-next-line no-console
    console.dir(error);
    this.setState({ errorInfo });
  }

  reload = () => {
    window.location.reload();
  };

  render() {
    const { hasError, errorInfo, error } = this.state;

    if (hasError) {
      return (
        <div className="error-page">
          <div className="error-head">
            <p>
              出错了！.{' '}
              <span
                style={{ cursor: 'pointer', color: '#0077FF' }}
                onClick={this.reload}
              >
                重新加载此页面
              </span>{' '}
            </p>
          </div>
          <div className="error-info">
            {error && error.toString()}
            <br />
            {errorInfo?.componentStack}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
