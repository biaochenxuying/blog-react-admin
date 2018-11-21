import React from 'react';
import { Input, Modal } from 'antd';

class TagComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	render() {
		const normalCenter = {
			textAlign: 'center',
			marginBottom: 20,
		};
		return (
  <div>
    <Modal
      title="添加标签"
      visible={this.props.visible}
      onOk={this.props.handleOk}
      width="600px"
      onCancel={this.props.handleCancel}
    >
      <Input
        style={normalCenter}
        addonBefore="标签名"
        size="large"
        placeholder="标签名"
        name="title"
        value={this.props.name}
        onChange={this.props.handleChange}
      />
      <Input
        
        addonBefore="描述"
        size="large"
        placeholder="描述"
        name="title"
        value={this.props.desc}
        onChange={this.props.handleDescChange}
      />
    </Modal>
  </div>
		);
	}
}

export default TagComponent;
