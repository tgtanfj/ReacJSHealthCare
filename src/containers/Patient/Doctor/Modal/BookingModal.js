import React, { Component } from 'react';
import { connect } from "react-redux";
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss'
import { Modal } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import { handldLoginApi } from '../../../../services/userService';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions'
import { LANGUAGES } from '../../../../utils';
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/userService'
import { toast } from 'react-toastify'
import moment from 'moment';
import NumberFormat from 'react-number-format';
import LoadingOverlay from 'react-loading-overlay';

class BookingModal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            selectedGender: '',
            birthday: '',
            doctorId: '',
            genders: '',
            timeType: '',
            isShowLoading: false
        }
    }

    async componentDidMount() {
        this.props.getGenders()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }

        if (this.props.genders !== prevProps.genders) {
            this.setState({
                genders: this.buildDataGender(this.props.genders)
            })
        }
        if (this.props.dataScheduleTimeModal !== prevProps.dataScheduleTimeModal) {
            if (this.props.dataScheduleTimeModal && !_.isEmpty(this.props.dataScheduleTimeModal)) {
                let doctorId = this.props.dataScheduleTimeModal.doctorId
                let timeType = this.props.dataScheduleTimeModal.timeType
                this.setState({
                    doctorId: doctorId,
                    timeType: timeType
                })
            }
        }
    }

    handleOnChangeInput = (e, id) => {
        let valueInput = e.target.value
        let stateCopy = { ...this.state }
        stateCopy[id] = valueInput
        this.setState({
            ...stateCopy
        })
    }

    handleChangeDatePicker = (date) => {
        this.setState({
            birthday: date[0]
        })
    }

    buildDataGender = (data) => {
        let result = []
        let language = this.props.language
        if (data && data.length > 0) {
            data.map(item => {
                let object = {}
                object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn
                object.value = item.keyMap
                result.push(object)
            })
        }
        return result
    }

    handleChangeSelect = (selectedOption) => {
        this.setState({
            selectedGender: selectedOption
        })
    }

    handleConfirmBooking = async () => {
        this.setState({
            isShowLoading: true
        })
        let date = new Date(this.state.birthday).getTime()
        let doctorName = this.buildDoctorName(this.props.dataScheduleTimeModal)
        let timeString = this.buildTimeBooking(this.props.dataScheduleTimeModal)
        let res = await postPatientBookAppointment({
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataScheduleTimeModal.date,
            birthday: date,
            selectedGender: this.state.selectedGender.value,
            doctorId: this.state.doctorId,
            timeType: this.state.timeType,
            language: this.props.language,
            timeString: timeString,
            doctorName: doctorName
            // genders: this.state.genders,
        })

        if (res && res.errCode === 0) {
            this.setState({
                isShowLoading: false
            })
            toast.success('Successful appointment!')
            this.props.closeModalBookingModal()
        } else {
            this.setState({
                isShowLoading: false
            })
            toast.error('Booking failed!')
        }
    }

    buildDoctorName = (dataScheduleTimeModal) => {
        let { language } = this.props
        if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
            let name = language === LANGUAGES.VI ? `${dataScheduleTimeModal.doctorData.lastName} ${dataScheduleTimeModal.doctorData.firstName}`
                :
                `${dataScheduleTimeModal.doctorData.firstName} ${dataScheduleTimeModal.doctorData.lastName}`
            return name
        }
        return ''
    }

    buildTimeBooking = (dataScheduleTimeModal) => {
        let { language } = this.props
        if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
            let time = language === LANGUAGES.VI ? dataScheduleTimeModal.timeTypeData.valueVi : dataScheduleTimeModal.timeTypeData.valueEn

            let date = language === LANGUAGES.VI ?
                moment.unix(+dataScheduleTimeModal.date / 1000).format('dddd - DD/MM/YYYY')
                :
                moment.unix(+dataScheduleTimeModal.date / 1000).locale('en').format('ddd - MM/DD/YYYY')
            return `${time} - ${date}`
        }
        return ''
    }

    render() {
        let { isOpenModalBooking, closeModalBookingModal, dataScheduleTimeModal } = this.props
        let doctorId = ''
        if (dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal)) {
            doctorId = dataScheduleTimeModal.doctorId
        }

        console.log('check data time: ', dataScheduleTimeModal)
        return (
            <div>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner
                    text='Loading...'
                >
                    <Modal
                        isOpen={isOpenModalBooking}
                        size='lg'
                        className={'booking-modal-container'}
                        centered
                        backdrop={true}
                    >
                        <div className='booking-modal-content'>
                            <div className='booking-modal-header'>
                                <span className='left'><FormattedMessage id='patient.booking-modal.title' /></span>
                                <span
                                    onClick={closeModalBookingModal}
                                    className='right'><i className='fa fa-times'></i></span>
                            </div>
                            <div className='booking-modal-contain'>
                                {/* {JSON.stringify(dataScheduleTimeModal)} */}
                                <div className='doctor-info'>
                                    <ProfileDoctor
                                        doctorId={doctorId}
                                        isShowDescriptionDoctor={false}
                                        dataScheduleTimeModal={dataScheduleTimeModal}
                                        isShowPrice={true}
                                        isShowLinkDetail={false}
                                    />
                                </div>
                                <div className='row'>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.name' /></label>
                                        <input
                                            value={this.state.fullName}
                                            onChange={(e) => this.handleOnChangeInput(e, 'fullName')}
                                            className='form-control'></input>
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.phone' /></label>
                                        <input
                                            value={this.state.phoneNumber}
                                            onChange={(e) => this.handleOnChangeInput(e, 'phoneNumber')}
                                            className='form-control'></input>
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label>Email</label>
                                        <input
                                            value={this.state.email}
                                            onChange={(e) => this.handleOnChangeInput(e, 'email')}
                                            className='form-control'></input>
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.address' /></label>
                                        <input
                                            value={this.state.address}
                                            onChange={(e) => this.handleOnChangeInput(e, 'address')}
                                            className='form-control'></input>
                                    </div>
                                    <div className='col-12 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.reason' /></label>
                                        <input
                                            value={this.state.reason}
                                            onChange={(e) => this.handleOnChangeInput(e, 'reason')}
                                            className='form-control'></input>
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.date' /></label>
                                        <DatePicker
                                            className='form-control'
                                            onChange={this.handleChangeDatePicker}
                                            value={this.state.birthday}
                                        />
                                    </div>
                                    <div className='col-6 form-group'>
                                        <label><FormattedMessage id='patient.booking-modal.price-booking' /></label>
                                        <Select
                                            options={this.state.genders}
                                            value={this.state.selectedGender}
                                            onChange={this.handleChangeSelect}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='booking-modal-footer'>
                                <button
                                    onClick={() => this.handleConfirmBooking()}
                                    className='btn-booking-confirm'><FormattedMessage id='patient.booking-modal.btn-save' /></button>
                                <button
                                    onClick={closeModalBookingModal}
                                    lassName='btn-booking-cancel'><FormattedMessage id='patient.booking-modal.btn-close' /></button>
                            </div>
                        </div>
                    </Modal>
                </LoadingOverlay>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenders: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
