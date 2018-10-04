import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { 
    Table,
    Button,
    Divider
} from 'antd';
import {
    openEditor,
    setPagination,
    openConfirmationModal
} from '../actions';

const mapStateToProps = state => state;
const mapDispatchToProps = {
    openEditor,
    setPagination,
    openConfirmationModal
};

class DataTable extends PureComponent {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email'
            }, 
            {
                title: '',
                dataIndex: 'actions',
                render: (text, record) => {
                    return (
                        <div style={{textAlign: 'right'}}>
                            <Button
                                type="primary"
                                shape="circle"
                                icon="edit"
                                size="small"
                                onClick={() => this.props.openEditor(record)}
                            />
                            <Divider type="vertical" />
                            <Button
                                type="danger"
                                shape="circle"
                                icon="delete"
                                size="small"
                                onClick={() => this.props.openConfirmationModal(record)}
                            />
                        </div>
                    )
                }
            }
        ];
    }
    handleTableChange = (pagination) => {
        const offset = ( pagination.current - 1 ) * pagination.pageSize;
        this.props.fetchData({
            ...pagination,
            offset: offset
        })
    }
    render () {
        return (
            <Table 
                loading={this.props.isLoading}
                rowKey={record => record.objectId}
                dataSource={this.props.tableData} 
                columns={this.columns}
                size="small"
                onChange={this.handleTableChange}
                pagination={this.props.pagination}
            />
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);