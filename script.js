// Getting DOM ID value Globally

var names = document.getElementById('name');
var vehicleNames = document.getElementById('vehicleName');
var vehicleNumbers = document.getElementById('vehicleNumber');
var entryDates = document.getElementById('entryDate');
var exitDates = document.getElementById('exitDate');
var btnSave = document.getElementById('btnSave');
var addedit = document.getElementById('addedit');
var lbl1 = document.getElementById('lblerr1');
var lbl2 = document.getElementById('lblerr2');
var lbl3 = document.getElementById('lblerr3');
var lbl4 = document.getElementById('lblerr4');


var table = document.getElementById('myTables');

//Textbox validation By clicking that text box

names.addEventListener('textInput',function(){
    if(names.value.length>1){
        lbl1.style.display = 'none';
    }
});

vehicleNames.addEventListener('textInput',function(){
    if(vehicleNames.value.length > 1){
        lbl2.style.display = 'none';
    }
});

vehicleNumbers.addEventListener('textInput',function(){
    var reg1 = "^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{3}$";
    var regexVeh = new RegExp(reg1);
    if(regexVeh.test(vehicleNumbers.value) == false){
        lbl3.style.display = 'block';
        lbl3.innerHTML = 'Number Plate is not in Correct Format';
    }
    else{
        btnSave.removeAttribute("disabled");
        lbl3.style.display = 'none';
    }
});

var dummy = "";  //to store row index value for edit and delete
showData();

//Adding vehicles details to table
function addRow(){
    let regs = "^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{3}$";
    let regexVeh1 = new RegExp(regs);
    
   
    var listParkingData = [];
    if(names.value == "")
        lbl1.style.display= 'block';
    else if(vehicleNames.value == "")
        lbl2.style.display = 'block';
    else if(vehicleNumbers.value == ""){
        lbl3.style.display = 'block';
    }
    // else if(regexVeh.test(vehicleNumbers.value) != false){
    //     lbl3.style.display = 'block';
    //     lbl3.innerHTML = 'Number Plate is not in Correct Format';
    // }
    
     else if(entryDates.value == "" )
        lbl4.style.display = 'block';

       else if(Date.parse(exitDates.value) < Date.parse(entryDates.value)){
       alert('Exit Date should be greater than or equal to Entry Date.')
       }

    else{
       
    
        let getLocalStorage = JSON.parse(localStorage.getItem("ParkingData"));//Creating localstorage for storing datas locally
   
        if(getLocalStorage == null){
            localStorage.setItem("ParkingData",JSON.stringify(getLocalStorage));
        }
        else{
            //inserting all the entered values in localstorage using array
            listParkingData = JSON.parse(JSON.stringify(getLocalStorage));
            listParkingData.push({
                name : names.value,
                vehicleName : vehicleNames.value,
                vehicleNumber : vehicleNumbers.value,
                entryDate : entryDates.value,
                exitDate : exitDates.value
            });
        
            localStorage.setItem("ParkingData",JSON.stringify(listParkingData));
        }
    
    
        
        swal("Success!", "Vehicle Added Successfully", "success");
        names.value = "";
        vehicleNames.value = "";
        vehicleNumbers.value = "";
        entryDates.value = "";
        exitDates.value = "";
   
    
    }
    showData();
}

//Updating the datas for the specific rows
function updateRow(){
    let arr = JSON.parse(localStorage.getItem("ParkingData"));
        arr[dummy].name = names.value;
        arr[dummy].vehicleName = vehicleNames.value;
        arr[dummy].vehicleNumber = vehicleNumbers.value;
        arr[dummy].entryDate = entryDates.value;
        arr[dummy].exitDate = exitDates.value;
        localStorage.setItem("ParkingData",JSON.stringify(arr));
       swal("Updated!", "Vehicle Updated Successfully", "success").then(function(){
           location.reload();
       });
        
        names.value = "";
        vehicleNames.value = "";
        vehicleNumbers.value = "";
        entryDates.value = "";
        exitDates.value = "";
        showData();
}

//Showing all the datas which are available in localstorage 
function showData(){
    var getLocalStorage = localStorage.getItem("ParkingData");
   var listParkingData = [];
    if(getLocalStorage == null){
     listParkingData = []
    }
    else{
        listParkingData = JSON.parse(getLocalStorage);
    }
   
   var thead = '<thead> <tr><th scope="col">S.No</th><th scope="col">Name</th><th scope="col">Vehicle Name</th><th scope="col">Vehicle Number</th><th scope="col">Entry Date</th>     <th scope="col">Exit Date</th>     <th scope="col">Action</th>  </tr></thead>'
    var newRow = thead;
   var count = 1;
    for(let data in listParkingData){

    
        newRow += `
        
                    <tbody>
                    <tr>
                    <td>${count}</td>
                    <td>${listParkingData[data].name}</td>
                       <td>${listParkingData[data].vehicleName}</td>
                       <td>${listParkingData[data].vehicleNumber}</td>
                       <td>${listParkingData[data].entryDate}</td>
                       <td>${listParkingData[data].exitDate}</td>
                       <td><a href="javascript:void(0)" class="btn btn-primary" onclick="editrow(${data});">Edit</a>
                       <a href="javascript:void(0)" class="btn btn-danger" onclick="deleteAlert(${data});">Delete</a>
                       </td>
                       </tr></tbody>`;

                       count++;
       
    }
       

    
    table.innerHTML = newRow;
}

//Edit the specific row by clicking Edit button and it display the data in their spepcific textbox
function editrow(dataid){
    window.scroll({
        top: 0, 
        left: 0, 
        behavior: 'smooth' 
       });
       addedit.innerHTML = 'Edit Vehicle Data';
       addedit.style.textDecoration = 'underline';
       addedit.style.fontWeight = 'bold';
    dummy = dataid;
    let arr = JSON.parse(localStorage.getItem("ParkingData"));
    
    let btnUpdate = document.getElementById('btnUpdate');
    names.value = arr[dummy].name;
    vehicleNames.value = arr[dummy].vehicleName;
    vehicleNumbers.value = arr[dummy].vehicleNumber;
    entryDates.value = arr[dummy].entryDate;
    exitDates.value = arr[dummy].exitDate;
    btnSave.style.display = 'none';
    btnUpdate.style.display = 'block';
    

}
//delete rows and diplays alert
function deleteAlert(dataid){
    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            deleterow(dataid);
          swal("Vehicle Deleted Successfully", {
            icon: "success",
          });
        } else {
          swal("Delete Unsuccessfull!");
        }
      });
}
//Deleting the specific row with this function
function deleterow(dataid){
    let getlocalStorage = JSON.parse( localStorage.getItem("ParkingData"));
    getlocalStorage.splice(dataid,1);
    localStorage.setItem("ParkingData",JSON.stringify(getlocalStorage));
    showData();
}
