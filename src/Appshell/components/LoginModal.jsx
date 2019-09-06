import React, { Component } from 'react';
import { Modal, Input, Icon, Radio, Alert, Divider } from 'antd';
import "../styles/LoginModal.scss";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class LoginModal extends Component {
    state = {
        radioValue: "in",
        email: "",
        password: "",
        passwordConfirm: "",
    };

    onRadioChange = (e) => {
        this.setState({
            radioValue: e.target.value,
        })
    };

    onEmailInputChange = (e) => {
        this.setState({email: e.target.value});
    };
    onPasswordInputChange = (e) => {
        this.setState({password: e.target.value});
    };
    onConfirmPasswordInputChange = (e) => {
        this.setState({passwordConfirm: e.target.value});
    };

    renderSignIn = () => {
        return(
            <div className="user-input">
                <p>Email Address</p>
                <Input
                    placeholder="Email Address"
                    suffix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                    onChange={this.onEmailInputChange}
                    value={this.state.email}
                />
                <p>Password</p>
                <Input.Password
                    placeholder="Password"
                    onChange={this.onPasswordInputChange}
                    value={this.state.password}
                />
            </div>
        )
    };

    renderSignUp = () => {
        return(
            <div className="user-input">
              <p>Email Address</p>
              <Input
                  placeholder="Email Address"
                  suffix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                  onChange={this.onEmailInputChange}
                  value={this.state.email}
              />
              <p>Password</p>
              <Input.Password
                  placeholder="Password"
                  onChange={this.onPasswordInputChange}
                  value={this.state.password}
              />
              <p>Confirm Password</p>
              <Input.Password
                  placeholder="Confirm Password"
                  onChange={this.onConfirmPasswordInputChange}
                  value={this.state.passwordConfirm}
              />
              {this.state.password !== this.state.passwordConfirm &&
                  <Alert
                      description="Two passwords must be same."
                      type="error"
                      showIcon
                  />
              }
            </div>
        )
    };

    isSubmitDisabled = (radioValue) => {
        let disabled = !(this.state.email && this.state.password);
        if (radioValue !== 'in') {
            disabled = disabled || this.state.password !== this.state.passwordConfirm;
        }

        return disabled;
    };

    render() {
        const {radioValue} = this.state;
        return(
            <div>
                <Modal
                    title="Sign in/up"
                    visible={this.props.visible}
                    onOk={this.props.submit(this.state.email, this.state.password, radioValue === 'in')}
                    onCancel={this.props.handleModalClose}
                    okButtonProps={{disabled: this.isSubmitDisabled(radioValue)}}
                    okText={radioValue === 'in' ? "Sign In" : "Sign Up"}
                >
                    <div>
                        <RadioGroup onChange={this.onRadioChange} defaultValue={radioValue} buttonStyle="solid">
                            <RadioButton value="in">Sign In</RadioButton>
                            <RadioButton value="up">Sign Up</RadioButton>
                        </RadioGroup>
                      <Divider dashed/>
                        {radioValue === 'in' ? this.renderSignIn() : this.renderSignUp()}
                    </div>
                </Modal>
            </div>
        );
    }
}

export default LoginModal;