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
  GetPostPage(query){
    return http.get("/GetMsg_page"+query.toString());
  }
  GetPost(query){
    return http.get("/GetMsgN"+query.toString());
  }
  GetPagesAmount(){
    return http.get("/GetMsgPages");
  }
  EditPost(data){
    return http.patch("/EditPost", data);
  }
  RemovePost(data){
    // in remove http request there is {headers: {"Authorization": ""}, data: {}}. might have to learn a bit more about it and later make authorization more correct
    return http.delete("/DeletePost", {data: data});
  }
  Ping(){
    return http.get("/ping");
  }
}

export default new TutorialDataService();
