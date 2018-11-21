import React from 'react';
import { Input, Modal, Select, DatePicker } from 'antd';
import { connect } from 'dva';

const { RangePicker } = DatePicker;

@connect(({ timeAxis }) => ({
	timeAxis,
}))
class TimeAxisComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			
		};
	}
  
  checkUpdate(){
    const { changeType } = this.props;
		const { timeAxisDetail } = this.props.timeAxis;
		if (changeType) {
      this.setState({
        title: timeAxisDetail.title,
        state: timeAxisDetail.state,
        content: timeAxisDetail.content,
      });
		}
  }

  

	render() {
    
    const { TextArea } = Input;
		const normalCenter = {
			textAlign: 'center',
			marginBottom: 20,
		};
		return (
  <div>
    <Modal
      title="添加与修改时间轴"
      visible={this.props.visible}
      onOk={this.props.handleOk}
      width="800px"
      onCancel={this.props.handleCancel}
    >
      <Input
        style={normalCenter}
        addonBefore="标题"
        size="large"
        placeholder="标题"
        name="title"
        value={this.props.title}
        onChange={this.props.handleChange}
      />
      <TextArea
        style={normalCenter}
        size="large"
        placeholder="内容"
        name="content"
        value={this.props.content}
        onChange={this.props.handleChangeContent}
      />
      <RangePicker style={{marginBottom: '20px',width: '100%'}} onChange={this.props.onChangeTime} />
      <Select
        style={{marginBottom: '20px',width: '100%'}}
        placeholder="选择状态"
        defaultValue={this.props.state === 1 ? '已完成' : this.props.state === 2 ? '正在进行中' : '未完成'}
        onChange={this.props.handleStateChange}
      >
        {/* 状态 1 是已经完成 ，2 是正在进行，3 是没完成 */}
        <Select.Option value="1">已完成</Select.Option>
        <Select.Option value="2">正在进行中</Select.Option>
        <Select.Option value="3">没完成</Select.Option>
      </Select>
    </Modal>
  </div>
		);
	}
}

export default TimeAxisComponent;
