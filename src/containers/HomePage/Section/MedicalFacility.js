import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'

import Slider from 'react-slick';

class MedicalFacility extends Component {

    render() {


        return (
            <div>
                <div className='section-share section-medical-facility'>
                    <div className='section-container'>
                        <div className='section-header'>
                            <span className='title-section'>Cơ sở y tế nổi bật</span>
                            <button className='btn-section'>XEM THÊM</button>
                        </div>
                        <div className='section-body'>
                            <Slider {...this.props.settings}>
                                <div className='section-customize'>
                                    <div className='bg-image section-medical-facility' />
                                    <div>Bệnh viện Hoàn Mỹ</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-medical-facility' />
                                    <div>Cơ xương khớp 2</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-medical-facility' />
                                    <div>Cơ xương khớp 3</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-medical-facility' />
                                    <div>Cơ xương khớp 4</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-medical-facility' />
                                    <div>Cơ xương khớp 5</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-medical-facility' />
                                    <div>Cơ xương khớp 6</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-medical-facility' />
                                    <div>Cơ xương khớp 7</div>
                                </div>
                                <div className='section-customize'>
                                    <div className='bg-image section-medical-facility' />
                                    <div>Cơ xương khớp 8</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
