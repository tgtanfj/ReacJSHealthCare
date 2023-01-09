import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'

import Slider from 'react-slick';

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "red" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "green" }}
            onClick={onClick}
        />
    );
}

class HandBook extends Component {
    render() {
        return (
            <div className='section-share section-handbook'>
                <div className='section-container'>
                    <div className='section-header'>
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>XEM THÊM</button>
                    </div>
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook' />
                                <div>Phòng chóng bệnh tiểu đường</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook' />
                                <div>Sức khỏa tim mạch</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook' />
                                <div>Khám tổng quát ở đâu?</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook' />
                                <div>Phát đồ điều trị đau cột sống</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook' />
                                <div>Cơ xương khớp 5</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook' />
                                <div>Cơ xương khớp 6</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook' />
                                <div>Cơ xương khớp 7</div>
                            </div>
                            <div className='section-customize'>
                                <div className='bg-image section-handbook' />
                                <div>Cơ xương khớp 8</div>
                            </div>

                        </Slider>
                    </div>

                </div>
            </div>
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
