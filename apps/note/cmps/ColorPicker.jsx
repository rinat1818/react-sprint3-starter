

export function ColorPicker({ onColorChange }) {
  const colors = [
    '#ffffff', '#faafa8', '#f39f76', '#fff8b8',
    '#e2f6d3', '#b4ddd3', '#d4e4ed', '#aeccdc',
    '#d3bfdb', '#f6e2dd', '#e9e3d4', '#efeff1',
  ]
 return (
    <div className="color-picker">
      {colors.map(color => (
        <button
          type="button"
          key={color}
          className="Color-changer-button"
          style={{ backgroundColor: color }}
          onClick={() => onColorChange(color)}
        />
      ))}
    </div>
  )

}

















// export function ColorPicker({ colors, showColors, onChangeColor }) {
// if (!showColors) return null

//   return (
//     <div className="color-picker">
//       {colors.map(color => (
//         <button
//           key={color}
//           type="button"
//           className="Color-changer-button"
//           style={{ backgroundColor: color }}
//           onClick={() => onChangeColor(color)}
//         ></button>
//       ))}
//     </div>
//   )
// }