import http from "../http-common";

class TutorialDataService {
  Login(data){
    return http.post("/Login", data);
  }
  Register(data){
    return http.post("/Register", data);
  }
  PostPost(data){
    return http.post("/PostMsg",data);
  }
  GetPost(query){
    console.log(query);
    return http.get("/GetMsg_page"+query.toString());
  }
}

export default new TutorialDataService();
