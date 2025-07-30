import { Link } from "react-router-dom";

/**
 * Digunakan untuk element list pada navbar
 * @param {Object} props
 * @param {String} props.to - Tujuan Navigasi dari Link
 * @param {String} props.ListText - Teks dari link
 */
function ListItem(props) {
  return (
    <li className={props.className}>
      <Link to={props.to}>{props.listText}</Link>
    </li>
  );
}

export default ListItem;
