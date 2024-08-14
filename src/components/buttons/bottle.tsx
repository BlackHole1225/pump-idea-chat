import { useAppSelector } from '../../libs/redux/hooks';
import { Link } from "react-router-dom";
export default function JupiterButton() {

    const theme = useAppSelector(state => state.theme.current.styles);

    return (
        <Link to="/chat">
            <svg width="40" height="60" viewBox="0 0 52 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_5376_12703)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.59726 53.3029L23.5317 62.2826C23.9464 62.4792 24.4052 62.488 24.8095 62.3439C25.2142 62.1994 25.5637 61.9025 25.7605 61.4876L40.3558 30.7119C40.5525 30.2971 40.5614 29.8383 40.417 29.4339C40.2729 29.0294 39.9757 28.6798 39.5611 28.4831C40.0189 28.6891 40.5596 28.4916 40.7757 28.0358L41.1211 27.3076L42.241 24.9461C42.5226 24.3523 42.4267 23.6834 42.0454 23.084C41.8836 22.8296 41.6662 22.5851 41.4044 22.3678C41.2829 22.6403 41.1397 22.9105 40.9724 23.1775C40.7031 23.6105 40.1337 23.7431 39.7007 23.4738C39.2677 23.2045 39.135 22.635 39.4043 22.2021C39.5542 21.9629 39.6777 21.7189 39.7777 21.4718L25.9185 14.8991C25.7903 15.1329 25.6795 15.3829 25.5892 15.6502C25.4244 16.1328 24.8996 16.3904 24.417 16.2255C23.9346 16.0607 23.6769 15.5359 23.8417 15.0533C23.9425 14.7547 24.061 14.4728 24.1952 14.2064C23.8615 14.1412 23.5345 14.1276 23.2352 14.1633C22.5298 14.2473 21.951 14.5962 21.6694 15.19L20.5495 17.5515L20.2041 18.2798C19.9879 18.7356 20.1772 19.2793 20.6266 19.5035C20.2117 19.3067 19.7532 19.2978 19.3486 19.4421C18.9441 19.5864 18.5945 19.8836 18.3978 20.2984L3.80247 51.074C3.60569 51.489 3.59686 51.9475 3.74109 52.3522C3.8854 52.7566 4.18236 53.1061 4.59726 53.3029ZM39.5443 28.4751C39.0827 28.2563 38.8862 27.7049 39.105 27.2435L39.5012 26.4081L40.5703 24.1538C40.5787 24.1362 40.5314 24.1392 40.4892 24.0728C40.3673 23.881 40.1412 23.6909 39.8409 23.5484L24.2706 16.1642C23.9701 16.0217 23.6799 15.9671 23.4543 15.994C23.3762 16.0033 23.3486 15.9649 23.3403 15.9824L22.2712 18.2368L21.875 19.0722C21.6562 19.5336 21.1047 19.7302 20.6434 19.5114L39.5443 28.4751ZM20.6434 19.5114L20.6266 19.5035C20.6322 19.5061 20.6378 19.5088 20.6434 19.5114ZM9.37653 49.478L13.6407 51.5003C14.102 51.7191 14.2987 52.2704 14.0798 52.7319C13.8611 53.1931 13.3096 53.3899 12.8483 53.1711L8.58414 51.1489C8.12272 50.93 7.9261 50.3784 8.14481 49.9172C8.36368 49.4557 8.91511 49.2592 9.37653 49.478ZM11.3162 45.3879L15.5804 47.4102C16.0417 47.629 16.2383 48.1804 16.0195 48.6418C15.8008 49.103 15.2493 49.2997 14.7881 49.0809L10.5239 47.0587C10.0625 46.8398 9.86582 46.2883 10.0845 45.8271C10.3033 45.3657 10.8548 45.1691 11.3162 45.3879ZM13.256 41.2978L17.5201 43.3201C17.9814 43.5389 18.1781 44.0902 17.9593 44.5515C17.7405 45.0129 17.1891 45.2096 16.7278 44.9908L12.4636 42.9686C12.0022 42.7497 11.8055 42.1982 12.0243 41.7369C12.2431 41.2755 12.7946 41.079 13.256 41.2978Z" fill={theme.text_color}  />
                    <path fillRule="evenodd" clipRule="evenodd" d="M22.2712 18.2363L39.5013 26.4077L40.5704 24.1533C40.5788 24.1358 40.5315 24.1388 40.4893 24.0724C40.3674 23.8806 40.1413 23.6904 39.8409 23.548L24.2707 16.1638C23.9702 16.0213 23.68 15.9666 23.4544 15.9936C23.3762 16.0029 23.3487 15.9644 23.3404 15.982L22.2712 18.2363Z" fill={theme.text_color} />
                    <path fillRule="evenodd" clipRule="evenodd" d="M25.9187 14.9004L39.7778 21.4731C41.2604 17.8018 37.5385 13.3921 37.5274 13.3781C37.2195 13.0104 37.2443 12.4616 37.5948 12.1233C38.8958 10.872 39.1865 9.73873 38.9287 8.90598C38.7554 8.34645 38.3379 7.90627 37.8262 7.65972C37.3143 7.41305 36.7175 7.36059 36.1863 7.57665C35.3946 7.89849 34.7105 8.8335 34.5429 10.6294C34.5264 11.1291 34.1134 11.5264 33.6108 11.521C33.5931 11.521 27.8233 11.4293 25.9187 14.9004Z" fill={theme.text_color} />
                    <path d="M4.59735 53.3034L23.5318 62.283C23.9465 62.4797 24.4053 62.4885 24.8096 62.3443C25.2143 62.1999 25.5638 61.903 25.7606 61.4881L40.3559 30.7124C40.5526 30.2976 40.5614 29.8388 40.4171 29.4344C40.273 29.0299 39.9758 28.6802 39.5612 28.4836L20.6267 19.5039C20.2118 19.3072 19.7532 19.2983 19.3487 19.4426C18.9441 19.5868 18.5946 19.884 18.3979 20.2988L3.80256 51.0745C3.60578 51.4894 3.59695 51.9479 3.74118 52.3526C3.88549 52.757 4.18245 53.1066 4.59735 53.3034ZM22.7394 63.9539L3.80496 54.9742C2.92882 54.5587 2.30269 53.8234 1.99964 52.9735C1.69656 52.1238 1.7162 51.1583 2.13173 50.2821L16.727 19.5065C17.1426 18.6303 17.8778 18.0042 18.7276 17.701C19.5774 17.398 20.543 17.4176 21.4191 17.8331L40.3536 26.8127C41.2296 27.2282 41.8557 27.9634 42.1587 28.8133C42.4617 29.663 42.4421 30.6286 42.0266 31.5047L27.4313 62.2804C27.0158 63.1564 26.2805 63.7827 25.4308 64.0857C24.581 64.3889 23.6155 64.3693 22.7394 63.9539Z" fill={theme.bgColor} />
                    <path d="M21.8752 19.0722C21.6563 19.5336 21.1049 19.7302 20.6436 19.5114C20.1821 19.2926 19.9855 18.7412 20.2043 18.2798L21.6696 15.19C21.9512 14.5963 22.53 14.2473 23.2354 14.1633C23.7935 14.0968 24.4477 14.2015 25.0632 14.4934L40.6334 21.8776C41.2488 22.1694 41.7439 22.6098 42.0456 23.084C42.4268 23.6834 42.5228 24.3523 42.2412 24.9461L40.7759 28.0359C40.5571 28.4972 40.0057 28.6939 39.5444 28.4752C39.0829 28.2563 38.8864 27.7049 39.1052 27.2435L40.5705 24.1538C40.5789 24.1362 40.5316 24.1392 40.4894 24.0728C40.3675 23.8811 40.1414 23.6909 39.841 23.5484L24.2708 16.1643C23.9703 16.0218 23.6801 15.9671 23.4545 15.9941C23.3763 16.0034 23.3488 15.9649 23.3405 15.9824L21.8752 19.0722Z" fill={theme.bgColor} />
                    <path d="M25.5894 15.6501C25.4246 16.1326 24.8997 16.3902 24.4171 16.2253C23.9347 16.0605 23.6771 15.5357 23.8418 15.0532C25.3374 10.6256 30.7356 9.84055 32.8101 9.70297C33.1904 7.57483 34.2586 6.37213 35.4916 5.8707C36.5299 5.44848 37.6669 5.53682 38.6222 5.99698C39.5778 6.45744 40.361 7.29045 40.6913 8.35739C41.0886 9.64022 40.8406 11.2322 39.4437 12.8518C40.6513 14.5486 43.4526 19.2208 40.9725 23.1774C40.7032 23.6104 40.1339 23.7429 39.7009 23.4736C39.2679 23.2043 39.1352 22.6349 39.4045 22.2019C41.7786 18.4145 37.5393 13.3916 37.5271 13.3769L37.5274 13.3767C37.2195 13.009 37.2443 12.4602 37.5948 12.1219C38.8959 10.8706 39.1866 9.73733 38.9287 8.90458C38.7554 8.34504 38.3379 7.90486 37.8263 7.65832C37.3144 7.41164 36.7175 7.35918 36.1864 7.57525C35.3946 7.89709 34.7105 8.83209 34.543 10.628C34.5264 11.1277 34.1134 11.525 33.6109 11.5196C33.592 11.5196 27.0198 11.4151 25.5894 15.6501Z" fill={theme.bgColor} />
                    <path d="M12.4637 42.9685C12.0023 42.7497 11.8056 42.1982 12.0244 41.7368C12.2432 41.2755 12.7946 41.079 13.256 41.2978L17.5202 43.3201C17.9814 43.5388 18.1782 44.0901 17.9594 44.5515C17.7406 45.0128 17.1891 45.2095 16.7278 44.9908L12.4637 42.9685Z" fill={theme.bgColor}  />
                    <path d="M10.524 47.0583C10.0626 46.8395 9.86589 46.288 10.0846 45.8268C10.3034 45.3654 10.8549 45.1688 11.3163 45.3876L15.5805 47.4099C16.0417 47.6287 16.2384 48.1801 16.0196 48.6415C15.8009 49.1027 15.2494 49.2994 14.7881 49.0806L10.524 47.0583Z" fill={theme.bgColor} />
                    <path d="M8.58429 51.1501C8.12288 50.9313 7.92625 50.3797 8.14496 49.9185C8.36384 49.457 8.91527 49.2605 9.37668 49.4793L13.6408 51.5016C14.1021 51.7203 14.2988 52.2717 14.08 52.7332C13.8612 53.1944 13.3097 53.3912 12.8484 53.1724L8.58429 51.1501Z" fill={theme.bgColor}  />
                    <path d="M22.0327 61.5968L37.9352 27.6962L40.1689 28.7837C40.6616 29.0236 40.8695 29.6153 40.6351 30.1106L25.4965 62.1002C25.2621 62.5954 24.6729 62.8099 24.1751 62.5812L22.0327 61.5968Z" fill={theme.bgColor}  fillOpacity="0.4"/>
                </g>
                <defs>
                    <clipPath id="clip0_5376_12703">
                        <rect width="28" height="59.1719" fill={theme.bgColor} transform="translate(25.9775) rotate(25.3726)" />
                    </clipPath>
                </defs>
            </svg>
        </Link>
    );
}