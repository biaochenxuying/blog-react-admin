import React from 'react';
import { Input, Modal } from 'antd';

class LinkComponent extends React.Component {
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
      title="添加分类"
      visible={this.props.visible}
      onOk={this.props.handleOk}
      width="600px"
      onCancel={this.props.handleCancel}
    >
      <Input
        style={normalCenter}
        addonBefore="分类名"
        size="large"
        placeholder="分类名"
        name="name"
        value={this.props.name}
        onChange={this.props.handleChange}
      />
      <Input
        
        addonBefore="描述"
        size="large"
        placeholder="描述"
        name="desc"
        value={this.props.desc}
        onChange={this.props.handleDescChange}
      />
    </Modal>
  </div>
		);
	}
}

export default LinkComponent;
