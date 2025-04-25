type HoverDataType = {
  Solutions: Record<string, string>;
  Industries: Record<string, string>;
  About: Record<string, string>;
  Gallery: Record<string, string>;
  Contact: Record<string, string>;
  [key: string]: Record<string, string>;
};

const Hoverdata = (hoveredItem: { hoveredItem: string }) => {
  const hoverData: HoverDataType = {
    Solutions: {
      Automation: "Automation",
      "Automation Consulting": "Automation Consulting",
      "Control Panels": "Control Panels",
      "Engineering Services": "Engineering Services",
      "Global Engineering Outsourcing": "Global Engineering Outsourcing",
      "Industrial Softwares": "Industrial Softwares",
      "Machine Vision": "Machine Vision",
    },
    Industries: {
      "Steel Product Processing": "Steel Product Processing",
      "Hot Rolling & Cold Rolling": "Hot Rolling & Cold Rolling",
      "Steel Tube Processing Lines": "Steel Tube Processing Lines",
      "Ware House Handling Systems(ASRS)": "Ware House Handling Systems(ASRS)",
      "Printing and Converting Industries":
        "Printing and Converting Industries",
      "Food and Beverages": "Food and Beverages",
      "Packaging Industries": "Packaging Industries",
      "Rubber & Tyre Industries": "Rubber & Tyre Industries",
      "Sugar Industries": "Sugar Industries",
      Automobile: "Automobile",
    },
    About: { about: "about" },
    Gallery: { Gallery: "Gallery" },
    Contact: { Contact: "Contact" },
    Jobs: { Jobs: "Jobs" },
  };

  return (
    <div className="bg-gray-200 p-4 text-black w-[200px] z-100000">
      {Object.keys(hoverData[`${hoveredItem.hoveredItem}`])?.map((item) => (
        <div
          key={item}
          className="text-sm border-b border-black p-[0.3rem] transition-all duration-300 ease-in-out transform hover:bg-red-700 hover:text-white hover:scale-105 hover:translate-x-1 z-100"
        >
          <a
            href={`/${hoveredItem.hoveredItem}/${item
              .split(" ")
              .map((word) => word.toLowerCase())
              .join("-")}`}
          >
            {item}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Hoverdata;
