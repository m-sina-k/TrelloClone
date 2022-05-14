import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterTask } from "features/slices/boardsSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const [filtersList, setFiltersList] = useState([]);

  const toggleLabelFilter = (filterType) => {
    let tempFiltersList;
    if (filtersList.indexOf(filterType) > -1) {
      tempFiltersList = [...filtersList].filter((type) => type !== filterType);
    } else {
      tempFiltersList = [...filtersList, filterType];
    }
    setFiltersList(tempFiltersList);
    dispatch(filterTask({ filterList: tempFiltersList, type: filterType }));
  };

  const clearFilters = ()=>{
    setFiltersList([])
    dispatch(filterTask({filtersList:[],type:null}))
  }

  return (
    <ul className="py-1.5">
      <li className="flex items-center p-2 mb-2 justify-between">
        <span className="text-sm text-textColor">نمایش کارهای دارای برچسب</span>
        <section
          className={`switch-button cursor-pointer ${
            filtersList.indexOf("label") > -1 ? "switch-button--active" : ""
          }`}
          onClick={() => toggleLabelFilter("label")}
        >
          <span className="circle"></span>
        </section>
      </li>
      <li className="flex items-center p-2 mb-2 justify-between">
        <span className="text-sm text-textColor">نمایش کارهای دارای تاریخ</span>
        <section
          className={`switch-button cursor-pointer ${
            filtersList.indexOf("date") > -1 ? "switch-button--active" : ""
          }`}
          onClick={() => toggleLabelFilter("date")}
        >
          <span className="circle"></span>
        </section>
      </li>
      {filtersList.length > 0 && (
        <li className="px-2">
          <button className="text-xs rounded border-2 border-red-700 text-red-700 px-4 py-1.5 mr-auto block hover:bg-red-50" onClick={clearFilters}>
            حذف فیلتر ها
          </button>
        </li>
      )}
    </ul>
  );
};

export default Filters;
