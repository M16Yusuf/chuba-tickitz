function OrderSeat({ id, name, selectedSeats, onChange }) {
  const isSelected = selectedSeats.includes(name);
  const bgColor = isSelected ? "bg-blue-primary" : "bg-gray-300";

  return (
    <div className={`h-6 w-6 cursor-pointer rounded md:h-8 md:w-8 ${bgColor}`}>
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
