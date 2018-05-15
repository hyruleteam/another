import React, { Component } from 'react';
import { Button, Table, Avatar, Tag,Popconfirm } from 'antd';

import MainLayout from '../layout/MainLayout';
import publicStyles from '../layout/public.less';
import styles from './index.less';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchList, showLocalModal, showData, deleteData} from '../../actions/projectList';

class ProjectList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchList();
  }

  renderActions(isDefault,type,id) {
    if(isDefault === 1){
      return [<span className={publicStyles['op-list-btn']} key={id+'1'}>创建项目</span>]
    } else if (isDefault === 0){
      return [<span className={publicStyles['op-list-btn']} key={id+'1'}>创建项目</span>,
      <span key={id+'2'} className={publicStyles['op-list-btn']} onClick={() => {this.props.showData(id,type)}}>编辑</span>,
      <Popconfirm key={id+'3'} placement="topRight" title="确认删除？" onConfirm={() => {this.props.deleteData(id)}} okText="确认" cancelText="取消">
        <span className={publicStyles['op-list-btn']}>删除</span>
      </Popconfirm>]
    }
  };

  render() {
    const columns = [{
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    }, {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: 240,
    }, {
      title: '开发者',
      key: 'author',
      dataIndex: 'author',
      width: 150,
    },
    {
      title: '操作',
      key: 'opration',
      width: 150,
      render: (text, record) => {
        if(!record.isInit){
          return (
            <div>
              <span className={publicStyles['op-list-btn']} key={record.id+'1'}>初始化项目</span>
            </div>
          )
        }else{
          return (
            <div>
              <span className={publicStyles['op-list-btn']} key={record.id+'2'}>打开调试窗口</span>
            </div>
          )
        }
      }
    }];

    return (
      <MainLayout location={this.props.location}>
        <div className={styles['m-project-list']}>
        <Table columns={columns} dataSource={this.props.projectList.list} 
        loading={this.props.common.status} rowKey={record => record._id} size="middle" pagination={false}/>
        </div>
      </MainLayout>
    );
  }
}

const mapStateToProps = store => {
  return { projectList: store.projectList,common: store.common };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchList: bindActionCreators(fetchList, dispatch),
    showLocalModal: bindActionCreators(showLocalModal, dispatch),
    showData: bindActionCreators(showData, dispatch),
    deleteData:bindActionCreators(deleteData, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);
