import * as React from 'react'
import * as CSSModules from 'react-css-modules'
import {connect} from 'react-redux'
import {History} from 'history'
import {Paper, RaisedButton, TextField} from 'material-ui'
import {changeSignInFrom, ChangeSignInFromAction} from '../../actions/signIn'
import {StoreState, SignInFrom} from '../../reducers/types'

const styles = require('./index.scss')

interface Props {
    history: History,
    signInFrom: SignInFrom,

    changeSignInFrom: ChangeSignInFromAction,
}

@CSSModules(styles)
class Signin extends React.Component<Props, {}> {
    public render() {
        return (
            <Paper styleName="sign-box" zDepth={2}>
                <h1 styleName="title">思沃学院考试系统</h1>
                <TextField
                    hintText="Type your user name"
                    floatingLabelText="User Name"
                    fullWidth={true}
                    value={this.props.signInFrom.username}
                    onChange={this.changeInputFrom.bind(this, 'username')}
                />
                <TextField
                    hintText="Type your password"
                    floatingLabelText="Password"
                    fullWidth={true}
                    type="password"
                    value={this.props.signInFrom.password}
                    onChange={this.changeInputFrom.bind(this, 'password')}
                />
                <RaisedButton
                    label="Sign In"
                    primary={true}
                    fullWidth={true}
                    style={{marginTop: 10}}
                    onTouchTap={this.signIn}
                />
            </Paper>
        )
    }

    private changeInputFrom = (field: string,
                               event: React.ChangeEvent<HTMLInputElement>) => {
        let fields = {}
        fields[field] = event.target.value
        console.log(this.props.changeSignInFrom(fields))
    }

    private signIn = () => {
        //TODO: validate  api
        let username = this.props.signInFrom.username
        let password = this.props.signInFrom.password
        fetch('http://10.206.124.80:8082/api/login_exam', {
            method: 'POST',
            headers: new Headers(),
            body: {
                username, password
            }
        }).then((response) => {
            console.log(response)
            if (response.status === 200) {
                this.props.history.push('/home');
            } else {
                alert(response.body);
            }
        })
    }
}

const mapStateToProps = (state: StoreState) => ({
    signInFrom: state.signInFrom,
})

const mapDispatchToProps = {
    changeSignInFrom
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)
