import { Component } from '@angular/core';
declare var test: any;
declare var test1: any;
declare var test2: any;
declare var test3: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Test';

  f() {
    let AP = test();
    console.log(AP);
  }

  f1() {
    var AP = test();
    AP.request('/rest/api/3/project/10307', {
      contentType: 'application/json',
      success: function (responseText) {
        console.log(responseText);
      },
      error: function (xhr, statusText, errorThrown) {
        console.log(arguments);
      }
    });
  }

  currentLocation() {
    var AP = test();
    AP.getLocation(function (location) {
      
      //get projectid and project name from the link
      var url = new URL(location);
      var p_key = url.searchParams.get("project.key");
      var p_id = url.searchParams.get("project.id");
      console.log("Project Id = "+p_id);
      console.log("Project Key = "+p_key);
      //AP.history.pushState("page2");

      AP.navigator.go('RapidBoard', {
        issueKey: 'TEST-1'
      });

      //get relavant board
      AP.request('/rest/agile/1.0/board', {
        contentType: 'application/json',
        success: function (responseText) {
         // console.log(responseText);

         var data  = JSON.parse(responseText);
         var i, boardID;
         for(i in data.values){

          if(p_id==data.values[i].location.projectId){
             boardID =data.values[i].id; 
            break;
          }
         }
         console.log("board id is = "+boardID);

         //get relavant sprint
         AP.request('/rest/agile/1.0/board/'+boardID+'/sprint', {
          contentType: 'application/json',
          success: function (responseText) {
            
            var data  = JSON.parse(responseText);

            var sprintArray = data.values;
            var sprintDetails = sprintArray[sprintArray.length-1];
            console.log("sprint details = "+sprintDetails);

            var startDate = sprintDetails["startDate"];
            var endDate = sprintDetails["endDate"];

            console.log("Sprint start date = "+startDate);
            console.log("Sprint end date = "+endDate);

          },
          error: function (xhr, statusText, errorThrown) {
            console.log(arguments);
          }
        });



        },
        error: function (xhr, statusText, errorThrown) {
          console.log(arguments);
        }
      })
    });
  }

}
