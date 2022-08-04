import React from "react";
import { PlusOutlined, DownOutlined } from '@ant-design/icons';
import { Button, Tree,message } from 'antd';
import LetterPress from '@/component/letterpress';
const fs = require('fs');
const path = require('path');

import './index.less';
import { _getAllNames } from '@/utils/tools';

export default class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.box = React.createRef();
    this.dropArea = React.createRef();
    this.codeDom = React.createRef();
    this.state = {
      treeList: [],
      isShowLetterPress: true,
      code: '',
      fileName: 'vscode',
      filePath: '',
    }
  }

  componentDidMount() {
    let areaDom = this.box.current;
    areaDom.addEventListener("dragenter", event => {
      if (event.target.classList.contains("drop_area_bg")) {
        event.target.classList.add("dragover");
      }
    });

    areaDom.addEventListener("dragleave", event => {
      if (event.target.classList.contains("drop_area_bg")) {
        event.target.classList.remove("dragover");
      }
    });

    areaDom.addEventListener("dragover", function (ev) {
        ev.preventDefault();//取消事件的默认动作，防止浏览器打开文件
    }, false);

    areaDom.addEventListener('drop', (ev) => {
      ev.preventDefault();//取消事件的默认动作。
      // let fileReader = new FileReader() ;
      let file = ev.dataTransfer.files[0];
      let a = _getAllNames(2, file.path);
      console.log(file);
      this.setState({treeList: a, filepath: file.path });
      if (ev.target.classList.contains("drop_area_bg")) {
        ev.target.classList.remove("dragover");
      }
    }, false);
  }

  onSelect = (file) => {
    this.setState({isShowLetterPress: false});
    this.getFileContent(file[0]);
    this.setState({fileName: file[0]})
  }

  getFileContent = async (path) => {
    await fs.readFile(path, (error,data) => {
      if(error) return;
      this.setState({code: data.toString()});
      // document.execCommand();
      this.codeDom.current.contentEditable = true;
    })
  }

  onSaveAs = () => {
    const {filePath, fileName} = this.state;
    console.dir(this.codeDom.current.innerText);
    fs.writeFile(path.join(filePath, fileName), this.codeDom.current.innerText, (error) => {
      if (error) {
        message.error('保存失败');
        return;
      } else {
        message.success('保存成功');
      }
    })
    
  }


  render() {
    const { treeList, isShowLetterPress, code, fileName } = this.state;
    return (
      <div className="container">
        <div className="top_bar">
          <span className="top_bar_content">{fileName}</span>
        </div>
        <div className="content_area">
          <div className="left_area">
            <Tree
              showLine
              switcherIcon={<DownOutlined />}
              defaultExpandedKeys={['0-0-0']}
              onSelect={this.onSelect}
              treeData={treeList}
            />
          </div>
          <div className="drop_area" ref={this.dropArea}>
            <Button onClick={() => this.onSaveAs()}>保存</Button>
            {/* <LetterPress ref={this.box}></LetterPress> */}
            {!isShowLetterPress && 
             
              <div ref={this.codeDom} style={{color: '#50C0FF'}}>{code}</div>
            }
            {isShowLetterPress && <div className="drop_area_bg" ref={this.box}>
              <div className="drop_area_bg_text">
                <PlusOutlined />
                <span>请拖入文件</span>
              </div>
            </div>}
          </div>
        </div>
      </div>
    )
  }
}