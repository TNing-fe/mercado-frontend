import React from 'react'
import { Form, Icon, Input, Button, Toast } from '@terminus/nusi'
import { FormProps, WrappedFormUtils } from '@terminus/nusi/es/form'
import { history } from 'umi'
import request from '@/utils/request'
import styles from './index.less'
import logoImage from '../../../assets/logo.png'
import loginImage from '../../../assets/login.png'

const FormItem = Form.Item

interface IProps {
  form: FormProps & WrappedFormUtils;
}

class NormalLoginForm extends React.Component<IProps> {
  handleSubmit = (e: any) => {
    e.preventDefault()

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const res = await request('/api/login', 'post', values)
        if (res) {
          sessionStorage.setItem('token', res?.token)
          history.push('/admin/navigation')
          Toast.success('登陆成功')
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className={styles.wrapper}>
        <div className={styles.logoWrapper}>
          <img src={logoImage} alt="" />
        </div>
        <div className={styles.formWrap}>
          <img src={loginImage} alt="" />
          <Form onSubmit={this.handleSubmit} style={{ width: '50%' }}>
            <FormItem>
              {getFieldDecorator('username', {
                rules: [{ required: true, message: '请输入用户名!' }]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Username"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
              >
                登陆
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm)

export default WrappedNormalLoginForm
