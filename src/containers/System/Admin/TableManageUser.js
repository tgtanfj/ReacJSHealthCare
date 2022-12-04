import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
// import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService'
import './TableManageUser.scss'
import * as actions from '../../../store/actions'
import { relativeTimeRounding } from 'moment';

class TableManageUser extends Component {

    constructor(props) {
        super([props])
        this.state = {
            usersRedux: [],
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers
            })
        }
    }

    // Life cycle
    // Run component
    // 1. run construction -> init state
    // 2. did mount (set state)
    // 3. render

    handleDeleteUser = (user) => {
        this.props.deleteUserServiceRedux(user.id)
    }

    render() {
        console.log('healthcare check all users', this.props.listUsers)
        console.log('check state: ', this.state.usersRedux)
        let arrUsers = this.state.usersRedux
        return (
            <table id='TableManageUser'>
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                    {arrUsers && arrUsers.length > 0 &&
                        arrUsers.map((item, index) => {
                            return (
                                <tr key='index'>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button

                                            className='btn-edit'><i className="fas fa-pencil-alt"></i></button>
                                        <button
                                            onClick={() => this.handleDeleteUser(item)}
                                            className='btn-delete'><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }

}

const mapStateToProps = state => {
    return {
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart()),
        deleteUserServiceRedux: (id) => dispatch(actions.deleteANewUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
