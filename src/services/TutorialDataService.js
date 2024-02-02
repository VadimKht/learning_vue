import http from "../http-common";

class TutorialDataService {
  Login(data){
    return http.post("/Login", data);
  }
  Register(data){
    return http.post("/Register", data);
  }
}

export default new TutorialDataService();
