import { ComponentPropsWithoutRef } from "react";
import { useAppSelector } from "../../libs/redux/hooks";

export default function JupiterButton(props: ComponentPropsWithoutRef<"svg">) {
  const theme = useAppSelector((state) => state.theme.current.styles);

  return (
    //<IconButton style={{ border: 'solid thin red', borderColor: theme.bgColor == '#0000FF' ? theme.bgColor:theme.bgColor }}>
    <svg
      width="144"
      height="169"
      viewBox="0 0 144 169"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M123.562 151.444L119.822 153.943L121.034 149.613L117.507 146.832L122.002 146.648L123.562 142.433L125.112 146.648L129.608 146.832L126.081 149.613L127.302 153.943L123.562 151.444Z"
        fill={theme.bgColor == "#0000FF" ? theme.bgColor : theme.text_color}
      />
      <path
        d="M2 27.051C2 27.051 22.976 24.2412 35.92 27.1382C38.7781 27.7776 49.9781 27.8164 53.7373 27.1382C53.7373 27.1382 75.1492 24.2606 76.8157 24.2025C78.4918 24.1541 79.5479 23.8635 80.4102 23.4856C81.2822 23.0981 83.6849 21.8482 85.613 22.2261C87.541 22.6136 90.3314 24.6676 91.9688 25.0358C93.6061 25.404 106.318 30.9943 108.439 31.285C110.561 31.5659 111.278 32.0794 112.296 32.9417C113.303 33.8137 133.388 47.3971 135.015 48.6179C135.568 49.0248 135.81 49.267 135.81 49.267C135.81 49.267 132.719 51.1757 129.919 51.166C127.788 51.166 125.482 50.6428 123.563 49.4802C121.635 48.3273 120.192 46.8836 117.295 45.44C114.408 43.9964 108.439 40.3825 107.335 40.46C106.221 40.5279 103.905 40.46 103.905 40.46"
        stroke={theme.bgColor == "#0000FF" ? theme.bgColor : theme.text_color}
        stroke-width="2.76488"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path
        d="M88.0254 26.1597C88.0254 26.1597 103.624 40.2858 105.552 42.3107C107.48 44.3356 109.302 45.6823 109.689 48.182C110.077 50.6913 113.012 58.9654 113.012 60.9419C113.012 62.9184 113.642 74.816 113.012 76.4534C112.383 78.0908 112.383 78.0908 112.383 78.0908C112.383 78.0908 107.19 75.2423 106.899 72.1614C106.608 69.0804 106.947 66.3869 106.608 64.6527C106.269 62.9184 105.552 60.9419 104.874 59.5467C104.205 58.1516 104.186 57.9869 104.186 57.9869"
        stroke={theme.bgColor == "#0000FF" ? theme.bgColor : theme.text_color}
        stroke-width="2.76488"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path
        d="M85.874 35.9545C85.874 35.9545 99.2928 46.9318 100.155 48.0363C101.027 49.1505 104.157 51.0204 104.011 52.9484C103.866 54.8765 103.43 67.7817 102.945 68.7021C102.471 69.6129 100.94 73.4011 98.8471 76.0364C98.4208 76.579 94.9523 80.0088 94.9523 80.0088C94.9523 80.0088 93.4215 77.8288 93.1889 76.5499C92.9758 75.3195 93.3827 73.6725 93.3827 73.6725"
        stroke={theme.bgColor == "#0000FF" ? theme.bgColor : theme.text_color}
        stroke-width="2.76488"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path
        d="M83.7131 44.9065C83.7131 44.9065 95.6592 53.7231 96.2599 56.2518C96.8606 58.7806 97.936 64.4097 97.2869 67.2969C96.6377 70.1841 96.6378 70.1842 96.6378 70.1842C96.6378 70.1842 93.3727 74.0886 90.97 75.6775C89.7298 76.5011 88.044 77.0146 88.044 77.0146C88.044 77.0146 87.1041 74.234 87.6467 72.1025C87.9761 70.8333 89.4875 68.9634 89.9914 68.5661C90.5049 68.1689 90.5048 68.1688 90.5048 68.1688C90.5048 68.1688 89.5166 64.991 89.5263 63.1792C89.536 61.8615 89.7782 61.1253 89.7782 61.1253C89.7782 61.1253 86.019 59.2844 84.9436 58.2671C83.8585 57.2595 82.4439 56.6297 82.192 56.4456C81.9401 56.2712 79.6536 55.9418 78.0259 55.8837C75.8266 55.8062 73.0169 57.366 70.9629 56.7556C70.0909 56.4941 65.6728 55.2539 60.6154 55.1376C58.8327 55.0989 52.8935 55.438 50.6845 55.3121C48.3786 55.1765 44.3191 53.8394 40.0852 51.4463C38.5253 50.5646 35.3862 49.3826 32.3149 48.9563C29.2533 48.5203 18.6346 49.4601 16.3965 49.8573"
        stroke={theme.bgColor == "#0000FF" ? theme.bgColor : theme.text_color}
        stroke-width="2.76488"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path
        d="M128.329 44.2576L127.457 45.7788C127.457 45.7788 129.434 48.3462 131.623 48.7628C133.028 49.0244 134.481 48.6466 134.636 48.5497C134.782 48.4431 128.329 44.2576 128.329 44.2576Z"
        fill={theme.bgColor == "#0000FF" ? theme.bgColor : theme.text_color}
      />
      <path
        d="M113.487 69.4296L111.743 69.3811C111.743 69.3811 110.406 72.3362 111.085 74.4677C111.511 75.8241 112.538 76.9287 112.693 77.0159C112.848 77.1031 113.487 69.4296 113.487 69.4296Z"
        fill={theme.bgColor == "#0000FF" ? theme.bgColor : theme.text_color}
      />
      <path
        d="M100.203 74.253L98.9633 73.3713C98.9633 73.3713 96.5605 74.873 96.0083 76.743C95.6595 77.9347 95.8726 79.233 95.9501 79.3783C96.0179 79.5139 100.203 74.253 100.203 74.253Z"
        fill={theme.bgColor == "#0000FF" ? theme.bgColor : theme.text_color}
      />
      <path
        d="M93.7612 73.0717L92.7924 72.0931C92.7924 72.0931 90.409 72.9361 89.6145 74.4281C89.1107 75.3873 89.0913 76.5306 89.1301 76.6565C89.1688 76.7922 93.7612 73.0717 93.7612 73.0717Z"
        fill={theme.bgColor == "#0000FF" ? theme.bgColor : theme.text_color}
      />
      <path
        d="M123.563 117.077V49.4795C123.563 49.4795 126.674 44.9064 123.563 40.7403"
        stroke={theme.bgColor == "#0000FF" ? theme.bgColor : theme.text_color}
        stroke-width="2.76488"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path
        d="M127.603 121.312C127.477 119.083 125.559 117.368 123.331 117.494C121.102 117.63 119.387 119.539 119.513 121.767C119.649 124.005 121.558 125.71 123.786 125.584C126.024 125.449 127.729 123.54 127.603 121.312Z"
        stroke={theme.bgColor == "#0000FF" ? theme.bgColor : theme.text_color}
        stroke-width="2.76488"
        stroke-miterlimit="10"
      />
      <path
        d="M136.264 147.781C135.867 140.767 129.85 135.399 122.836 135.796C115.821 136.194 110.454 142.21 110.851 149.225C111.258 156.239 117.265 161.607 124.279 161.21C131.294 160.803 136.661 154.796 136.264 147.781Z"
        stroke={theme.bgColor == "#0000FF" ? theme.bgColor : theme.text_color}
        stroke-width="2.76488"
        stroke-miterlimit="10"
      />
      <path
        d="M123.563 130.06V135.776"
        stroke={theme.bgColor == "#0000FF" ? theme.bgColor : theme.text_color}
        stroke-width="2.76488"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path
        d="M123.563 161.229V166.945"
        stroke={theme.bgColor == "#0000FF" ? theme.bgColor : theme.text_color}
        stroke-width="2.76488"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path
        d="M142 148.498H136.284"
        stroke={theme.bgColor == "#0000FF" ? theme.bgColor : theme.text_color}
        stroke-width="2.76488"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path
        d="M110.833 148.498H105.116"
        stroke={theme.bgColor == "#0000FF" ? theme.bgColor : theme.text_color}
        stroke-width="2.76488"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path
        d="M136.594 135.467L132.554 139.507"
        stroke={theme.bgColor == "#0000FF" ? theme.bgColor : theme.text_color}
        stroke-width="2.76488"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path
        d="M114.562 157.499L110.521 161.539"
        stroke={theme.bgColor == "#0000FF" ? theme.bgColor : theme.text_color}
        stroke-width="2.76488"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path
        d="M136.594 161.539L132.554 157.499"
        stroke={theme.bgColor == "#0000FF" ? theme.bgColor : theme.text_color}
        stroke-width="2.76488"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path
        d="M114.562 139.507L110.521 135.467"
        stroke={theme.bgColor == "#0000FF" ? theme.bgColor : theme.text_color}
        stroke-width="2.76488"
        stroke-miterlimit="10"
        stroke-linecap="round"
      />
      <path
        d="M85.2143 11.4716L80.4572 14.6494L82.0074 9.13654L77.5215 5.60019L83.2378 5.36772L85.2143 0.000170708L87.2005 5.36772L92.9168 5.60019L88.4309 9.13654L89.9811 14.6494L85.2143 11.4716Z"
        fill={theme.bgColor == "#0000FF" ? theme.bgColor : theme.text_color}
      />
      <path
        d="M106.278 9.67928L103.584 11.4717L104.466 8.35192L101.918 6.34635L105.164 6.22042L106.278 3.17815L107.402 6.22042L110.647 6.34635L108.099 8.35192L108.981 11.4717L106.278 9.67928Z"
        fill={theme.bgColor == "#0000FF" ? theme.bgColor : theme.text_color}
      />
      <path
        d="M64.1509 9.67928L61.4575 11.4717L62.3392 8.35192L59.791 6.34635L63.0271 6.22042L64.1509 3.17815L65.2748 6.22042L68.5205 6.34635L65.9724 8.35192L66.8541 11.4717L64.1509 9.67928Z"
        fill={theme.bgColor == "#0000FF" ? theme.bgColor : theme.text_color}
      />
    </svg>
  );
}
