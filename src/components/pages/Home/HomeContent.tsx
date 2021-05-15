import React from "react";
import { Link } from "react-router-dom";
import { HomeContentType } from ".";
import { Routes } from "../../../shared/constants";

function Content({ type }: any) {
  return (
    <div>
      <div className="container content">
        <div className="row">
          <div className="col-sm-6 talk">
            <h1>Hệ thống hỗ trợ chẩn đoán bệnh</h1>
            <br />
            <h6 className="bold-four">
              Ngày nay, với sự cải thiện chất lượng cuộc sống, người dân ngày
              càng quan tâm tới các vấn đề về sức khoẻ của mình và người thân.
              Song, sự phát triển của công nghệ đã giúp người dân có thể tiếp
              cận được nhiều nguồn thông tin về y tế một cách dễ dàng. Tuy
              nhiên, người đọc khó có thể phân biệt được độ chính xác và độ tin
              cậy của thông tin trên mạng do có quá nhiều nguồn được đăng tải.
              Vì vậy, hệ thống hỗ trợ chẩn đoán bệnh được xây dựng nhằm mục đích
              tổng hợp các thông tin chính thống để người dân tìm bệnh viện và
              tin tức y tế hữu ích về sức khoẻ, tránh gặp phải những tin tức giả
              mạo.
            </h6>
            <br />
            {type === HomeContentType.ADMIN && (
              <h6>
                <Link
                  className="btn btn-dark start start-two"
                  to={Routes.HOSPITAL}
                >
                  Quản lí Bệnh viện
                </Link>
                <Link
                  className="btn btn-dark start start-two ml-3"
                  to={Routes.NEWS}
                >
                  Quản lí Tin tức
                </Link>
                <Link
                  className="btn btn-dark start start-two ml-3"
                  to={Routes.MANAGE_ACCOUNT}
                >
                  Quản lí Tài khoản
                </Link>
              </h6>
            )}
            {type === HomeContentType.USER && (
              <h6>
                <Link
                  className="btn btn-dark start start-two"
                  to={Routes.HOSPITAL}
                >
                  Tìm kiếm Bệnh viện
                </Link>
                <Link
                  className="btn btn-dark start start-two ml-3"
                  to={Routes.NEWS}
                >
                  Tìm kiếm Tin tức
                </Link>
              </h6>
            )}
            {type === HomeContentType.GUEST && (
              <h6>
                <Link
                  className="btn btn-dark start start-two"
                  to={Routes.LOGIN}
                >
                  Đăng nhập
                </Link>
                <Link
                  className="btn btn-dark start start-two ml-3"
                  to={Routes.SIGN_UP}
                >
                  Đăng ký
                </Link>
              </h6>
            )}
          </div>
          <div className="col-sm-6 showcase-img">
            {/* <div className="circle"></div> */}
          </div>
        </div>
      </div>

      <section className="features-icons bg-light text-center det-ails">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="features-icons-icon d-flex  icon-bra-ails">
                  <i className="icon-screen-desktop m-auto text-primary icon-ails"></i>
                </div>
                <h5>
                  <b>Nhanh chóng</b>
                </h5>
                <p className="lead mb-0">
                  Tìm kiếm thông tin một cách nhanh chóng và đầy đủ
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                <div className="features-icons-icon d-flex  icon-bra-ails">
                  <i className="icon-layers m-auto text-primary icon-ails"></i>
                </div>
                <h5>
                  <b>Đáng tin cậy</b>
                </h5>
                <p className="lead mb-0">
                  Thông tin luôn được đảm bảo chính xác và toàn vẹn
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                <div className="features-icons-icon d-flex  icon-bra-ails">
                  <i className="icon-check m-auto text-primary icon-ails"></i>
                </div>
                <h5>
                  <b>Dễ sử dụng</b>
                </h5>
                <p className="lead mb-0">
                  Hệ thống được thiết kế đơn giản và dễ sử dụng với mọi đối
                  tượng
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Content;
