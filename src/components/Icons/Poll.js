export default function Poll({ color = 'block', size = 18 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color}
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M12 3v4H3V3h9zm4 14v4H3v-4h13zm6-7v4H3v-4h19z" />
    </svg>
  )
}
