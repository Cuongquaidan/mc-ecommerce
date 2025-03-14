import React from "react";
import { useTranslation } from "react-i18next";

function Footer() {
    const {t} = useTranslation();
    return (
        <footer className="px-5 py-10 text-white bg-gray-800">
            <div className="container grid grid-cols-1 gap-10 mx-auto sm:grid-cols-2 lg:grid-cols-4">
                {/** Liên hệ */}
                <div>
                    <h4 className="mb-4 text-lg font-bold">{
                        t("footer.contact.title")
                    }</h4>
                    <p>
                        {
                            t("footer.contact.hotline")
                        }
                    </p>
                    <p>
                        {
                            t("footer.contact.email")
                        }
                    </p>
                    <p>
                        {
                            t("footer.contact.address")
                        }
                    </p>
                </div>

                {/** Hỗ trợ */}
                <div>
                    <h4 className="mb-4 text-lg font-bold">
                        {
                            t("footer.support.title")
                        }
                    </h4>
                    <ul>
                        <li>
                            <a
                                href="/chinh-sach-doi-tra"
                                className="hover:underline"
                            >
                                {
                                    t("footer.support.return_policy")
                                }
                            </a>
                        </li>
                        <li>
                            <a
                                href="/chinh-sach-van-chuyen"
                                className="hover:underline"
                            >
                                {
                                    t("footer.support.shipping_policy")
                                }
                            </a>
                        </li>
                        <li>
                            <a href="/bao-mat" className="hover:underline">
                              {
                                    t("footer.support.privacy_policy")
                              }
                            </a>
                        </li>
                        <li>
                            <a
                                href="/dieu-khoan-su-dung"
                                className="hover:underline"
                            >
                                {
                                    t("footer.support.terms_of_use")
                                }
                            </a>
                        </li>
                    </ul>
                </div>

                {/** Về chúng tôi */}
                <div>
                    <h4 className="mb-4 text-lg font-bold">
                        {
                            t("footer.about.title")
                        }
                    </h4>
                    <ul>
                        <li>
                            <a href="/gioi-thieu" className="hover:underline">
                                {
                                    t("footer.about.about_us")
                                }
                            </a>
                        </li>
                        <li>
                            <a href="/tuyen-dung" className="hover:underline">
                               {
                                    t("footer.about.careers")    
                               }
                            </a>
                        </li>
                        <li>
                            <a href="/tin-tuc" className="hover:underline">
                                {
                                    t("footer.about.news")
                                }
                            </a>
                        </li>
                    </ul>
                </div>

                {/** Kết nối */}
                <div>
                    <h4 className="mb-4 text-lg font-bold">
                        {
                            t("footer.connect.title")
                        }
                    </h4>
                    <div className="flex space-x-4">
                        <a
                            href="https://facebook.com"
                            className="flex items-center hover:text-blue-500"
                        >
                            <i className="mr-2 fab fa-facebook"></i> Facebook
                        </a>
                        <a
                            href="https://instagram.com"
                            className="flex items-center hover:text-pink-500"
                        >
                            <i className="mr-2 fab fa-instagram"></i> Instagram
                        </a>
                        <a
                            href="https://youtube.com"
                            className="flex items-center hover:text-red-500"
                        >
                            <i className="mr-2 fab fa-youtube"></i> YouTube
                        </a>
                    </div>
                </div>
            </div>

            {/** Hệ thống cửa hàng */}
            <div className="container mx-auto mt-10">
                <h4 className="mb-4 text-lg font-bold text-center">
                    {
                        t("footer.store_system.title")
                    }
                </h4>
                <div className="w-full overflow-hidden rounded-lg h-60 sm:h-80">
                    <iframe
                        title="MCSHOP"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501725.4184646369!2d106.36557648812!3d10.755292851177629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1732182168893!5m2!1svi!2s"
                        width="100%"
                        height="100%"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>

            {/** Footer bản quyền */}
            <div className="mt-5 text-center">
                <p className="text-sm sm:text-base">
                   {
                        t("footer.copy_right")
                   }
                </p>
            </div>
        </footer>
    );
}

export default Footer;
