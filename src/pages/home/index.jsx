import React from "react";
import { createRef } from "react";
import './index.less';
import { test_fn } from '@/utils/tools';
import axios from 'axios';

export default class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.box = createRef();
  }

  componentDidMount() {
    let dragged;
    // this.name();
    // const badCode = 'const s =1;';
    // eval(badCode);
    // axios.post('http://localhost:8088')
    // throw new Error('123');
    console.error(new Error(123));
    
    try {
      // test_fn();
      this.name();
    } catch (error) {
      console.error(new Error(error));
    }
    
    document.addEventListener("drag", event => {
      
    });

    document.addEventListener("dragstart", event => {
      dragged = event.target;
      event.target.classList.add("dragging");
    });

    document.addEventListener("dragend", event => {
      event.target.classList.remove("dragging");
    });

    document.addEventListener("dragover", event => {
      event.preventDefault();
    }, false);

    document.addEventListener("dragenter", event => {
      if (event.target.classList.contains("dropzone")) {
        event.target.classList.add("dragover");
      }
    });

    document.addEventListener("dragleave", event => {
      console.log("dragging");
      if (event.target.classList.contains("dropzone")) {
        event.target.classList.remove("dragover");
      }
    });

    document.addEventListener("drop", event => {
      event.preventDefault();
      if (event.target.classList.contains("dropzone")) {
        event.target.classList.remove("dragover");
        dragged.parentNode.removeChild(dragged);
        event.target.appendChild(dragged);
      }
    });

  }


  render() {
    return (
      <>
        <div className="dropzone">
          <div id="draggable" draggable="true">
            This div is draggable
          </div>
        </div>
        <div className="dropzone"></div>
      </>
    )
  }
}