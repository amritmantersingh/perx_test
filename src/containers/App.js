import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import DataTable from '../components/DataTable';
import ModalEditor from '../components/ModalEditor';
import ModalRemoveConfirmation from '../components/ModalRemoveConfirmation';
import { Button } from 'antd';
import api from '../api';
import { 
    startLoading,
    finishLoading,
    storeTableData,
    openEditor,
    closeEditor,
    handleEditorError,
    setPagination,
    closeConfirmationModal
} from '../actions'

const mapStateToProps = state => state;
const mapDispatchToProps = {
    startLoading,
    finishLoading,
    storeTableData,
    openEditor,
    closeEditor,
    handleEditorError,
    setPagination,
    closeConfirmationModal
};

class App extends PureComponent {
    componentDidMount () {
        this.fetchData();
    }
    fetchData = (pagination) => {
        this.props.startLoading();
        const pager = {
            ...this.props.pagination,
            ...pagination
        }
        api.Users.getCount()
            .then(res => {
                this.props.setPagination({
                    ...pager,
                    total: res.data || 0
                });
            })
        api.Users.getList({
            offset: pager.offset,
            pageSize: pager.pageSize
        }).then(res => {
            this.props.storeTableData(res.data);
        })
        .catch(error => { return error })
        .finally(() => { this.props.finishLoading(); });
    }   
    updateUser = (userData) => {
        api.Users.update(userData.objectId, userData)
            .then( res => {
                    this.fetchData();
                    this.props.closeEditor();
                }, err => {
                    this.handleError(err);
                })
    }
    createUser = (userData) => {
        api.Users.add(userData)
            .then( res => {
                    this.fetchData();
                    this.props.closeEditor();
                }, err => {
                    this.handleError(err);
                })
    }
    deleteUser = () => {
        api.Users.remove(this.props.userToRemove.objectId)
            .then( res => {
                    this.fetchData();
                    this.props.closeConfirmationModal()
                }, err => {
                    return err
                })
    }
    handleError = (err) => {
        const error = err.response && err.response.data;
        if (error) this.props.handleEditorError(error.message);
    }
    render() {
        return (
            <div>
                <div style={{padding: 24}}>
                    <Button
                        icon="user"
                        type="primary"
                        onClick={() => this.props.openEditor(null)}
                        style={{marginBottom: 24}}
                    >
                        Add user
                    </Button> 
                    <DataTable
                        fetchData={this.fetchData}
                    />
                </div>
                <ModalEditor 
                    onUpdate={this.updateUser}
                    onCreate={this.createUser}
                    fetchData={this.fetchData}
                />
                <ModalRemoveConfirmation
                    deleteUser={this.deleteUser}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);