import React from 'react';
import PropTypes from 'prop-types';

SubFooter.propTypes = {

};

function SubFooter(props) {
    return (
        <div className="footer">
            <div className="footer-bottom">
                <div className="grid wide">
                    <div className="row">
                        <div className="col footer-content">
                            <div className="footer-checkout-body">
                                <p className="footer-left__copyright">© 2019 - Bản quyền của CTCP PHÁT TRIỂN SẢN PHẨM SÁNG TẠO VIỆT</p>
                                <p className="footer-left__text">Giấy chứng nhận ĐKKD số 0108150321 do Sở Kế hoạch và Đầu tư Thành phố Hà Nội
                                    cấp ngày 29/01/2018 123C Thụy Khuê, Tây Hồ, Hà Nội</p>
                            </div>
                        </div>
                    </div>
                </div>
                <h4 className="copy-by">Copy by: Anfeed</h4>
            </div>
        </div>
    );
}

export default SubFooter;