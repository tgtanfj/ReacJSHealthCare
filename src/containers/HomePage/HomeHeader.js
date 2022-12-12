import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Homeheader.scss'
import logo1 from '../../assets/logo2.png'
import khamchuyenkhoa from '../../assets/images/icons/phongkhamchuyenkhoa.png'
import khamnhakhoa from '../../assets/images/icons/khamnhakhoa.png'
import khamtongquat from '../../assets/images/icons/khamtongquat.png'
import khamtuxa from '../../assets/images/icons/khamtuxa.png'
import suckhoetinhthan from '../../assets/images/icons/suckhoetinhthan.png'
import dichvuxetnghiem from '../../assets/images/icons/dichvuxetnghiem.png'
import { FormattedMessage } from 'react-intl'
import { LANGUAGES } from '../../utils'

import { changeLanguageApp } from '../../store/actions/appActions';

class HomeHeader extends Component {

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
        // fire redux event(actions)
    }

    render() {
        let language = this.props.language

        return (
            <React.Fragment>
                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className='fas fa-bars'></i>
                            <img src={logo1} className='header-logo' alt=''></img>
                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div>
                                    <b>
                                        <FormattedMessage id='homeheader.speciality' />
                                    </b>
                                </div>
                                <div className='subs-title'><FormattedMessage id='homeheader.searchdoctor' /></div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b>
                                        <FormattedMessage id='homeheader.health-facility' />
                                    </b>
                                </div>
                                <div className='subs-title'><FormattedMessage id='homeheader.select-room' /></div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b>
                                        <FormattedMessage id='homeheader.doctor1' />
                                    </b>
                                </div>
                                <div className='subs-title'><FormattedMessage id='homeheader.select-doctor' /></div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b>
                                        <FormattedMessage id='homeheader.medical-package' />
                                    </b>
                                </div>
                                <div className='subs-title'><FormattedMessage id='homeheader.generalHC' /></div>
                            </div>
                        </div>
                        <div className='right-content'>
                            <div className='support'>
                                <i className='fa fa-question-circle'></i>
                                <FormattedMessage id='homeheader.support' />
                            </div>
                            <div className='flag'>
                                <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VN</span></div>
                                <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='content-up'>
                            <div className='title-1'><FormattedMessage id='banner.title1' /></div>
                            <div className='title-2'><FormattedMessage id='banner.title2' /></div>
                            <div className='search'>
                                <i className='fas fa-search'></i>
                                <input placeholder='Tìm kiếm...' type='text' />
                            </div>
                        </div>
                        <div className='content-down'>
                            <div className='options'>
                                <div className='option-child'>
                                    <div className='icon-child'><img src={khamchuyenkhoa} /></div>
                                    <div className='text-child'><b><FormattedMessage id='banner.bannerp1' /></b></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><img src={khamtuxa} /></div>
                                    <div className='text-child'><b><FormattedMessage id='banner.bannerp2' /></b></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><img src={khamtongquat} /></div>
                                    <div className='text-child'><b><FormattedMessage id='banner.bannerp3' /></b></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><img src={dichvuxetnghiem} /></div>
                                    <div className='text-child'><b><FormattedMessage id='banner.bannerp4' /></b></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><img src={suckhoetinhthan} /></div>
                                    <div className='text-child'><b><FormattedMessage id='banner.bannerp5' /></b></div>
                                </div>
                                <div className='option-child'>
                                    <div className='icon-child'><img src={khamnhakhoa} /></div>
                                    <div className='text-child'><b><FormattedMessage id='banner.bannerp6' /></b></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }

            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
