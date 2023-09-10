import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

import "./App.css";
import Buttons from "./Components/Buttons";
import { colors } from "@mui/material";

function App() {
  let [todo_main_input, set_todo_main_input] = useState("");
  let [uiShow, setuiShow] = useState([]);
  let [uishowinput, setuishowinput] = useState("");


//-----------------------------------Add todo---------------------------------------
  const add_todo = () => {
    let todo_obj = {
      value: todo_main_input,
      isEdit: false,
      isComplete: false,
    };
    setuiShow([...uiShow, todo_obj]);
    set_todo_main_input(""); // Clear input after adding todo
  };

//-----------------------------------Del all todo---------------------------------------

  const delall_todo = () => {
    setuiShow([]);
  };

//-----------------------------------Del element todo---------------------------------------
  const del_element_todo = (index) => {
    uiShow.splice(index, 1);
    setuiShow([...uiShow]);
  };

//-----------------------------------edit todo---------------------------------------

  const edit_todo = (index) => {
    uiShow.forEach((element) => {
      element.isEdit = false;
    });

    uiShow[index].isEdit = true;
    setuiShow([...uiShow]);

    setuishowinput(uiShow[index].value);
  };

//----------------------------------Complete button code--------------------------------------
  const Completed_todo = (index) => {
    if (uiShow[index].isComplete == false) {
      uiShow[index].isComplete = true;
      setuiShow([...uiShow]);
    } else {
      uiShow[index].isComplete = false;
      setuiShow([...uiShow]);
    }
  };
//-----------------------------------after edit button u see save btn thats code is here---------------------------------------

  const save_edited_todo = (index) => {
    uiShow[index].isEdit = false;
    setuiShow([...uiShow]);
    uiShow[index].value = uishowinput;
    setuiShow([...uiShow]);
  };

//-----------------------------------ui -------------------------------------------------------------------
  return (
    <>
    {/* ---------------------------------Header------------------------------ */}
      <div className="text-center">Gareboon ke todo list</div>

     {/* -----------------------------input field --------------------------------------  */}
      <section className="flex flex-col items-center justify-center gap-2 ">
        <div className="w-[90%] md:w-[60%] lg:w-[40%]">
          <TextField
            id="filled-basic"
            label="Enter Todo"
            variant="filled"
            className="w-[100%] "
            value={todo_main_input}
            onChange={(e) => {
              set_todo_main_input(e.target.value);
            }}
          />
        </div>

     {/* -----------------------------two buttons add del_all code --------------------------------------  */}
        <div className="flex gap-2">
          <Buttons value="Add" trigger={add_todo} />
          <Buttons value="delete" trigger={delall_todo} />
        </div>


        {/* //-----------------------------------map function hae yahan pr -------------------------------------- */}
        {uiShow.map((element, index) =>
          element.isComplete ? (
            <section
              className="flex gap-2 border border-gray-700 p-4 rounded-lg items-center w-[90%] md:w-[70%] lg:w-[40%] justify-between"
              key={index}
            >
              <div className="flex gap-2  p-4 rounded-lg items-center w-[90%] md:w-[70%] lg:w-[40%] justify-between">
                {element.value}
              </div>
              <div>
                <Buttons
                  value="Incomplete"
                  trigger={() => {
                    Completed_todo(index);
                  }}
                />
              </div>
            </section>
          ) : element.isEdit ? (
            <section
              className="flex gap-2 border border-gray-700 p-4 rounded-lg items-center w-[90%] md:w-[70%] lg:w-[40%] justify-between"
              key={index}
            >
              <div className="w-[80%] overflow-x-scroll ml-[5px]">
                {" "}
                <TextField
                  className="w-[100%]"
                  id="standard-basic"
                  label="Edit todo"
                  variant="standard"
                  value={uishowinput}
                  onChange={(e) => {
                    setuishowinput(e.target.value);
                  }}
                />
              </div>
              <div className="flex gap-2 flex-wrap justify-center  w-[20%]">
                <Buttons
                  value="Save"
                  trigger={() => {
                    save_edited_todo(index);
                  }}
                />
              </div>
            </section>
          ) : (
            <section
              className="flex gap-2 border border-gray-700 p-4 rounded-lg items-center w-[90%] md:w-[70%] lg:w-[40%] justify-between"
              key={index}
            >
              <div className="w-[40%] overflow-x-scroll ml-[5px]">
                {element.value}
              </div>
              <div className="flex gap-1 flex-wrap justify-center w-[60%]">
                <Buttons
                  value="Edit"
                  trigger={() => {
                    edit_todo(index);
                  }}
                />
                <Buttons
                  value="delete"
                  trigger={() => {
                    del_element_todo(index);
                  }}
                />
                <Buttons
                  value="Complete"
                  trigger={() => {
                    Completed_todo(index);
                  }}
                />
              </div>
            </section>
          )
        )}
      </section>
    </>
  );
}

export default App;
