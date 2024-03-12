

// client.js (Browser)
async function fetchData() {
  try {
    const response = await fetch('http://localhost:3000/getData');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    for(let i=0;i<data.length;i++){

      //for 1st Station
      if(i==0 && data[i].reached=="true"){
        const stationId=data[i].station_id;
        const station1=document.getElementById(stationId);
        station1.querySelectorAll("path").forEach(path=>{
          console.log(path.id);
          if(path.id==stationId+"_OB"){
            path.setAttribute("class","cls-16");
          }
        });
        station1.querySelectorAll("circle").forEach(path=>{
          console.log(path.id);
          if(path.id==stationId+"_OB"){
            path.setAttribute("class","cls-16");
          }
        });
        station1.querySelectorAll("text").forEach(text=>{
          console.log(text.id);
          if(text.id==stationId+"_C"){
            text.setAttribute("class","cls-21");
          }
          if(text.id==stationId+"-2"){
            text.setAttribute("class","cls-17");
          }
        });
      }
      //for other stations
      else if(i>0){
        prevIndex=i-1;
        prevIndexId=data[prevIndex].station_id;
        currIndexId=data[i].station_id;
        trackName=prevIndexId+"_"+currIndexId;
        if(data[i].reached=="true"){
          //update path with the previous station
          const track=document.getElementById(trackName);
          track.setAttribute("class","cls-2");
          //updating stations layout
          const station1=document.getElementById(currIndexId);
          station1.querySelectorAll("path").forEach(path=>{
            console.log(path.id);
            if(path.id==currIndexId+"_OB"){
              path.setAttribute("class","cls-16");
            }
          });
          station1.querySelectorAll("circle").forEach(path=>{
            console.log(path.id);
            if(path.id==currIndexId+"_OB"){
              path.setAttribute("class","cls-16");
            }
          });
          station1.querySelectorAll("text").forEach(text=>{
            console.log(text.id);
            if(text.id==currIndexId+"_C"){
              text.setAttribute("class","cls-21");
            }
            if(text.id==currIndexId+"-2"){
              text.setAttribute("class","cls-17");
            }
          });
        }
      }
    }
    // Use the data in your SVG or other parts of your web page
    console.log(data);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

// Call the fetchData function when needed
fetchData();

/*import Client from './node_modules/pg/lib'; 

//const {Client} = require('./node_modules/pg/lib/client.js');

const client = new Client({
  user: "postgres", 
  password: "Vivan@123",
  host: "inakr42011wspr.ad001.siemens.net",
  port: 5432,
  database: "Vivan Trial"
});
var data=[];
client.connect()
  .then(() => {
    console.log("Connected successfully");
    
    // Execute your SQL query
    return client.query("SELECT * FROM smstrain");
  })
  .then(result => {
    // Log the query result to the console
    console.log("Query Result:", result.rows);
    data=result.rows;
    console.log(data.length);

    for(let i=0;i<data.length;i++){

      //for 1st Station
      if(i==0 && data[i].reached=="true"){
        const stationId=data[i].id;
        const station1=document.getElementById(stationId);
        station1.querySelectorAll("path").forEach(path=>{
          console.log(path.id);
          if(path.id==stationId+"_OB"){
            path.setAttribute("class","cls-16");
          }
        });
        station1.querySelectorAll("circle").forEach(path=>{
          console.log(path.id);
          if(path.id==stationId+"_OB"){
            path.setAttribute("class","cls-16");
          }
        });
        station1.querySelectorAll("text").forEach(text=>{
          console.log(text.id);
          if(text.id==stationId+"_C"){
            text.setAttribute("class","cls-21");
          }
          if(text.id==stationId+"-2"){
            text.setAttribute("class","cls-17");
          }
        });
      }
      //for other stations
      else if(i>0){
        prevIndex=i-1;
        prevIndexId=data[prevIndex].id;
        currIndexId=data[i].id;
        trackName=prevIndexId+"_"+currIndexId;
        if(data[i].reached=="true"){
          //update path with the previous station
          const track=document.getElementById(trackName);
          track.setAttribute("class","cls-2");
          //updating stations layout
          const station1=document.getElementById(currIndexId);
          station1.querySelectorAll("path").forEach(path=>{
            console.log(path.id);
            if(path.id==currIndexId+"_OB"){
              path.setAttribute("class","cls-16");
            }
          });
          station1.querySelectorAll("circle").forEach(path=>{
            console.log(path.id);
            if(path.id==currIndexId+"_OB"){
              path.setAttribute("class","cls-16");
            }
          });
          station1.querySelectorAll("text").forEach(text=>{
            console.log(text.id);
            if(text.id==currIndexId+"_C"){
              text.setAttribute("class","cls-21");
            }
            if(text.id==currIndexId+"-2"){
              text.setAttribute("class","cls-17");
            }
          });
        }
      }
    }




    
    // Don't forget to close the database connection
    client.end();
  })
  .catch(error => {
    console.error("Error:", error);
    client.end();
  });
  

/*var pg =require('./node_modules/pg');
var connectionString = "postgres://postgres:Vivan@123@inakr42011wspr.ad001.siemens.net/ip:5432/Vivan Trial";
var pgClient = new pg.Client(connectionString);
pgClient.connect();
var query = pgClient.query("SELECT * from smstrain");
console.log(query);
const data=[
    { name: "Whampoa",id:"WHA", reached:"true"},
    { name: "Ho Man Tin",id:"HOM", reached:"true"},
    { name: "Yau Ma Tei",id:"YMT", reached:"true"},
    { name: "Mong Kok",id:"MOK", reached:"true"},
    { name: "Prince Edward",id:"PRE", reached:"true"},
    { name: "Shek Kip Mei",id:"SKM", reached:"true"},
    { name: "Kowloon Tong",id:"KOT", reached:"false"},
    { name: "Lok Fu",id:"LOF", reached:"false"},
    { name: "Wong Tai Sin",id:"WTS", reached:"false"},
    { name: "Diamond Hill",id:"DIH", reached:"false"},
    { name: "Choi Hung",id:"CHH", reached:"false"},
    { name: "Kowloon Bay",id:"KOB", reached:"false"},
    { name: "Ngau Tau Kok",id:"NTK", reached:"false"},
    { name: "Kwun Tong",id:"KWT", reached:"false"},
    { name: "Lam Tin",id:"LAT", reached:"false"},
    { name: "Yau Tong",id:"YAT", reached:"false"},
    { name: "Tiu Keng Leng",id:"TKL", reached:"false"}
  ];

  for(let i=0;i<data.length;i++){

    //for 1st Station
    if(i==0 && data[i].reached=="true"){
      const stationId=data[i].id;
      const station1=document.getElementById(stationId);
      station1.querySelectorAll("path").forEach(path=>{
        console.log(path.id);
        if(path.id==stationId+"_OB"){
          path.setAttribute("class","cls-16");
        }
      });
      station1.querySelectorAll("circle").forEach(path=>{
        console.log(path.id);
        if(path.id==stationId+"_OB"){
          path.setAttribute("class","cls-16");
        }
      });
      station1.querySelectorAll("text").forEach(text=>{
        console.log(text.id);
        if(text.id==stationId+"_C"){
          text.setAttribute("class","cls-21");
        }
        if(text.id==stationId+"-2"){
          text.setAttribute("class","cls-17");
        }
      });
    }
    //for other stations
    else if(i>0){
      prevIndex=i-1;
      prevIndexId=data[prevIndex].id;
      currIndexId=data[i].id;
      trackName=prevIndexId+"_"+currIndexId;
      if(data[i].reached=="true"){
        //update path with the previous station
        const track=document.getElementById(trackName);
        track.setAttribute("class","cls-2");
        //updating stations layout
        const station1=document.getElementById(currIndexId);
        station1.querySelectorAll("path").forEach(path=>{
          console.log(path.id);
          if(path.id==currIndexId+"_OB"){
            path.setAttribute("class","cls-16");
          }
        });
        station1.querySelectorAll("circle").forEach(path=>{
          console.log(path.id);
          if(path.id==currIndexId+"_OB"){
            path.setAttribute("class","cls-16");
          }
        });
        station1.querySelectorAll("text").forEach(text=>{
          console.log(text.id);
          if(text.id==currIndexId+"_C"){
            text.setAttribute("class","cls-21");
          }
          if(text.id==currIndexId+"-2"){
            text.setAttribute("class","cls-17");
          }
        });
      }
    }
  }
  */
 