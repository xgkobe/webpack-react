import React, { PureComponent } from 'react';
import './index.less';
import { Dropdown, Checkbox, Spin, Tooltip } from 'antd';
import { Icon } from '@ant-design/compatible';
import classnames from 'classnames';
// import { winRectWidthDefault } from 'store/myReport';
let winRectWidthDefault = document.documentElement.clientHeight || 730;

const noDataLi = (
  <li className={'cascader-menu-item'} style={{ textAlign: 'center' }}>
    无数据
  </li>
);
// export default class SelectCascader extends PureComponent {
//   render() {
//     return <div></div>
//   }
// }

export default class SelectCascader extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      labelName: this.props.labelName,
      defaultValue: this.props.value || '',
      loadItem: [],
      visible: false,
      checkedList: this.getInitCheckedList(
        props.defaultCheckedList,
        props.data,
      ),
      filterList: [],
      placeholder: this.props.placeholder || '',
      inputValue: this.props.value || '',
      toolTipVisible: false,
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        defaultValue: nextProps.value,
        inputValue: nextProps.value,
      });
    }
    if (
      nextProps.defaultCheckedList !== this.props.defaultCheckedList ||
      nextProps.dataTotal !== this.props.dataTotal
    ) {
      this.setState({
        checkedList: this.getInitCheckedList(
          nextProps.defaultCheckedList,
          nextProps.data,
        ),
      });
    }
    if (nextProps.placeholder !== this.props.placeholder) {
      this.setState({
        placeholder: nextProps.placeholder || '',
        labelName: nextProps.labelName || '',
      });
    }
  }
  getInitCheckedList = (defaultCheckedList = [], data) => {
    let newCheckedList = defaultCheckedList || [];
    // 如果有全选，则把所有的都选上
    const hasSelectAll = this.isSelectAllChecked(defaultCheckedList);
    if (hasSelectAll && data.length) {
      newCheckedList = this.getCheckedAllList(data);
    }
    return newCheckedList;
  };
  // 是否选中了全选
  isSelectAllChecked = (checkedList) => {
    const { checkedAllCode, labelInValue } = this.props;
    if (!checkedAllCode) {
      return false;
    }
    if (labelInValue) {
      return checkedList.some((item) => {
        return item.value === checkedAllCode;
      });
    } else {
      return checkedList.some((item) => {
        return item === checkedAllCode;
      });
    }
  };

  // 勾选所有选项
  getCheckedAllList = (data) => {
    const { labelInValue } = this.props;
    let newCheckedList = [];
    if (labelInValue) {
      newCheckedList = data.slice();
    } else {
      newCheckedList = data.map((item) => {
        return item.value;
      });
    }
    return newCheckedList;
  };

  selectItem = (item) => {
    const { disabledLevel } = this.props;

    if (
      disabledLevel &&
      !(
        item.disabledLevel &&
        disabledLevel.length &&
        disabledLevel.includes(item.disabledLevel)
      )
    ) {
      return;
    }
    this.props.onChange && this.props.onChange(item);
    this.setState(
      {
        searchValue: '',
        visible: false,
        defaultValue: item.label,
        filterList: [],
        checkedList: this.props.labelInValue ? [item] : [item.value],
      },
      () => {
        this.handleVisibleChange(false);
      },
    );
  };

  onMouseOver = (item, index) => {
    let loadItem = this.state.loadItem.concat([]);
    this.props.onMouseOver && this.props.onMouseOver(item);

    if (loadItem[index] !== undefined) {
      loadItem[index] = item.value;
      loadItem = loadItem.slice(0, index + 1);
    } else {
      loadItem.push(item.value);
    }
    this.setState({
      loadItem,
    });
  };

  valueChange = (e) => {
    const value = e.nativeEvent.srcElement.innerText;
    // 自定义search列表
    if (this.props.customSearch) {
      this.props.customSearch(value).then((res) => {
        res.forEach((item) => {
          if (!item.label) {
            item.label = item.valueDesc;
          }
        });
        this.setState({
          filterList: res,
        });
      });
    }
    this.setState({
      searchValue: value,
      visible: true,
    });
  };
  getAddedCheckedList = (optionItem) => {
    const { labelInValue } = this.props;
    const { checkedList } = this.state;
    let newCheckedList;
    if (labelInValue) {
      newCheckedList = [...checkedList, optionItem];
    } else {
      newCheckedList = [...checkedList, optionItem.value];
    }
    return newCheckedList;
  };
  getRemovedCheckedList = (optionItem) => {
    const { labelInValue, checkedAllCode } = this.props;
    const { checkedList } = this.state;
    let newCheckedList;
    if (labelInValue) {
      newCheckedList = checkedList.filter((item) => {
        if (checkedAllCode) {
          return (
            item.value !== checkedAllCode && item.value !== optionItem.value
          );
        }
        return item.value !== optionItem.value;
      });
    } else {
      newCheckedList = checkedList.filter((item) => {
        if (checkedAllCode) {
          return item !== checkedAllCode && item !== optionItem.value;
        }
        return item !== optionItem.value;
      });
    }
    return newCheckedList;
  };
  handleCheckedChange(optionItem, checked) {
    const { dataTotal, checkedAllCode, data } = this.props;
    let newCheckedList;
    if (checked) {
      // 点击全选，所有的都选中
      if (checkedAllCode && optionItem.value === checkedAllCode) {
        newCheckedList = this.getCheckedAllList(data);
      } else {
        newCheckedList = this.getAddedCheckedList(optionItem);
        if (dataTotal && newCheckedList.length === dataTotal) {
          newCheckedList = this.getCheckedAllList(data);
        }
      }
    } else {
      if (optionItem.value === checkedAllCode) {
        newCheckedList = [];
      } else {
        newCheckedList = this.getRemovedCheckedList(optionItem);
      }
    }
    return newCheckedList;
  }
  handleShowValueChange = (optionItem, newCheckedList, checked) => {
    const { labelInValue } = this.props;
    let newValue = '';
    const isSelectAll = this.isSelectAllChecked(newCheckedList);

    if (isSelectAll) {
      newValue = '全选';
    } else {
      if (labelInValue) {
        newValue = newCheckedList.map((item) => {
          return item.label;
        });
        newValue = newValue.join(',');
      } else {
        newValue = this.state.defaultValue;
        // 此处有小坑
        if (checked) {
          newValue = newValue.replace(this.props.placeholder, '');
          newValue = newValue.split(',').filter((el) => el !== '');
          newValue.push(optionItem.label);
          newValue = newValue.join(',');
        } else {
          newValue = newValue
            .split(',')
            .filter((el) => optionItem.label !== el)
            .join(',');
        }
      }
    }
    return newValue;
  };
  checkboxChange = (data, checked) => {
    const newCheckedList = this.handleCheckedChange(data, checked);
    const newValue = this.handleShowValueChange(data, newCheckedList, checked);
    this.setState({
      defaultValue: newValue,
      checkedList: newCheckedList,
    });
    this.props.onChange && this.props.onChange(data);
    this.inputRef && this.inputRef.focus();
  };
  handleClickOptionItem = (item, checked) => {
    const { mode } = this.props;
    if (mode !== 'multiple') {
      this.selectItem(item);
    } else {
      this.checkboxChange(item, !checked);
    }
  };
  optionChecked = (optionItem) => {
    const { labelInValue } = this.props;
    const checkedList = this.state.checkedList || [];
    let checked;
    if (labelInValue) {
      checked = checkedList.some((item) => item.value === optionItem.value);
    } else {
      checked = checkedList.some((item) => item === optionItem.value);
    }
    return checked;
  };
  // 如果有全选，远程搜索的选项也要勾上
  handleCheckedList = (newList) => {
    const { checkedList } = this.state;
    const hasSelectAll = this.isSelectAllChecked(checkedList);
    if (hasSelectAll) {
      newList.forEach((optionItem) => {
        const checked = this.optionChecked(optionItem);
        if (!checked) {
          const newCheckedList = this.getAddedCheckedList(optionItem);
          this.setState({
            checkedList: newCheckedList,
          });
        }
      });
    }
  };
  getRenderList = (list = [], childrenIndex) => {
    let renderList;
    const searchValue = this.state.searchValue;
    if (!childrenIndex) {
      renderList = list.filter((item) => item.label.match(searchValue));
    } else {
      renderList = list;
    }
    const filterList = this.state.filterList;
    if (filterList.length) {
      renderList = filterList;
      // 当发现有远程搜索时，并且有全选，把搜索的也打勾
      this.handleCheckedList(renderList);
    }
    return renderList;
  };
  renderChildren = (list, childrenIndex) => {
    return (
      <ul
        className="cascader-options"
        onScroll={(e) => {
          e.stopPropagation();
        }}
      >
        {list.length
          ? list.map((item, index) => {
              const className = `cascader-menu-item ${
                this.state.defaultValue === item.label ? 'selected' : ''
              }`;
              let checked = this.optionChecked(item);
              return (
                <li
                  key={index}
                  onMouseOver={this.onMouseOver.bind(this, item, childrenIndex)}
                  className={className}
                  onClick={this.handleClickOptionItem.bind(this, item, checked)}
                >
                  {this.props.mode === 'multiple' ? (
                    <Checkbox
                      checked={checked}
                      onChange={(e) => {
                        this.checkboxChange(item, e.target.checked);
                      }}
                      className={'item-checkbox'}
                      key={item.value}
                    />
                  ) : null}

                  <div className="options-wrapper">
                    {this.props.renderOption &&
                    this.props.renderOption.length &&
                    this.props.renderOption[childrenIndex]
                      ? this.props.renderOption[childrenIndex](item)
                      : item.label}
                  </div>
                  {item.children && <Icon type="right" className="right" />}
                </li>
              );
            })
          : noDataLi}
      </ul>
    );
  };

  addMenuList(data, menus) {
    data.forEach((item) => {
      this.state.loadItem.forEach((el) => {
        if (item.value === el && item.children) {
          menus.push(item.children || []);
          this.addMenuList(item.children, menus);
        }
      });
    });
  }

  renderOptions = () => {
    let { data, loading, autoDropdownWidth, dropdownMaxWidth } = this.props;
    let menus = [data];
    this.addMenuList(data, menus);
    const itemRight = this.inputRef?.getBoundingClientRect()?.right;
    let dropdownExtAt = 'right';

    if (itemRight && winRectWidthDefault - itemRight < 220) {
      // 如果是右侧的筛选，则从左侧展开下拉框
      dropdownExtAt = 'left';
    }
    const menuStyle = autoDropdownWidth
      ? {
          width: 'unset',
          maxWidth: `${dropdownMaxWidth || 300}px`,
          [dropdownExtAt]: 'unset',
        }
      : {};
    return (
      <div style={menuStyle} className="select-cascader-menus">
        {loading ? (
          <Spin>
            <ul className="cascader-menu">
              <li
                className="cascader-menu-item"
                style={{ textAlign: 'center' }}
              >
                数据加载中...
              </li>
            </ul>
          </Spin>
        ) : (
          menus.map((list, index) => {
            const renderList = this.getRenderList(list, index);
            return renderList.length ? (
              <ul className="cascader-menu" key={index}>
                {this.renderChildren(renderList, index)}
                {this.props.renderSlot &&
                this.props.renderSlot.length &&
                this.props.renderSlot[index]
                  ? this.props.renderSlot[index]()
                  : null}
              </ul>
            ) : (
              <ul className="cascader-menu" key={index}>
                {noDataLi}
              </ul>
            );
          })
        )}
      </div>
    );
  };

  handleVisibleChange = (visible) => {
    this.setInputDisplay(visible);
    this.setState({
      visible,
      searchValue: '',
      filterList: [],
    });
    const { checkedAllCode } = this.props;
    const { checkedList } = this.state;
    let selectList = checkedList;
    // 如果既选了全选，也选了别的，那就是只全选
    if (checkedAllCode) {
      const selectAllItem = checkedList.filter((item) => {
        return item.value === checkedAllCode || item === checkedAllCode;
      });
      if (selectAllItem.length) {
        selectList = selectAllItem;
      }
    }

    this.props.onVisibleChange &&
      this.props.onVisibleChange(visible, selectList);
  };

  setInputDisplay(visible) {
    const { defaultValue } = this.state;
    if (visible) {
      this.inputRef.style.width = this.inputRef.clientWidth + 'px';
      this.setState({
        placeholder: '请搜索',
        inputValue: '',
      });
    } else {
      if (this.props.autoWidth) {
        this.inputRef.style.width = 'auto';
      }
      this.setState({
        placeholder: this.props.placeholder,
        inputValue: defaultValue,
      });
      if (!defaultValue) {
        this.inputRef.innerHTML = '';
      }
      this.inputRef && this.inputRef.blur();
    }
  }
  componentDidMount() {
    this.setInputClass();
    if (this.props.autoWidth) {
      let minWidth = 12 * this.state.placeholder.length;
      const maxWidth = 300;
      if (minWidth < 80) {
        minWidth = 80;
      }
      if (minWidth > maxWidth) {
        minWidth = 300;
      }
      this.inputRef.style.minWidth = minWidth + 'px';
      this.inputRef.style.maxWidth = maxWidth + 'px';
    }
  }
  componentDidUpdate() {
    this.setInputClass();
  }
  setInputClass() {
    if (!this.inputRef) {
      return;
    }
    const classVal = this.inputRef.getAttribute('class');
    let newClass = '';
    if (this.inputRef.innerHTML) {
      newClass = classVal.replace('input_blank', '');
    } else {
      const indexOf = classVal.indexOf('input_blank');
      if (indexOf !== -1) {
        newClass = classVal;
      } else {
        newClass = classVal.concat(' input_blank');
      }
    }
    this.inputRef.setAttribute('class', newClass);
  }
  renderTooltipTitle = () => {
    const { labelName, defaultValue } = this.state;
    if (labelName) {
      return (
        <div>
          <label>{labelName}</label>{' '}
          {`${defaultValue === labelName ? '' : `: ${defaultValue}`}`}
        </div>
      );
    } else {
      return <div>{defaultValue}</div>;
    }
  };

  handleMouseEnter = () => {
    if (this.props.hideTooltip) {
      return;
    }
    const { labelName, defaultValue } = this.state;
    if (labelName || defaultValue) {
      this.setState({
        toolTipVisible: true,
      });
    }
  };

  handleMouseLeave = () => {
    if (this.props.hideTooltip) {
      return;
    }
    this.setState({
      toolTipVisible: false,
    });
  };
  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };
  render() {
    const { inputValue, toolTipVisible, visible, defaultValue } = this.state;
    const { disabled, getPopupContainer, width, showClear } = this.props;
    const style = { width };

    const wrapperClassNames = classnames({
      selectCascader: true,
      'selectCascader-open': visible,
      'selectCascader-close': !visible,
    });

    const container = getPopupContainer
      ? getPopupContainer
      : (node) => node.parentNode;

    return (
      <div id="selectCascader" className={wrapperClassNames}>
        <Dropdown
          overlay={visible ? this.renderOptions() : <div />}
          visible={this.state.visible}
          trigger={['click']}
          onVisibleChange={this.handleVisibleChange}
          getPopupContainer={container}
          overlayClassName={this.props.className}
          disabled={disabled}
        >
          <div>
            <Tooltip
              placement="topLeft"
              visible={toolTipVisible}
              overlayClassName="select-cascader-tooltip"
              title={this.renderTooltipTitle()}
            >
              <div className="cascader-input-wrapper" style={style}>
                <div
                  onMouseEnter={this.handleMouseEnter}
                  onMouseLeave={this.handleMouseLeave}
                  className="cascader-input"
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  onInput={(e) => this.valueChange(e)}
                  ref={(r) => (this.inputRef = r)}
                  data-placeholder={this.state.placeholder}
                  onKeyDown={this.handleKeyDown}
                >
                  {inputValue}
                </div>
                {showClear && !visible && defaultValue && (
                  <Icon
                    type="close-circle"
                    className="clear-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      this.props.onClear && this.props.onClear();
                    }}
                  />
                )}
                <Icon type="caret-down" className="arrow" />
              </div>
            </Tooltip>
          </div>
        </Dropdown>
      </div>
    );
  }
}
