import React, { Component, Fragment } from 'react';
import Input from 'components/Input';

import { StyledEdit, StyledTask, StyledDelete, StyledText, StyledButton, StyledEditForm, StyledButtonsWrapper } from './styles';

class Task extends Component {
    state = {
        editValue: '',
        isEdit: false,
    };

    onEditChange = (value) => this.setState({ editValue: value });

    onEditPress = () => this.setState({ editValue: this.props.children, isEdit: true });

    onSaveEdit = (e) => {
        e.preventDefault();

        const { editValue } = this.state;

        if (editValue) {
            const { id } = this.props;

            this.props.onSave({ id, text: this.state.editValue });
            this.setState({ editValue: '', isEdit: false });
        }
    };

    render() {
        const { onDelete, children, id } = this.props;

        return (
            <StyledTask>
                {this.state.isEdit ? (
                    <StyledEditForm onSubmit={this.onSaveEdit} onBlur={this.onSaveEdit} >
                        <Input 
                            onChange={this.onEditChange} value={this.state.editValue}
                            placeholder="Task must contain title"
                        />
                    </StyledEditForm>
                ) : (
                    <Fragment>
                        <StyledText>{children}</StyledText>

                        <StyledButtonsWrapper>
                            <StyledButton onClick={this.onEditPress}>
                                <StyledEdit />
                            </StyledButton>
                            <StyledButton onClick={() => onDelete(id)}>
                                <StyledDelete />
                            </StyledButton>
                        </StyledButtonsWrapper>
                    </Fragment>
                )}
            </StyledTask>
        );
    }
}

export default Task;