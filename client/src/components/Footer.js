import React from "react";

function Footer() {
    return (
        <footer className="py-10 text-white bg-gray-800">
            <div className="container grid grid-cols-1 gap-10 mx-auto md:grid-cols-4">
                <div>
                    <h4 className="mb-4 text-lg font-bold">Liên hệ</h4>
                    <p>Hotline: 1900 123 456</p>
                    <p>Email: support@ecommerce.com</p>
                    <p>Địa chỉ: 123 Đường ABC, Quận 1, TP. HCM</p>
                </div>

                <div>
                    <h4 className="mb-4 text-lg font-bold">Hỗ trợ</h4>
                    <ul>
                        <li>
                            <a
                                href="/chinh-sach-doi-tra"
                                className="hover:underline"
                            >
                                Chính sách đổi trả
                            </a>
                        </li>
                        <li>
                            <a
                                href="/chinh-sach-van-chuyen"
                                className="hover:underline"
                            >
                                Chính sách vận chuyển
                            </a>
                        </li>
                        <li>
                            <a href="/bao-mat" className="hover:underline">
                                Chính sách bảo mật
                            </a>
                        </li>
                        <li>
                            <a
                                href="/dieu-khoan-su-dung"
                                className="hover:underline"
                            >
                                Điều khoản sử dụng
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="mb-4 text-lg font-bold">Về chúng tôi</h4>
                    <ul>
                        <li>
                            <a href="/gioi-thieu" className="hover:underline">
                                Giới thiệu
                            </a>
                        </li>
                        <li>
                            <a href="/tuyen-dung" className="hover:underline">
                                Tuyển dụng
                            </a>
                        </li>
                        <li>
                            <a href="/tin-tuc" className="hover:underline">
                                Tin tức
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="mb-4 text-lg font-bold">Kết nối</h4>
                    <div className="flex space-x-4">
                        <a
                            href="https://facebook.com"
                            className="hover:text-blue-500"
                        >
                            <i className="fab fa-facebook"></i> Facebook
                        </a>
                        <a
                            href="https://instagram.com"
                            className="hover:text-pink-500"
                        >
                            <i className="fab fa-instagram"></i> Instagram
                        </a>
                        <a
                            href="https://youtube.com"
                            className="hover:text-red-500"
                        >
                            <i className="fab fa-youtube"></i> YouTube
                        </a>
                    </div>
                </div>
            </div>

            <div className="container mx-auto mt-10">
                <h4 className="mb-4 text-lg font-bold text-center">
                    Hệ thống cửa hàng
                </h4>
                <div className="w-full overflow-hidden h-60">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501725.4184646369!2d106.36557648812!3d10.755292851177629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1732182168893!5m2!1svi!2s"
                        width="100%"
                        height="450"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>

            <div className="mt-5 text-center">
                <p>&copy; 2024 Ecommerce.com. Tất cả quyền được bảo lưu.</p>
            </div>
        </footer>
    );
}

export default Footer;
