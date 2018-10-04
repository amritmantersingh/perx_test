import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { 
    Modal,
    Alert
} from 'antd';
import api from '../api';
import {
    closeConfirmationModal
} from '../actions';

const mapStateToProps = state => state;
const mapDispatchToProps = {
    closeConfirmationModal
};

class ModalRemoveConfirmation extends PureComponent {
    render () {
        const userToRemove = this.props.userToRemove;
        const userIdToRemove = userToRemove && userToRemove.objectId;
        const userNameToRemove = userToRemove && ( userToRemove.name || userIdToRemove );
        const isOpen = !!userIdToRemove;
        return (
            <Modal
              title={'Confirm remove user ' + userNameToRemove}
              visible={isOpen}
              onOk={this.props.deleteUser}
              onCancel={this.props.closeConfirmationModal}
            >
                <Alert
                  message="Warning"
                  description={"Are you sure to delete user " + userNameToRemove + "?"}
                  type="warning"
                  showIcon
                />
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalRemoveConfirmation);