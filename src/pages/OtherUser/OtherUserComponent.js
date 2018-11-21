import React from 'react';
import { Input, Modal } from 'antd';

class OtherUserComponent extends React.Component {
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
      title="添加链接"
      visible={this.props.visible}
      onOk={this.props.handleOk}
      width="600px"
      onCancel={this.props.handleCancel}
    >
      <Input
        style={normalCenter}
        addonBefore="链接名"
        size="large"
        placeholder="链接名"
        name="name"
        value={this.props.name}
        onChange={this.props.handleChange}
      />
      <Input
        style={normalCenter}
        addonBefore="链接图标"
        size="large"
        placeholder="链接图标"
        name="icon"
        value={this.props.icon}
        onChange={this.props.handleIconChange}
      />
      <Input
        style={normalCenter}
        addonBefore="链接链接"
        size="large"
        placeholder="链接链接"
        name="url"
        value={this.props.url}
        onChange={this.props.handleUrlChange}
      />
      <Input
        style={normalCenter}
        addonBefore="链接类型"
        size="large"
        placeholder="1 :其他友情链接 2: 是博主的个人链接 "
        name="type"
        value={this.props.type}
        onChange={this.props.handleTypeChange}
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

export default OtherUserComponent;
