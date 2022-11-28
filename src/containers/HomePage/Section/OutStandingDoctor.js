import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'

import Slider from 'react-slick';

class OutStandingDoctor extends Component {

    render() {
        return (
            <div>
                <div className='section-share section-outstanding-doctor'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'>Bác sĩ nổi bậc tuần qua</span>
                            <button className='btn-section'>XEM THÊM</button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-customize'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Bệnh viện Hoàn Mỹ</div>
                                        <div className=''>Giáo sư, Tiến sĩ Strange</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Bệnh viện Hoàn Mỹ</div>
                                        <div className=''>Giáo sư, Tiến sĩ Strange</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Bệnh viện Hoàn Mỹ</div>
                                        <div className=''>Giáo sư, Tiến sĩ Strange</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Bệnh viện Hoàn Mỹ</div>
                                        <div className=''>Giáo sư, Tiến sĩ Strange</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Bệnh viện Hoàn Mỹ</div>
                                        <div className=''>Giáo sư, Tiến sĩ Strange</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Bệnh viện Hoàn Mỹ</div>
                                        <div className=''>Giáo sư, Tiến sĩ Strange</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Bệnh viện Hoàn Mỹ</div>
                                        <div className=''>Giáo sư, Tiến sĩ Strange</div>
                                    </div>
                                </div>
                                <div className='section-customize'>
                                    <div className='outer-bg'>
                                        <div className='bg-image section-outstanding-doctor' />
                                    </div>
                                    <div className='position text-center'>
                                        <div>Bệnh viện Hoàn Mỹ</div>
                                        <div className=''>Giáo sư, Tiến sĩ Strange</div>
                                    </div>
                                </div>
                            </Slider>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
