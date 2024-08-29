import { ComponentPropsWithoutRef } from "react";

export default function PendingButton(props: ComponentPropsWithoutRef<"svg">) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_2053_1125)">
        <path
          d="M10.249 1.64618C10.6376 1.58843 11.0334 1.68547 11.3513 1.91644C11.6691 2.14741 11.8837 2.49387 11.9488 2.88134C12.0139 3.26882 11.9243 3.66637 11.6994 3.98853C11.4745 4.3107 11.1322 4.53175 10.746 4.60418C8.99897 4.90046 7.41326 5.80573 6.26996 7.15953C5.12666 8.51333 4.49963 10.2282 4.5 12.0002C4.5 13.9893 5.29018 15.897 6.6967 17.3035C8.10322 18.71 10.0109 19.5002 12 19.5002V22.5002C6.201 22.5002 1.5 17.8002 1.5 12.0002C1.5 6.85518 5.226 2.49018 10.249 1.64618Z"
          fill="url(#paint0_linear_2053_1125)"
        />
        <path
          d="M16.892 4.29763C17.0235 4.15087 17.1827 4.03148 17.3604 3.94627C17.5381 3.86107 17.7309 3.81171 17.9277 3.80103C18.1245 3.79035 18.3214 3.81856 18.5073 3.88403C18.6932 3.94951 18.8643 4.05097 19.011 4.18263C20.11 5.16666 20.9888 6.3716 21.59 7.71865C22.1913 9.06569 22.5013 10.5245 22.5 11.9996C22.5 17.7996 17.799 22.4996 12 22.4996V19.4996C13.5182 19.4996 15.0006 19.0389 16.2513 18.1784C17.502 17.3179 18.4621 16.098 19.0047 14.6802C19.5473 13.2623 19.6469 11.7131 19.2902 10.2375C18.9335 8.76179 18.1373 7.42913 17.007 6.41563C16.7109 6.14999 16.5325 5.77763 16.5109 5.38044C16.4893 4.98325 16.6264 4.59376 16.892 4.29763Z"
          fill="url(#paint1_linear_2053_1125)"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_2053_1125"
          x1="526.5"
          y1="111.637"
          x2="526.5"
          y2="1917.38"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" />
          <stop offset="1" stop-color="white" stop-opacity="0.55" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_2053_1125"
          x1="537"
          y1="288.799"
          x2="537"
          y2="1633.57"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="white" stop-opacity="0.27" />
          <stop offset="1" stop-color="white" stop-opacity="0.55" />
        </linearGradient>
        <clipPath id="clip0_2053_1125">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
