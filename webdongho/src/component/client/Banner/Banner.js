import React from 'react';
import PropTypes from 'prop-types';

Banner.propTypes = {

};

function Banner(props) {
    return (
        <div className="banner">
            <div className="banner-des">
                <h3 className="banner-des__heading">KASHMIR COLLECTION<br />NIỀM TỰ HÀO ĐẦU TIÊN</h3>
                <div className="banner-des__sub-heading">
                    <span className="banner-des__text">Là dòng đồng hồ đầu tiên của Curnon, Kashmir<br />
                        định hình một triết lí thiết kế tối giản, hiện đại<br />
                        và đại diện cho sự tự tin.</span>
                </div>
                <a href="" className="banner-des__link">KHÁM PHÁ NGAY</a>
            </div>
            <img src="/imgClient/banner_kashmir_desktop-8bo.jpg" alt="Banner" className="banner-img" />
        </div>
    );
}

export default Banner;