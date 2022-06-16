import React, {PureComponent} from 'react';
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;

export default class LayoutBase extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    return (
      <Layout>
        <Header>Header</Header>
        <Content>{children}</Content>
        <Footer>Footer</Footer>
      </Layout>
    )
  }
}