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
    return http.get("/GetMsg_page"+query.toString());
  }
  GetPagesAmount(){
    return http.get("/GetMsgPages");
  }
  Ping(){
    return http.get("/");
  }
}

export default new TutorialDataService();
