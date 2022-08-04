import React from "react";
import { PlusOutlined } from '@ant-design/icons';

export default class LetterPress extends React.PureComponent {

  componentDidMount() {
    console.log('letterpress');
  }

  render() {
    return (
      <div className="drop_area_bg">
        <div className="drop_area_bg_text">
          <PlusOutlined />
          <span>请拖入文件</span>
        </div>
      </div>
    )
  }
}