import {DataBase} from "../util/db"
class NumTransRouter
{
    
    private options;
    private http;
    private request;
    private response;
    private phone;
    private ip;
    private db;
       /**
        * CallControll_Handler
        */
        getDb()
        {
            return this.db;

        }
        getOptions()
        {
            return this.options;

        }
        getHttp()
        {
            return this.http;

        }
        getRequest()
        {
            return this.request;

        }getResponse()
        {
            return this.response;

        }getIp()
        {
            return this.ip;
        }
        setDb(db)
        {
            this.db = db;

        }
        setRequest(request)
        {
            this.request = request;

        }
        setResponse(response)
        {
            this.response = response;

        }setPhone(phone)
        {
         //       console.log("phone====>"+phone);
                this.phone = phone;
        }setHttp(http)
        {
            this.http = http;

        }

     
constructor(host,user,passwd,database,options,http,request,response,phone)
{
    this.db = new DataBase(host,user,passwd,database);
    this.options = options;
    this.http = http;
    this.request = request;
    this.response = response;
    this.phone = phone;
} 

async  NumTrans_Handler() {
    
    let pos = await getUserPos(this.db.getConnection(),this.phone);
    let ip = await getUserIp(this.db.getConnection(),pos);
    this.options["host"]=ip;
    var real_req = this.http.request(this.options,(real_res)=>{
    real_res.pipe(this.response);
    this.response.write("<br/>（号码翻译类API调用）hello,this is from "+pos+",and it's owner is "+this.phone);
                                                   });
    this.request.pipe(real_req);
}


}
var getUserPos = function(connection,phone){
    
            return new Promise(
                (resolve,reject)=>{
                    // console.log("userpos==>"+connection);
                     connection.query("select * from router where src = "+"'"+phone+"'",function(err,results,fields){
                        if(err)reject(err);
                        else resolve(results[0]["des"]);
                    });
    
                }
    
    
            );
    
        }
        var getUserIp = function(connection,pos){
            
                    return new Promise(
                        (resolve,reject)=>{
                      //      console.log("userip==>");
                            connection.query("select * from city_ip where city = "+"'"+pos+"'",function(err,results,fields){
                                if(err)reject(err);
                                else resolve(results[0]["ip"]);
                            });
            
                        }
            
            
                    );
            
                }

export{NumTransRouter};
