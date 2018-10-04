import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import { 
    Modal,
    Form,
    Input,
    Alert
} from 'antd';
import api from '../api';
import {
    updateField,
    closeEditor
} from '../actions';

const mapStateToProps = state => state;
const mapDispatchToProps = {
    updateField,
    closeEditor
};

const FormItem = Form.Item;

class ModalEditor extends PureComponent {
    constructor(props) {
        super(props);
        this.fields = [
            {
                name: 'email',
                type: 'email'
            },
            {
                name: 'name',
                type: 'text'
            },
            {
                name: 'password',
                type: 'password'
            }
        ]
    }
    submitForm = () => {
        const userObj = this.props.editor.item;
        this.props.editor.isNewItem ? this.props.onCreate(userObj) : this.props.onUpdate(userObj);
    }
    onChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        this.props.updateField(key, value);
    }
    render () {
        const { isOpen, item, isNewItem, error } = this.props.editor;
        return (
            <Modal
              title={isNewItem ? 'Add new user' : ('Edit user ' + (item.name || item.objectId || ''))}
              visible={isOpen}
              onOk={this.submitForm}
              onCancel={this.props.closeEditor}
            >
                <Form
                    layout="horizontal"
                    onSubmit={this.submitForm}
                >
                    {
                        this.fields.map(i => {
                            return (
                                <FormItem
                                    key={i.name}
                                    label={i.name}
                                >
                                    <Input
                                        type={i.type}
                                        name={i.name}
                                        value={item[i.name] || ''}
                                        onChange={this.onChange}
                                     />
                                </FormItem>
                            )
                        })
                    }
                </Form>
                {
                    error ? <Alert message={error} type="error" banner /> : ''
                }
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditor);