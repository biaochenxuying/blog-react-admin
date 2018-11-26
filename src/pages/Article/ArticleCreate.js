import React from 'react';
import { Input, Select, Button, notification } from 'antd';
import { connect } from 'dva';
import SimpleMDE from 'simplemde';
import marked from 'marked';
import highlight from 'highlight.js';
import 'simplemde/dist/simplemde.min.css';
import './style.less';

@connect(({ article, tag, category }) => ({
	article,
	tag,
	category,
}))
class ArticleCreate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			smde: null,
			loading: false,
			keywordCom: '',
			pageNum: 1,
			pageSize: 50,
			changeType: false,
			title: '',
			author: 'biaochenxuying',
			keyword: '',
			content: '',
			desc: '',
			img_url: '',
			origin: 0, // 0 原创，1 转载，2 混合
			state: 1, // 文章发布状态 => 0 草稿，1 已发布
			type: 1, // 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍
			tags: '',
			category: '',
			tagsDefault: [],
			categoryDefault: [],
		};
		this.handleSearchTag = this.handleSearchTag.bind(this);
		this.handleSearchCategory = this.handleSearchCategory.bind(this);
		this.getSmdeValue = this.getSmdeValue.bind(this);
		this.setSmdeValue = this.setSmdeValue.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.handleChangeState = this.handleChangeState.bind(this);
		this.handleTagChange = this.handleTagChange.bind(this);
		this.handleChangeOrigin = this.handleChangeOrigin.bind(this);
		this.handleChangeType = this.handleChangeType.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.handleSearchTag();
		this.handleSearchCategory();

		this.state.smde = new SimpleMDE({
			element: document.getElementById('editor').childElementCount,
			autofocus: true,
			autosave: true,
			previewRender(plainText) {
				return marked(plainText, {
					renderer: new marked.Renderer(),
					gfm: true,
					pedantic: false,
					sanitize: false,
					tables: true,
					breaks: true,
					smartLists: true,
					smartypants: true,
					highlight(code) {
						return highlight.highlightAuto(code).value;
					},
				});
			},
		});
	}

	handleSubmit() {
		const { dispatch } = this.props;
		const { articleDetail } = this.props.article;
		if(!this.state.title){
			notification.error({
				message: "文章标题不能为空",
			});
			return
		}
		if(!this.state.keyword){
			notification.error({
				message: "文章关键字不能为空",
			});
			return
		}
		if(!this.state.smde.value()){
			notification.error({
				message: "文章内容不能为空",
			});
			return
		}
		let keyword = this.state.keyword;
		if (keyword instanceof Array) {
			keyword = keyword.join(',');
		}
		this.setState({
			loading: true,
		});
		// 修改
		if (this.state.changeType) {
			const params = {
				id: articleDetail._id,
				title: this.state.title,
				author: this.state.author,
				desc: this.state.desc,
				keyword,
				content: this.state.content,
				img_url: this.state.img_url,
				origin: this.state.origin,
				state: this.state.state,
				type: this.state.type,
				tags: this.state.tags,
				category: this.state.category,
			};
			new Promise(resolve => {
				dispatch({
					type: 'article/updateArticle',
					payload: {
						resolve,
						params,
					},
				});
			}).then(res => {
				if (res.code === 0) {
					notification.success({
						message: res.message,
					});
					this.setState({
						visible: false,
						changeType: false,
						title: '',
						author: 'biaochenxuying',
						keyword: '',
						content: '',
						desc: '',
						img_url: '',
						origin: 0, // 0 原创，1 转载，2 混合
						state: 1, // 文章发布状态 => 0 草稿，1 已发布
						type: 1, // 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍
						tags: '',
						category: '',
						tagsDefault: [],
						categoryDefault: [],
					});
					this.handleSearch(this.state.pageNum, this.state.pageSize);
				} else {
					notification.error({
						message: res.message,
					});
				}
			});
		} else {
			// 添加
			const params = {
				title: this.state.title,
				author: this.state.author,
				desc: this.state.desc,
				keyword: this.state.keyword,
				content: this.state.smde.value(),
				img_url: this.state.img_url,
				origin: this.state.origin,
				state: this.state.state,
				type: this.state.type,
				tags: this.state.tags,
				category: this.state.category,
			};
			new Promise(resolve => {
				dispatch({
					type: 'article/addArticle',
					payload: {
						resolve,
						params,
					},
				});
			}).then(res => {
				if (res.code === 0) {
					notification.success({
						message: res.message,
					});
					this.setState({
						loading: false,
						chnageType: false,
					});
					// this.handleSearch(this.state.pageNum, this.state.pageSize);
				} else {
					notification.error({
						message: res.message,
					});
				}
			});
		}
	}

	getSmdeValue() {
		// console.log('this.state.smde.value() :', this.state.smde.value());
		return this.state.smde.value();
	}

	setSmdeValue(value) {
		this.state.smde.value(value);
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleTagChange(value) {
		const tags = value.join();
		console.log('tags :', tags);
		this.setState({
			tagsDefault: value,
			tags,
		});
	}

	handleCategoryChange(value) {
		const category = value.join();
		console.log('category :', category);
		this.setState({
			categoryDefault: value,
			category,
		});
	}

	handleChangeState(value) {
		this.setState({
			state: value,
		});
	}

	handleChangeOrigin(value) {
		this.setState({
			origin: value,
		});
	}

	handleChangeType(value) {
		console.log('type :', value);
		this.setState({
			type: value,
		});
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
  </Select.Option>,
			);
		}
		for (let i = 0; i < categoryList.length; i++) {
			const e = categoryList[i];
			categoryChildren.push(
  <Select.Option key={e._id} value={e._id}>
    {e.name}
  </Select.Option>,
			);
		}
		// const { articleDetail } = this.props.article;
		// const { changeType } = this.props;
		let originDefault = '原创';
		let stateDefault = '发布'; // 文章发布状态 => 0 草稿，1 发布
		const typeDefault = '普通文章'; // 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍
		let categoryDefault = [];
		let tagsDefault = [];
		// if (changeType) {
		// 	originDefault = articleDetail.origin === 0 ? '原创' : '';
		// 	stateDefault = articleDetail.state ? '已发布' : '草稿';
		// 	typeDefault = articleDetail.type === 1 ? '普通文章' : articleDetail.type === 2 ? '简历' : '管理员介绍';
		// 	categoryDefault = this.props.categoryDefault;
		// 	tagsDefault = this.props.tagsDefault;
		// } else {
		originDefault = '原创';
		stateDefault = '发布'; // 文章发布状态 => 0 草稿，1 发布
		categoryDefault = [];
		tagsDefault = [];
		// }
		const normalCenter = {
			textAlign: 'center',
			marginBottom: 10,
		};

		return (
  <div>
    <Input
      style={normalCenter}
      addonBefore="标题"
      size="large"
      placeholder="标题"
      name="title"
      value={this.state.title}
      onChange={this.handleChange}
    />
    <Input
      style={normalCenter}
      addonBefore="作者"
      size="large"
      placeholder="作者"
      name="author"
      value={this.state.author}
      onChange={this.handleChange}
    />
    <Input
      style={normalCenter}
      addonBefore="关键字"
      size="large"
      placeholder="关键字"
      name="keyword"
      value={this.state.keyword}
      onChange={this.handleChange}
    />
    <Input
      style={normalCenter}
      addonBefore="描述"
      size="large"
      placeholder="描述"
      name="desc"
      value={this.state.desc}
      onChange={this.handleChange}
    />
    <Input
      style={normalCenter}
      addonBefore="封面链接"
      size="large"
      placeholder="封面链接"
      name="img_url"
      value={this.state.img_url}
      onChange={this.handleChange}
    />

    <Select
      style={{ width: 200, marginBottom: 20 }}
      placeholder="选择发布状态"
      defaultValue={stateDefault}
      onChange={this.handleChangeState}
    >
      {/*  0 草稿，1 发布 */}
      <Select.Option value="0">草稿</Select.Option>
      <Select.Option value="1">发布</Select.Option>
    </Select>

    <Select
      style={{ width: 200, marginLeft: 10, marginBottom: 20 }}
      placeholder="选择文章类型"
      defaultValue={typeDefault}
      onChange={this.handleChangeType}
    >
      {/* 文章类型 => 1: 普通文章，2: 简历，3: 管理员介绍 */}
      <Select.Option value="1">普通文章</Select.Option>
      <Select.Option value="2">简历</Select.Option>
      <Select.Option value="3">管理员介绍</Select.Option>
    </Select>

    <Select
      style={{ width: 200, marginLeft: 10, marginBottom: 20 }}
      placeholder="选择文章转载状态"
      defaultValue={originDefault}
      onChange={this.handleChangeOrigin}
    >
      {/* 0 原创，1 转载，2 混合 */}
      <Select.Option value="0">原创</Select.Option>
      <Select.Option value="1">转载</Select.Option>
      <Select.Option value="2">混合</Select.Option>
    </Select>

    <Select
      allowClear
      mode="multiple"
      style={{ width: 200, marginLeft: 10, marginBottom: 20 }}
      placeholder="标签"
      defaultValue={tagsDefault}
      value={this.state.tagsDefault}
      onChange={this.handleTagChange}
    >
      {children}
    </Select>
    <Select
      allowClear
      mode="multiple"
      style={{ width: 200, marginLeft: 10, marginBottom: 10 }}
      placeholder="文章分类"
      defaultValue={categoryDefault}
      value={this.state.categoryDefault}
      onChange={this.handleCategoryChange}
    >
      {categoryChildren}
    </Select>
    <div>
      <Button
        onClick={() => {
							this.handleSubmit();
						}}
        loading={this.state.loading}
        style={{ marginBottom: '10px' }}
        type="primary"
      >
						提交
      </Button>
    </div>

    <div title="添加与修改文章" width="1200px">
      <textarea id="editor" style={{ marginBottom: 20, width: 800 }} size="large" rows={6} />
    </div>
  </div>
		);
	}
}

export default ArticleCreate;
