function OrderSeat({ id, name, selectedSeats, onChange }) {
  const isSelected = selectedSeats.includes(name);
  const bgColor = isSelected ? "bg-blue-primary" : "bg-gray-300";

  return (
    <div className={`h-8 w-8 cursor-pointer rounded ${bgColor}`}>
      <label
        htmlFor={id}
        className="block h-full w-full cursor-pointer rounded"
      ></label>
      <input
        type="checkbox"
        name={name}
        id={id}
        onChange={onChange}
        className="hidden"
      />
    </div>
  );
}

export default OrderSeat;
