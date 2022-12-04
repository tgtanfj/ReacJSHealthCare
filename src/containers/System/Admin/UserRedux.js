import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils'
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';

import * as actions from '../../../store/actions'
import { isBreakStatement } from 'typescript';

class UserRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            previewImgUrl: [],
            isOpen: false,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGenders = this.props.genderRedux
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
            })
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRoles = this.props.roleRedux
            this.setState({
                roleArr: this.props.roleRedux,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPositions = this.props.positionRedux
            this.setState({
                positionArr: this.props.positionRedux,
                position: arrPositions && arrPositions.length > 0 ? arrPositions[0].key : ''
            })
        }
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: '',
                position: '',
                role: '',
                avatar: '',
            })
        }
    }

    handleOnchangeImg = (event) => {
        let data = event.target.files
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgUrl: objectUrl,
                avatar: file,
            })
        }
    }

    openReviewImg = () => {
        if (this.state.previewImgUrl === '') return;
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return

        // fire redux action
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phonenumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position
        })
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })
    }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['email', 'password', 'firstName',
            'lastName', 'phoneNumber', 'address',]
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                alert('This input is required: ' + arrCheck[i])
                break
            }
        }

        return isValid
    }

    render() {
        let genders = this.state.genderArr
        let language = this.props.language
        let roles = this.state.roleArr
        let positions = this.state.positionArr
        let isGetGender = this.props.isLoadingGender

        let { email, password, firstName,
            lastName, phoneNumber, address,
            gender, position, role, avatar } = this.state

        return (
            <div className='user-redux-container'>
                <div className='title'>
                    Manage User using Redux
                </div>
                <div className="user-redux-body">
                    <div>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-12 my-3'><FormattedMessage id='manage-user.add' /></div>
                                <div className='col-12'>{isGetGender === true ? 'Loading gender' : ""}</div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='manage-user.email' /></label>
                                    <input
                                        value={email}
                                        onChange={(event) => this.onChangeInput(event, 'email')}
                                        className='form-control' type='email' />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='manage-user.password' /></label>
                                    <input
                                        value={password}
                                        onChange={(event) => this.onChangeInput(event, 'password')}
                                        className='form-control' type='password' />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='manage-user.first-name' /></label>
                                    <input
                                        value={firstName}
                                        onChange={(event) => this.onChangeInput(event, 'firstName')}
                                        className='form-control' type='text' />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='manage-user.last-name' /></label>
                                    <input
                                        value={lastName}
                                        onChange={(event) => this.onChangeInput(event, 'lastName')}
                                        className='form-control' type='text' />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='manage-user.phone' /></label>
                                    <input
                                        value={phoneNumber}
                                        onChange={(event) => this.onChangeInput(event, 'phoneNumber')}
                                        className='form-control' type='text' />
                                </div>
                                <div className='col-9'>
                                    <label><FormattedMessage id='manage-user.address' /></label>
                                    <input
                                        value={address}
                                        onChange={(event) => this.onChangeInput(event, 'address')}
                                        className='form-control' type='text' />
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='manage-user.gender' /></label>
                                    <select className='form-control' onChange={(event) => this.onChangeInput(event, 'gender')}>
                                        {genders && genders.length > 0 &&
                                            genders.map((item, index) => {
                                                return (
                                                    <option value={item.key} key={index}>
                                                        {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='manage-user.position' /></label>
                                    <select className='form-control' onChange={(event) => this.onChangeInput(event, 'position')}>
                                        {positions && positions.length > 0
                                            && positions.map((item, index) => {
                                                return (
                                                    <option
                                                        value={item.key}
                                                        key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='manage-user.role' /></label>
                                    <select className='form-control' onChange={(event) => this.onChangeInput(event, 'role')}>
                                        {roles && roles.length > 0
                                            && roles.map((item, index) => {
                                                return (
                                                    <option
                                                        value={item.key}
                                                        key={index}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                                )
                                            })}
                                    </select>
                                </div>
                                <div className='col-3'>
                                    <label><FormattedMessage id='manage-user.image' /></label>
                                    <div className='preview-img-container'>
                                        <div className='upload-btn-wrapper'>
                                            <input
                                                onChange={(event) => this.handleOnchangeImg(event)}
                                                id='previewImg' type='file' hidden />
                                            <label className='label-upload' htmlFor='previewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                                            <div
                                                style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                                className='preview-img'
                                                onClick={() => this.openReviewImg()}
                                            >

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-12 my-3'>
                                    <button
                                        onClick={() => this.handleSaveUser()}
                                        className='btn btn-primary'><FormattedMessage id='manage-user.save' /></button>
                                </div>
                                <div className='col-12 mb-5'>
                                    <TableManageUser />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImgUrl}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        roleRedux: state.admin.roles,
        positionRedux: state.admin.positions,
        isLoadingGender: state.admin.isLoadingGender,
        listUsers: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUserStart())

        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
