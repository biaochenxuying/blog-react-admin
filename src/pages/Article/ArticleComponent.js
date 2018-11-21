import React from 'react';
import { Input, Modal, Select, notification } from 'antd';
import { connect } from 'dva';

@connect(({ article, tag, category }) => ({
  article,
  tag,
  category,
}))
class ArticleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      keywordCom: '',
      pageNum: 1,
      pageSize: 50,
    };
    this.handleSearchTag = this.handleSearchTag.bind(this);
    this.handleSearchCategory = this.handleSearchCategory.bind(this);
  }

  componentDidMount() {
    this.handleSearchTag();
    this.handleSearchCategory();
  }

  handleSearchTag = () => {
    this.setState({
      loading: true,
    });
    const { dispatch } = this.props;
    const params = {
      keyword: this.state.keywordCom,
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
    };
    new Promise(resolve => {
      dispatch({
        type: 'tag/queryTag',
        payload: {
          resolve,
          params,
        },
      });
    }).then(res => {
      // console.log('res :', res);
      if (res.code === 0) {
        this.setState({
          loading: false,
        });
      } else {
        notification.error({
          message: res.message,
        });
      }
    });
  };

  handleSearchCategory = () => {
    this.setState({
      loading: true,
    });
    const { dispatch } = this.props;
    const params = {
      keyword: this.state.keyword,
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
    };
    new Promise(resolve => {
      dispatch({
        type: 'category/queryCategory',
        payload: {
          resolve,
          params,
        },
      });
    }).then(res => {
      // console.log('res :', res);
      if (res.code === 0) {
        this.setState({
          loading: false,
        });
      } else {
        notification.error({
          message: res.message,
        });
      }
    });
  };

  render() {
    const { tagList } = this.props.tag;
    const { categoryList } = this.props.category;
    const children = [];
    const categoryChildren = [];
    for (let i = 0; i < tagList.length; i++) {
      const e = tagList[i];
      children.push(
        <Select.Option key={e._id} value={e._id}>
          {e.name}
        </Select.Option>
      );
    }
    for (let i = 0; i < categoryList.length; i++) {
      const e = categoryList[i];
      categoryChildren.push(
        <Select.Option key={e._id} value={e._id}>
          {e.name}
        </Select.Option>
      );
    }
    const { articleDetail } = this.props.article;
    const { changeType } = this.props;
    let originDefault = '原创';
    let stateDefault = '发布'; // 文章发布状态 => 0 草稿，1 发布
    let typeDefault = '普通文章'; // 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍
    let categoryDefault = [];
    let tagsDefault = [];
    if (changeType) {
      originDefault = articleDetail.origin === 0 ? '原创' : '';
      stateDefault = articleDetail.state ? '已发布' : '草稿';
      typeDefault =
        articleDetail.type === 1 ? '普通文章' : articleDetail.type === 2 ? '简历' : '管理员介绍';
      categoryDefault = this.props.categoryDefault;
      tagsDefault = this.props.tagsDefault;
    } else {
      originDefault = '原创';
      stateDefault = '发布'; // 文章发布状态 => 0 草稿，1 发布
      categoryDefault = [];
      tagsDefault = [];
    }
    // console.log('originDefault :', originDefault)
    // console.log('stateDefault :', stateDefault)
    // console.log('categoryDefault :', categoryDefault)
    // console.log('tagsDefault :', tagsDefault)
    const { TextArea } = Input;
    const normalCenter = {
      textAlign: 'center',
      marginBottom: 20,
    };
    return (
      <div>
        <Modal
          title="添加与修改文章"
          visible={this.props.visible}
          onOk={this.props.handleOk}
          width="1200px"
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
          <Input
            style={normalCenter}
            addonBefore="作者"
            size="large"
            placeholder="作者"
            name="author"
            value={this.props.author}
            onChange={this.props.handleChangeAuthor}
          />
          <Input
            style={normalCenter}
            addonBefore="关键字"
            size="large"
            placeholder="关键字"
            name="keyword"
            value={this.props.keyword}
            onChange={this.props.handleChangeKeyword}
          />
          <Input
            style={normalCenter}
            addonBefore="描述"
            size="large"
            placeholder="描述"
            name="desc"
            value={this.props.desc}
            onChange={this.props.handleChangeDesc}
          />
          <Input
            style={normalCenter}
            addonBefore="封面链接"
            size="large"
            placeholder="封面链接"
            name="img_url"
            value={this.props.img_url}
            onChange={this.props.handleChangeImgUrl}
          />

          <Select
            style={{ width: 200, marginTop: 20, marginBottom: 20 }}
            placeholder="选择发布状态"
            defaultValue={stateDefault}
            onChange={this.props.handleChangeState}
          >
            {/*  0 草稿，1 发布 */}
            <Select.Option value="0">草稿</Select.Option>
            <Select.Option value="1">发布</Select.Option>
          </Select>

          <Select
            style={{ width: 200, marginTop: 20, marginBottom: 20 }}
            placeholder="选择文章类型"
            defaultValue={typeDefault}
            onChange={this.props.handleChangeType}
          >
            {/* 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍 */}
            <Select.Option value="1">普通文章</Select.Option>
            <Select.Option value="2">简历</Select.Option>
            <Select.Option value="3">管理员介绍</Select.Option>
          </Select>

          <Select
            style={{ width: 200, marginTop: 20, marginLeft: 10, marginBottom: 20 }}
            placeholder="选择文章转载状态"
            defaultValue={originDefault}
            onChange={this.props.handleChangeOrigin}
          >
            {/* 0 原创，1 转载，2 混合 */}
            <Select.Option value="0">原创</Select.Option>
            <Select.Option value="1">转载</Select.Option>
            <Select.Option value="2">混合</Select.Option>
          </Select>

          <Select
            allowClear
            mode="multiple"
            style={{ width: 200, marginTop: 20, marginLeft: 10, marginBottom: 20 }}
            placeholder="标签"
            defaultValue={tagsDefault}
            value={this.props.tagsDefault}
            onChange={this.props.handleTagChange}
          >
            {children}
          </Select>
          <Select
            allowClear
            mode="multiple"
            style={{ width: 200, marginTop: 20, marginLeft: 10, marginBottom: 20 }}
            placeholder="文章分类"
            defaultValue={categoryDefault}
            value={this.props.categoryDefault}
            onChange={this.props.handleCategoryChange}
          >
            {categoryChildren}
          </Select>
          <TextArea
            style={{ marginBottom: 20 }}
            size="large"
            rows={6}
            autosize={{ minRows: 15 }}
            placeholder="文章内容，支持 markdown 格式"
            name="content"
            value={this.props.content}
            onChange={this.props.handleChangeContent}
          />
        </Modal>
      </div>
    );
  }
}

export default ArticleComponent;
